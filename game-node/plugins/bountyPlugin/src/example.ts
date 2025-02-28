import { GameAgent } from "@virtuals-protocol/game";
import BountyPlugin from "./bountyPlugin";
// Get these from https://developer.twitter.com/en/portal
const bountyPlugin = new BountyPlugin({
  credentials: {
    apiKey: "OcBcNPfy1k8L5l7gKuoM2jvOm",
    apiSecretKey: "KXlNp57pdqPSALuLanHNUi7z5hXZQ6WiFE2TEpihrVdaqNSskr",
    accessToken: "1565717307397050368-TCc6QPyXgZgoNk7Xi2q10ZbNL092jk",
    accessTokenSecret: "gavJEtQvy6lOwV3MFlaAH3T7At6rIpvPJkm7XVsWjGw25",
  },
});

// Create an agent with the worker
const agent = new GameAgent("apt-8d15c19aef39ba0618ea4dec1c8bc28b", {
  name: "Bounty Bot",
  goal: "respond to bounties",
  description: "A bot that can respond to bounties",
  workers: [
    bountyPlugin.getWorker({
      // Define the functions that the worker can perform, by default it will use the all functions defined in the plugin
      functions: [
        bountyPlugin.respondToBountiesFunction,
        bountyPlugin.checkMyTweetsForScoreFunction,
      ],
    }),
  ],
});

(async () => {
  agent.setLogger((agent, message) => {
    console.log(`-----[${agent.name}]-----`);
    console.log(message);
    console.log("\n");
  });

  await agent.init();

  while (true) {
    await agent.step({
      verbose: true,
    });
  }
})();
