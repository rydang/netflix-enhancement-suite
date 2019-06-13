// chrome.browserAction.onClicked.addListener(function(tab) {
//   chrome.tabs.executeScript(tab.id, {
//     "file": "content.js"
//   }, function () { // Execute your code
//     //   console.log("Script Executed .. "); // Notification on Completion
//   });
// });
// {
//   let details;
//   let event = new Event('showDetails');

//   chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//       details = request.information;
//       sendResponse({message: 'received'});
//   }); 
  
// }