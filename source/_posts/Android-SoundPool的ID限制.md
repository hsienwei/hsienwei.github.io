title: Android_SoundPool的ID限制
date: 2012-07-17 23:15:28
tags: 
- android
- cocos2d-x
---

很久以前發現的，發現沒寫到，補一下。

在使用cocos2d-x的SimpleAudioEngine時有遇到一個情形，就是有時候音效在幾個場景的切換後會撥不出來，後來發現到是因為我場景切換時會把舊場景的音效unload，再preload新場景的音效，不過照理講是不會有問題才對，後來測試是只有android會有這樣的問題。

後來查到http://d.hatena.ne.jp/itog/20100927/1285550195，裡面有寫到他的ID最大就只會到256個，所以當在重複unload 與 preload的動作之後，配到的ID就會大於256，大於256後就會發生音效撥不出來的問題。

解決的方案是呼叫end()，就可以讓ID重新計算，但會連Music都一起清掉，所以如果不想連Music都一起停的話就要另外寫方法。

另外那個網頁有提到一些其他SoundPool的限制，值得參閱一下。