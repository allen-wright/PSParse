// parses the HTMLCollection of divs with the price information
function getTelemetryData(telemetry, listing) {
  let telemetryData = JSON.parse(telemetry);
  listing.name = telemetryData.name;
  listing.link = `https://store.playstation.com/product/${telemetryData.id}`;
  listing.salePrice = telemetryData.price;
  return listing;
}

function getDiscount(details, listing) {
  listing.salePercentage = details[0].children[0].innerText;
  listing.originalPrice = details[1].children[1].innerText;
  return listing;
}

function getPSPlusDiscount(details, listing) {
  let psDiscount = parseInt(parseInt(details[0].innerText.match(/[0-9]{1,2}/)[0]) - parseInt(details[1].innerText));
  listing.psPercentage = `-${psDiscount}%`;
  listing.psPrice = '$' + ((parseFloat(details[2].children[1].innerText.substring(1)) * (1 - (Math.abs(psDiscount)/100))).toFixed(2));
  listing.salePercentage = details[1].children[0].innerText;
  listing.originalPrice = details[2].children[1].innerText;
  return listing;
}

function getDetails(details, listing) {
  // we can tell what the status of a listing is (sale, sale with PS Plus sale, no sale, etc) by analyzing the structure of the tile details DOM element
  switch (details[0].className) {
    case 'discount-badge__container psw-l-anchor':
      // listing has a discount, but not a PS+ discount
      listing = getDiscount(details, listing);
      break;
    case 'product-detail__container':
      // DOM element may be a pre-order, or included in PSNow/EA, so it's necessary to still check if it contains a PS+ icon
      // if it does, then it will have a PS+ discount
      if (details[0].children[0].children[0].className.includes('psw-icon')) {
        listing = getPSPlusDiscount(details, listing);
      }
      break;
    default:
      break;
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
    listing = getDetails(item.children[1].children, listing);
    listings.push(listing);
  }
  return listings;
}
parsePage();