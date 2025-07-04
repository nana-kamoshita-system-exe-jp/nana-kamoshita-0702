'use client'

import { useState, useEffect } from 'react'

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
}

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
]

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
]

interface FortuneState {
  overall: { rating: number; text: string }
  love: { rating: number; text: string }
  work: { rating: number; text: string }
  money: { rating: number; text: string }
  luckyColor: { name: string; color: string }
  luckyNumber: number
  advice: string
}

export default function Home() {
  const [currentDate, setCurrentDate] = useState('')
  const [fortune, setFortune] = useState<FortuneState | null>(null)

  // 星を表示するコンポーネント
  const Stars = ({ rating }: { rating: number }) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? '' : 'empty'}`}
          >
            ★
          </span>
        ))}
      </div>
    )
  }

  // 日付を表示する関数
  const displayCurrentDate = () => {
    const today = new Date()
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      weekday: 'long' 
    }
    const dateString = today.toLocaleDateString('ja-JP', options)
    setCurrentDate(dateString)
  }

  // シード付き乱数生成器
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000
    return x - Math.floor(x)
  }

  // 運勢を生成する関数
  const generateFortune = (useToday: boolean = true) => {
    let seed: number
    
    if (useToday) {
      // 今日の日付をシードとして使用（同じ日は同じ運勢）
      const today = new Date()
      seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
    } else {
      // 完全にランダム
      seed = Math.random() * 100000
    }
    
    // 各運勢の星の数を決定（1-5）
    const overallRating = Math.floor(seededRandom(seed) * 5) + 1
    const loveRating = Math.floor(seededRandom(seed + 1) * 5) + 1
    const workRating = Math.floor(seededRandom(seed + 2) * 5) + 1
    const moneyRating = Math.floor(seededRandom(seed + 3) * 5) + 1
    
    // 運勢テキストを選択
    const overallIndex = Math.floor(seededRandom(seed + 4) * fortuneData.overall.length)
    const loveIndex = Math.floor(seededRandom(seed + 5) * fortuneData.love.length)
    const workIndex = Math.floor(seededRandom(seed + 6) * fortuneData.work.length)
    const moneyIndex = Math.floor(seededRandom(seed + 7) * fortuneData.money.length)
    
    // ラッキーカラーとナンバーを選択
    const luckyColorIndex = Math.floor(seededRandom(seed + 8) * luckyColors.length)
    const luckyNumber = Math.floor(seededRandom(seed + 9) * 99) + 1
    
    // アドバイスを選択
    const adviceIndex = Math.floor(seededRandom(seed + 10) * dailyAdvice.length)
    
    setFortune({
      overall: { rating: overallRating, text: fortuneData.overall[overallIndex] },
      love: { rating: loveRating, text: fortuneData.love[loveIndex] },
      work: { rating: workRating, text: fortuneData.work[workIndex] },
      money: { rating: moneyRating, text: fortuneData.money[moneyIndex] },
      luckyColor: luckyColors[luckyColorIndex],
      luckyNumber: luckyNumber,
      advice: dailyAdvice[adviceIndex]
    })
  }

  // 初期化
  useEffect(() => {
    displayCurrentDate()
    generateFortune()
  }, [])

  const handleRefresh = () => {
    generateFortune(false)
  }

  if (!fortune) {
    return <div>Loading...</div>
  }

  return (
    <div className="container">
      <header>
        <h1>🔮 今日の運勢 🔮</h1>
        <p className="current-date">{currentDate}</p>
      </header>

      <main>
        <div className="fortune-card">
          <div className="fortune-section">
            <h2>総合運</h2>
            <Stars rating={fortune.overall.rating} />
            <p>{fortune.overall.text}</p>
          </div>

          <div className="fortune-section">
            <h2>恋愛運</h2>
            <Stars rating={fortune.love.rating} />
            <p>{fortune.love.text}</p>
          </div>

          <div className="fortune-section">
            <h2>仕事運</h2>
            <Stars rating={fortune.work.rating} />
            <p>{fortune.work.text}</p>
          </div>

          <div className="fortune-section">
            <h2>金運</h2>
            <Stars rating={fortune.money.rating} />
            <p>{fortune.money.text}</p>
          </div>

          <div className="lucky-items">
            <div className="lucky-item">
              <h3>ラッキーカラー</h3>
              <div 
                className="color-display" 
                style={{ backgroundColor: fortune.luckyColor.color }}
              ></div>
              <p className="lucky-color-name">{fortune.luckyColor.name}</p>
            </div>
            
            <div className="lucky-item">
              <h3>ラッキーナンバー</h3>
              <div className="number-display">{fortune.luckyNumber}</div>
            </div>
          </div>

          <div className="advice-section">
            <h2>今日のアドバイス</h2>
            <p>{fortune.advice}</p>
          </div>
        </div>

        <button onClick={handleRefresh} className="refresh-btn">
          🎲 運勢を更新
        </button>
      </main>

      <footer>
        <p>&copy; 2025 Daily Fortune. あなたの素敵な一日を応援します！</p>
      </footer>
    </div>
  )
}