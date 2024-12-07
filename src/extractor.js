async function createResultsPage(tweets, isInitial = false) {
  const html = generateHTML(tweets, isInitial);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  if (isInitial) {
    window.resultTab = window.open(url, '_blank');
    window.allTweets = tweets;

    // Use onload to ensure the button is in the DOM
    window.resultTab.onload = () => {
      addButtonListener(window.resultTab);
    };
  } else if (window.resultTab && !window.resultTab.closed) {
    window.allTweets = [...new Set([...window.allTweets, ...tweets])];
    const updatedHtml = generateHTML(window.allTweets, false);
    const updatedBlob = new Blob([updatedHtml], { type: 'text/html;charset=utf-8' });
    const updatedUrl = URL.createObjectURL(updatedBlob);
    window.resultTab.location.href = updatedUrl;

    // Use onload to ensure the button is in the DOM
    window.resultTab.onload = () => {
      addButtonListener(window.resultTab);
    };
    document.addEventListener('DOMContentLoaded', () => {
      addButtonListener(window.resultTab);
    });
  }
}

function addButtonListener(targetWindow = window) {
  const button = targetWindow.document.querySelector('.summarize-btn');
  console.log('Button loading!', button);
  if (button) {
    console.log('Button loaded!');
    button.addEventListener('mouseover', () => {
      console.log('Button hovered!');
    });
    button.addEventListener('click', () => {
      console.log('Button clicked!');
      alert('Clicked')
    });
    console.log('Event listener attached');
  } else {
    console.error('Button not found in the document');
  }
}

(async () => {
  try {
    console.log('Starting tweet extraction...');

    // Extract initial batch quickly
    const initialTweets = await extractAllTweets(15, true);
    if (initialTweets.length === 0) {
      console.error('No tweets were extracted. Please check if you are on the correct page and logged in.');
      return;
    }

    // Show initial results immediately
    await createResultsPage(initialTweets, true);

    // Continue extracting in the background
    const allTweets = await extractAllTweets(50);
    console.log(`Successfully extracted ${allTweets.length} tweets`);

    // Update the results page with all tweets
    await createResultsPage(allTweets);
  } catch (error) {
    console.error('Error in tweet extraction:', error);
  }
})();