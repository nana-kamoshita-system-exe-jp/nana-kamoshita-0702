// 運勢データ
const fortuneData = {
    overall: [
        "今日は素晴らしい一日になりそうです。新しいチャンスが舞い込んでくるかもしれません。",
        "穏やかで安定した一日を過ごせるでしょう。リラックスして過ごすことが大切です。",
        "少し注意が必要な日です。慎重に行動し、周りの人との関係を大切にしましょう。",
        "エネルギーに満ち溢れた一日です。積極的に行動することで良い結果が得られるでしょう。",
        "創造性が高まる日です。新しいアイデアや発想が浮かびやすいでしょう。",
        "人との出会いに恵まれる日です。コミュニケーションを大切にしましょう。",
        "内省的になりやすい日です。自分自身と向き合う時間を作ることが大切です。"
    ],
    love: [
        "恋愛運は絶好調！素敵な出会いや進展が期待できます。",
        "パートナーとの関係が深まる日です。思いやりを持って接しましょう。",
        "少し慎重になった方が良い日です。相手の気持ちを考えて行動しましょう。",
        "新しい恋の予感があります。積極的にコミュニケーションを取りましょう。",
        "恋愛面では安定した日です。現在の関係を大切に育んでいきましょう。",
        "ロマンチックな雰囲気に包まれる日です。特別な時間を過ごせるかもしれません。",
        "友情から恋愛に発展する可能性があります。身近な人に注目してみて。"
    ],
    work: [
        "仕事運は上昇中！重要なプロジェクトで成果を上げられるでしょう。",
        "チームワークが重要な日です。同僚との協力を大切にしましょう。",
        "集中力が高まる日です。難しい作業も効率よく進められるでしょう。",
        "新しいアイデアが評価される日です。積極的に提案してみましょう。",
        "上司や先輩からの評価が高まる日です。真面目な取り組みが認められるでしょう。",
        "少し慎重に進めた方が良い日です。確認作業を怠らないようにしましょう。",
        "学習意欲が高まる日です。新しいスキルを身につけるチャンスです。"
    ],
    money: [
        "金運は好調です！思わぬ収入があるかもしれません。",
        "節約を心がけると良い日です。無駄遣いを控えましょう。",
        "投資や貯蓄について考える良い機会です。将来のために計画を立てましょう。",
        "お金の管理を見直す日です。家計簿をつけてみると良いでしょう。",
        "臨時収入の可能性があります。でも浮かれすぎないよう注意しましょう。",
        "大きな買い物は避けた方が良い日です。よく考えてから決断しましょう。",
        "金運は安定しています。堅実な選択を心がけましょう。"
    ]
};

const luckyColors = [
    { name: "赤", color: "#FF6B6B" },
    { name: "青", color: "#4ECDC4" },
    { name: "緑", color: "#45B7D1" },
    { name: "黄色", color: "#FFA07A" },
    { name: "紫", color: "#9B59B6" },
    { name: "オレンジ", color: "#FF8C42" },
    { name: "ピンク", color: "#FF69B4" },
    { name: "水色", color: "#87CEEB" },
    { name: "金色", color: "#FFD700" },
    { name: "銀色", color: "#C0C0C0" }
];

const dailyAdvice = [
    "笑顔を忘れずに過ごしましょう。あなたの笑顔が周りの人を幸せにします。",
    "感謝の気持ちを大切にしましょう。小さなことにも「ありがとう」を言ってみて。",
    "新しいことにチャレンジしてみましょう。成長のチャンスが待っています。",
    "深呼吸をして、リラックスする時間を作りましょう。心の平穏が大切です。",
    "家族や友人との時間を大切にしましょう。人とのつながりが幸せを運んでくれます。",
    "自分を信じて行動しましょう。あなたには素晴らしい可能性があります。",
    "今日一日を大切に過ごしましょう。毎日が特別な贈り物です。",
    "優しさを心がけましょう。小さな親切が大きな幸せを生み出します。",
    "健康に気を配りましょう。体調管理が全ての基本です。",
    "前向きな気持ちを持ちましょう。ポジティブな思考が良い結果を引き寄せます。"
];

// 日付を表示する関数
function displayCurrentDate() {
    const today = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        weekday: 'long' 
    };
    const dateString = today.toLocaleDateString('ja-JP', options);
    document.getElementById('current-date').textContent = dateString;
}

// 星を表示する関数
function displayStars(elementId, rating) {
    const starsContainer = document.getElementById(elementId);
    starsContainer.innerHTML = '';
    
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = i <= rating ? 'star' : 'star empty';
        star.textContent = '★';
        starsContainer.appendChild(star);
    }
}

