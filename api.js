async function getMarketData() {

    // 台灣加權指數（免費公開來源）
    const res = await fetch("https://query1.finance.yahoo.com/v7/finance/quote?symbols=^TWII");
    const json = await res.json();

    const data = json.quoteResponse.result[0];

    return {
        price: data.regularMarketPrice,
        changePercent: data.regularMarketChangePercent,
        index: data.regularMarketPrice,

        // 0050正2先用連動估算（下一版會換成真標的）
        change: data.regularMarketChangePercent,

        volume: data.regularMarketVolume || 50000,

        tsmc: 1100, // 下一步會接真實台積電

        nasdaq: 20000, // 下一步會接美股

        nightFuture: data.regularMarketPrice,

        news: [
            "市場同步大盤走勢",
            "科技股影響權重上升",
            "資金流入權值股"
        ]
    };
}
