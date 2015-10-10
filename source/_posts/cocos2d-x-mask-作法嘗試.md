title: cocos2d-x mask 作法嘗試
date: 2013-10-02 00:41:21
tags: 
- cocos2d-x
---

20151011補:  
新版本(3.x)用cliping node即可

---

這裡指的mask是說一張圖但我要將指定一部分挖掉這樣，我在做的時候都是以一張圖為主圖，另一張mask圖以alpha值指定要挖空的地方

目前有試過兩種做法
## RenderTexture + BlendFunc ##
大概程式碼如下

    CCSprite* createMaskSprite()
    {
        cocos2d::ccBlendFunc bf;
        bf.src = GL_DST_ALPHA;//GL_ONE_MINUS_DST_ALPHA;
        bf.dst = GL_ZERO;
     
        CCSprite* selfSprite = /*主圖的sprite*/;
        CCSprite* maskSprite = /*mask圖的sprite*/;
        selfSprite->setPosition(ccp(selfSprite->getContentSize().width/2, selfSprite->getContentSize().height/2));
        maskSprite->setPosition(ccp(maskSprite->getContentSize().width/2, maskSprite->getContentSize().height/2));
         
        selfSprite->setBlendFunc(bf);
         
        CCRenderTexture *rt = CCRenderTexture::create((int)selfSprite->getContentSize().width, (int)selfSprite->getContentSize().height);
        rt->beginWithClear(0, 0, 0, 0);
        maskSprite->visit();
        selfSprite->visit();
        rt->end();
         
        CCSprite *retval = CCSprite::createWithTexture(rt->getSprite()->getTexture());
        retval->getTexture()->setAntiAliasTexParameters();
        retval->setFlipY(true);
         
        return retval;
    }

主要是使用BlendFunc的方法，在RenderTexture畫出想要的效果之後再使用，但如果只直接用BlendFunc可能會被其他的sprite影響產不出想要的效果 

## Shader ##
Shader程式碼處理起來比較麻煩，建議看cocos2d-x範例程式的shader部分  
下面是我寫的一個小範例  
https://github.com/hsienwei/shader_cocos2dx

cocos2d-x的部分主要是參考範例程式改的  
重要的是shader部分

    #ifdef GL_ES
    precision mediump float;
    #endif
     
    varying vec4 v_fragmentColor;
    varying vec2 v_texCoord;
     
    uniform sampler2D u_texture;
    uniform sampler2D u_mask;
     
    void main() {
        vec4 mainColor = texture2D(u_texture, v_texCoord);
        vec4 maskColor = texture2D(u_mask, v_texCoord);
        vec4 srcColor = vec4(mainColor.r * maskColor.a,
                             mainColor.g * maskColor.a,
                             mainColor.b * maskColor.a,
                             mainColor.a * maskColor.a);
         
        gl_FragColor = srcColor;
    }
將主圖的rgba值都乘以mask圖的alpha值即可，要達到這個效果只要動Fragment Shader即可