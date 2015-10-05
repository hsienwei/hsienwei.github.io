title: cocos2d-x 骨骼動畫方案
date: 2015-10-03 12:44:37
tags: cocos2d-x
---

cocos2d-x上面可用的骨骼動畫方案並不多，列出如下：

* [Spine](http://zh.esotericsoftware.com/)
一個支援多引擎的骨骼動畫方案，功能強大，支援IK，為骨骼動畫而生。
其檔案格式有json與binary兩種，cocos2d-x只支援json檔，這點要注意，有需要的話需要自行寫parser，之前看只有libgdx版本支援binary，現在狀況不太確定。
* [DragonBone](http://dragonbones.github.io/)
以Flash為基礎，刀塔傳奇的骨骼動畫方案，個人是沒有操作過，不過開發prototype時倒是用第三方程式庫讀刀塔的人物來使用
[《刀塔传奇》骨骼动画查看器](https://github.com/zym2014/DotaSkeletonAnim)
[DragonBonesCPP](https://github.com/DragonBones/DragonBonesCPP)
* [OPTPiX SpriteStudio](http://www.webtech.co.jp/spritestudio/index.html)
個人感覺編輯器最強的一套，不過看似沒有IK。
* cocostudio
cocos2d-x自己的編輯器，只是實在不能算好用。