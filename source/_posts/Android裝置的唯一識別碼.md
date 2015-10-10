title: Android裝置的唯一識別碼
date: 2012-02-29 00:20:11
tags: 
- android
---

先講我的結論：沒有一個方法是保證百分之百適用於全部的裝置

以下列出找到的一些方法

1. The IMEI/MEID     
TelephonyManager.getDeviceId()  
不能用的原因: IMEI有重複的疑慮(不肖廠商為省錢用相同的)

2. ANDROID_ID Settings.Secure.ANDROID_ID  
不能用的原因：回原廠設定可能改變，root手機可改，某些廠牌取出來的都一樣

3. Serial Number android.os.Build.SERIAL  
A hardware serial number, if available. Alphanumeric only, case-insensitive.  
不能用的原因：僅2.3以上版本支援  

4. Mac Address(wifi, BlueTooth)  
不能用的原因：官方不推，首先非全部裝置都有WiFi，其次如果關閉，可能會取不到(以下Ref2中有人試過)

5. Pseudo-Unique 請看Ref3第2項  
不能用的原因：還是有可能相同

參考資料   
Ref1: http://android-developers.blogspot.com/2011/03/identifying-app-installations.html  
Ref2: http://groups.google.com/group/android-developers/browse_thread/thread/48c7e15935a29eb1  
Ref3: http://www.pocketmagic.net/?p=1662  
Ref4: http://innovator.samsungmobile.com/cms/cnts/knowledge.detail.view.do?platformId=1&cntsId=9640  