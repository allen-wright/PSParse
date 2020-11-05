// parses the HTMLCollection of divs with the price information
function getTelemetryData(telemetry, listing) {
  let telemetryData = JSON.parse(telemetry);
  listing.name = telemetryData.name;
  listing.link = `https://store.playstation.com/product/${telemetryData.id}`;
  listing.salePrice = telemetryData.price;
  return listing;
}

function getDetails(details, listing) {
  // need to loop through all of the details, as the PS Store keeps changing and we can't simply use the array index
  for (let i = 0; i < details.children.length; i++) {
    let element = details.children[i];
    // checks for the sale percentage
    if (element.className === 'discount-badge__container psw-l-anchor') {
      listing.salePercentage = element.innerText;
    }
    // checks for the price container
    if (element.className === 'price__container') {
      if (element.children[1].className === 'price price--strikethrough') {
        listing.originalPrice = element.children[1].innerText;
      }
    }
    if (element.className === 'product-detail__container') {
      if (element.children[0].children[0].className.includes('psw-icon--ps-plus')) {
        let psElement = element.children[0].children[1];
        listing.psPercentage = `-${psElement.innerText.match(/[0-9]{1,2}/)[0]}%`;
      }
    }
  }
  // format PS+ percentage/discount, if there is one
  if (listing.psPercentage) {
    listing.psPercentage = `${parseInt(parseInt(listing.salePercentage) + parseInt(listing.psPercentage))}%`;
    let priceFloat = parseFloat(listing.originalPrice.replace('$', ''));
    let psInt = parseFloat((1 - (Math.abs(parseInt(listing.psPercentage))/100)).toFixed(2));
    listing.psPrice = `$${(Math.floor((priceFloat * psInt) * 100)) / 100}`;
  }
  return listing;
}

function parsePage() {
  let listings = [];
  let items = document.querySelectorAll('.ems-sdk-product-tile-link');
  // loop through each product, getting data from the proper helper functions
  for (let i = 0; i < items.length; i++) {
    let listing = {};
    let item = items[i];
    listing = getTelemetryData(item.dataset.telemetryMeta, listing);
    listing = getDetails(item.children[1], listing);
    listings.push(listing);
  }
  return listings;
}
parsePage();