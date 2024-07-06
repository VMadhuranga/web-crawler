import readline from "node:readline";
import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(`Enter the url: `, async (url) => {
    if (url.length < 1) {
      console.log("No url provided");
    } else if (url.split(" ").length > 1) {
      console.log("Too many arguments");
    } else {
      console.log("\nCrawling Started\n");
      const pages = await crawlPage(url, url, {});
      console.log("\nCrawling ended\n");
      printReport(pages);
    }

    rl.close();
  });
}

main();
