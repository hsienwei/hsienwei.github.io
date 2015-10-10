title: cocos2d-x 2.0.3 跨平台專案經驗
date: 2013-01-06 00:08:15
tags:
- cocos2d-x
---

## 注意線程安全 ##
不要經pthread開線程(Native code)還使用JNI呼叫Java Code
基本上是線程安全問題
如果這樣做很容易出問題
有遇過下面的狀況

1. 字串被卡掉
2. JNI Call找不到jclass
3. JNI Call找到jclass，但仍然出錯，加上程式是多執行緒，除錯十分困難

基本上後來都採取pthread傳訊息，schedule再處理的模式

## map erase 的使用 ##
map的erase方法不會回傳刪除後下一個元素的iterator(vector會)  
曾經遇到一個狀況如下：

    for (itMap = _mapData.begin(); itMap != _mapData.end(); ++itMap)
    {
        if (...)
        {
            _mapData.erase(itMap);
        }
    }

這樣的用法是有問題的  
在iOS運行正常，但在Android有可能造成無限迴圈

正確的方式應該如下

    for (itMap = _mapData.begin(); itMap != _mapData.end(); )
    {
        if (...)
        {  //移除
            _mapData.erase(itMap++);
        }
        else
        {  //不移除
            ++itMap;
        }
    }

## cocos2d-x文字寬度不同平台差異 ##
CCLabalTTF iOS版跟Android版的中文字(字型黑體)在設定相同字型大小時，實際顯示大小有不同，如果設定寬度交由cocos2d-x去斷行基本上沒有什麼問題，但是如果因為文句美觀而自行設定斷行時，就要注意兩平台寬度不同造成顯示效果的不同。

## Android的CCRenderTexture ##
這個類別在Android常常出狀況，基本上下面這兩個我都遇到過(2.0.3剛出的時候)。  
http://www.cocos2d-x.org/news/75     2.0.4修正  
http://www.cocos2d-x.org/issues/1544    2.1.1修正  

現在看來是都修好了，只是那時候剛換2.0.3的時候真的很慘，不確定何時會修好，就算確定也不能等，所以android用到的部分幾乎都要再另寫一個版本，使用的人在Android版最好多加測試，因為cocos2d-x的開發者也不是能夠測到所有裝置，須仰賴整體社群的幫忙。

## cocos2d-x 預設libcurl 不支援SSL ##
cocos2d-x 中有提供libcurl 的這個URL連線程式庫，不過內建的沒有支援ssl，基於專案的需求所以要更換為有SSL功能的。
原本想要自己編，不過看了一下官方的建議做法，覺得實在太麻煩，後來發現下面這個網址：  
https://github.com/dumganhar/libcurl-build  
這應該算cocos2d-x官方提供的，可以直接使用。  

## 版本號的設定 ##
一開始iOS的版本號設定是以`x.x.x`這樣的形式去處理的。
遊戲移植到android後，由於需要在某些版本快速修正bug後出一個新版本，所以在android有些版本versionName是像`x.x.x.y`這樣。  
後來iOS版由於某些原因需要以某版為基礎修正後再出一版，版本號原本是想要跟android一樣，但後來發現iOS版本的專案設定中，版本的設定分為version與build，version的設定只能x.x.x，build則無限制。  
因為在這個專案中的版本號會影響到一些跟server取資料時的判定，所以版本號需要相同。  
iOS跳號後android也需要跟進，所以在這一點需要注意。