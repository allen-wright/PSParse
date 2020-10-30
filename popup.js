let parseButton = document.getElementById('parseButton');
let listings = document.getElementById('listings');
let generateMarkdownButton = document.getElementById('generate');
let textarea = document.getElementById('markdown-preview');
let games;

chrome.storage.local.get(['games'], function(results) {
  console.log(results.games);
  games = results.games;
})

let callback = function(results) {
  console.log(results);
  games = games.concat(results[0]);
  chrome.storage.local.set({games}, function() {
  });
  chrome.storage.local.get(['games'], function(results) {
    console.log(results);
  });
}

generateMarkdownButton.onclick = function() {
  games.sort((a, b) => a.name.localeCompare(b.name));
  textarea.value = `| Game | Price | % Off | PS+ Price | PS+ % Off |\n| --- | --- | --- | --- | --- |`;
  for (let i = 0; i < games.length; i++) {
    textarea.value += `\n[${games[i].name}](${games[i].link}) | ${games[i].salePrice} | ${games[i].salePercentage} | ${games[i].psPrice} | ${games[i].psPercentage}`;
  }
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