import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '今日の運勢 - Daily Fortune',
  description: 'あなたの素敵な一日を応援する占いサイト',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}