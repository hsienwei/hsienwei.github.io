title: 使用瀏覽器做shader效果測試
date: 2015-11-07 21:11:51
tags:
- shader
---

最近在與特效美術之間溝通一些shader效果時，基本希望能夠便於溝通以及快速的測試一個雛形，所以把念頭打到瀏覽器上，主要是因為HTML5上的WebGL已經相當成熟，也有一些相關服務可以用，所以想說可以試試看，找了以下幾個服務:

* [ShaderToy](https://www.shadertoy.com/)   
基本上應該是範例最多的一個，特別的是除了紋理以外還提供影片、聲音可以使用，目前的成品數量應該也是最多最好的，不過僅提供fragment shader，但感覺網路上的強者都可以用特別的方式達到想要的效果。
* [ShaderFrog](http://shaderfrog.com/app)  
一個新的服務，提供兩種作法來建立shader，一個是Composed Shader，這有點像是一些現成的shader讓你來組合，另一個是Basic Shader就是讓你寫自己的shader，可以寫vertex shader，另外感覺這個網站有心要作大，有計畫要提供一些付費服務，像是shader匯出到unity或者是自行上傳紋理等功能，不過目前未開放。
* [shdr](http://shdr.bkcore.com/)   
可寫vertex shader與fragment shader，但似乎不能使用紋理，內建多種模型供使用。
* [Kick.js Shader Editor](http://www.kickjs.org/tool/shader_editor/shader_editor.html)   
另一個比較陽春的線上shader編輯工具，只是我還是搞不懂他的紋理怎麼增加。

綜觀上面的一些服務，基本上提供了shader的編輯與測試，但是還是缺少了一些功能，第一是大多不支援自己自訂紋理，第二是如果要給美術可能需要更方便的編輯方式。

所以最後還是選了使用自己來的方式，選擇的是[three.js](http://threejs.org/),這個程式庫很久以前就在一些文章中見到他的名字，去到他的官網可以看到許多特色專案，另外就是他提供了詳細的文件與範例，基本上不用怕找不到寫法。

這裡是一個製作出來的簡單範例：   
[連結](pages/skiprender/test.html)   
畫面的部分使用three.js，右上的UI使用[dat.GUI](https://github.com/dataarts/dat.gui)可以很方便的設置要修改的參數並顯示介面，這樣美術也可以簡單的調整參數，程式也可以即時的修改程式碼，美術只要更新一下即可。

另外要注意的是網頁需要放到網路上chrome瀏覽器在讀圖的時候才不會出錯，個人使用最簡單的Dropbox public資料夾，產出公開鏈結即可。
