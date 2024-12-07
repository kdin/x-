function addButtonListener() {
    const button = document.querySelector('.summarize-btn');
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


document.addEventListener('DOMContentLoaded', () => {
    addButtonListener();
});