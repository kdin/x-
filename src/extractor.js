async function createResultsPage(tweets, isInitial = false) {
  const html = generateHTML(tweets, isInitial);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  if (isInitial) {
    window.resultTab = window.open(url, '_blank');
    window.allTweets = tweets;

  } else if (window.resultTab && !window.resultTab.closed) {
    
    
    old_ids = new Set([...window.allTweets].map(t=>t.id))
    new_ids = new Set([...tweets].map(t=>t.id))
    de_dup_ids = old_ids.union(new_ids)
    const objectMap = new Map([...new Set([...window.allTweets, ...tweets])].map(obj => [obj.id, obj]));
    
    const dedups = Array.from(de_dup_ids).map(id => objectMap.get(id)).filter(tweet => tweet !== undefined);
    window.allTweets = dedups
    const updatedHtml = generateHTML(window.allTweets, false);
    const updatedBlob = new Blob([updatedHtml], { type: 'text/html;charset=utf-8' });
    const updatedUrl = URL.createObjectURL(updatedBlob);
    window.resultTab.location.href = updatedUrl;
  }
}


(async () => {
  try {
    

    // Extract initial batch quickly
    const initialTweets = await extractAllTweets(15, true);
    if (initialTweets.length === 0) {
      console.error('No tweets were extracted. Please check if you are on the correct page and logged in.');
      return;
    }
    set_initialTweet_ids = new Set(initialTweets.map(t=>t.id))
    
    // Show initial results immediately
    await createResultsPage(initialTweets, true);

    // Continue extracting in the background
    const allTweets = await extractAllTweets(50);
    

    // Update the results page with all tweets
    await createResultsPage(allTweets);
  } catch (error) {
    console.error('Error in tweet extraction:', error);
  }
})();