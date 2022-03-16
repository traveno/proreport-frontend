chrome.action.onClicked.addListener(function() {
    chrome.tabs.create({
        url: chrome.runtime.getURL('index.html'),
      }, function(win) {
        // win represents the Window object from windows API
        // Do something after opening
    });
});

// Pull company specific definitions for use in our angular application
chrome.runtime.onInstalled.addListener(function(info) {
  fetch(chrome.runtime.getURL('definitions.json')).then(res => res.text()).then(json => {
    let def = JSON.parse(json);
    chrome.storage.local.set({ definitions: def });
  });
});