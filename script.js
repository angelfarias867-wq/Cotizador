const form = document.querySelector('#coin-form'); 
const coin = document.querySelector('#coin');
const crypto = document.querySelector('#crypto');
const amount = document.querySelector('#amount');
const coinInfo = document.querySelector('#coin-info')

form.addEventListener('submit', async e => {
    e.preventDefault(); //que hace el preventDeFault
    const coinSelected = [...coin.children].find(coin => coin.selected);
    const cryptoSelected = [...crypto.children].find(crypto => crypto.selected);
    const amountValue = amount.value;
    
    try {
        const response = await (await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${coinSelected}`)).json();
        const price = response.DISPLAY[cryptoSelected.value][coinSelected.value].PRICE;
        const rawPrice = response.RAW[cryptoSelected.value][coinSelected.value].PRICE;
        const priceHigh = response.DISPLAY[cryptoSelected.value][coinSelected.value].HIGH24HOUR;
        const priceLow = response.DISPLAY[cryptoSelected.value][coinSelected.value].LOW24HOUR;
        const variation = response.DISPLAY[cryptoSelected.value][coinSelected.value].CHANGEPCT24HOUR;
        coinInfo.innerHTML = `
        <span class="loader"></span>
        `;
        
        if (amountValue !== '') {
            const result = Number(amountValue) / rawPrice;
            coinInfo.innerHTML = `
            <p class="info">El precio es: <span class="price">${price}</span></p>
            <p class="info">El precio más alto es: <span class="price">${priceHigh}</span></p>
            <p class="info">El precio más bajo es: <span class="price">${priceLow}</span></p>
            <p class="info">Variación 24H: <span class="price"></span>${variation}%</p>
            <p class="info">Puede Comprar: <span class="price">${result.toFixed(4)} ${cryptoSelected.value}</span></p>
            `
        } else{
            coinInfo.innerHTML = `
            <p class="info">El precio es: <span class="price">${price}</span></p>
            <p class="info">El precio más alto es: <span class="price">${priceHigh}</span></p>
            <p class="info">El precio más bajo es: <span class="price">${priceLow}</span></p>
            <p class="info">Variación 24H: <span class="price"></span>${variation}%</p>
        `};

    } catch (error) {
        console.log(error);
    }
});