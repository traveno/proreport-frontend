chrome.action.onClicked.addListener(function() {
    chrome.tabs.create({
        url: chrome.runtime.getURL("index.html"),
      }, function(win) {
        // win represents the Window object from windows API
        // Do something after opening
    });
});