function analyzeMarket(data){

    let score = 50;

    if(data.changePercent > 1) score += 15;
    if(data.changePercent < 0) score -= 10;

    if(data.index > 22000) score += 10;
    else score -= 10;

    if(data.nightFuture > data.index) score += 10;
    else score -= 5;

    if(data.volume > 40000) score += 5;

    let newsScore = 0;
    data.news.forEach(n=>{
        if(n.includes("強") || n.includes("買") || n.includes("增加")){
            newsScore += 1;
        }
    });

    score += newsScore * 3;

    if(score > 100) score = 100;
    if(score < 0) score = 0;

    let signal, intraday, tomorrow;

    if(score >= 70){
        signal = "🟢 買";
        intraday = "偏多";
        tomorrow = "上漲機率高";
    } else if(score >= 50){
        signal = "🟡 觀望";
        intraday = "震盪";
        tomorrow = "不明確";
    } else {
        signal = "🔴 減碼";
        intraday = "偏空";
        tomorrow = "回檔風險";
    }

    return {score, signal, intraday, tomorrow};
}
