// ===== 0050 AI 操盤助手 V1 =====

// 目前先使用示範資料
// 下一版會改成真正的即時資料

const market = {
    price: 36.82,
    change: 0.82,
    score: 74,
    intraday: "🟢 偏多",
    tomorrow: "🟡 偏多但勿追高",
    reason: [
        "台積電偏強",
        "大盤站上5日均線",
        "成交量正常",
        "MACD維持多方"
    ]
};

function getSuggestion(score){

    if(score >= 70){
        return "🟢 可以分批布局";
    }

    if(score >= 50){
        return "🟡 建議觀望";
    }

    return "🔴 建議減碼";
}

console.log("0050 AI 已啟動");
console.log(getSuggestion(market.score));
