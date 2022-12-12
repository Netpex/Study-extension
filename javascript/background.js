chrome.webNavigation.onCompleted.addListener(({ tabId, frameId }) => {
    if (frameId !== 0) return;

    chrome.scripting.executeScript({
        target: { tabId },
        function: newPageLoad,
    })
})

const newPageLoad = async () => {

    var iframe = document.createElement('iframe');
    iframe.src = "https://roblox.com"
    iframe.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;';
	
	var tmp = document.createElement("div");
	tmp.appendChild(iframe);
	
	var blockPage = '<html><head><title>Blocked by Cold Turkey</title></head><body style="margin:0 !important;">' + tmp.innerHTML + '</body></html>';
	
	document.documentElement.innerHTML = blockPage;
    
}