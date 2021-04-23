# Real World HTTP
[code](https://github.com/1keiuu/playground/tree/main/go/rw_http)

## まえがき
- 基本的にはすでに確立されていて、かつ使われている技術を紹介
    WebTransport,gRP,GraphQLなどは割愛 
- 歴史を学ぼう
    歴史を知ればその技術をどう使っていけばいいかが分かり、設計を選択する場面でも活きる
    http0.9から学ぶ事で、根幹の機能を知り、追加で必要になっていった機能が段階的に理解できる。
- curlを使ってくよ(1997年製で20年近く開発されてる)
    curlと似たような事ができる`wget`はダウンロードしたHTMLを解析して、リンクされている画像などもまとめてダウンロードできる(curlは出来ない)
- Goの日本での普及は特殊
    技術書や大規模なイベントが少ないにも関わらず盛り上がってる
    理由: 他の言語を知っている人から読みやすい/パフォーマンスが高く、型安全でもあり移行したときのメリットが明確/使い勝手がいい


## 1章 HTTP/1.0の世界:基本となる4つの要素
- RFC(request for comment)はIEFTによって作られた、通信の相互接続性を維持するために共通化された仕様書
- ブラウザに特化した仕様策定はW3C(World Wide Web Consortium)へ移された

- 最低限のwebServerを作成してhttp0.9を再現する ([code](https://github.com/1keiuu/playground/blob/main/go/rw_http/main.go))
    サーバー: `go run main.go`
    リクエスト: `curl --http1.0 http://localhost:8888`
    完全にhttp0.9を再現するには難しい。pythonのhttpServerは対応してる。
    0.9はドキュメント(HTML)を取得する機能しかなかった。
    欠点:   1つのドキュメントしか扱えない。
            検索のリクエスト(現在のパラメータ)以外のリクエストを送信できなかった。
            新しい文書の送信、更新、削除はできなかった。
            サーバーが正しく応答を返すことができたかも分からない。
            HTML前提だったため、サーバーからコンテンツのフォーマットを指定できない。