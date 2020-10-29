let parseButton = document.getElementById('parseButton');
let textarea = document.getElementById('markdown-preview');

let callback = function(results) {
  console.log(results);
  let games = results[0];
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
        {file: './content_script.js'},
        callback
    );
  });
};