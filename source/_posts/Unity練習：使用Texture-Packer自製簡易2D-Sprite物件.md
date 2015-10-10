title: Unity練習：使用Texture Packer自製簡易2D Sprite物件
date: 2013-04-07 23:48:25
tags:
---

這是一個基本的練習，記載練習中學到的一些東西，基本上公司專案是使用NGUI這個plugin。  
檔案放在 https://github.com/hsienwei/Unity_2D_Sprite_Test  
呈現畫面大概如下  

{% asset_img b27c3e4548a2ec5a51d69c880381c09c-746777.png %}
{% asset_img 2f8385900ffdb08f8ec0603404810d1b-747761.png %}

## Texture Packer與JSON Parser ##
Texture Packer是一個功能很完整的工具軟體，可以讓你把一些分散的圖包成一個大圖，可以節省記憶體與加快讀取速度，在以前使用cocos2d-x時就常常在用，現在他也提供Unity 3D的格式，但以這個格式匯出的檔案基本上是一個JSON格式的檔案，只是副檔名存成txt，我想是因為Unity的TextAsset只能是.txt的檔案，另外在格式當中另外有JSON(Array)與JSON(Hash)都是JSON格式，主要差在Frame的資料是用array存或者是object存，Unity 3D的格式跟JSON(Hash)的內容是一樣的。

{% asset_img 44821a95d11d41671941ff6a4f99273e-750059.png [JSON(Hash) & Unity 3D] %}
{% asset_img 58f235ec98ad7704ff274a8bb16b46cf-751904.png [JSON(Array)] %}

確定為JSON格式後就是選擇parser，試了兩個現有的library(Asset store中也有但我沒試)  

http://wiki.unity3d.com/index.php/JSONObject  
這一個在讀Texture Packer的檔案時會有點問題，看了一下居然是無法處理空格囧，基本上要處理的話在`JSONObject.cs`中Line61加一行 `str = str.Replace(" ", "");` 就可以解決，但是後來想想還是算了。  

http://wiki.unity3d.com/index.php?title=UnityLitJSON  
這個是基於一個C#的JSON Library : LitJSON去做的，看了一下這個相關文件比較多而且比較便於使用。  
他提供了兩個用法:  

* Mapping JSON to objects  
* Readers and Writers  

我用的是Mapping JSON to objects，比較接近我以前的經驗。  
下面是LitJSON一些相關資料  
http://www.cnblogs.com/peiandsky/archive/2012/04/20/2459219.html  簡單介紹使用方法  
http://litjson.sourceforge.net/doc/manual.html  官方說明  

基本上上面的一些步驟有參考下面這兩篇  
http://blog.csdn.net/midashao/article/details/8220868  Unity3D之结合TexturePacker使用显示贴图  
但我用的不是JSON(Array) 且我用的LitJSON不是原版的，似乎有被加工處理  
http://tpathuis.tumblr.com/post/42501893370/texturepacker這一篇是Texture Packer中Unity 3D分類的Turtorial，這裡有一些Texture Packer的設定，我用的設定比較貼近這個，沒有開Allow rotation，但我有開Trim Mode。  

設定好後publish，就可以產出兩個檔案 一個txt檔一個png檔，將這兩個檔案放到unity project 中asset/resources資料夾中之後使用。
(註記一下如果要用Resources.Load()去讀檔案一定要放在名稱為"resources"的資料夾中)

## 建立Mesh物件 ##
2D Sprite由一個平面組成基本上只要兩個三角面，但Unity的內建的Plane有200個三角面，實在是多太多了，所以有必要自己弄一個面數較少的來使用。  
要建立Mesh資料，可以使用Mesh Filter這個component，然後再設定Mesh的vertices, uv與triangles，我的設定內容如下連結：  
https://github.com/hsienwei/Unity_2D_Sprite_Test/blob/master/Assets/script/Plane.cs  
我的做法是依照frame的資訊去設定vertices的寬高，跟NGUI的做法上不太一樣，NGUI的設定基本上寬高都是1*1，藉由調整Scale去調整為該frame的寬高，我的做法是設定vertices的位置為該frame的寬高，調整scale的話就是調整縮放比例。  
至於uv的部分就是將座標值轉成0-1之間的數值，另外由於座標系統不一樣，必須將y軸做調整。  

另外要注意因為每個atlas都是一張圖，所以在atlas物件中有一個material欄位是用來對各個sprite物件設定renderer的material，這裡主要是因為想要減少drawcall，下面是相關資料的連結：  
http://docs.unity3d.com/Documentation/Manual/DrawCallBatching.html  
Dynamic Batching的條件中有一項是使用相同的Material，所以我從之前各個sprite都自己new material物件改為在atlas讀檔時new material，在sprite設定時再參照到atlas的material，由於sprite的頂點夠少，所以unity會自動幫我們處理batching。  
(如果要自己使用batching script，在Import Package->script 匯入Standard Assets/Scripts/Utility Scripts內的兩個script)。

## editor ##
這個練習我寫了兩個主要的script，一個是atlas，另一個是Plane，這兩個我在做法上有點不同。
首先是atlas，他的畫面與部分程式碼如下
{% asset_img e393420d2c4f67038433399b9f3741e3-753607.png %}
{% asset_img a5783729a8ecd4c2dd0964bc2d311803-754879.png %}

主要設定 TextAsset這個欄位，下面的一些資訊會自動生成(我這裡有一點bug，設定好TextAsset 後需要play一次下面的資訊才會出現)，基本上這邊我只有使用最簡單的方式，也就是在程式的部分設定為public，這些值就會出現在Inspector介面中供調整，TextAset以下的其實可以不要出現在Inspector，但為了方便看相關資訊所以讓他出現。  

下面的是Plane這個sprite
{% asset_img f2d055e6a8a991cfb37d28fb3bd17184-755749.png %}

這一個主要是使用custom editor，自己寫一個editor的類別去處理這個script在Inspector中顯示的GUI介面，程式碼如下  
https://github.com/hsienwei/Unity_2D_Sprite_Test/blob/master/Assets/editor/PlaneEditor.cs

可以參考一下editor類別的說明 http://docs.unity3d.com/Documentation/ScriptReference/Editor.html  
還有官方文件http://docs.unity3d.com/Documentation/Components/gui-ExtendingEditor.html  
相關教程 http://www.youtube.com/watch?v=WlGwBmM-dfA  

自己記錄的幾個點

* 要用custom editor 要在前面加上 [CustomEditor(typeof(CLASS))]
* 繼承 Editor
* 要放在editor資料夾
* 可以使用OnEnable, OnInspectorGUI兩個方法，OnEnable會在該GUI出現時執行一次，OnInspectorGUI會執行數次(我還不確定次數的根據)
* 如果改了Scene裡的物件屬性有時候不會及時更新，可呼叫SceneView.RepaintAll();
* 可用GUI.changed去判定是否有變更過屬性
* 基本上你在GUI修改數值是不會被存起來的(play時或play完就會回到原樣)，需要用EditorUtility.SetDirty告訴Unity存起來
* 使用target存取目標物件  
* 可以使用SerializedObject輔助，修改target時SerializedObject取property會是改變前的數值(相關討論 http://answers.unity3d.com/questions/43611/oninspectorgui-using-the-default-object-selection.html)  

大概就是這樣，這個練習應該還有一些bug，但基本上我學了不少