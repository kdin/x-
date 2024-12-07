const SCROLL_CONFIG = {
  minIncrement: 500,
  scrollDelay: 800,
  maxAttempts: 10,
  checkInterval: 300
};

async function getScrollTarget() {
  const timeline = document.querySelector(SELECTORS.TIMELINE);
  return timeline || document.documentElement;
}

async function scrollToBottom() {
  const target = await getScrollTarget();
  const currentPosition = target.scrollTop;
  const increment = Math.max(
    SCROLL_CONFIG.minIncrement, 
    Math.floor(window.innerHeight * 0.8)
  );
  
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'auto'
  });
  
  return currentPosition;
}

async function waitForNewContent() {
  let previousHeight = document.documentElement.scrollHeight;
  
  return new Promise((resolve) => {
    let attempts = 0;
    const checkInterval = setInterval(() => {
      const currentHeight = document.documentElement.scrollHeight;
      const hasNewContent = currentHeight > previousHeight;
      attempts++;
      
      if (hasNewContent || attempts >= SCROLL_CONFIG.maxAttempts) {
        clearInterval(checkInterval);
        resolve(hasNewContent);
      }
      
      previousHeight = currentHeight;
    }, SCROLL_CONFIG.checkInterval);
  });
}

async function scrollAndWaitForContent() {
  await scrollToBottom();
  await new Promise(resolve => setTimeout(resolve, SCROLL_CONFIG.scrollDelay));
  return await waitForNewContent();
}