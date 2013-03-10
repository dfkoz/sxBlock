chrome.browserAction.setBadgeBackgroundColor({color: [0, 50, 200, 150]});
chrome.browserAction.setBadgeText({text: "ON"});
var isActive = true;

// Process events from tabs.
chrome.extension.onMessage.addListener(
 	function(msg, sender, sendResponse) {
  		switch(msg.action) {
  			case 'get_status':
  				sendResponse({isActive:isActive});
  				break;
  			
  			case 'update_icon':
  				if (isActive == false) {
   					chrome.browserAction.setBadgeText({text: "OFF"});
   					chrome.browserAction.setBadgeBackgroundColor({color: [200, 200, 200, 150]});
   				} else if (msg.ct > 0 ) {
					chrome.browserAction.setBadgeText({text: msg.ct.toString()});
					chrome.browserAction.setBadgeBackgroundColor({color: [0, 50, 200, 150]});	   	
   				}
   				
   				break;			
  		}
	}  		 		
);

// User clicked on icon, which should toggle actice status
chrome.browserAction.onClicked.addListener(function(activeTab) { 
	isActive = !isActive;
	
	// Ask the tab (via script.js) to update 
	chrome.tabs.sendMessage(activeTab.id, {action: "toggled", isActive: isActive});
});

