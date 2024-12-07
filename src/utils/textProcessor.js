function cleanText(text) {
  if (!text) return '';
  
  text = text.toString().trim();
  
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}