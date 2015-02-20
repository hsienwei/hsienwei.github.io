title: Spine二進制檔轉json檔測試
date: 2015-02-21 00:31:40
tags:
- cocos2d-x
- spine
---
由於cocos2d-x目前版本(3.4)仍然不能讀取spine 2.0後推出的binary格式(.skel)
加上自己沒有購買spine所以不能將binary檔匯入後再輸出為json格式
所以嚐試自己弄一個轉換的小工具
雖然最後沒有使用
但還是記載一下過程

---

由於spine官方目前有支援binary的runtime似乎只有libgdx
所以下面主要會以參考libgdx的方式來進行

1. 使用eclipse新建一個java application

2. 下載spine libgdx程式庫，放在src下

3. 下載libgdx release版本(本次測試使用1.5.3)
解開後將gdx.jar加入專案
由於由於裡面有使用到nativecode
打開gdx-natives.jar
將需要的library取出(這裡使用的是libbdx64.dll)
並在讀入該library
{% code lang:java %}
static {
    System.loadLibrary("gdx64");
}
{% endcode %}	
如果有找不到lib的狀況要記得在VM Arguments中加入下面內容
`-Djava.library.path=D:\workspace_new\SpineBinary2Json\libs`

4. 新增libgdx的application並實作applicationListener
Application我是使用LwjglApplication，所以要將gdx-backend-lwjgl.jar與gdx-backend-lwjgl-natives.jar加入專案裡
之所以要這樣弄是因為我原本以為可以直接將TextureAtlas物件建立起來並生成SkeletonData
後來發現會出現錯誤如下
{% code lang:asciidoc %}
Exception in thread "main" java.lang.NullPointerException
	at com.badlogic.gdx.graphics.GLTexture.createGLHandle(GLTexture.java:197)
	at com.badlogic.gdx.graphics.Texture.<init>(Texture.java:123)
	at com.badlogic.gdx.graphics.Texture.<init>(Texture.java:103)
	at com.badlogic.gdx.graphics.g2d.TextureAtlas.load(TextureAtlas.java:244)
	at com.badlogic.gdx.graphics.g2d.TextureAtlas.<init>(TextureAtlas.java:236)
	at com.badlogic.gdx.graphics.g2d.TextureAtlas.<init>(TextureAtlas.java:231)
	at com.badlogic.gdx.graphics.g2d.TextureAtlas.<init>(TextureAtlas.java:226)
	at com.badlogic.gdx.graphics.g2d.TextureAtlas.<init>(TextureAtlas.java:216)
	at Main.main(Main.java:76)
{% endcode %}	
發現應該是gl物件未產出
後來採最簡單的解法就是建立一個libgdx的application就會進行需要的初始化行為了

5. 依照binary編寫json檔案
這裡可以參照下面兩個格式的讀取行為
https://github.com/EsotericSoftware/spine-runtimes/blob/master/spine-libgdx/spine-libgdx/src/com/esotericsoftware/spine/SkeletonJson.java
https://github.com/EsotericSoftware/spine-runtimes/blob/master/spine-libgdx/spine-libgdx/src/com/esotericsoftware/spine/SkeletonBinary.java
一開始採取從SkeletonData逆推的方式，但最後失敗
卡在我無法從skin逆推attachment
後來只好改採在SkeletonBinary讀取檔案的過程中同時將json建立起來的方法(直接修改SkeletonBinary.java)
但由於這樣做可能會有版權的問題
故這裡並不提供程式碼
做起來應該是不難只是有點麻煩而已


