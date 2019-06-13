// checks for when netflix tab is being refreshed
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  chrome.tabs.executeScript(null,{file:"initial.js"});
});
