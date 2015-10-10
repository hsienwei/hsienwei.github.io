title: Crashlytics 申請使用記錄
date: 2014-06-06 00:46:07
tags:
---

相較於Crittercism  
Crashlytics專注於crash的記錄與統計  
且目前為免費使用（2014/6/6）  

要申請Crashlytics帳號必須先在http://try.crashlytics.com/留下你的資料  
個人經驗是下午三點申請大概晚上9點就回覆你了  
會收到兩封信  
一封是Invitation  
另一封是確認你有沒有收到Invitation的信件會要求你回覆（我有回覆，但感覺只是CRM的信件）  

從Invitation裡的按鈕進入並依他的步驟一直往下走會進到下載plugin的頁面  
{% asset_img 20c872b148c50cde0b59847b9ad8a47e-767323.png %}

個人覺得這是Crashlytics的特色  
透過一套plugin讓使用者在設定過程中得到幫助與需要的說明  
並在有crash時提供一個清單讓你觀看  
這裡我試裝了XCODE與Eclipse兩個plugin  
XCODE會出現在右上角系統bar中  
{% asset_img 940352bececc230f3db3bbc654ba1292-770386.png %}

而Eclipse會出現在Eclipse Toolbar當中  
{% asset_img 55a952c8a6ee86818406f81d13070956-771720.png %}

以XCODE版為例  
一開始按下ICON後會出現以下畫面  
{% asset_img 797ee9ab8961ab14fac9c7e27d20dee9-777744.png %}

基本上就是將我的XCODE專案都列出來方便我選擇要使用Crashlytics的專案  
在這裡選擇專案以後會出現設定的說明如下  
{% asset_img 63978861f8946d0823a5c0d2ffaa4727-779625.png %}

這裡說明了要你在target中加一個Run Script並將設定內容列出來  
要注意的是這裡已經幫你在該專案中加了Crashlytics.framework  
當你完成設定並build之後他就會進到接下來的步驟像是framework設置以及程式碼的增加  
我覺得這個教學的步驟對新手而言可以保證他設定完成  
但對有經驗的人可能有點多餘  
另外提一下，Eclipse版在選完專案後甚至幫你把Androidmanifest.xml設定與程式碼加進去  

設定完成後就可以開始故意讓程式crash來測試  
此時crash就會出現在清單中了  
{% asset_img 3986cc0128d372e0c7b7f942da8bf0bc-781673.png %}

根據個人測試，plugin上的crash清單反應似乎沒有web快，需要多等幾分鐘才會出現  

點擊清單上的crash項目後會在瀏覽器上開啟該crash的詳細訊息  
{% asset_img 01e1ac2287bfd18fb2bc04042b70d818-783958.png %}
{% asset_img 1d56c7548fab83063804a0e779b93f9d-786311.png %}
此時就可以依照錯誤訊息除錯囉  

P.s. 尚未測試過，不確定NDK crash狀況是否可以正確呈現 