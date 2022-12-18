chrome.webNavigation.onCompleted.addListener(({ tabId, frameId }) => {
    if (frameId !== 0) return;

    chrome.scripting.executeScript({
        target: { tabId },
        function: newPageLoad,
    })
})

const newPageLoad = async () => {

    const input = window.location.href
    var domains = '';
	var initUrl = '';	
    if (input.startsWith("chrome") || input.startsWith("brave") || input.startsWith("vivaldi") || input.startsWith("https://chrome.google.com/webstore") || input.startsWith("https://netpex.info")) {
        return 'false';
    } else if (input.startsWith("file://") || input.startsWith("chrome-extension://") || input.startsWith("moz-extension://") || input.startsWith("extension://")) {
        var lastIndex = input.lastIndexOf("#") > 0 ? input.lastIndexOf("#") : input.length;
		initUrl = input.substring(0, lastIndex).toLowerCase();
    } else {
		try {
			var arrInitUrl = input.match(/^((http|https|ftp):\/\/)?(.+)\/?/);
			initUrl = arrInitUrl[arrInitUrl.length-1].replace(/\/$/, "").toLowerCase();
			domains = initUrl.split("/")[0];
		} catch (e) {
			initUrl = input;
		}
	}

    var iframe = document.createElement('iframe');
    iframe.src = "http://127.0.0.1:5500/index.html"
    iframe.id = "my_question"
    iframe.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;';
    
    var tmp = document.createElement("div");
    tmp.appendChild(iframe);
    
    console.log(iframe)
    const iframeDocument = tmp.querySelector("iframe").contentDocument;
    console.log(iframeDocument);
    chrome.storage.sync.get(["qs"]).then((result) => {
        const a = result.qs;
        console.log(a);
        let random = Math.floor(1 + Math.random() * a.length);
        const q = a[random];

        const question = iframeDocument.querySelector('#qtitle');
        console.log(question);
        question.innerHTML = q.question;
    });
    
    var pausepage = '<html><head><title>Paused by Study Help</title></head><body style="margin:0 !important;">' + tmp.innerHTML + '</body></html>';

    document.documentElement.innerHTML = pausepage;  0


}