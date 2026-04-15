const fs = require('fs');
const path = require('path');
const http = require('http');

const htmlSourceDirectory = path.join(process.cwd(), "html-originals");

const routeOverrides = {
  "agency.html": ["agreement"],
  "valuation.html": ["valuate"],
  "business (4).html": ["business-(4)"],
  "propertyfinder-features (2).html": ["propertyfinder-features-(2)"],
  "seller agent listing.html": ["seller-agent-listing"],
  "seller-agent-listing.html": ["seller-agent-listing"],
};

function normalizeHtmlName(fileName) {
  return fileName.trim();
}

function fileNameRouteSegments(fileName) {
  const normalized = normalizeHtmlName(fileName);
  if (routeOverrides[normalized]) {
    return routeOverrides[normalized];
  }

  const baseName = normalized.replace(/\.html$/i, "");
  const normalizedBase = baseName.trim();
  const hyphenized = normalizedBase.replace(/\s+/g, "-").toLowerCase();

  if (hyphenized === "index") {
    return [];
  }
  if (hyphenized.startsWith("auctions-")) {
    return ["auctions", hyphenized.replace(/^auctions-/, "")];
  }
  if (hyphenized.startsWith("auction-")) {
    return ["auctions", hyphenized.replace(/^auction-/, "")];
  }
  if (hyphenized.startsWith("buy-")) {
    return ["buy", hyphenized.replace(/^buy-/, "")];
  }
  if (hyphenized.startsWith("business-")) {
    return ["business", hyphenized.replace(/^business-/, "")];
  }
  if (hyphenized.startsWith("rent-")) {
    return ["rent", hyphenized.replace(/^rent-/, "")];
  }

  return [hyphenized];
}

function buildRouteMap() {
  const routeMap = new Map();
  for (const fileName of fs.readdirSync(htmlSourceDirectory)) {
    if (!fileName.toLowerCase().endsWith(".html")) {
      continue;
    }
    const segments = fileNameRouteSegments(fileName);
    if (segments.length === 0) {
      continue;
    }
    const routeKey = segments.join("/");
    if (!routeMap.has(routeKey)) {
      routeMap.set(routeKey, fileName);
    }
  }
  return routeMap;
}

function testUrl(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          success: res.statusCode === 200 && data.length > 100, // Basic check for content
          contentLength: data.length
        });
      });
    });
    req.on('error', (err) => {
      resolve({
        url,
        status: 'ERROR',
        success: false,
        error: err.message
      });
    });
    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        success: false,
        error: 'Request timeout'
      });
    });
  });
}

async function runVerification() {
  const routeMap = buildRouteMap();
  const routes = Array.from(routeMap.keys()).sort();

  console.log(`Testing ${routes.length} pages...\n`);

  const results = [];
  const batchSize = 5; // Test 5 pages at a time to avoid overwhelming the server

  for (let i = 0; i < routes.length; i += batchSize) {
    const batch = routes.slice(i, i + batchSize);
    const promises = batch.map(route => {
      const url = `http://localhost:3001/en/${route}`;
      return testUrl(url);
    });

    const batchResults = await Promise.all(promises);
    results.push(...batchResults);

    // Small delay between batches
    if (i + batchSize < routes.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  // Group results by category
  const categories = {
    'Auction Pages': [],
    'Business Pages': [],
    'Buy Pages': [],
    'Rent Pages': [],
    'Other Pages': []
  };

  results.forEach(result => {
    const route = result.url.replace('http://localhost:3001/en/', '');
    const segments = route.split('/');

    if (segments[0] === 'auctions' && segments.length > 1) {
      categories['Auction Pages'].push(result);
    } else if (segments[0] === 'business' && segments.length > 1) {
      categories['Business Pages'].push(result);
    } else if (segments[0] === 'buy' && segments.length > 1) {
      categories['Buy Pages'].push(result);
    } else if (segments[0] === 'rent' && segments.length > 1) {
      categories['Rent Pages'].push(result);
    } else {
      categories['Other Pages'].push(result);
    }
  });

  // Print results by category
  let totalPass = 0;
  let totalFail = 0;

  Object.entries(categories).forEach(([category, pages]) => {
    if (pages.length === 0) return;

    console.log(`\n${category} (${pages.length} pages):`);
    console.log('='.repeat(category.length + 12));

    pages.forEach(page => {
      const status = page.success ? 'PASS' : 'FAIL';
      const statusCode = page.status || 'N/A';
      console.log(`${status.padEnd(4)} ${page.url} (${statusCode})`);

      if (page.success) {
        totalPass++;
      } else {
        totalFail++;
      }
    });
  });

  console.log(`\n\nSUMMARY:`);
  console.log(`=======`);
  console.log(`Total Pages Tested: ${results.length}`);
  console.log(`PASS: ${totalPass}`);
  console.log(`FAIL: ${totalFail}`);
  console.log(`Success Rate: ${((totalPass / results.length) * 100).toFixed(1)}%`);

  if (totalFail > 0) {
    console.log(`\nFAILED PAGES:`);
    results.filter(r => !r.success).forEach(r => {
      console.log(`- ${r.url} (${r.status})`);
    });
  }
}

runVerification().catch(console.error);