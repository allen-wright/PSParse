function parsePrices(priceDivs, result) {
    if (priceDivs.length === 3 && !priceDivs[0].innerText.includes('Included')) {
      console.log(priceDivs[0], priceDivs[1], priceDivs[2]);
      // let priceArray = priceDivs.innerText.split('\n');
      let psDiscount = parseInt(parseInt(priceDivs[0].innerText.match(/[0-9]{1,2}/)[0]) - parseInt(priceDivs[1].innerText));
      result.psPercentage = `${psDiscount}%`;
      console.log(parseFloat(priceDivs[2].children[1].innerText.substring(1)));
      result.psPrice = '$' + (parseFloat(priceDivs[2].children[1].innerText.substring(1)) * (1 - (Math.abs(psDiscount)/100))).toFixed(2) - 0.01);
      console.log(result.psPercentage, result.psPrice);
    }
    // let priceArray = item.children[1].innerText.split('\n');
    // if (priceArray.length === 3) {
    //   result.psPercentage = 'N/A';
    //   result.psPrice = 'N/A';
    //   result.salePercentage = priceArray[0];
    //   result.salePrice = priceArray[1];
    //   result.originalPrice = priceArray[2];
    // } else if (priceArray.length === 4) {
    //   let psDiscount = parseInt(priceArray[1]) - priceArray[0].match(/[0-9]{1,2}/)[0];
    //   result.psPercentage = `${psDiscount}%`;
    //   result.salePercentage = priceArray[1];
    //   result.salePrice = priceArray[2];
    //   result.originalPrice = priceArray[3];
    //   result.psPrice = '$' + ((parseFloat(priceArray[3].substring(1)) * (1 - (Math.abs(psDiscount)/100))).toFixed(2) - 0.01);
    // }
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
    let prices = item.children[1].children;
    result = parsePrices(prices, result);
    results.push(result);
    }
  return results;
}

parsePage();