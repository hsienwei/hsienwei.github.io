title: 使用cocos2d-x實作PostProcessing
date: 2013-12-30 17:36:07
tags:
- cocos2d-x
- shader
---
上次做了一些想做的shader效果
這次主要研究在cocos2d-x上如何實現Post Processing

主要的參考資料如下
http://en.wikibooks.org/wiki/OpenGL_Programming/Post-Processing

裡面主要以OpenGL語法來製作，大概步驟如下
建立texture
建立post processing用的framebuffer
將步驟2的framebuffer作為步驟1的texture資料
在post processign framebuffer上繪圖
將步驟1的texture搭配post processing shader繪圖出來
在cocos2d-x中，因為有提供RenderTexture類別，所以我們可以不用處理那麼多步驟。
基本上只要建立起RenderTexture，就可以用getSprite()->getTexture()來取得與步驟1~3相同效果的texture。
步驟4則可以藉由在RenderTexture的begin()與end()中加入要繪圖的物件的visit()來達到。
而步驟5則只要將取出的texture用來建立新的sprite，並在該sprite上加上shader就可以了。

下圖為使用cocos2d-x實作上面連結的效果
右下有按鈕可以切換是否使用Post Processing
程式一樣放在https://github.com/hsienwei/shader_cocos2dx
![最後效果](/2013/12/30/使用cocos2d-x實作PostProcessing/effect.png)