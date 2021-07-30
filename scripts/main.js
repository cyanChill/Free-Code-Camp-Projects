let quotes = [];
let currentQuote = {};

const bkColor = [
    '#FFDDE4',
    '#FEC6DF',
    '#FF9AA2',
    '#FFB7B2',
    '#FFDAC1',
    '#FAF3DF',
    '#E2F0CB',
    '#B5EAD7',
    '#C7CEEA',
    '#BABBD1',
    '#9F9BB0',
];


async function fetchQuotes() {
    const response = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json');
    const data = await response.json();
    // Return an array of objects containing:
    // 1. Quote in "quote" property
    // 2. Author in "author" property
    return data.quotes;
}

function getRandomQuote() {
    let newQuote = {};
    do {
        const randIdx = Math.floor(Math.random() * 102);
        newQuote = quotes[randIdx];
    } while (currentQuote === newQuote);
    currentQuote = newQuote;
    $('#quote').text(currentQuote.quote);
    $('#author').text(currentQuote.author);
    cycleBKC();
    return currentQuote;
}

function cycleBKC() {
    $('body').css('background-color', bkColor[0]);
    bkColor.push(bkColor.shift());
}

async function getQuotes() {
    quotes = await fetchQuotes();
    currentQuote = getRandomQuote();
    console.log("Quotes fetched");
}

// "On Page Load"
$(document).ready(() => {
    getQuotes();
});

$('#refreshbutton').click(getRandomQuote);