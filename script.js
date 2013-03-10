// Keep track of how much better we are making your timeline.
var blocked_count = 0;

// Loop through each node that has a data-item-type of 'tweet'
function scrubSXSW(toggled) {
	// Get active status from background.js
	chrome.extension.sendMessage({action:'get_status'}, function(response) { 
		
		var isActive = response.isActive; 
		
		// If we are active, hide offending tweets no matter what. If we are inactive and just changed state,
		// show the tweets. Otherwise, do nothing.
		if (isActive) {		
			$('*[data-item-type="tweet"]').each(function (i, d) { 
				// Does this element have the text sxsw anywhere in it?
				if ($(d).html().toLowerCase().indexOf('sxsw') > 0) {
					// If so, hide or show the parent node.
					$(d).css('display', 'none');
					blocked_count++;
				}
			});			
		} else if (!isActive && toggled) {
			$('*[data-item-type="tweet"]').each(function (i, d) { 
				// Does this element have the text sxsw anywhere in it?
				if ($(d).html().toLowerCase().indexOf('sxsw') > 0) {
					// If so, hide or show the parent node.
					$(d).css('display', 'list-item');
				}
			});						
		}
		
		// Finally, send a message to update the badge.
		chrome.extension.sendMessage({action:'update_icon', ct: blocked_count});	
	});
}


// Receive messages from background.js, eg, user turned extension off.
chrome.extension.onMessage.addListener(
	function(msg) {
		switch (msg.action) {
			case 'toggled':
				scrubSXSW(true); // show or hide annoying tweets before turning off/on		
				blocked_count = 0; // reset the blocked count.
				break;		
		}		
});

scrubSXSW(); // run once when the page loads.
$('#timeline').click(scrubSXSW); // and bind an event to the timeline to catch updates.



