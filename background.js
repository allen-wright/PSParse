chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({games: [], markdown: '| Game | Price | % Off | PS+ Price | PS+ % Off |\n| --- | --- | --- | --- | --- |'});

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