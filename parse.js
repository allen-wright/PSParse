let items = document.querySelectorAll('a.ems-sdk-product-tile-link');
let results = [];
for (let i = 0; i < items.length; i++) {
  let item = JSON.parse(items[i].dataset.telemetryMeta);
  console.log(item.name + ": " + item.price);
  results.push([item.name, item.price]);
}
results;