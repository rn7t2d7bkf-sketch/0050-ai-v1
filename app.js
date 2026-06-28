async function update(){

    const data = await getMarketData();
    const result = analyzeMarket(data);

    document.getElementById("price").innerText = data.price;
    document.getElementById("change").innerText = data.changePercent.toFixed(2) + "%";

    document.getElementById("signal").innerText = result.signal;
    document.getElementById("score").innerText = result.score + " / 100";
    document.getElementById("intraday").innerText = result.intraday;
    document.getElementById("tomorrow").innerText = result.tomorrow;
}

update();
setInterval(update, 10000);
