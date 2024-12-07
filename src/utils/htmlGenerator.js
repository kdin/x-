function generateHTML(tweets, isInitial = false) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>X- News</title>
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: Verdana, Geneva, sans-serif;
          max-width: 85%;
          margin: 8px auto;
          background: #f6f6ef;
          color: #000;
          font-size: 10pt;
        }

        .header {
          background: #ff6600;
          padding: 2px 4px;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: space-between;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logo {
          font-family: Arial, Helvetica, sans-serif;
          font-weight: 50;
          font-size: 12px;
          color: white;
          border: 1px solid white; /* White square border */
          padding: 2px 2px; /* Padding inside the border to give space around the text */
          display: inline-block; /* Ensures the border wraps around the text */
          line-height: 1.2; /* Adjusts the height of the line to center the text */
      }

        .header h1 {
          color: #000;
          font-size: 13px;
          font-weight: normal;
        }

        .summarize-btn {
          background: none;
          border: none;
          color: #000;
          font-size: 13px;
          cursor: pointer;
          padding: 0 8px;
        }

        .summarize-btn:hover {
          text-decoration: underline;
        }

        .modal-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }

        .modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #f6f6ef;
          padding: 20px;
          border-radius: 4px;
          max-width: 800px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          z-index: 1001;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e5e5e5;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #666;
        }

        .posts-list {
          list-style: none;
          counter-reset: post-counter;
        }

        .post-item {
          padding: 3px 0;
          counter-increment: post-counter;
          line-height: 1.4;
        }

        .post-item::before {
          content: counter(post-counter) ".";
          color: #828282;
          margin-right: 5px;
          font-size: 10pt;
          text-align: right;
          width: 20px;
          display: inline-block;
          vertical-align: top;
        }

        .post-link {
          color: inherit;
          text-decoration: none;
          display: inline-block;
          width: calc(100% - 30px);
          padding: 1px 0;
        }

        .post-link:hover {
          background: #f0f0f0;
        }

        .post-text {
          color: #000;
        }

        .media-tag {
          color: #828282;
          font-size: 8pt;
        }

        .post-meta {
          font-size: 8pt;
          color: #828282;
          margin-top: 1px;
        }

        .loading {
          color: #828282;
          font-size: 10pt;
          margin-top: 10px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <button type="button" class="summarize-btn" id="summarizeBtnId">summarize</button>
      <div class="header">
        <div class="header-left">
          <span class="logo">X-</span>
          <h1>${tweets.length} Tweets</h1>
        </div>
        
      </div>

      <ol class="posts-list">
        ${tweets.map(tweet => `
          <li class="post-item">
            <a href="${tweet.link}" target="_blank" class="post-link">
              <div class="post-text">${tweet.text}</div>
              <div class="post-meta">by ${tweet.name} (${tweet.handle})</div>
            </a>
          </li>
        `).join('')}
      </ol>
      ${isInitial ? '<div class="loading">Loading more posts...</div>' : ''}
    </body>
    </html>
  `;
}