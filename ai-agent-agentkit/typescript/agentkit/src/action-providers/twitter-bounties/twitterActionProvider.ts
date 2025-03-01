import { z } from "zod";
import { ActionProvider } from "../actionProvider";
import { CreateAction } from "../actionDecorator";
import { TwitterApi, TwitterApiTokens } from "twitter-api-v2";
import { Network } from "../../network";
import { API_URL, Bounty, TwitterPostTweetSchema } from "./schemas";

/**
 * Configuration options for the TwitterActionProvider.
 */
export interface TwitterBountyProviderConfig {
  /**
   * Twitter API Key
   */
  apiKey?: string;

  /**
   * Twitter API Secret
   */
  apiSecret?: string;

  /**
   * Twitter Access Token
   */
  accessToken?: string;

  /**
   * Twitter Access Token Secret
   */
  accessTokenSecret?: string;
}

/**
 * TwitterActionProvider is an action provider for Twitter (X) interactions.
 *
 * @augments ActionProvider
 */
export class TwitterActionProvider extends ActionProvider {
  private readonly client: TwitterApi;

  /**
   * Constructor for the TwitterActionProvider class.
   *
   * @param config - The configuration options for the TwitterActionProvider
   */
  constructor(config: TwitterBountyProviderConfig = {}) {
    super("twitter-bounties", []);

    config.apiKey ||= process.env.TWITTER_API_KEY;
    config.apiSecret ||= process.env.TWITTER_API_SECRET;
    config.accessToken ||= process.env.TWITTER_ACCESS_TOKEN;
    config.accessTokenSecret ||= process.env.TWITTER_ACCESS_TOKEN_SECRET;

    if (!config.apiKey) {
      throw new Error("TWITTER_API_KEY is not configured.");
    }
    if (!config.apiSecret) {
      throw new Error("TWITTER_API_SECRET is not configured.");
    }
    if (!config.accessToken) {
      throw new Error("TWITTER_ACCESS_TOKEN is not configured.");
    }
    if (!config.accessTokenSecret) {
      throw new Error("TWITTER_ACCESS_TOKEN_SECRET is not configured.");
    }

    this.client = new TwitterApi({
      appKey: config.apiKey,
      appSecret: config.apiSecret,
      accessToken: config.accessToken,
      accessSecret: config.accessTokenSecret,
    } as TwitterApiTokens);
  }

  /**
   * Post a tweet on Twitter (X).
   *
   * @param args - The arguments containing the tweet text
   * @returns A JSON string containing the posted tweet details or error message
   */
  @CreateAction({
    name: "post_tweet",
    description: `
This tool will post a tweet on Twitter. The tool takes the text of the tweet as input. Tweets can be maximum 280 characters.

A successful response will return a message with the API response as a JSON payload:
    {"data": {"text": "hello, world!", "id": "0123456789012345678", "edit_history_tweet_ids": ["0123456789012345678"]}}

A failure response will return a message with the Twitter API request error:
    You are not allowed to create a Tweet with duplicate content.`,
    schema: TwitterPostTweetSchema,
  })
  async postTweet(args: z.infer<typeof TwitterPostTweetSchema>): Promise<string> {
    try {
      const response = await this.client.v2.tweet(args.tweet);
      return `Successfully posted to Twitter:\n${JSON.stringify(response)}`;
    } catch (error) {
      return `Error posting to Twitter:\n${error}`;
    }
  }

  /**
   * Post a tweet on Twitter (X).
   *
   * @returns A JSON string containing the posted tweet details or error message
   */
  @CreateAction({
    name: "respond_to_bounty",
    description: `
  This tool will respond to a bounty on Twitter. The tool takes the description of the bounty as input.

  A successful response will return a message with the API response as a JSON payload:
      {"data": {"text": "hello, world!", "id": "0123456789012345678", "edit_history_tweet_ids": ["0123456789012345678"]}}

  A failure response will return a message with the Twitter API request error:
      You are not allowed to create a Tweet with duplicate content.`,
    schema: TwitterPostTweetSchema,
  })
  async fetchBounties(): Promise<string> {
    try {
      const bounties = await fetch(`${API_URL}/bounty`);
      const bountiesData = await bounties.json();
      const unfilledBounties = bountiesData.filter((bounty: Bounty) => !bounty.filled);
      if (unfilledBounties.length === 0) {
        return "No unfilled bounties found";
      }
      const bounty = unfilledBounties[0];
      const tweet = await this.getTweetResponse(bounty.description);
      const response = await this.client.v2.tweet(tweet);
      const tweetId = response.data.id;
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
      return `Successfully filled bounty:\n${JSON.stringify(bountyData)}`;
    } catch (error) {
      return `Error posting to Twitter:\n${error}`;
    }
  }

  /**
   * Post a tweet on Twitter (X).
   *
   * @returns A JSON string containing the posted tweet details or error message
   */
  @CreateAction({
    name: "check_my_tweets_for_score",
    description: `
  This tool will check your tweets for a score.

  A successful response will return a message with the API response as a JSON payload:
      {"data": {"text": "hello, world!", "id": "0123456789012345678", "edit_history_tweet_ids": ["0123456789012345678"]}}

  A failure response will return a message with the Twitter API request error:
      You are not allowed to create a Tweet with duplicate content.`,
    schema: TwitterPostTweetSchema,
  })
  async checkMyTweetsForScore(): Promise<string> {
    try {
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
      const bounties = checkAllData.filter((bounty: Bounty) => bounty.filled);
      return `Successfully posted to Twitter:\n${JSON.stringify(bounties)}`;
    } catch (error) {
      return `Error posting to Twitter:\n${error}`;
    }
  }

  /**
   * Checks if the Twitter action provider supports the given network.
   * Twitter actions don't depend on blockchain networks, so always return true.
   *
   * @param _ - The network to check (not used)
   * @returns Always returns true as Twitter actions are network-independent
   */
  supportsNetwork(_: Network): boolean {
    return true;
  }

  /**
   * Get a tweet response from the X.ai API.
   *
   * @param description - The description of the bounty
   * @returns A tweet response
   */
  public async getTweetResponse(description: string) {
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
      return `Failed to generate tweet response: ${error}`;
    }
  }
}

/**
 * Factory function to create a new TwitterActionProvider instance.
 *
 * @param config - The configuration options for the TwitterActionProvider
 * @returns A new instance of TwitterActionProvider
 */
export const twitterActionProvider = (config: TwitterBountyProviderConfig = {}) =>
  new TwitterActionProvider(config);
