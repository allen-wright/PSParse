let results = [];

function parsePage() {
  let items = document.querySelectorAll('a.ems-sdk-product-tile-link');
  for (let i = 0; i < items.length; i++) {
    let item = JSON.parse(items[i].dataset.telemetryMeta);
    results.push({
      name: item.name,
      price: item.price,
      link: `https://store.playstation.com/product/${item.id}`
    });
  }
  let button = document.querySelector('.psw-icon--chevron-right').parentElement;
  // recursive call to run parsePage again if there's another page
  if (!button.classList.contains('psw-is-disabled')) {
    button.click();
    parsePage();
  }
}
parsePage();
results;