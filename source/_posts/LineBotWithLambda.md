title: AWS Lambda + LineBot 
date: 2018-07-07 15:00:18
tags: 
 - python
 - AWS
 - LineBot
---

這篇主要紀錄一下之前寫的一個小玩具
主要是分為兩個部分
- 使用Python + selenium 爬Ptt網頁版的資料並儲存在 AWS DynamoDB
- 使用LintBot api加上AWS lambda回應上一步存在DynamoDB中的資料


---

第一部分是Python + selenium 爬Ptt網頁版的資料並儲存在 AWS DynamoDB

這裡主要是改以前寫的一個爬蟲程式, 以前寫的時候那時用的是python2.7版本並使用Mechanize 與 BeautifulSoup, 最近把它改成python3以及selenium[連結](https://github.com/hsienwei/ptt_data_parse), 目前還會有一些舊的程式碼在裡面。

程式可以指定要對哪個版來爬資料, 並可以指定要幾小時內的資料, 目前針對推文數高於一定程度以上的文章，另外使用[FB API](https://developers.facebook.com/docs/graph-api/reference/v2.11/url)去取該連結的互動狀況, 用該資料簡單去算一個分數(可以在下面的測試結果畫面看到)用來作為熱門文章的排序, 這個數字的好處是可以看到實際在FB的熱門狀況, 因為有時候PTT推文數高的文章不一定是值得分享的文章, 也有可能是閒聊文。

另一part是將得到的資料寫進 AWS 的DynamoDB當中, [程式碼在這](https://github.com/hsienwei/ptt_data_parse/blob/master/dynamodb_conn.py)，會使用DynamoDB的原因主要是因為我的AWS 免費已經過期了, 所以我選擇使用目前還是有免費方案的DynamoDB。

主要使用了兩張表, 一張是索引, 主要紀錄各個板對應到另一張表的資料ID，另一張表就是爬下來的資料，以版名以及爬資料的時間當作ID來儲存。

---

第二部分是使用LintBot api加上AWS lambda回應上一步存在DynamoDB中的資料

會使用lambda其實是一個湊巧, 一開始本來是要開一個EC2加上Nodejs或Python+flask來回應linebot webhook, 但是想一想我已經沒有免費Tier了, 作為一個小玩具成本有點高, 後來在查資料的時候看到[這篇文章](https://blog.5000164.jp/2017/8/14/line-bot/), 覺得這樣server less的架構成本低, 又不需要一直開著, 也可以使用API Gateway來開一個https的api當作webhook。

這裡當初在做的時候本來要讓linebot在資料有更新時自動使用push來通知使用者, 但是由於push功能需要付費, 所以就作罷了。

---

下面就是成果
![LineBot QRCode](https://qr-official.line.me/M/OkcTs6-FJF.png)
可以加入這個LineBot來測試

以下是測試結果畫面
第一張圖, 隨便打幾個字可以得到目前有資料的版名
![Imgur](https://i.imgur.com/I5ZyIf1.jpg?2)

第二張圖, 輸入一個有資料的版名後, 可以得到爬蟲爬到的資料, 標題後是其分數
![Imgur](https://i.imgur.com/6z3z8QK.jpg?2)
