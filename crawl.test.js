import { describe, test, expect } from "@jest/globals";
import { normalizeUrl, getURLsFromHTML } from "./crawl";

describe("normalizeUrl function", () => {
  test("It should normalize urls's", () => {
    expect(normalizeUrl("https://blog.boot.dev/path/")).toBe(
      "blog.boot.dev/path"
    );
    expect(normalizeUrl("https://blog.boot.dev/path")).toBe(
      "blog.boot.dev/path"
    );
    expect(normalizeUrl("http://blog.boot.dev/path/")).toBe(
      "blog.boot.dev/path"
    );
    expect(normalizeUrl("http://blog.boot.dev/path")).toBe(
      "blog.boot.dev/path"
    );
  });
});

describe("getURLsFromHTML function", () => {
  test("It should get urls from html", () => {
    const html = `<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev blog</span></a>
        <a href="https://www.boot.dev/pricing/"><span>Go to Boot.dev pricing</span></a>
        <a href="https://boot.dev/leaderboard"><span>Go to Boot.dev leaderboard</span></a>
    </body>
</html>`;

    expect(getURLsFromHTML(html, "https://boot.dev")).toStrictEqual([
      "https://blog.boot.dev/",
      "https://www.boot.dev/pricing/",
      "https://boot.dev/leaderboard",
    ]);
  });

  test("It should convert relative paths to absolute path based on given base url", () => {
    const html = `<html>
    <body>
        <a href="/pricing"><span>Go to Boot.dev pricing</span></a>
        <a href="leaderboard/"><span>Go to Boot.dev leaderboard</span></a>
    </body>
</html>`;

    expect(getURLsFromHTML(html, "https://boot.dev")).toStrictEqual([
      "https://boot.dev/pricing",
      "https://boot.dev/leaderboard",
    ]);
  });
});
