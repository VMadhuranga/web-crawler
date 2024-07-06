import { JSDOM } from "jsdom";

function normalizeUrl(url) {
  const newUrl = new URL(url);
  return `${newUrl.hostname}${newUrl.pathname.replace(/\/$/, "")}`;
}

function getURLsFromHtml(html, baseURL) {
  const dom = new JSDOM(html);
  const urls = [...dom.window.document.querySelectorAll("a")].map(
    (tag) => new URL(tag.href, baseURL).href
  );

  return urls;
}

async function crawlPage(baseUrl, currentUrl, pages) {
  const baseUrlDomain = new URL(baseUrl).hostname;
  const currentUrlDomain = new URL(currentUrl).hostname;

  if (baseUrlDomain !== currentUrlDomain) {
    return pages;
  }

  const normalizedCurrentUrl = normalizeUrl(currentUrl);

  if (pages?.[normalizedCurrentUrl]) {
    pages[normalizedCurrentUrl]++;
    return pages;
  }

  pages[normalizedCurrentUrl] = 1;

  try {
    const response = await fetch(currentUrl, {
      method: "GET",
      mode: "cors",
    });

    if (!response.ok) {
      console.log(
        `Something went wrong when crawling url: ${currentUrl}, status: ${response.status}`
      );
      return pages;
    }

    console.log(`Crawling ${currentUrl}`);

    const contentType = response.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(`No HTML content found in url: ${currentUrl}`);
      return pages;
    }

    const html = await response.text();
    const urls = getURLsFromHtml(html, baseUrl);

    for (let url of urls) {
      pages = await crawlPage(baseUrl, url, pages);
    }
  } catch (error) {
    console.log(error);
  }

  return pages;
}

export { normalizeUrl, getURLsFromHtml, crawlPage };
