## コマンド
新しいジャンルディレクトリを作成する
`make gen [ジャンル名(英)] []`
```
ex) npm run genre frontend フロントエンド
```

## 新しいコマンドを追加する時
bin以下にファイルを追加。先頭に`#!/usr/bin/env node`を書く。
作成後に
```
    npm link
```

## 仕様
- 進捗率がリポジトリ側のREADMEで分かる(期限別で出せると良い)
- 読む本リスト(amazonリンク/notesのリンク/期限)はjsonで管理できるようにする
- git pushされたタイミングでこれらを更新する
- 後々OSS化したい

## 実装
> 進捗率がリポジトリ側のREADMEで分かる(期限別で出せると良い)
- グラフで出す
- とりあえずビジュアルは拘らない。後々は画像にできるといいかも(canvas書き出しとか?)

> 読む本リスト(amazonリンク/notesのリンク/期限)はjsonで管理できるようにする
- ディレクトリはジャンル別にした方が使いやすそう
ex) frontend/backend/infra ...

> git pushされたタイミングでこれらを更新する
- CI/CDはgithub actions
- jsonからデータを持ってきてMarkdownを書き換える