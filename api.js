async function getMarketData(){

    // 0050正2（00631L）
    const l2 = await fetch("https://r.jina.ai/https://query1.finance.yahoo.com/v7/finance/quote?symbols=00631L");
    const l2json = JSON.parse((await l2.text()).slice( l2.text().indexOf("{") ));

    const l2data = l2json.quoteResponse.result[0];

    // 台積電
    const tsmcRes = await fetch("https://r.jina.ai/https://query1.finance.yahoo.com/v7/finance/quote?symbols=2330.TW");
    const tsmcJson = JSON.parse((await tsmcRes.text()).slice( tsmcRes.text().indexOf("{") ));
    const tsmc = tsmcJson.quoteResponse.result[0];

    // NASDAQ
    const nasdaqRes = await fetch("https://r.jina.ai/https://query1.finance.yahoo.com/v7/finance/quote?symbols=^IXIC");
    const nasdaqJson = JSON.parse((await nasdaqRes.text()).slice( nasdaqRes.text().indexOf("{") ));
    const nasdaq = nasdaqJson.quoteResponse.result[0];

    // S&P500
    const spRes = await fetch("https://r.jina.ai/https://query1.finance.yahoo.com/v7/finance/quote?symbols=^GSPC");
    const spJson = JSON.parse((await spRes.text()).slice( spRes.text().indexOf("{") ));
    const sp = spJson.quoteResponse.result[0];

    // 台指
    const twiiRes = await fetch("https://r.jina.ai/https://query1.finance.yahoo.com/v7/finance/quote?symbols=^TWII");
    const twiiJson = JSON.parse((await twiiRes.text()).slice( twiiRes.text().indexOf("{") ));
    const twii = twiiJson.quoteResponse.result[0];

    return {
        // 🔥 主標的：0050正2
        price: l2data.regularMarketPrice,
        changePercent: l2data.regularMarketChangePercent,
        volume: l2data.regularMarketVolume || 50000,

        // 📊 台股
        index: twii.regularMarketPrice,

        // 🏢 台積電（權重最大）
        tsmc: tsmc.regularMarketPrice,

        // 🌍 國際市場
        nasdaq: nasdaq.regularMarketPrice,
        sp500: sp.regularMarketPrice,

        // 🌙 夜盤（先用台指代替）
        nightFuture: twii.regularMarketPrice,

        // 📰 新聞（下一版再接）
        news: [
            "AI與半導體需求強勁",
            "外資資金回流台股",
            "美股科技股影響正面"
        ]
    };
}
