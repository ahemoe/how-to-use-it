# スーパーや飲食店などのシステムを紹介するアプリ

## 環境構築方法
1. クローンしてDjangoでプロジェクト作成する<br>
2. docker-compose.ymlがあるディレクトリで、docker-compose buildを叩く(暫定) <br>
3. docker-compose.ymlがあるディレクトリで、docker-compose run web python manage.py migrateを叩きマイグレーション（DB環境を移行≒更新）する<br>
4. docker-compose.ymlがあるディレクトリで、docker-compose run web python manage.py createsuperuserを叩き管理者ユーザーを作成する<br>
5. docker-compose.ymlがあるディレクトリで、docker-compose up -dを叩く<br>
6. docker-compose.ymlがあるディレクトリで、docker-compose exec node npm installを叩く

## node環境のパッケージ追加方法
新しいパッケージの追加時は以下のコマンドを実行  

1. docker-compose up -d  
2. docker-compose exec node npm install <package名>  
3. docker-compose build

## 動作確認
- 動作確認は http://localhost:8000/myapp （またはDockerマシンのIP:8000/myapp） でアクセスし、「Hello, World.」が表示されることを確認する
- （表示されない場合）mysite/setting.pyのALLOWED_HOSTSにlocalhostまたはDockerマシンのIPを追加する

## Djangoの事始め
### アプリの追加
1. docker-compose.ymlがあるディレクトリで、docker-compose run web python manage.py startapp <アプリ名>
2. 作成された<アプリ名>のフォルダに、urls.pyを追加する
3. 作成された<アプリ名>のフォルダを、appsフォルダ配下に移動する
4. setting.pyのINSTALLED_APPSに、apps.<アプリ名>を追加（Djangoにアプリを認識させてあげる）
5. mysite配下のurls.pyのurlpatternsにパターンを追加して、ルートURLとViewを結びつける
    - url('<URLパターン>/', include('apps.<アプリ名>.urls'))

### Viewの書き方
1. アプリ名配下のurls.pyのurlpatternsにパターンを追加して、URLとViewを結びつける
    - url('<ホスト以降のURLパターン>'), views.<view関数名>, name='<view関数名>'),
    - 正規表現の他にパスコンバータという機能も利用可能
    - 第3引数は別Viewへのリダイレクトやテンプレートへのリンク時に利用する
2. view.pyで、指定したview関数名を用いてHttpResponseを返す
    - render関数の第3引数に辞書を渡すことで、テンプレートに値を渡すことができる

### テンプレートの書き方
1. （アプリ直下 or プロジェクト直下）templates/<フォルダ名>/<ファイル名>.html にHTMLを書く
    - 規模が大きくなってきても管理しやすいように名前空間を分けることが目的
    - プロジェクト直下は共通部分とかで使おうかなあ…いらないかなあ……？

### Modelの書き方
そのうち

### テストの書き方
そのうち

## アプリ概要

## アプリのディレクトリ構成(予定)
```
Project(how-to-use-it)
┣docker(Dockerfileの設定)
┃ ┣db(MySQLの設定)
┃ ┣web(Djangoの設定)
┃ ┣nginx(nginxの設定)
┃ ┗node(node環境の設定)
┣mysite
┃ ┗（サイト全体の設定とか）
┣static
┃ ┣admin（管理サイト）
┃ ┃ ┣js
┃ ┃ ┗css
┃ ┗public（公開サイト）
┃   ┣js
┃   ┗css
┣apps
┃ ┣myapp（動作確認用）
┃ ┃ ┣migrations
┃ ┃ ┗templates
┃ ┣account（会員登録/ログインなどのアカウント機能）
┃ ┃ ┣migrations
┃ ┃ ┗templates
┃ ┣review（レビュー機能）
┃ ┃ ┣migrations
┃ ┃ ┗templates
┃ ┣search（検索機能）
┃ ┃ ┣migrations
┃ ┃ ┗templates
┃ ┗frontEnd（SASSやJSは全部ここにまとめる、コンパイル先はstatic）
┃   ┣js
┃   ┗scss
 ```

## アプリの設定
- リクエスト⇔nginx⇔uWSGI⇔Django⇔MySQLと接続が繋がるように設定
- 8000番ポートで受ける（nginx）→8001番ポートで送受信する（nginx→uWSGI）→Djangoを動かす（uWSGI→Django）という流れ
- MySQLのDocker imageは最新版の8.0を使用
- MySQLの文字コードと認証方法を設定ファイル（my.cnf）で指定し読み込むように設定
