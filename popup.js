let parseButton = document.getElementById('parseButton');

let callback = function(results) {
  console.log('hi');
  console.log(results);
}

parseButton.onclick = function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {file: './parse.js'},
        callback
    );
  });
};