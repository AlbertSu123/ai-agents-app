import { API_URL } from ".";
import { Bounty } from ".";
import TwitterApi from "twitter-api-v2";

async function getTweetResponse(description: string) {
  try {
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer xai-GhGrBCPyyoeWZPbzoOzjXmQ99WQNtePnTMtlCITGmkP8BfzhOyKTwefrGC4qZwHXp6GH83oJMah1LKKm",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content:
              "You are a test assistant. You are given a bounty description and you need to respond to it with a good tweet that will get the most engagement.",
          },
          {
            role: "user",
            content: description,
          },
        ],
        model: "grok-2-latest",
        stream: false,
        temperature: 0,
      }),
    });

    const data = await response.json();
    const generatedTweet = data.choices[0].message.content;

    return generatedTweet;
  } catch (error) {
    return "Failed to generate tweet response";
  }
}

const fillBounties = async () => {
  const bounties = await fetch(`${API_URL}/bounty`);
  const bountiesData = await bounties.json();
  console.log(bountiesData);
  const unfilledBounties = bountiesData.filter(
    (bounty: Bounty) => !bounty.filled
  );
  console.log(`Found ${unfilledBounties.length} unfilled bounties`);
  if (unfilledBounties.length === 0) {
    console.log("No bounty found");
    return;
  }
  const bounty = unfilledBounties[0];
  console.log(`Getting tweet response for bounty: ${bounty.description}`);
  const tweet = await getTweetResponse(bounty.description);
  console.log(`Posting tweet: ${tweet}`);
  const twitterClient = new TwitterApi({
    appKey: "OcBcNPfy1k8L5l7gKuoM2jvOm",
    appSecret: "KXlNp57pdqPSALuLanHNUi7z5hXZQ6WiFE2TEpihrVdaqNSskr",
    accessToken: "1565717307397050368-TCc6QPyXgZgoNk7Xi2q10ZbNL092jk",
    accessSecret: "gavJEtQvy6lOwV3MFlaAH3T7At6rIpvPJkm7XVsWjGw25",
  });
  const tweetResponse = await twitterClient.v2.tweet(tweet);
  console.log(tweetResponse);
  console.log("Tweet response: " + JSON.stringify(tweetResponse));
  const tweetId = tweetResponse.data.id;
  console.log(`Tweet posted: ${tweetId}`);
  const bountyResponse = await fetch(`${API_URL}/tweet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tweetId,
      address: "0xbbcBA2753398cC977C65399B92066Bb2ee968Ed0",
    }),
  });
  const bountyData = await bountyResponse.json();
  console.log(`Bounty responded: ${JSON.stringify(bountyData)}`);
};

const claimBounties = async () => {
  console.log("Checking for completed bounties");
  const checkAllResponse = await fetch(`${API_URL}/bounty/check-all`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: "0xbbcBA2753398cC977C65399B92066Bb2ee968Ed0",
    }),
  });
  const checkAllData = await checkAllResponse.json();
  if (checkAllData.length === 0) {
    console.log("No bounties found");
    return;
  }
  for (const bounty of checkAllData) {
    console.log(`Bounty ${bounty?.id} completed and claimed ${bounty.value}`);
  }
};

setInterval(async () => {
  await fillBounties();
  await claimBounties();
}, 60000); // Run every minute
