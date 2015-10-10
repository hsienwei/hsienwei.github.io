title: JNIEnv錯誤使用紀錄
date: 2011-07-20 01:00:38
tags:
- jni
---

最近專案有需要從cocos2d-x接Open Feint的功能  
所以必須要從c++ call Java code  
不過犯了一個極大的錯誤  

一開始activity在啟動時呼叫一個function  
記錄該方法傳入的JNIEnv的指標  
做為C call Java code時使用  
在成就上傳時常常會死當  
後來剛好ndk r6出來後就用ndk-stack來除錯  
發現是JNIEnv指標出問題  

後來再查資料才知道JNIEnv指標與Thread有關  
像我這樣的作法是會有問題的  
穩當的作法是存JavaVM指標  

* JNI_OnLoad  
* JNI_CreateJavaVM  

再以JavaVM取JNIEnv  

* AttachCurrentThread  
* GetEnv  

以下為相關資料  
http://java.sun.com/docs/books/jni/html/other.html  
http://download.oracle.com/javase/1.4.2/docs/guide/jni/spec/invocation.html  
http://blog.sina.com.cn/s/blog_6111ce890100q1b7.html  
http://home.eeworld.com.cn/my/space.php?uid=111224&do=blog&id=34765  
http://newfaction.net/2011/03/29/restrictions-on-calling-thread-jnienv.html  
http://www.cppblog.com/sherrylso/archive/2011/02/18/140254.html  