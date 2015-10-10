title: JNI中是否需要自行呼叫DeleteLocalRef
date: 2013-05-22 23:43:46
tags:
- jni
- java
---

這是一個被問到我一時之間答不出來的問題，後來去找了一下

JNI電子書籍  
http://192.9.162.55/docs/books/jni/  
http://www.soi.city.ac.uk/~kloukin/IN2P3/material/jni.pdf  

下面是相關說明  
引自 http://192.9.162.55/docs/books/jni/html/refs.html

> A local reference is valid only within the dynamic context of the native method that creates it, and only within that one invocation of the native method. All local references created during the execution of a native method will be freed once the native method returns.  
> 
There are two ways to invalidate a local reference. As explained before, the virtual machine automatically frees all local references created during the execution of a native method after the native method returns. In addition, programmers may explicitly manage the lifetime of local references using JNI functions such as DeleteLocalRef.  

> Why do you want to delete local references explicitly if the virtual machine automatically frees them after native methods return? A local reference keeps the referenced object from being garbage collected until the local reference is invalidated. The DeleteLocalRef call in MyNewString, for example, allows the intermediate array object, elemArr, to be garbage collected immediately. Otherwise the virtual machine will only be able to free the elemArr object after the native method that calls MyNewString (such as C.f above) returns.  

基本上就是說

* Local Reference只在其創建方法的dynamic context內有效。
* 兩個狀況下Local Reference會失效：使用DeleteLocalRef，其創建方法返回時。
* 既然返回時會失效為啥要呼叫DeleteLocalRef，在於呼叫後就立刻允許VM回收而非等到方法返回之後。

個人感覺，這跟java中將用完物件的ref設為null的感覺很像。