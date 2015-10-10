title: cocos2d將大張SpriteFrame縮小後消除鋸齒的作法
date: 2011-12-05 00:58:11
tags:
- cocos2d-x
---

研究後沒有使用  
紀錄一下  

如果有一張大圖想要縮小使用  
當縮小的比例很小時  
即使對該圖的texture 呼叫 setAntiAliasTexParameters()  
也會有鋸齒的感覺  

如果不另外用小圖的話  
可以使用mipmap去處理  
主要對目標texture作兩步驟處理  

1. 呼叫generateMipmap()
2. 呼叫setTexParameters()  
ccTexParams.minFilter = GL_LINEAR_MIPMAP_LINEAR  
ccTexParams.magFilter = GL_LINEAR or GL_LINEAR_MIPMAP_LINEAR  

基本上原圖為NPOT才可以用  
使用後就不會有明顯的鋸齒感覺   
感覺上會比較滑順  

但應該會加重記憶體的使用  
故不使用  

ref :  
http://www.cocos2d-iphone.org/forum/topic/2735  
http://zh.wikipedia.org/wiki/Mipmap