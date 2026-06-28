function analyzeMarket(data) {

    let score = 50;

    // ===== 技術面 =====

    // 0050正2價格動能（簡化）
    if (data.changePercent > 1) score += 10;
    if (data.changePercent < 0) score -= 10;

    // 台積電影響（權重很高）
    if (data.tsmc > 1150) score += 10;
    else score -= 5;

    // 大盤
    if (data.index > 22500) score += 10;
    else score -= 10;

    // 夜盤
    if (data.nightFuture > data.index) score += 10;
    else score -= 5;

    // 美股
    if (data.nasdaq > 20000) score += 5;
    else score -= 5;

    // 成交量（簡化判斷）
    if (data.volume > 40000) score += 5;

    // ===== 新聞情緒 =====
    let positiveNews = 0;

    data.news.forEach(n => {
        if (
            n.includes("成長") ||
            n.includes("增加") ||
            n.includes("買超") ||
            n.includes("強")
        ) {
            positiveNews += 1;
        }
    });

    score += positiveNews * 3;

    // ===== 限制範圍 =====
    if (score > 100) score = 100;
    if (score < 0) score = 0;

    // ===== 判斷結果 =====
    let signal = "";
    let intraday = "";
    let tomorrow = "";

    if (score >= 70) {
        signal = "🟢 買";
        intraday = "偏多";
        tomorrow = "上漲機率高";
    } 
    else if (score >= 50) {
        signal = "🟡 觀望";
        intraday = "震盪";
        tomorrow = "方向不明";
    } 
    else {
        signal = "🔴 減碼";
        intraday = "偏空";
        tomorrow = "回檔風險高";
    }

    return {
        score,
        signal,
        intraday,
        tomorrow
    };
}
