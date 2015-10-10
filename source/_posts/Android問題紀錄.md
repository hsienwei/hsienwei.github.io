title: Android問題紀錄
date: 2013-05-31 22:10:21
tags: android 
---
1.    
**問題：**    
一次更新後，所有純平版裝置都無法在Google Play中看到該App，該次更新主要提供使用簡訊小額付費機制    
**解答：**    
http://developer.android.com/guide/topics/manifest/uses-feature-element.html    
因為簡訊寄送需要增加`SEND_SMS`這個Permission，連帶會自動將`android.hardware.telephony`這個feature設為需求    
解法為在 androidmanifest中增加`<uses-featureandroid:name="android.hardware.telephony"android:required="false"/>`

2.    
**問題：**    
遊戲當中並沒有使用到menu鍵，但是只要手機沒有實體menu鍵的話都會出現虛擬menu鍵    
**解答：**    
http://stackoverflow.com/questions/7035325/how-i-hide-the-menu-button-for-one-activity    
之前我沒有設定targetSdkVersion，由於targetSdkVersion預設等於minSdkVersion，而我設定的值為9，被判定為legacy，則會顯示虛擬menu鍵    
targetSdkVersion設為14後則解決

3.    
**問題：**    
targetSdkVersion換成14後的測試期間，發現home鍵與power鍵兩種進入讓遊戲進入背景的方法的行為不同    
**解答：**    
請直接看 http://blog.csdn.net/hunter_hb/article/details/8572095    
解說的十分詳細    
我的設定是orientation 修改後解決    