// parses the HTMLCollection of divs with the price information
// TODO: make this a lot more specific
function parsePrices(priceDivs, result) {
  if (priceDivs.length === 3) {
    if (priceDivs[0].innerText.includes('Included')) {
      result.psPercentage = 'N/A';
      result.psPrice = 'N/A';
      priceDivs[0].remove();
    } else {
      let psDiscount = parseInt(parseInt(priceDivs[0].innerText.match(/[0-9]{1,2}/)[0]) - parseInt(priceDivs[1].innerText));
      result.psPercentage = `-${psDiscount}%`;
      result.psPrice = '$' + ((parseFloat(priceDivs[2].children[1].innerText.substring(1)) * (1 - (Math.abs(psDiscount)/100))).toFixed(2));
      priceDivs[0].remove();
    }
  } else {
    result.psPercentage = 'N/A';
    result.psPrice = 'N/A';
  }
  result.salePercentage = priceDivs[0].children[0].innerText;
  result.salePrice = priceDivs[1].children[0].innerText;
  result.originalPrice = priceDivs[1].children[1].innerText;
  return result;
}

function parsePage() {
  let results = [];
    // gets all links
  let items = document.querySelectorAll('.ems-sdk-product-tile-link');
  for (let i = 0; i < items.length; i++) {
    let result = {};
    let item = items[i];
    let telemetry = JSON.parse(item.dataset.telemetryMeta);
    result.name = telemetry.name;
    result.link = `https://store.playstation.com/product/${telemetry.id}`;
    result.salePrice = telemetry.price;
    let prices = item.children[1].children;
    result = parsePrices(prices, result);
    results.push(result);
    }
  return results;
}

parsePage();