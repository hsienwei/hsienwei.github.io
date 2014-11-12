title: cocos2d-x中實作幾個shader效果
date: 2013-12-26 11:24:09
tags:
- cocos2d-x
- shader
---
在之前的專案中有機會使用shader實做了mask效果    
這次將之前曾經想要做但是專案不願意給時間嘗試的做法試著做出來

清單如下
- 圖片轉灰階
cocos2d-x中，sprite的setColor在設定顏色後基本上還是留有本來圖片跟設定顏色混合而已，這個做法是單純的轉灰階
- 圖片加邊框
有一次專案的需求是希望可以幫圖片在邊緣加上指定顏色的邊框，後來的作法是另外提供圖片，但如果有20張圖有這個需求就需要額外作20張圖，用shader就比較省事
- 全畫面遮罩
另一次專案的需求是希望玩家可以專注於某個功能的使用，想要將其他部分打暗只留該功能按鈕的部分是亮的；這裡使用layer製作，可以自行指定focus的位置
- 背景填滿
之前在做背景時都用sprite去拼，實際上物件很多，且容易造成有接縫，如果要移動也麻煩，用shader還滿方便，一樣是用layer去做

範例程式　https://github.com/hsienwei/shader_cocos2dx
目前在win32版與android版
用的是vs2013
![effect](/2013/12/26/cocos2dx中實作幾個shader效果/effect.png)

