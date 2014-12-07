title: 自製2048 for Chromecast
date: 2014-05-19 11:20:49
tags:
- chromecast
---
近日在看Chromecast的相關文件，發現他可以自己做receiver app
receiver app是以HTML5來製作  但由於有一些效能限制 所以製作時需要注意
詳情可參考 https://developers.google.com/cast/docs/ux_guidelines#considerations
只要符合條件  基本上也是可以做遊戲的
剛好最近很紅的2048是開源的  所以就以它來當作例子
其實2048已經有人移植到chromecast上了
但反正是要做一個測驗所以無所謂

以下是實際成品的聯結
Chrome: https://dl.dropboxusercontent.com/u/10581994/chromecast_test/index.html
Android(4.0以上): https://dl.dropboxusercontent.com/u/10581994/chromecast_test/2048ForChromecast.apk

其實做起來並不難，主要分為兩個部分(receiver and sender)，基本API的用法就不贅述，可以看
https://developers.google.com/cast/docs/developers  及 https://github.com/googlecast/

###receiver
由於2048遊戲部分不太需要去寫邏輯部分，故主要只要處理訊息的接收與發出即可
初始化部分:
在 application.js 中 window.requestAnimationFrame中加入
{% gist 17a58ee1f2e1ba5ac479 %}
這裡我有一個部分是用偷懶的做法
``window.senderId=event.senderId;`` 這裡將senderId放在window底下以便之後要回傳訊息使用
但個人覺得不是好的做法 但這是測試用的程式就先略過

鍵盤事件接收部分  在 keyboard_input_manager.js 中的KeyboardInputManager.prototype.listen方法中加入
{% gist f7b4ba0b553e94195617 %}
將sender傳送過來的訊息對應該做的行為

當玩家無法再移動或者是已達到2048的時候都會有訊息出現，在這種狀況下可以回傳訊息給sender出現相對應的操作界面，為此修改html_actuator.js如下
{% gist b232fa188603c7b928ac %}

###sender
這裡我做了兩個平台的sender程式，其實主要也是改google的範例程式
chrome版主要就是把keyboard event send給receiver
android也是差不多, 只是把swipe的方向改為對應的key code傳給receiver
另外接收遊戲結束的訊息跳出對應的AlertDialog

或許下次可以試試看現有 html5遊戲引擎在chromecast上的效能

---
以下為參考資料

模擬器
模擬器感覺在自定receiver app的部分支援並不完整  實機測還是比較好
以下是目前有看到的模擬器

CR Cast (chrome 擴展)
https://chrome.google.com/webstore/detail/cr-cast/acmfmindblghbicdipoakcolegkcddbk
Leapcast (python, run on chrome)
https://github.com/dz0ny/leapcast
android 模擬  cheapcast (跑不起來)
https://github.com/mauimauer/cheapcast
rPlay on iOS
http://www.vmlite.com/index.php?option=com_kunena&amp;Itemid=158&amp;func=view&amp;catid=23&amp;id=12020

---
###Developer Console
https://cast.google.com/publish/
由於要自行開發receiver app所以需要開通Developer Console   
需要五元美金  如果只是要cast媒體就不需要

![console](/2014/05/19/自製2048-for-Chromecast/chromecase_console.png)
如圖，可以設置APP 與 測試用裝置
如果Application不是Published的話則要有輸入的裝置才能使用

目前已有的遊戲應用
下面有兩個已在 Google Play上架的應用
GamingCast (for Chromecast)
https://play.google.com/store/apps/details?id=co.essh.gamecast
2048 Chromecast
https://play.google.com/store/apps/details?id=com.sunnydev.cast2048