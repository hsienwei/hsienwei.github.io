title: cocos2d-x i9100 音效播放當機問題
date: 2013-08-06 14:56:22
tags: 
- cocos2d-x
- android
---
**問題描述**

使用版本cocos2d-x 2.1.3
特定機型 i9100音效播放時當機

**錯誤訊息**

    I/DEBUG (13020): *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** ***
    I/DEBUG (13020): Build fingerprint: 'samsung/GT-I9100/GT-I9100:4.0.4/IMM76D/ZSLPQ:user/release-keys'
    I/DEBUG (13020): pid: 14187, tid: 14200 >>> xxx.xxxxxx.xxxx <<<
    I/DEBUG (13020): signal 11 (SIGSEGV), code 1 (SEGV_MAPERR), fault addr 00000000
    .....
    I/DEBUG (13020): #00 pc 00521476 /data/data/xxx.xxxxxx.xxxx/lib/libgame.so (_ZN12OpenSLEngine16setEffectLoopingEjb)
    I/DEBUG (13020): #01 pc 00521dfa /data/data/xxx.xxxxxx.xxxx/lib/libgame.so (_ZN23SimpleAudioEngineOpenSL10playEffectEPKcb)

經查詢後發現cocos2d-x引擎在i9100上使用OpenSL(僅有這一隻)   故只有i9100出現此問題


**修改方式**

先說這不是個好做法

OpenSLEngine.cpp

    void OpenSLEngine::setEffectLooping(unsigned int effectID, bool isLooping)
    {
    
      if(sharedList().find(effectID) == sharedList().end()) return; //<--add this
    
      SLresult result;
      vector* vec = sharedList()[effectID];
      assert(NULL != vec);
    
      // get the first effect player that to be set loop config
      vector::iterator iter = vec->begin();
      AudioPlayer * player = *iter;

主要原因應該是sharedList()[effectID];取vector*時沒有該key的物件
但是vector這樣取會自行幫你產生一個物件
但該物件雖然不是NULL(故可避過assert檢查)又不是有效的物件
才會造成當機

引發的原因查詢後認為是如  http://www.cocos2d-x.org/boards/6/topics/26439 網頁上所講的一樣
因為i9100有音效數量限制所引發
之所以說這不是好做法是因為應該要減少使用音效數
或者作動態載入
緊急的狀況下只能先這樣做
但這樣做會有一些音效播不到