// ランダムな運勢を生成する関数
function generateFortune() {
    // 今日の日付をシードとして使用（同じ日は同じ運勢）
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    // シンプルな疑似乱数生成器
    function seededRandom(seed) {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }
    
    // 各運勢の星の数を決定（1-5）
    const overallRating = Math.floor(seededRandom(seed) * 5) + 1;
    const loveRating = Math.floor(seededRandom(seed + 1) * 5) + 1;
    const workRating = Math.floor(seededRandom(seed + 2) * 5) + 1;
    const moneyRating = Math.floor(seededRandom(seed + 3) * 5) + 1;
    
    // 運勢テキストを選択
    const overallIndex = Math.floor(seededRandom(seed + 4) * fortuneData.overall.length);
    const loveIndex = Math.floor(seededRandom(seed + 5) * fortuneData.love.length);
    const workIndex = Math.floor(seededRandom(seed + 6) * fortuneData.work.length);
    const moneyIndex = Math.floor(seededRandom(seed + 7) * fortuneData.money.length);
    
    // ラッキーカラーとナンバーを選択
    const luckyColorIndex = Math.floor(seededRandom(seed + 8) * luckyColors.length);
    const luckyNumber = Math.floor(seededRandom(seed + 9) * 99) + 1;
    
    // アドバイスを選択
    const adviceIndex = Math.floor(seededRandom(seed + 10) * dailyAdvice.length);
    
    // 星を表示
    displayStars('overall-stars', overallRating);
    displayStars('love-stars', loveRating);
    displayStars('work-stars', workRating);
    displayStars('money-stars', moneyRating);
    
    // 運勢テキストを表示
    document.getElementById('overall-fortune').textContent = fortuneData.overall[overallIndex];
    document.getElementById('love-fortune').textContent = fortuneData.love[loveIndex];
    document.getElementById('work-fortune').textContent = fortuneData.work[workIndex];
    document.getElementById('money-fortune').textContent = fortuneData.money[moneyIndex];
    
    // ラッキーアイテムを表示
    const luckyColor = luckyColors[luckyColorIndex];
    document.getElementById('lucky-color').style.backgroundColor = luckyColor.color;
    document.getElementById('lucky-color-name').textContent = luckyColor.name;
    document.getElementById('lucky-number').textContent = luckyNumber;
    
    // アドバイスを表示
    document.getElementById('daily-advice').textContent = dailyAdvice[adviceIndex];
}

// ランダムな運勢を生成する関数（更新ボタン用）
function generateRandomFortune() {
    // 完全にランダムな運勢を生成
    const overallRating = Math.floor(Math.random() * 5) + 1;
    const loveRating = Math.floor(Math.random() * 5) + 1;
    const workRating = Math.floor(Math.random() * 5) + 1;
    const moneyRating = Math.floor(Math.random() * 5) + 1;
    
    const overallIndex = Math.floor(Math.random() * fortuneData.overall.length);
    const loveIndex = Math.floor(Math.random() * fortuneData.love.length);
    const workIndex = Math.floor(Math.random() * fortuneData.work.length);
    const moneyIndex = Math.floor(Math.random() * fortuneData.money.length);
    
    const luckyColorIndex = Math.floor(Math.random() * luckyColors.length);
    const luckyNumber = Math.floor(Math.random() * 99) + 1;
    const adviceIndex = Math.floor(Math.random() * dailyAdvice.length);
    
    // 星を表示
    displayStars('overall-stars', overallRating);
    displayStars('love-stars', loveRating);
    displayStars('work-stars', workRating);
    displayStars('money-stars', moneyRating);
    
    // 運勢テキストを表示
    document.getElementById('overall-fortune').textContent = fortuneData.overall[overallIndex];
    document.getElementById('love-fortune').textContent = fortuneData.love[loveIndex];
    document.getElementById('work-fortune').textContent = fortuneData.work[workIndex];
    document.getElementById('money-fortune').textContent = fortuneData.money[moneyIndex];
    
    // ラッキーアイテムを表示
    const luckyColor = luckyColors[luckyColorIndex];
    document.getElementById('lucky-color').style.backgroundColor = luckyColor.color;
    document.getElementById('lucky-color-name').textContent = luckyColor.name;
    document.getElementById('lucky-number').textContent = luckyNumber;
    
    // アドバイスを表示
    document.getElementById('daily-advice').textContent = dailyAdvice[adviceIndex];
}

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    displayCurrentDate();
    generateFortune();
    
    // 更新ボタンのイベントリスナー
    document.getElementById('refresh-fortune').addEventListener('click', function() {
        // ボタンにアニメーション効果を追加
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        generateRandomFortune();
    });
});