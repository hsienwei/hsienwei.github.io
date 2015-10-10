title: 剖析HTML資料轉為JSON
date: 2013-10-01 14:49:24
tags:
---

之前有一陣子很迷Puzzle & Dragon，所以常常查閱http://zh.pad.wikia.com/wiki/ 這個wiki網站，有一次用手機查的時候感覺他的手機板介面不太方便，而且如果可以用該資料為基礎讓手機通知我事件發生似乎不錯，所以就開始寫一個parser來處理網頁資料，把"緊急／降臨時間表"與"活動時間表"取需要的資料處理為JSON格式。

結果大概如下：
http://gcmtesthhhw.appspot.com/WikiData

那時候的大概想法是這樣:
用server跑一個排程，定時更新資料並用手機去取用。

Server端主要使用GAE，主要原因在我對server管理沒有經驗，用GAE我可以跳過server設定這一塊，Java基本上也是很熟了，所以寫起來沒啥問題，只是要了解一下CRON的排程設定。

剖析程式庫那時候選擇了http://jsoup.org/，使用上並不難，基本上就是實作NodeVisitor，然後使用head與tail方法的Node參數來判斷要取的資料，只是那時候有無法取執行javascript的問題，所幸影響不大，所以基本上就是取網頁程式碼，曾經有試過用JavaUnit想要取執行完javascript的網頁但還是失敗，所以這部分我後來就沒處理，JSON部分就直接用Java的JSONObject即可。

另外一個問題就是由於wiki資料由眾人維護，沒有一個既定格式，常常會有變更；取資料也不方便，沒有類似id的東西可以辨識，最後只好用標題來找，再取相對應的結構部分。

最後因為專案太趕就沒時間再進行，後來再去查已經有人出了一個相似但各方面都比較好用的APP，似乎沒有做的必要了。