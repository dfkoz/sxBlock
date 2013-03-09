chrome.browserAction.setBadgeText({text: "ON"});


chrome.extension.onMessage.addListener(
  function(msg) {
  	
  	if (msg.ct > 0 ) {
		chrome.browserAction.setBadgeText({text: msg.ct.toString()});	   	
    }
});