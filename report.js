function printReport(pages) {
  console.log("Generating report\n");

  const sortedPages = Object.entries(pages).sort((a, b) => {
    return b[1] - a[1];
  });

  sortedPages.forEach(([url, count]) => {
    console.log(`Found ${count} internal links to ${url}`);
  });
}

export { printReport };
