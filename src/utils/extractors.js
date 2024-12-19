const EXTRACTION_CONFIG = {
  maxScrollAttempts: 50,
  initialDelay: 1500,
  maxNoNewTweetsAttempts: 3,
  quickExtractDelay: 500
};

function extractTweetInfo(tweetElement) {
  try {
    const textElement = tweetElement.querySelector(SELECTORS.TWEET_TEXT);
    const nameElement = tweetElement.querySelector(SELECTORS.USER_NAME);
    const handleElement = tweetElement.querySelector(SELECTORS.USER_HANDLE);
    const linkElement = tweetElement.querySelector(SELECTORS.TWEET_LINK);
    const hasMedia = tweetElement.querySelector(SELECTORS.PHOTO) !== null || 
                    tweetElement.querySelector(SELECTORS.VIDEO) !== null;
    const adSpan = Array.from(tweetElement.querySelectorAll('span')).find(span => span.textContent.trim() === 'Ad');

    if (!textElement || !linkElement || adSpan) return null;

    const link = linkElement.getAttribute('href');
    if (!link) return null;

    let text = cleanText(textElement.textContent);
    if (hasMedia) {
      text += ' <span class="media-tag">[Media]</span>';
    }

    return {
      text,
      name: cleanText(nameElement ? nameElement.textContent : 'Unknown'),
      handle: cleanText(handleElement ? handleElement.textContent : '@unknown'),
      link: `https://x.com${link}`,
      id: link.split('/').pop()
    };
  } catch (error) {
    console.error('Error extracting tweet info:', error);
    return null;
  }
}

async function extractVisibleTweets(extractedTweets) {
  const tweetContainers = document.querySelectorAll(SELECTORS.TWEET_CONTAINER);
  let newTweetsFound = false;

  for (const container of tweetContainers) {
    const tweetElement = container.querySelector(SELECTORS.TWEET);
    if (!tweetElement) continue;

    const tweetInfo = extractTweetInfo(tweetElement);
    if (tweetInfo && !extractedTweets.has(tweetInfo.id)) {
      extractedTweets.set(tweetInfo.id, tweetInfo);
      newTweetsFound = true;
    }
  }

  return newTweetsFound;
}

async function extractAllTweets(targetCount = 50, quickExtract = false) {
  const extractedTweets = new Map();
  let scrollAttempts = 0;
  let consecutiveFailures = 0;

  await new Promise(resolve => setTimeout(resolve, 
    quickExtract ? EXTRACTION_CONFIG.quickExtractDelay : EXTRACTION_CONFIG.initialDelay));

  while (extractedTweets.size < targetCount && 
         scrollAttempts < EXTRACTION_CONFIG.maxScrollAttempts && 
         consecutiveFailures < EXTRACTION_CONFIG.maxNoNewTweetsAttempts) {
    
    const newTweetsFound = await extractVisibleTweets(extractedTweets);
    
    if (!newTweetsFound) {
      consecutiveFailures++;
    } else {
      consecutiveFailures = 0;
    }

    if (quickExtract && extractedTweets.size >= 15) {
      break;
    }

    

    if (extractedTweets.size < targetCount) {
      const hasMoreContent = await scrollAndWaitForContent();
      if (!hasMoreContent) {
        consecutiveFailures++;
      }
      scrollAttempts++;
    }
  }

  return Array.from(extractedTweets.values());
}