title: 使用ant編譯apk檔
date: 2013-08-15 14:51:37
tags: 
- ant 
- android
---

在一般的狀況下最為人所知產出apk的方法是使用ADT eclipse plugin功能來產出APK檔 
(Android Tools->Export Signed/Unsigned Application Package)
但除此之外android也提供開發者經由ant產出apk檔
mac中有內建ant
所以可以在mac的終端機下指令來產出apk檔

那為何要使用ant
如果今天要產出多種版本 你必須要打開你的eclipse分別打開多個專案然後Export Signed/Unsigned Application Package
等於同樣步驟要作三次
而且還需要輸入密碼
而且你必須待在電腦旁邊

如果今天用ant來編的話  你可以指定一次編多種版本  也不用在輸入任何東西(前提是有寫到設定檔)
像我之前有產出10個檔案的需求(五個market api * 2(debug/release))
通常在離開公司時執行
隔天就可以寄出檔案了

以下寫一些在cocos2d-x中使用ant的經驗
使用cocos2d-x建立的android專案中
會比一般的android project多出以下的檔案
build.xml - ant使用的專案設置
local.properties - 裡面會有sdk的路徑設定值
ant.properties - 預設是空的  但可以在這裡設置編apk檔時使用的key相關設定
要注意的是如果你的android專案有使用其他的android專案當作library
那個專案也需要有這三個檔案

編譯的方式是在終端機下指令

    ant <target>

如果沒有給target的話  會跑設定的預設target

在build.xml當中會匯入另一個custom_rules.xml，如果沒有的話就不會處理custom_rules.xml
<import file="custom_rules.xml" optional="true" />
在這裡的註解中有提到你可以在custom_rules.xml使用的target

    -pre-build
    -pre-compile
    -post-compile
    -post-package
    -post-build
    -pre-clean

基本上就如同target的名稱一樣 你在哪個階段有需求就去寫那個target


比方說我有需求是將編出來的檔案集中到一個資料夾中並讓檔名出現編譯時間, 版本資訊
所以我用到-post-build 內容如下

    <target name="-post-build">
          <tstamp>
              <format property="package.time" pattern="yyyyMMdd_HHmm"/>
          </tstamp>
          <property name="apk.copy.name" location="../android_build_apk/${ant.project.name}_${apk.tag}_${build.android.param}_${package.time}.apk" />
          <echo>copy ${out.final.file}</echo>
          <echo>to   ${apk.copy.name}</echo>
          <copy file="${out.final.file}" tofile="${apk.copy.name}"/>
    </target>


上面這個target會將編譯產出的apk複製到指定目錄並變更檔名
build.android.param 這個property是設定編譯時是測試版(debug)還是正式版(release)
apk.tag是我設定在ant.properties中用來表示這是那個市場的版本
這樣產出來的檔名會是project.name_xxx_release_20130705_1453.apk的樣子

如果是產出signed Application Package
在編譯的過程中會要求你輸入key的相關資訊
表示你產出多個檔的話就要輸入多次
其實可以把相關需要的參數設定到ant.properties中
就不需要輸入了
詳細的參數名稱可以參閱${sdk.dir}/tools/ant/build.xml
看看需要哪個property
我的狀況如下

    key.store=../libs/android/keystore/igsgames.keystore
    key.alias=xxx
    key.store.password=xxxxxxxx
    key.alias.password=xxxxxxxx
    apk.tag=gplay

這樣可以不用每次輸入
但相對表示你把密碼打在檔案中給人看
所以你可以在執行ant時使用-Dproperty="xxx"這樣的方式輸入property
就不會有這樣的問題了

用ant其實還滿方便但是資料不太多
除了ant in action這本書外就是網站資料
另外在Android Studio中使用Gradie又是不同的系統
不知道下個專案還會不會有機會用ant