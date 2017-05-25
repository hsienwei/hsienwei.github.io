title: DOTween：一個好用的Unity Tween System plugin
date: 2017-05-25 17:57:33
tags:
- Unity
- DOTween
---

以下內容為之前在公司分享的東西

- 目前專案使用的Tween System   
 - 美術:UITweener(來自NGUI)
 - 程式:視狀況使用DOTween或UITweener

- 為何要使用DOTween
 - 從Cocos2d-X轉到Unity, 突然少了Action很不方便
 - 我個人來看UITweener不太夠用
 
## DOTween
http://dotween.demigiant.com/index.php
2016年10月左右開始使用  

優點：  

+ Open Source
+ 文件完整

缺點：  

- 功能限制(Pro版)
- 沒有Component

## Features
個人比較在乎的  

- Speed and efficiency
Not only very fast, but also very efficient: everything is cached and reused to avoid useless GC allocations.
- Shortcuts
Shortcut extensions that directly extend common objects like this:
// Move a transform to position 1,2,3 in 1 second
transform.DOMove(new Vector3(1,2,3), 1);
- Full control
Play, Pause, Rewind, Restart, Complete, Goto and tons of other useful methods to control your tweens.

其他見 http://dotween.demigiant.com/index.php#features

### 基本功能

Transform  

- DOMove
- DOMoveX/DOMoveY/DOMoveZ
- DORotate
- DORotateQuaternion
- DOLookAt
- DOScale
- DOScaleX/DOScaleY/DOScaleZ
- DOShakePosition
- DOShakeRotation
- DOShakeScale
- DOPath

Material  

- DOColor
- DOFade
- DOFloat
- DOOffset
- DOTiling

Camera  

- DOAspect
- DOColor
- DOFieldOfView
- DONearClipPlane
- DOOrthoSize

通用方法
// Tween a Vector3 called myVector to 3,4,8 in 1 second
DOTween.To(()=> myVector, x=> myVector = x, new Vector3(3,4,8), 1);
![](http://dotween.demigiant.com/_imgs/splash_lambda.png)

### callbacks
幾乎可以應付所有狀況的callback可以使用  

- OnComplete
- OnUpdate
- OnKill
- OnPlay
- OnPause
- OnRewind
- OnStart
- OnStepComplete: 這個比較特別, 如果有repeat的話每一次都會呼叫

### options
這裡列出幾個比較常用的選項  

- SetEase(Ease easeType \ AnimationCurve animCurve \ EaseFunction customEase)
漸進的設置
- SetId(object id)
設置一個獨特的id, 以便以後取用
- SetLoops(int loops, LoopType loopType = LoopType.Restart)
播放次數
- SetUpdate(UpdateType updateType, bool isIndependentUpdate = false)
設置該tween要在Update, FixedUpdate, LateUpdate處理
- SetDelay(float delay)
延遲時間
- SetSpeedBased(bool isSpeedBased = true)
以單位時間為基準, 打開後設置的時間會變成每單位的時間。  
比方說DOMove(4, 1)原本是一秒移動4單位，會變成一秒移動一單位, 移動4秒。


### 效能

官方測試
http://dotween.demigiant.com/#enginesComparison


### 其他
個人喜歡他的DoPath會有預覽線條的功能。





