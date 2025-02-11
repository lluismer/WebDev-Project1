//6081df34-804d-45f6-b408-04166ebe4d75

async function fetchCryptoData(){
    const response =await fetch(new Request("https://api.livecoinwatch.com/coins/list"), {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          "x-api-key": "6081df34-804d-45f6-b408-04166ebe4d75",
        }),
        body: JSON.stringify({
          currency: "USD",
          sort: "rank",
          order: "ascending",
          offset: 0,
          limit: 50,
          meta: true,
        }),
      });



      const data = await response.json();
      console.log("My API response", data);
      updateCryptoList(data);
}

function updateCryptoList(CryptoData){
    const container = document.querySelector('#allCryptoContainer');


    CryptoData.forEach((coin)=> {

        const cryptoRow = document.createElement("a");
        cryptoRow.classList.add("singularCrypto");
        const PriceChange = coin.delta.day.toFixed(2);
        const changeClass = PriceChange > 0 ? "green-bg" : "red-bg";

        cryptoRow.innerHTML = `
        <div><img class="logoImage" src=${coin.webp64}></div> 
            <div>${coin.name}</div>
            <div class="PriceContainer">
                <div>${coin.rate.toFixed(2)}$</div>
                <div class="priceChangeColumn ${changeClass}">
                    <p class="priceChange">${PriceChange > 0 ? "+" : ""}${PriceChange}%</p>
                </div>`


          container.appendChild(cryptoRow);
    })

}
document.addEventListener("DOMContentLoaded", fetchCryptoData); //Call the function when page loaded