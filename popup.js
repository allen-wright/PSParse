let parseButton = document.getElementById('parseButton');
let listings = document.getElementById('listings');
let resetListings = document.getElementById('reset');
let copyMarkdown = document.getElementById('copy');
let textarea = document.getElementById('markdown-preview');
let markdownTableHeader = '| Game | Price | % Off | PS+ Price | PS+ % Off |\n| --- | --- | --- | --- | --- |';
let games;

chrome.storage.local.get(['games', 'markdown'], function(results) {
  games = results.games;
  listings.innerText = results.games.length;
  textarea.value = results.markdown;
})

let callback = function(results) {
  games = games.concat(results[0]);
  chrome.storage.local.set({games}, function() {
    chrome.storage.local.get(['games'], function(results) {
      listings.innerText = results.games.length;
      generateMarkdown();
    })
  });
}

function generateMarkdown() {
  games.sort((a, b) => a.name.localeCompare(b.name));
  let newMarkdown = markdownTableHeader;
  for (let i = 0; i < games.length; i++) {
    games[i].name = games[i].name.replace('/[\^$.|?*+(){}/gi|', '\\$&');
    newMarkdown += `\n[${games[i].name}](${games[i].link}) | ${games[i].salePrice} | ${games[i].salePercentage} | ${games[i].psPrice} | ${games[i].psPercentage}`;
  }
  chrome.storage.local.set({markdown: newMarkdown}, function() {
    textarea.value = newMarkdown;
  });
}

resetListings.onclick = function() {
  chrome.storage.local.set({games: [], markdown: markdownTableHeader}, function() {
    games = [];
    listings.innerText = 0;
    textarea.value = markdownTableHeader;
  });
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