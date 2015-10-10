title: Lua預編譯
date: 2011-12-05 00:29:19
tags:
---

Lua預編譯主要好處：加載更快，與保護source code免於被用戶修改(另外還有檔案更小)。


方法：

1. 安裝luaforwindows  
http://code.google.com/p/luaforwindows/
2. 安裝後設定系統Path 加上lua安裝路徑  
    預設應該是 `C:\Program Files\Lua\5.1`
3. 開cmd, 輸入luac 測試一下可不可以執行
4. 可以的話可開始使用, 使用方法如下：  
    `luac -o [預編譯後檔案路徑] [要預編譯檔案路徑]` (可將多個檔案預編成單一檔案)

以下是lua學習參考資料  
http://linux.die.net/man/1/luac  
http://blog.chinaunix.net/space.php?uid=380521&do=blog&id=2412459  
http://timothyqiu.com/2011/lua-note-02-table-traversal-using-c-api/  