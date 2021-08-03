const container = document.getElementById('container');
const loading = document.querySelector('.loading');

getQuote();
setTimeout(getQuote, 1000);
setTimeout( () => {getQuote();}, 1900);
setTimeout(getQuote, 2800);

window.addEventListener('scroll', () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	
	if(clientHeight + scrollTop >= scrollHeight - 5) {
		
		showLoading();
	}
});

function showLoading() {
    loading.classList.add('show');

    setTimeout(getQuote, 1000);
}

async function getQuote() {
      
    const quoteResp = await fetch('https://goquotes-api.herokuapp.com/api/v1/random?count=1');
    const quoteData = await quoteResp.json()

    const imgResp = await fetch('https://dog.ceo/api/breeds/image/random');
    const userImg = await imgResp.json();

    const data = {quote: quoteData.quotes[0].text, 
                  author: quoteData.quotes[0].author,
                  img: userImg.message};

    addDataToDom(data);
}

function addDataToDom(data) {

    const quote = document.createElement('div');
    quote.classList.add('quote-block');
    quote.innerHTML = `
    <div class"text">
        ${data.quote}
    </div>
    <div class="user">
        <img src=${data.img}>
        <span>${data.author}</span>
    </div>
    `

    container.appendChild(quote);
    loading.classList.remove('show');
}