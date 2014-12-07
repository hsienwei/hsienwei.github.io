title: 45度角地圖 Z-Sort 實作
date: 2013-11-14 23:50:21
tags:
- cocos2d-x
- html5
---
Demo：https://dl.dropboxusercontent.com/u/10581994/ZSortTest/index.html
Github：https://github.com/hsienwei/zSort_cocos2dx_html5

2014/01/16：cocos2d-x 2.2.2已修正此問題
2013/11/24 : 目前在chrome中會無法顯示(火狐可以), 為cocos2d-x html5的bug

這個專案主要是以cocos2d-x html5版本來實作一個我之前在工作中使用的45度角地圖Z-Sort演算法，一來練習cocos2d-x html5，一來為之前的工作內容做一個記錄。

開啟後一開始的狀況是沒有使用演算法排序的狀況，單純依照加入的順序去排序，按下"Sort"後就會依照演算法的結果為各個Sprite設定Z值。

當初主要導入這個做法的是我同事，我只是後來有在稍微修改
演算法參考網頁：http://wgcode.iteye.com/blog/847695

Sprite沒有使用圖，直接用drawingUtil來繪圖，發現用手機來看的話線條會沒辦法出來，也許是一個bug，也有可能是因為手機部分還沒有完善。

另外在點擊事件上也有一點問題，導致必須做很多處理才能達到縮放後也可以正確點擊，不確定這是我的用法錯誤還是這部分本身還不完整，可參照 https://github.com/hsienwei/zSort_cocos2dx_html5/blob/master/src/myApp.js   Line 53