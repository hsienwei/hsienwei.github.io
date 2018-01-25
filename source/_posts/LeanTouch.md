title: LeanTouch 方便的手勢控制plugin
date: 2018-01-24 13:51:10
tags:
- unity
- LeanTouch
---

[Asset Store Link](https://www.assetstore.unity3d.com/#!/content/30111)  

一開始專案在處理手勢的部份大多是自行處理, 以Unity的狀況來說如果是單指點擊來說寫起來沒有什麼大問題, 但後來專案中有需要處理Pinch與Twist兩種手勢, 一旦進入需要兩隻手指以上的手勢就開始麻煩了, 主要還是因為PC開發環境在多指的行為上需要自行模擬, 以及可能需要用執行環境來判斷來做不同的處理.

    #if UNITY_EDITOR
        if (Input.GetAxis("Mouse ScrollWheel") != 0)
        {
            ...
        }
    #elif UNITY_ANDROID || UNITY_IOS
        if (Input.touchCount == 2)
        {
            ...
        }
    #endif

一開始的作法是用替代的方式來取代, 比方說PC端用滑鼠滾輪來取代Twist, 但是用久了感覺不是很直覺, 而且維護起來確實比較麻煩, 要抓真實的感覺需要編譯apk至手機上測試, 於是之後就改用這個套件。

這個套件對我的好處主要在於可以省略多平台的一些實作細節, 而且在PC端就可以模擬Pinch與Twist手勢（可選擇組合鍵）, 測試起來比較方便。
{% asset_img 1.png [組件設置] %}

事件提供了以下幾種

    LeanTouch.OnFingerDown  
    LeanTouch.OnFingerSet   
    LeanTouch.OnFingerUp    
    LeanTouch.OnFingerTap   
    LeanTouch.OnFingerSwipe 
    LeanTouch.OnGesture     
    
除了前幾個基本的事件以外, 也可以用LeanTouch.OnGesture來處理複雜的手勢,另外也提供了相關的取值方法：

    LeanGesture.GetTwistDegrees
    LeanGesture.GetPinchScale
    LeanGesture.GetScreenDelta
    
不用再去計算一些細節比方說pinch兩指間移動的量之類的。

看一些文章有提到該套件有一些組件可以提供一些預設行為可供套用, 雖然沒有用到但感覺也是挺方便的。

