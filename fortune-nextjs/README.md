# Fortune Next.js App

このプロジェクトはNext.jsで作成された占いアプリケーションです。

## GitHub Pagesへのデプロイ手順

### 1. GitHubリポジトリの作成

1. GitHubで新しいリポジトリを作成します（リポジトリ名: `fortune-nextjs`）
2. ローカルプロジェクトをGitHubにプッシュします：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fortune-nextjs.git
git push -u origin main
```

### 2. GitHub Pagesの設定

1. GitHubリポジトリの「Settings」タブに移動
2. 左側のメニューから「Pages」を選択
3. 「Source」セクションで「GitHub Actions」を選択

### 3. 自動デプロイの確認

- `main`ブランチにプッシュすると、GitHub Actionsが自動的に実行されます
- Actionsタブで進行状況を確認できます
- デプロイが完了すると、以下のURLでアプリにアクセスできます：
  `https://YOUR_USERNAME.github.io/fortune-nextjs/`

## ローカル開発

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build
```

## 注意事項

- `next.config.js`の`basePath`設定により、本番環境では`/fortune-nextjs`パスが追加されます
- 画像の最適化は無効化されています（GitHub Pages対応のため）
- `.nojekyll`ファイルにより、`_next`フォルダが正しく処理されます