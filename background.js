chrome.runtime.onInstalled.addListener(() => {
    console.log('Ad muted extension installed');
});



chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log("inside background.js")
    if (changeInfo.status === 'complete' && tab.active) {
        console.log("inside inside")
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        }).then(() => {
            console.log("Injected content script into tab:", tabId);
        }).catch(err => {
            console.error("Failed to inject content script:", err);
        });
    }
});