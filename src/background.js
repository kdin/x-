// Background script using chrome.scripting API
chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes('x.com') || tab.url.includes('twitter.com')) {
    // Execute all scripts in sequence
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: [
        'src/utils/selectors.js',
        'src/utils/textProcessor.js',
        'src/utils/scroll.js',
        'src/utils/extractors.js',
        'src/utils/htmlGenerator.js',
        'src/extractor.js'
      ]
    });
  }
});