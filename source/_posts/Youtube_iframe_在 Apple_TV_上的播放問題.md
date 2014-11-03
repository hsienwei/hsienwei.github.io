title: （iOS）Youtube iframe 在 Apple TV 上的播放問題
date: 2014-08-12 18:04:23
tags:
- youtube
- iOS
- AppleTV
---
__問題：__

有一個頁面使用WebView + Youtube iframe 播放 live channel，在手機上播放正常，但如果使用AirPlay功能cast到Apple TV的話則會出現“ an error occurred loading this content ”。
如果播放的是非live則可以正常運行。

__處置：__

- 用電腦開啓Plex Home Theater作為測試裝置，可以播放live，故應該不是AirPlay本身不支援live。
- 由於以相同的程式碼來作處理時，單則節目可以播放而live不行，故認為是Apple TV那邊無法處理。
- Apple TV裡的Youtube app 完全搜尋不到Live的節目。
- 一開始懷疑是訊號來源問題，比方是否為Apple TV無法處理Youtube廣告要求，但查明目前並沒有廣告。
- 後來發現Youtube官方iOS app並不會有這樣的問題，懷疑如果我不透過iframe的方式也許可以處理。
- 最後使用https://github.com/hellozimi/HCYoutubeParser 來做處理，取得直接播放的URL，則可正常在Apple TV上播放。
- 在使用HCYoutubeParser上需要小心，因為Youtube曾經改變過responceData，所以會有不能用的風險，這個要自行承擔。