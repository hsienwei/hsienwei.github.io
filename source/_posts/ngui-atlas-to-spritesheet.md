title: 轉換NGUI atlas到UGUI的spritesheet
date: 2018-03-05 10:48:35
tags:
- unity
- NGUI
- UGUI
---

最近嘗試將一些效能消耗較大的NGUI UI轉換成UGUI測試, 不過目前暫時是自行測試, 所以在圖集部分暫時沿用以前的NGUI atlas來使用, 只是UGUI是不吃NGUI的atlas只吃sprite, 所以寫了一個工具來將NGUI的atlas資料寫到Texture的設定當中。
   
[連結在此](https://gist.github.com/hsienwei/1b76d6dfb43e281394e2cab07e331a7b)    
    
最主要是要把讀取到SpriteData的y軸做額外的反轉處理.