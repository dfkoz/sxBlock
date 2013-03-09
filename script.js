// Keep track of how much better we are making your timeline.
var blocked_count = 0;

// Loop through each node that has a data-item-type of 'tweet'
function scrubSXSW() {
		
	$('*[data-item-type="tweet"]').each(function (i, d) { 
		// Does this element have the text sxsw anywhere in it?
		if ($(d).html().toLowerCase().indexOf('sxsw') > 0) { // Does the content of this tweet contain SXSW?
			// If so, hide the parent node.
			$(d).css('display', 'none');
			blocked_count++;
		}
	});
	
	chrome.extension.sendMessage({ct: blocked_count});	
}

scrubSXSW(); // run once when the page loads.
$('#timeline').click(scrubSXSW); // and bind an event to the timeline to catch updates.

