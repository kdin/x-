# X to HackerNews Style Chrome Extension

This Chrome extension transforms X's (formerly Twitter) feed into a clean, text-only interface inspired by HackerNews.

## Features

- Converts X feed to a clean, text-only format
- Removes all images, videos, and other media
- Maintains user information and timestamps
- Real-time transformation of dynamically loaded content
- HackerNews-inspired styling

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select this extension's directory

## Usage

The extension automatically activates when you visit x.com or twitter.com. The feed will be transformed into a clean, text-only format similar to HackerNews.

## Development

The extension is organized into several modules:

- `manifest.json`: Extension configuration
- `src/content.js`: Main entry point
- `src/utils/`: Utility functions for DOM manipulation and data extraction