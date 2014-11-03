title: 使用Hexo與github pages自建blog
date: 2014-10-29 16:01:25
tags:
- Hexo
- Blog
---

###評估

用了一陣子的blogger，其實用起來還滿方便但是看了markdown之後實在很想改用markdown，搜尋了一下有幾個不錯的網路服務像是
- wordpress 
- logdown
- 簡書

但是後來發現有blog framework可以將blog架在github pages上，一來不用花到錢，二來多個新玩具，於是就找找看有沒有好的服務，找到的有以下幾個
- jekyll
- octopress
- Hexo

最後考慮了幾點
- 前兩個是使用ruby，Hexo是使用nodejs，模板引擎預設是ejs，基本上之前有摸過一陣子express所以有一點認識，較易入門
- 網上使用心得都說octopress有效能上的問題
- Hexo台灣製造，這就是愛台灣？
- 看文檔的感覺Hexo跟octopress比較易入手

最後的結果就是我決定用hexo來建立blog

---
###設定

1. 先建立自己的 Github Pages 
https://pages.github.com/ 裡面講得很清楚了
2. 安裝nodejs
http://nodejs.org/ 基本上就照著各個平台的安裝步驟去把nodejs裝起來
安裝完nodejs後，此時應該也安裝完npm了，可用以下指令測試
{% code %}
npm -v
{% endcode %}
3. 安裝Hexo
由於裝起來是在太簡單，還是請看[官方文件](http://hexo.io/docs/index.html)吧
下面列出最快建立的步驟
{% code %}
npm install -g hexo
hexo init <folder>
cd <folder>
npm install
hexo g
hexo s
{% endcode %}
此時在瀏覽器開啟 http://localhost:4000 應該可以看到一個最簡單的blog了
4. deploy
hexo在deploy這點是非常簡單的（以github來說），打開blog目錄，開啟_config.yml，移到最下面修改相關設定
{% code %}
deploy:
	type: github
	repo: <repository url>
{% endcode %}
儲存後，輸入下面指令
{% code %}
hexo d
{% endcode %}
這樣就搞定了，要注意的是第一次deploy後應該要5-10分鐘才會出現

---
### 調整

- Theme
我用的Theme是[greyshade](https://github.com/Nuk9/hexo-theme-greyshade)，這種東西基本上就是看得順眼就好
這裡有一個[Theme清單](https://github.com/hexojs/hexo/wiki/Themes)，找到喜歡的就拿來套了
一般該theme的github頁面都會講怎麼使用，基本上就是下載後放到``blog資料夾>themes``中


---
### 其他

markdown語法說明
http://markdown.tw/

addthis
http://www.addthis.com/

gravatar
http://en.gravatar.com/

favicon製作
http://www.favicon.cc/


