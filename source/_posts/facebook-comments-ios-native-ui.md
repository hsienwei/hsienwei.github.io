title: Facebook comments 在iOS用原生UI製作測試
date: 2014-04-08 14:45:00
tags: 
- ios
- facebook
---
這裡指的是social plugin中的comments
https://developers.facebook.com/docs/plugins/comments/
如果不要add comment的話應該是做的到的

本次專案中有一個功能是可以對某個頁面做FB comment
在網頁中可以用Facebook的plugin
但在app當中SDK沒有提供相關的UI可供使用
要使用的話必須用UIWebView加上plugin來達成

後來在Facebook的graph api當中找到有關的功能
https://developers.facebook.com/docs/graph-api/reference/object/comments/
裡面有提到Reading與Publishing的功能

但由於我使用的ID是網頁網址所以必須改一下


    [FBRequestConnection startWithGraphPath:@"/****** id *******/comments"]
    [FBRequestConnection startWithGraphPath:@"/comments/?ids=http://www.xxx.xxx.xx"]


在Reading的部分沒有問題，但在Publishing的部分就會收到錯誤訊息

    body =  {
            error = {
                code = 100;
                message = "(#100) Comments may not be added to a comment plugin";
                type = OAuthException;
                    };
            };
    

後來仔細查一下
發現原來這個功能是不能使用的
相關連結：
http://stackoverflow.com/questions/16810596/post-comment-via-graph-api-to-social-plugin-box
http://stackoverflow.com/questions/5673821/can-you-write-using-facebook-graph-api-to-a-web-sites-facebook-comment-module
https://developers.facebook.com/bugs/164794086987157

