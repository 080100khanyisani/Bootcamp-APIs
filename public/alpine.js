// ENOUGH AIRTIME
async function addUsage() {
    const usageList = document.getElementById('usage-list');
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <input type="text" placeholder="Usage (e.g., call, sms, data)">
        <button type="button" onclick="removeUsage(this)">Remove</button>
    `;
    usageList.appendChild(listItem);
}

async function removeUsage(button, index) {
    const response = await fetch('http://localhost:3011/api/usage/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ index })
    });
    const data = await response.json();
    renderUsageList(data.usageList);
}

function renderUsageList(usageList) {
    const usageListElement = document.getElementById('usage-list');
    usageListElement.innerHTML = '';
    usageList.forEach((usage, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="text" placeholder="Usage (e.g., call, sms, data)" value="${usage}" oninput="updateUsage(${index}, this.value)">
            <button type="button" onclick="removeUsage(this, ${index})">Remove</button>
        `;
        usageListElement.appendChild(listItem);
    });
}

async function checkAirtime() {
    const usageListElement = document.getElementById('usage-list').querySelectorAll('input');
    const usageArray = Array.from(usageListElement).map(input => input.value.trim()).filter(value => value !== '');
    const usage = usageArray.join(',');
    const available = document.getElementById('available').value;

    const response = await fetch('http://localhost:3011/api/enough', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usage, available })
    });

    const data = await response.json();
    document.getElementById('result').textContent = `Result: R${data.result}`;
}

//TYPE

async function updatePrice() {
    const type = document.getElementById('type').value;
    const priceField = document.getElementById('price');

    if (type) {
        try {
            const response = await fetch('http://localhost:3011/api/phonebill/prices');
            const prices = await response.json();
            priceField.value = prices[type] || '';
        } catch (error) {
            console.error('Error fetching prices:', error);
            priceField.value = '';
        }
    } else {
        priceField.value = '';
    }
}

async function setPrice() {
    const type = document.getElementById('type').value;
    const price = parseFloat(document.getElementById('price').value);

    if (!type || isNaN(price)) {
        document.getElementById('results').textContent = 'Please select a valid type and price.';
        return;
    }

    const response = await fetch('http://localhost:3011/api/phonebill/price', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type, price })
    });

    const data = await response.json();
    document.getElementById('results').textContent = data.message;
}


// PHONE BILL
async function calculateTotal() {
    const bill = document.getElementById('bill').value.trim();

    const response = await fetch('http://localhost:3011/api/phonebill/total', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bill })
    });

    const data = await response.json();
    document.getElementById('resultss').innerHTML = `
        <p>Total Bill: ${data.total}</p>
        <p>Calls: ${data.calls} | SMS: ${data.sms}</p>
    `;

    // Fetch prices and display
    fetchPrices();
}

async function fetchPrices() {
    const response = await fetch('http://localhost:3011/api/phonebill/prices');
    const prices = await response.json();
    document.getElementById('prices').innerHTML = `
        <h3>Prices</h3>
        <p>Call: R${prices.call.toFixed(2)}</p>
        <p>SMS: R${prices.sms.toFixed(2)}</p>
    `;
}

// Fetch prices on page load
fetchPrices();

// WORD GAME
async function analyzeSentence() {
    const sentenceField = document.getElementById('sentence');
    const sentence = sentenceField.value.trim();

    if (sentence === "") {
        alert("Please enter a sentence.");
        sentenceField.value = ''; // Clear the text area
        document.getElementById('resultsss').innerHTML = ''; // Clear previous results
        return;
    }

    const response = await fetch(`http://localhost:3011/api/word_game?sentence=${encodeURIComponent(sentence)}`);
    const data = await response.json();

    document.getElementById('resultsss').innerHTML = `
        <p>Longest Word: ${data.longestword}</p>
        <p>Shortest Word: ${data.shortestword}</p>
        <p>Total Word Lengths: ${data.wordLength}</p>
    `;

    sentenceField.value = ''; // Clear the text area after successful submission
}