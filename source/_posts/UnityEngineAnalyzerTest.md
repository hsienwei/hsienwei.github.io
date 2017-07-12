title: UnityEngineAnalyzer測試記錄
date: 2017-07-12 10:16:55
tags:
- Unity
- UnityEngineAnalyzer
---
今年不同場合的Unity研討會好像都有提到Unity腳本靜態分析的分享，所以心血來潮測試一下Unity Engine Analyzer。  

1. 官方說安裝可以透過NnGet Package Manager搜索來找到，但是就我的狀況直接找是找不到的。  
因為我的vs2015內建的是https://www.nuget.org/api/v2/curated-feeds/microsoftdotnet/ 這個source  
需要的話連到[NuGet首頁](https://www.nuget.org/)可以看到下面有寫新的URL https://api.nuget.org/v3/index.json   
改用這個就可以找的到了。  

2. unity專案裡面一般會有三個: 一般, Editor, plugins，然而測試的時候安裝好像不會全部都幫你加上analyzer, 只會在其中的一個加上（我找不到他的邏輯）。
要在其他專案中加入的話, 只需要自行增加analyzer, 選擇ProjectPath\packages\UnityEngineAnalyzer.1.0.0.0\analyzers\dotnet\cs\UnityEngineAnalyzer.dll 就會加入了。

3. 目前提供9種檢查, 主要是不要使用一些耗效能的方法, 刪除空的方法, 避免使用coroutines這類的檢查, 有需要可以自己擴充。
