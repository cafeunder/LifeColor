# LifeColor
web版ライフゲーム http://lifecolor.nitkc.org/

## ビルド方法
- nodejsがインストールされていることを前提とします。
 - 開発はv6.9.4で行われています。
 
- 初回のみ、以下のコマンドで必要なパッケージをインストールします。
```
npm install
```
- 以下のコマンドを実行すると、js/ディレクトリにスクリプトが生成されます。
```
gulp
```
- NODE_ENVの値がproductionの場合は最小構成のファイルが、それ以外の場合はデバッグ用のファイルが生成されます。

## Copyright
copyright(C) 2016-2017 cafeunder.
