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
        'src/utils/summarize.js',
        'src/extractor.js'
      ]
    });
  }
});

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('blob:https://x.com/')) {
//     chrome.scripting.executeScript({
//       target: { tabId: tabId },
//       files: ['src/utils/summarize.js']
//     });
//   }
// });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('blob:https://x.com/')) {
    fetch(chrome.runtime.getURL('src/utils/summarize.js'))
      .then(response => response.text())
      .then(scriptText => {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: (scriptContent) => {
            eval(scriptContent);
          },
          args: [scriptText]
        });
      })
      .catch(err => console.error('Script injection failed:', err));
  }
});