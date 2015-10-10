title: GCM在無該服務的Exception
date: 2013-07-08 15:04:20
tags:
---
**問題**
把目前運行測試正常的檔案送給大陸廠商，卻發現無法進入遊戲

**解答**
後來弄到了出現問題的手機運行後發現下面的錯誤訊息

    Caused by: java.lang.UnsupportedOperationException: Device does not have package com.google.android.gsf
    E/AndroidRuntime( 787): at com.google.android.gcm.GCMRegistrar.checkDevice(GCMRegistrar.java:98)

須處理沒有該服務時例外狀況

重點在於大陸手機多沒有google服務
所以GCM部分需要處理 UnsupportedOperationException

所以
1. 在用google相關服務時須要考慮沒有該服務時的狀況(尤其大陸地區)
2. 相關服務須要找替代品(金流是很好找  但推播就真的比較少聽過了)