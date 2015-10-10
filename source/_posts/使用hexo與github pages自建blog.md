title: 使用Hexo與github pages自建blog
date: 2014-10-29 16:01:25
tags:
- Hexo
- Blog
---

## 評估 ##

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

## 設定 ##

1. 先建立自己的 Github Pages 
https://pages.github.com/ 裡面講得很清楚了
2. 安裝nodejs
http://nodejs.org/ 基本上就照著各個平台的安裝步驟去把nodejs裝起來
安裝完nodejs後，此時應該也安裝完npm了，可用以下指令測試
{% code lang:bash %}
npm -v
{% endcode %}
3. 安裝Hexo
由於裝起來是在太簡單，還是請看[官方文件](http://hexo.io/docs/index.html)吧
下面列出最快建立的步驟
{% code lang:bash %}
npm install -g hexo
hexo init <folder>
cd <folder>
npm install
hexo g
hexo s
{% endcode %}
此時在瀏覽器開啟 http://localhost:4000 應該可以看到一個最簡單的blog了
4. deploy
hexo在deploy這點是非常簡單的（以github來說），打開blog目錄，``開啟_config.yml``，移到最下面修改相關設定
{% code lang:asciidoc %}
deploy:
	type: github
	repo: <repository url>
{% endcode %}
儲存後，輸入下面指令
{% code lang:bash %}
hexo d
{% endcode %}
這樣就搞定了，要注意的是第一次deploy後應該要5-10分鐘才會出現

## 其他 ##

- 使用post_asset_folder
在_config.yml中開啓這個選項，當你new出文章時，他會產出一個資料夾給你放該文章的資料，以我來講我會拿來放要展示的圖檔，管理起來也比較方便。
引用方式如下
{% code lang:asciidoc %}
![effect](/2013/12/26/cocos2dx中實作幾個shader效果/effect.png)
{% endcode %}
- markdown語法說明
http://markdown.tw/
- addthis(社群分享plugin)
http://www.addthis.com/
- gravatar(頭像)
http://en.gravatar.com/
- favicon製作
我是直接拿一個來用就是 http://www.favicon.cc/



