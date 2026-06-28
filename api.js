async function getMarketData() {

    // 用穩定 CORS proxy（避免 Yahoo 被擋）
    const url = "https://r.jina.ai/https://query1.finance.yahoo.com/v7/finance/quote?symbols=^TWII";

    const res = await fetch(url);
    const text = await res.text();

    // 從文字中抓 JSON
    const jsonStart = text.indexOf("{");
    const json = JSON.parse(text.slice(jsonStart));

    const data = json.quoteResponse.result[0];

    return {
        price: data.regularMarketPrice,
        changePercent: data.regularMarketChangePercent,
        volume: data.regularMarketVolume || 50000,

        index: data.regularMarketPrice,

        // 🔥 0050正2「先用市場連動」
        change: data.regularMarketChangePercent,

        // 暫時保留（下一步會全部替換成真資料）
        tsmc: 1100,
        nasdaq: 20000,
        nightFuture: data.regularMarketPrice,

        news: [
            "市場跟隨台股大盤",
            "權值股主導行情",
            "資金流向大型股"
        ]
    };
}
