const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

weatherForm.addEventListener('submit', (e) => {
    
    e.preventDefault();
    const location = search.value;

    const setText = (messageOneTextContent, messageTwoTextContent) => {
        messageOne.textContent = messageOneTextContent;
        messageTwo.textContent = messageTwoTextContent;
    }

    setText('Loading...', '');

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                setText(data.error, '');
            } else {
                setText(`Location: ${data.locationData.location}`, `Daily forecast: ${data.forecastData.dailySummary}`)
            }
        })
    })
})