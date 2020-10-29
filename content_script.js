function parsePage(results) {
  let button;
    // gets all links
  let items = document.querySelectorAll('a.ems-sdk-product-tile-link');
  for (let i = 0; i < items.length; i++) {
    let item = JSON.parse(items[i].dataset.telemetryMeta);
    let result = {
      name: item.name,
      link: `https://store.playstation.com/product/${item.id}`
    }
    let priceArray = items[i].children[1].innerText.split('\n');
    // different logic based on if there's a PS+ discount or not
    if (priceArray.length === 3) {
      result.psPercentage = 'N/A';
      result.psPrice = 'N/A';
      result.salePercentage = priceArray[0];
      result.salePrice = priceArray[1];
      result.originalPrice = priceArray[2];
    } else if (priceArray.length === 4) {
      let psDiscount = parseInt(priceArray[1]) - priceArray[0].match(/[0-9]{1,2}/)[0];
      result.psPercentage = `${psDiscount}%`;
      result.salePercentage = priceArray[1];
      result.salePrice = priceArray[2];
      result.originalPrice = priceArray[3];
      result.psPrice = '$' + ((parseFloat(priceArray[3].substring(1)) * (1 - (Math.abs(psDiscount)/100))).toFixed(2) - 0.01);
    }
      results.push(result);
    }
  return results;
}

parsePage([]);