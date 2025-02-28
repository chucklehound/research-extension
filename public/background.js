chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) {
      chrome.storage.local.set({ lastVisitedURL: tab.url });
    }
  });
  