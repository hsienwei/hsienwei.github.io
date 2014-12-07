title: 使用sublime為unity編輯器 in mac之CompleteSharp設定障礙排除
date: 2014-06-27 02:51:40
tags:
- unity
- sublime
---
標題下得很長
基本上是記載依照http://wiki.unity3d.com/index.php/Using_Sublime_Text_as_a_script_editor的步驟進行時
CompleteSharp這個plugin在mac環境上遇到的一些問題

1. CompleteSharp的安裝
個人測試在windows可以用package control直接安裝成功
而在mac下會出現Unable to download CompleteSharp的錯誤
這時候只能手動安裝
有兩種選擇
a) clone  https://github.com/ewilde/CompleteSharp 到 Package資料夾
不需其他處理(建議)
b) 需事先安裝mono (下載http://www.go-mono.com/mono-downloads/download.html)
clone  https://github.com/quarnster/CompleteSharp 到 Package資料夾
再執行CompleteSharp/build.py

2. CompleteSharp project setting
在mac環境中會用到completesharp_mono_path這個參數
wiki中寫的completesharp_mono_path是3.x 版時的路徑
4.x版可改為如下
{% gist ad4564e649a60996d9b0 %}