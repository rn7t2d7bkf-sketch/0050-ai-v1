async function getMarketData(){

    const res = await fetch("https://r.jina.ai/https://query1.finance.yahoo.com/v7/finance/quote?symbols=^TWII");
    const text = await res.text();

    const json = JSON.parse(text.slice(text.indexOf("{")));

    const d = json.quoteResponse.result[0];

    return {
        price: d.regularMarketPrice,
        changePercent: d.regularMarketChangePercent,
        volume: d.regularMarketVolume || 50000,

        index: d.regularMarketPrice,
        nightFuture: d.regularMarketPrice,

        news: [
            "市場維持穩定",
            "資金流入大型權值股",
            "科技股支撐盤勢"
        ]
    };
}
