title: Android無法安裝Apk的處理方式
date: 2017-06-05 14:27:27
tags:
- Unity
- Android
---

## 問題描述：  
同事手機一直無法安裝目前專案的APK, 也不能確定發生什麼事？

## 處置：  
1. 在手機直接安裝沒有任何錯誤訊息, 嘗試使用`adb shell pm install`的方式來安裝, 可以看到`Failure [INSTALL_FAILED_CONTAINER_ERROR]`錯誤。  
  
2. 經查詢處理方式：  
[link](https://stackoverflow.com/questions/5744298/what-does-this-mean-failure-install-failed-container-error)  
要刪除特定檔案, 感覺要用戶這樣做應該會被客訴到死..  
  
3. 同事在安裝`adb shell pm install`時加上`-f`強制安裝在內部系統內存發現可以安裝成功, 將尋找方向移到ApplicationInstallLocation上。  
經查詢有一些文章  
[link](https://forum.unity3d.com/threads/failure-install_failed_container_error.210920/)  
[link2](http://qiita.com/ToniTakekawa/items/d457358c1e92bfa9d7b7)  
指出只要Player settings在Android項的Install Location改為Automatic即可, 測試後可行。




