title: iOS中播放youtube影片經驗
date: 2014-04-07 14:41:36
tags: 
- ios
- youtube
---

iOS不像android一樣有提供youtube的API，要播放youtube影片需要使用UIWebView + youtube iframe api

### 使用iframe api ###
http://apiblog.youtube.com/2009/02/youtube-apis-iphone-cool-mobile-apps.html

> "the current best practice for embedding YouTube videos in an iOS application is to use the YouTube iframe Player within a UIWebView container."

所以基本上這個方法應該是最好的方法，但由於使用iframe需要寫javascript，一開始因為我懶的關係，所以我先試過一些其他的程式庫，但我最後放棄了（見最後一段）

https://developers.google.com/youtube/iframe_api_reference?hl=zh-TW
這裡面提供了相關API資訊

個人寫的讀取用js code

    <script src="http://www.youtube.com/iframe_api" type="text/javascript"></script>    
    <script type="text/javascript">    
      function onYouTubeIframeAPIReady() {    
        player = new YT.Player('player', {
          width: '%d',
          height: '%d',
          videoId: '%@',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          },
          playerVars: {
            'playsinline':'%d',
            'controls':'1',
          }
        });
      }
      function onPlayerReady(event) {
        window.location = 'js-call://youtubeStart';
        event.target.playVideo();
      }
      function onPlayerStateChange(event) {
        if(event.data == YT.PlayerState.ENDED)
        {
          window.location = 'js-call://youtubeEnd';
        }
      }
    </script>

* 由於autoplay參數無法用在mobile裝置, 所以如果要讀取自動播放就要在onPlayerReady中來做
*  可以在onPlayerStateChange中取YT.PlayerState.ENDED事件來知道影片播放完畢
*  playerVars的playsinline是說播放時是要在指定範圍內還是要全螢幕播放(後來再是似乎已無用)
*  window.location = 'js-call://xxxxxx' 可在UIWebViewDelegate shouldStartLoadWithRequest中接收並處理

### 偷吃步 api ###
**註：iOS 8 已無法使用**

由於沒有提供API供使用，所以有些事件是取不到的，像是進入全螢幕以及離開全螢幕的事件，由於一般使用MPMoviePlayerController都是有notification可以使用，如MPMoviePlayerWillEnterFullscreenNotification以及MPMoviePlayerWillExitFullscreenNotification，但經由UIWebViewController播放的影片並不會有這兩個事件發生，故在這裡必須要用私有API，會有被reject的風險，但值得試試看
http://stackoverflow.com/questions/8518719/how-to-receive-nsnotifications-from-uiwebview-embedded-youtube-video-playback

**取得UIMoviePlayerController**    
除了事件取不到以外，也沒有辦法可以以程式去控制是否為全螢幕，由於知道底層仍然是使用UIMoviePlayerController，所以如果可以取得到的話就可以使用setFullscreen方法來控制

https://gist.github.com/romainbriche/2308668
這個連結提供一個做法去取得該物件，但其實我試了似乎沒效，但可以發現到裡面有FigPluginView的存在（詳細請見下一段），查找資料確認仍有UIMoviePlayerController在其中只是沒有提供方法取用，後來找到一個可行的做法就是藉由NSNotification的callback method來取得

    -(void) myMovieEnterFullScreen: (NSNotification*) aNotification
    {
        moviePlayer = aNotification.object;
      /* 以下省略 */
    }

當然這樣做還是得要用到上一段說到的私有API

**quick time plugin 與 player controller**
上一段當中有提到我在UIWebView當中找到一個FigPluginView的存在
這個物件與UIWebView, MPMoviePlayerController的關係可見以下連結
http://blog.csdn.net/hursing/article/details/8896170
詳細說明了播放youtube影片的底層還是使用MPMoviePlayerController

### 曾試用過的library ###

**HCYoutubeParser**    
一開始可以用, 它的作用是幫你抓出youtube實際的播放串流URL，剛開始的時候採用(2月初)，但大約3月時發現不能用了，似乎是資料格式有變動，由於這方面我並不熟所以放棄使用    
**XCDYouTubeVideoPlayerViewController**    
原理同上，一開始就不能用    
**UIWebView-YouTube--iOS-Category--ARC-compliant-code**    
幫UIWebView加上Category讓你方便播放，但只有陽春功能且非使用iframe故放棄    

---
20140502

**UIWebView的相關設定**    
mediaPlaybackRequiresUserAction --- 是否可自動播放或經用戶控制    
allowsInlineMediaPlayback --- 是否可以inline    
mediaPlaybackAllowsAirPlay --- 是否有airplay功能    

**inline的播放行為**    
經測試如果inline時點擊播放會自動全螢幕播放    
但如果使用js呼叫player.playVideo()則不會變成全螢幕    