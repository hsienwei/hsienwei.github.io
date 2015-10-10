title: 專案中與cURL相關瀕繁當機處理記錄
date: 2013-05-30 22:15:23
tags:
---
以下是專案中遇到的一個比較特別的問題 記錄如下

### 問題 ###
在某次上市的android版遊戲有瀕繁當機的狀況，通常是在進遊戲後不久，而這狀況在內部測試時並不常出現，且無發生在iOS版本  
### 處理 ###
1. 本次新上市版本增加公告功能  
由cURL進行http連線取得公告設定，檔案與圖片此部分使用cocos2d-x extensions的network套件，遊戲本身server連線程式也由cURL寫成  
2. 測得兩次進遊戲後當機(花三天測試出現兩次)，看似curl程式庫引發，錯誤訊息如下：  

        Fatal signal 11 (SIGSEGV) at 0x5103a793 (code=2)
        I/DEBUG   (  135): *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** ***
        I/DEBUG   (  135): Build fingerprint: 'samsung/GT-I9000/GT-I9000:2.3.5/GINGERBREAD/XXJVT:user/release-keys'
        I/DEBUG   (  135): pid: 11056, tid: 11056  >>> com.igs.salonbossworld <<<
        I/DEBUG   (  135): signal 11 (SIGSEGV), code 2 (SEGV_ACCERR), fault addr 5103a793
        ……….
        I/DEBUG   (  135):  d30 0000000000000000  d31 3ff0000000000000
        I/DEBUG   (  135):  scr 60000010
        I/DEBUG   (  135):
        I/DEBUG   (  135):          #00  pc 005691b6  /mnt/asec/com.igs.salonbossworld-1/lib/libgame.so
        I/DEBUG   (  135):          #01  pc 0056935e  /mnt/asec/com.igs.salonbossworld-1/lib/libgame.so
        I/DEBUG   (  135):          #02  pc 0056a150  /mnt/asec/com.igs.salonbossworld-1/lib/libgame.so (curl_mvsnprintf)
        I/DEBUG   (  135):          #03  pc 0055d014  /mnt/asec/com.igs.salonbossworld-1/lib/libgame.so (curl_failf)
        I/DEBUG   (  135):          #04  pc 00556586  /mnt/asec/com.igs.salonbossworld-1/lib/libgame.so (curl_resolv_timeout)
        I/DEBUG   (  135):          #05  pc 0056308a  /mnt/asec/com.igs.salonbossworld-1/lib/libgame.so (Curl_connect)

2. 以`curl_mvsnprintf`, `curl_failf`, `curl_resolv_timeout`部份作搜尋，查得幾篇技術文章有類似狀況如下    
http://sourceforge.net/p/curl/bugs/973/    
http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=617647    
重點在使用cURL並在多執行緒狀況下    
有篇文章說明這個狀況取決於os與thread的實作細節(回文的是官方人員)    
http://curl.haxx.se/mail/lib-2002-12/0103.html  
    > AFAIK, it isn't always specified what happens with signals in a multi-threaded system, it depends on your OS and your thread implementation. Which thread receives the signal etc.  

    另外官方有說明Multi-threading的相關問題  
    http://curl.haxx.se/libcurl/c/libcurl-tutorial.html#Multi-threading    
    另有一篇中文說明文章  http://www.cppblog.com/tx7do/archive/2012/02/20/166048.html  

3. 
依照文章說明有2種作法，一是使用CURLOPT_NOSIGNAL，缺點是會失去DNS Lookup timeout的能力，可用增加c-ares支援解決(但有文章指出某些android裝置會有問題  http://curl.haxx.se/mail/lib-2013-04/0276.html)  
另一個方法是保持同時間只有一個curl handle，缺點需要改動程式架構  

4. 
基於幾點推測當機可能符合該BUG，之所以說是推測是因為無法確認玩家當機的確切原因且測試時無法完全重現
    * 連server的程式都以pthread開執行緒並以curl程式庫作http連線，當遊戲剛進去有可能會更新信件與動態公告資料，此時多執行緒成立。  
    * 由於取決於這個狀況取決於os與thread的實作，或許可以解釋為何iOS無該狀況發生，
    * 猜測玩家之所以比較容易發生是因為玩家通常在信件上資料會比較多或者是玩家常處於不穩定網路狀況故較容易逾時。   

5. 
討論後將android動態公告http連線方式由cURL改為android原生方法，新版上市後已無該狀況。