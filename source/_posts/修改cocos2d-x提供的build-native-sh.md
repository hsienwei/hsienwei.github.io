title: 修改cocos2d-x提供的build_native.sh
date: 2013-05-23 22:41:27
tags: 
- cocos2d-x
---

在cocos2d-x專案中要編譯native code時會用到build_native.sh來做編譯，這個Bash腳本會使用NDK的ndk-build  

隨著專案越來越複雜有些需求需要特別去處理,以我自己的狀況來講，須要分為Debug與Release兩個版本以及分為國際版與韓國版，上述兩個部分都可以經由修改build_native.sh來達到，下面會分成幾個部分來說：

先列出幾個教學網站  
http://www.ibm.com/developerworks/cn/linux/l-bash-parameters.html  
http://linuxconfig.org/Bash_scripting_Tutorial#18-redirections  
http://linux.vbird.org/linux_basic/0340bashshell-scripts.php  
我都是有需要在去查

基本上這個部份我是在版本2.0.3加的  但是最新的2.1.3應該也可用
## 選項修改 ##
原本build_native.sh中的選項部分的程式碼如下  
其實要不是因為要改這個部份我還不知道這個腳本有選項可以用  

    while getopts "sh" OPTION; do  
    case "$OPTION" in  
    s)  
    buildexternalsfromsource=1  
    ;;  
    h)  
    usage  
    exit 0  
    ;;  
    esac  
    done  
上面的寫法主要是處理"-s"這種型態的選項，也就是說如果今天的的指令是長下面這樣：  
`bash build_native.sh  -s  xxx`  
就只會處理-s的部分。

原本是想說就再加一個選項，結果並不如我想的這樣簡單，基本上先看到下面跟ndk-build有關的程式碼如下  

    "$NDK_ROOT"/ndk-build -C "$APP_ANDROID_ROOT" $* \
    NDK_MODULE_PATH=${COCOS2DX_ROOT}:${COCOS2DX_ROOT}/cocos2dx/platform/third_party/android/source"  
重點在於`$*`代表該腳本的所有參數，如果今天我用了一個ndk-build已經有的參數就會影響ndk-build的行為，如果用了一個沒有的又會說是一個invalid option。

此時有兩個做法  一個是把 $*拿掉，但是這樣有一個缺點，原本可以下如下指令  
`bash build_native.sh clean`，也就是`ndk-build clean`，就會變成不能用。

另一個做法就是在選項的部分作修改，以下是我的改法：

    for p in $*
    do
         echo "$p"
         case $p in
              "kr")
                   echo "force build kr"
                   forcebuildkr=1
                   #Can not pass this parameter to next call bash
                   ;;
              "debug")
                   echo "get debug"
                   debugflag=1
                   #Can not pass this parameter to next call bash
                   ;;
              "-s")
                   buildexternalsfromsource=1
                   param="$param$p "
                   ;;
              "-h")
                   usage
                   exit 0
                   ;;
              *)
                   param="$param$p "
                   ;;
         esac
    done  
這是另一種選項的做法，以上面提到的`bash build_native.sh  -s  xxx`，在這裡就會全都處理到，又由於我不想全部選項都傳到`ndk-build`，所以該傳的我就存在`$param`，再把`$`*改為`$param`即可，此時我已經可以透過選項來選擇我要怎樣的版本。

## 利用Application.mk分不同的版本 ##
在最早的時候，我在分debug與release版的時候是直接去android.mk中修改CPPFLAG，後來覺得實在是太麻煩要改來改去，就採取我現在使用的方法

ndk-build有一個選項：`ndk-build NDK_APPLICATION_MK=`，可以讓你自己指定要使用的Application.mk，所以我將不同狀況需要的CPPFLAG設定寫到不同的Application.mk檔中，再依照選項不同設定不同的數值去決定到底要用哪一個，大概如下：

    if [[ "$debugflag" ]]; then
         echo "debug on!!"
         if [[ "$forcebuildkr" ]]; then
              echo "force build kr!!"
              usedebugappmk="${APP_ANDROID_ROOT}/jni/Application_debug_kr.mk"
         else
              echo "build global!!"
              usedebugappmk="${APP_ANDROID_ROOT}/jni/Application_debug.mk"
         fi
    else
         echo "debug off!!"
         if [[ "$forcebuildkr" ]]; then
              echo "force build kr!!"
              usedebugappmk="${APP_ANDROID_ROOT}/jni/Application_kr.mk"
         else
              echo "build global!!"
              usedebugappmk="${APP_ANDROID_ROOT}/jni/Application.mk"
         fi
    fi
    "$NDK_ROOT"/ndk-build NDK_APPLICATION_MK="$usedebugappmk" -C "$APP_ANDROID_ROOT" $param \
    "NDK_MODULE_PATH=${COCOS2DX_ROOT}:${COCOS2DX_ROOT}/cocos2dx/platform/third_party/android/prebuilt"

## 控制資源 ##
一般cocos2d-x專案的資源檔都放在Resource資料夾下，後來我遇到了某種情況是某些檔案只在android狀況下改變，所以我另外開個一個資料夾Resource_android，在原本的# copy resources腳本下，添加了一段處理android特有資源的程式：

    # copy ver android
    for file in "$APP_ROOT"/Resource_android/*
    do
    if [ -d "$file" ]; then
        cp -rf "$file" "$APP_ANDROID_ROOT"/assets
    fi
    if [ -f "$file" ]; then
        cp "$file" "$APP_ANDROID_ROOT"/assets
    fi
    done
另外也可以將腳本寫在別的.sh中在去呼叫如下  

    if [[ "$debugflag" -ne 1 ]]; then
         echo "delete .lua .bat .exe"
         if [ -e "del_lua.sh" ]; then
              ./del_lua.sh
         fi
    fi
專案在做release版時會將lua檔全部刪除，這部分是寫在另一個.sh中。