let quotes = [];
let currentQuote = {};

const colors = [
    '#FEC6DF',
    '#FF9AA2',
    '#FFB7B2',
    '#FFDAC1',
    '#FEDBB2',
    '#B5EAD7',
    '#A9DBC7',
    '#A3C9A6',
    '#C7CEEA',
    '#89C5D3',
    '#BABBD1',
    '#8C9DCF',
    '#C2AAE6',
    '#9F9BB0',
];


async function fetchQuotes() {
    const response = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json');
    const data = await response.json();
    return data.quotes;
}

function getRandomQuote() {
    let newQuote = {};
    do {
        newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (currentQuote === newQuote);
    return newQuote;
}

function updateQuote() {
    currentQuote = getRandomQuote();
    const quote = currentQuote.quote;
    const author = currentQuote.author.match(/[^–]/gi).join('');
    
    $('#text').fadeOut(500, () => {
        $('#text').html(`<i class="fas fa-quote-left"></i> ${quote}`).fadeIn(500);
    });
    $('#author').fadeOut(500, () => {
        $('#author').html(`- ${author}`).fadeIn(500);
    });
    $('#tweet-quote').attr('href', `https://www.twitter.com/intent/tweet?hashtags=quotes&text="${quote.replace(" ", '%20')}"%20${author.replace(" ", '%20')}`);

    cycleColor();
}

function cycleColor() {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    $('body, #new-quote, #tweet-quote').animate({
        backgroundColor: newColor
    }, 1000);
    $('#text, #author').animate({
        color: newColor
    }, 0);
}

async function initialize() {
    quotes = await fetchQuotes();
    updateQuote();
}

// "On Page Load"
$(document).ready(() => {
    initialize();
});

// When the "New Quote" button is clicked
$('#new-quote').click(updateQuote);