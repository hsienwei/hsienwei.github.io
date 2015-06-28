title: cocos2d-x中使用wxWidget
date: 2015-02-23 09:45:59
tags:
- cocos2d-x
- wxWidget
---
最近在研究製作cocos2d-x的編輯器，所以嘗試了一下怎麼跟gui程式庫作結合
這篇是測試如何跟wxwidget結合使用的初步測試

以下測試使用cocos2d-x 3.4 與 wxWidget 3.0.2


0. 先準備一個新的cocos2d-x專案(或使用之前就有的)

1. 下載wxWidgets Binaries
下載頁面在http://sourceforge.net/projects/wxwindows/files/3.0.2/binaries/
我抓的是`wxMSW-3.0.2_vc120_Dev.7z`

2. 下載Headers
下載頁面在http://sourceforge.net/projects/wxwindows/files/3.0.2/
檔案為`wxWidgets-3.0.2_headers.7z`

3. 解壓縮兩個檔案並放在同一資料夾當中
該檔案夾應該會有include與lib兩個子資料夾
我是放在`D:\wxwidget_3_2\`

4. 專案屬性頁中 `組態屬性>C/C++>一般>其他include目錄`，加入
{% code lang:asciidoc %}
D:\wxwidget_3_2\include
D:\wxwidget_3_2\lib\vc120_dll\mswud
{% endcode %}

5. 專案屬性頁中 `組態屬性>C/C++>前置處理器>前置處理器定義`，加入
{% code lang:asciidoc %}
WXUSINGDLL
HAVE_SSIZE_T
{% endcode %}

6. 專案屬性頁中 `組態屬性>連結器>輸入>其他相依性`，加入
{% code lang:asciidoc %}
wxbase30ud.lib
wxbase30ud_net.lib
wxbase30ud_xml.lib
wxexpatd.lib
wxjpegd.lib
wxmsw30ud_adv.lib
wxmsw30ud_aui.lib
wxmsw30ud_core.lib
wxmsw30ud_gl.lib
wxmsw30ud_html.lib
wxmsw30ud_media.lib
wxmsw30ud_propgrid.lib
wxmsw30ud_qa.lib
wxmsw30ud_ribbon.lib
wxmsw30ud_richtext.lib
wxmsw30ud_stc.lib
wxmsw30ud_webview.lib
wxmsw30ud_xrc.lib
wxpngd.lib
wxregexud.lib
wxscintillad.lib
wxtiffd.lib
wxzlibd.lib
{% endcode %}

7. dll檔設置
看是要把dll copy到執行目錄或者在環境設置中設定PATH都可以

8. 修改main.cpp
{% gist 10524981e5d15f92d25c %}
這樣應該就可以了
要注意的是我在HelloWorld中增加了一個singleton方法方便我取得HelloWorld物件作測試
順利的話可以看到有兩個視窗，一個是原本的cocos2d-x執行視窗，一個是wxWidget產生的視窗
在wxWidget視窗的按鈕按下去會新增一個Label到Layer中
