chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({games: []}, () => console.log('games array initialized.'));
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'store.playstation.com' },
      })
      ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});