title: lua的decompiler & checksum檢查
date: 2012-02-29 00:23:29
tags:
---

之前的文章{% post_link Lua預編譯 [Lua預編譯] %}有提到預編譯可保護source code免於被用戶修改，但在最近的專案中有人修改預編譯的lua檔達到作弊的效果，雖然看來像是硬改的，但仍對lua的decompiler做了一下搜尋，找到了下面的東西：

[LuaDec51 - A Lua Decompiler for lua 5.1.x](http://luadec51.luaforge.net/)

這東西可以將預編譯後的lua檔反編譯，還原成一般人都看的懂的樣子，因此對於預編譯後的lua做防護仍有必要，主要的問題在於要選擇哪一種作法，最後是選擇用Checksum而不用加解密的方式，因為較快且基本上這個專案的設定一般玩家看到也不會有什麼問題。

程式庫的選擇上，最後是選擇了[hashlib++](http://hashlib2plus.sourceforge.net/)，因為較小(專注於checksum )且便於使用(兩行code就可以取一個檔案的MD5)，並且在編譯上沒有其他需要特別修改的地方，搭配cocos2d-x基本上沒有問題。