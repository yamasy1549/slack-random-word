Wikipedia からランダムに単語を返す。アイデアが出なくて困ったときとかにべんり。

1. 新しい BOT をつくる https://my.slack.com/services/new/bot
2. `API Token` をメモる
3. node で動かす

```
$ yarn

$ touch .env

$ echo "token=XXXX" > .env

$ node app.js
```

さいごに、好きなチャンネルで `/invite @botusername` する
