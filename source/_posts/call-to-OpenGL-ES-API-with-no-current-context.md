title: call to OpenGL ES API with no current context
date: 2012-11-02 23:20:00
tags: 
- opengl
- cocos2d-x
---

Logcat中的錯誤訊息如下  
`call to OpenGL ES API with no current context (logged once per thread)`

## 問題起因 ##
簡單的說  
不能在OpenGL Thread以外的Thread呼叫OpenGL指令  

我遇到的實際情況是使用cocos2dx實作一個按鈕  
點擊後會使用JNI呼叫Java以連接其他人提供的程式庫  
該程式庫會處理一些事情後經過Listener callback 呼叫 Native Method  
該Native Method會使用OpenGL 指令繪圖  
此時會出現這個錯誤  
可能是其他人的程式庫callback時在UI Thread或者是其他的Thread造成這個問題  

## 解決方式 ##
可以參照以下這篇  
http://stackoverflow.com/questions/5234867/using-opengl-from-the-main-thread-on-android  
使用GLSurfaceView.queueEvent就可以解決  
在cocos2dx中可以直接使用Cocos2dxActivity.runOnGLThread  
或者是修改程式碼在callback呼叫Native Method時改變作法不要直接呼叫繪圖指令  
等到回到OpenGL Thread時再處理  
