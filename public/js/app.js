const issForm = document.querySelector('form');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');
const countryImg = document.querySelector('#country-img');

issForm.addEventListener('submit', (e) => {
    
    e.preventDefault();
    const setText = (messageOneTextContent, messageTwoTextContent) => {
        messageOne.textContent = messageOneTextContent;
        messageTwo.textContent = messageTwoTextContent;
    }

    const fetchISSLocationData = () => {
        
        setText('Loading...', '');
        countryImg.src = '';
        
        fetch('/iss-location').then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    setText(data.error, '');
                } else {
                    let currentLat = data.coordinates.lat;
                    let currentLong = data.coordinates.long;
                    let currentLocation = '';
                    if(data.results.length > 0 && data.results[0].components.country) {
                        currentLocation = `The ISS is currently above ${data.results[0].components.country}!`;
                        if(data.results[0].components.country_code) {
                            let countryCode = data.results[0].components.country_code;
                            countryImg.alt = countryCode;
                            // flags from: https://www.countryflags.io/
                            countryImg.src = `https://www.countryflags.io/${countryCode}/shiny/64.png`
                        }
                    } else if(data.results.length > 0 && data.results[0].components.body_of_water) {
                        currentLocation = `The ISS is currently above ${data.results[0].components.body_of_water}!`;
                    } else {
                        currentLocation = 'Sadly, the ISS is currently not above anything interesting  :/'
                    }
                    setText(`Current location for the iss: lat: ${currentLat}, long: ${currentLong}`, `${currentLocation}`)
                }
            })
        })
    }

    fetchISSLocationData();
    setInterval(fetchISSLocationData, 20000);

})