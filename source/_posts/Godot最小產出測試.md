title: Godot最小產出測試
date: 2020-11-10 00:03:56
tags:
- godot
---
# Godot
一個開源的遊戲引擎並具備編輯器，第一次知道這個遊戲引擎是大概2年前偶然發現的，會記錄這篇文章的原因主要是想知道這個引擎產出的release版遊戲大概最小可以到什麼程度，這在網頁遊戲來講還滿重要的。
以前曾經用unity產出幾個非常簡單的網頁遊戲大概都要4M起跳，其實跟一般html5的framework(如pixi.js)的所需檔案大小相差甚遠(V4.4.5 約403KB)。

# 初始系統安裝
1. 安裝python 3.8
2. 安裝scons
`python -m pip install scons`
3. [設定c/c++ compiler](#設定cc-compiler)

# 下載 godot source code
一開始以為是要在遊戲專案下使用scons，會有以下訊息
>scons: *** No SConstruct file found.
File "d:\dev\python\python38\lib\site-packages\SCons\Script\Main.py", line 947, in _main

後來看了[這篇](https://godotengine.org/qa/24836/compiling-for-the-web-no-sconstruct-file-found)才發現是要下載原始碼，在godot 原始碼目錄下使用

個人使用 3.2.3-stable 
release 連結如下
https://github.com/godotengine/godot/releases/tag/3.2.3-stable
或者也可以使用 git clone tag 3.2.3-stable

下載結束後，可以執行`scons platform=list`

```
> scons platform=list
scons: Reading SConscript files ...
The following platforms are available:

        windows
```

一開始只會有windows，scons會檢查是否有相關toolchain
https://godotengine.org/qa/30417/scons-build-only-has-windows-platform

# 設定c/c++ compiler
如果遇到下面的訊息
```
scons: warning: No version of Visual Studio compiler found - C/C++ compilers most likely not set correctly
File "D:\godot\test\SConstruct", line 3, in <module>
ModuleNotFoundError: No module named 'glsl_builders':
  File "D:\godot\test\SConstruct", line 15:
    import glsl_builders
```
表示需要安裝VS compiler, 此時可參照下面網頁內容
https://wiki.python.org/moin/WindowsCompilers
我使用python 3.8 故照[這一節](https://wiki.python.org/moin/WindowsCompilers#Microsoft_Visual_C.2B-.2B-_14.2_standalone:_Build_Tools_for_Visual_Studio_2019_.28x86.2C_x64.2C_ARM.2C_ARM64.29)處理

# 編譯web版
主要參照以下內容
https://docs.godotengine.org/en/stable/development/compiling/compiling_for_web.html

安裝emscripten
https://emscripten.org/docs/getting_started/downloads.html
參照這個連結，照著操作就可以
唯一要注意的點是每次要編譯前需要設定環境
只要執行sdk底下的`emsdk_env.bat`就可以

設定成功後輸入`scons platform=list`應該會多出一個新的選項

```
scons platform=list
scons: Reading SConscript files ...
The following platforms are available:

        javascript
        windows 
```

看到javascript後可以輸入`scons platform=javascript tools=no target=release -j 4`開始編譯，如果編譯成功的話檔案會在`godot_root/bin/godot.javascript.opt.zip`。如果`target=release_debug`的話會是`godot_root/bin/godot.javascript.opt.debug.zip`,`-j 4`是使用多核編譯

根據[這一節](https://docs.godotengine.org/en/stable/development/compiling/optimizing_for_size.html)的內容，我們可以藉由關閉一些功能來減少產出的程式庫大小，其調整可以使用console的選項，但godot提供另一個方法，可以放一個`custom.py`檔案來設置選項，並且提供[工具](https://godot-build-options-generator.github.io/)來生成這個檔案，以下是我使用的設置
```
# Generated using https://godot-build-options-generator.github.io

disable_3d = "yes"
optimize = "size"
disable_advanced_gui = "yes"
deprecated = "no"
module_arkit_enabled = "no"
module_bmp_enabled = "no"
module_bullet_enabled = "no"
module_camera_enabled = "no"
module_csg_enabled = "no"
module_dds_enabled = "no"
module_enet_enabled = "no"
module_etc_enabled = "no"
module_gdnative_enabled = "no"
module_gdnavigation_enabled = "no"
module_gdscript_enabled = "no"
module_gridmap_enabled = "no"
module_hdr_enabled = "no"
module_jpg_enabled = "no"
module_jsonrpc_enabled = "no"
module_mbedtls_enabled = "no"
module_mobile_vr_enabled = "no"
module_ogg_enabled = "no"
module_opensimplex_enabled = "no"
module_opus_enabled = "no"
module_regex_enabled = "no"
module_stb_vorbis_enabled = "no"
module_tga_enabled = "no"
module_theora_enabled = "no"
module_tinyexr_enabled = "no"
module_upnp_enabled = "no"
module_vorbis_enabled = "no"
module_webm_enabled = "no"
module_webp_enabled = "no"
```
應該是能關的都關了，唯一沒關的是`Enable module: FreeType`,關了之後我遇到編譯錯誤，所以就放棄了，這樣編譯的`godot.wasm`檔案大小是10051KB，沒有使用`custom.py`的檔案大小是14643KB

# 後記
這裡有[一篇文章](https://www.reddit.com/r/godot/comments/8b67lb/guide_how_to_compress_wasmpck_file_to_make_html5/)是以壓縮wasm來減少檔案大小，但其實應該Unity也是做得到，且壓縮後大小還是有其限度，故參考即可。