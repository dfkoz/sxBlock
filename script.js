// Keep track of how much better we are making your timeline.
var blocked_count = 0;

// Loop through each node that has a data-item-type of 'tweet'
function scrubSXSW(toggled) {
	// Get active status from background.js
	chrome.extension.sendMessage({action:'get_status'}, function(response) { 
		
		var isActive = response.isActive; 
		
		if (!isActive && !toggled) return; // Do nothing.
		
		var searchDict = [
			{selector: '*[data-item-type="tweet"]', text: 'marketing'},
			{selector: '.promoted-tweet', text: ''}
		];
		
		for (var i = 0; i < searchDict.length; i++) {
			
			if (isActive) { style = 'none'; } // Filter is active. Hide the element.
			else { style = 'list-item'} // Filter is now inactive, was active before. Show.
			
			// What elements are relevant to this selector?
			var elems = $(searchDict[i].selector);
			
			for (var j = 0; j < elems.length; j++) {
				// If we find the key text OR if there is no key text, apply the filter.
				if (searchDict[i].text == '' || $(elems[j]).html().toLowerCase().indexOf(searchDict[i].text) > 0) {
					$(elems[j]).css('display', style);
					blocked_count++;
				}
			}
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



