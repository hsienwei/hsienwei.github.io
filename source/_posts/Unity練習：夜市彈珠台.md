title: Unity練習：夜市彈珠台
date: 2013-11-13 17:29:01
tags:
- unity
---
Demo：https://dl.dropboxusercontent.com/u/10581994/pinball/pinball.html
Github：https://github.com/hsienwei/pinball_unity

玩法就是按一下滑鼠左鍵放球，再按著滑鼠左鍵蓄力，放開後發射，當球都打完後按一下滑鼠左鍵會讓球掉到下面重來。

感覺上沒有花太多時間在寫程式，反而弄Model跟動作的處理比較花時間。

物理部分就完全用Unity內建的功能，主要只有調整Physic material來做到彈珠打到釘子會有彈回的效果，另外有將Time.fixedDeltaTime調小，不然速度快的時候球會飛出去，或者物理的行為不精準。

動作部分，球台下面的檔板基本上使用3ds Max中作的動畫，發射的動畫本來也是要用3ds Max來做，但是由於放到Unity中位置會跑掉，所以後來直接用Unity的Animation來處理。

Shader部分由於本來美術就不是專長，所以直接用一個內建的shader；另外沒有2D介面，之後再來試試看4.3的2D功能。