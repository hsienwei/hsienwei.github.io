var MyLayer = cc.Layer.extend({
    isMouseDown:false,
    sortLabel:null,
    resetLabel:null,
    mapLayer:null,
    tileBatchNode:null,
    spriteNode:null,

    init:function () {

        this._super();

        if( 'touches' in sys.capabilities )
            this.setTouchEnabled(true);
        else if ('mouse' in sys.capabilities )
            this.setMouseEnabled(true);

        var size = cc.Director.getInstance().getWinSize();

        this.sortLabel = cc.LabelTTF.create("Sort", "Impact", 30);
        this.sortLabel.setPosition(cc.p(size.width - 40,  40));
        this.addChild(this.sortLabel, 0);

        this.resetLabel = cc.LabelTTF.create("Reset", "Impact", 30);
        this.resetLabel.setPosition(cc.p(size.width - 40,  80));
        this.addChild(this.resetLabel, 0);

        mapLayer = cc.Layer.create();
        mapLayer.setPosition(cc.p(size.width/2, size.height/2 + 5 * GRID_HEIGHT));
        this.addChild(mapLayer);

        this.tileBatchNode = cc.SpriteBatchNode.create(s_Tile);
        mapLayer.addChild(this.tileBatchNode, 0);

        this.spriteNode = cc.Layer.create();
        mapLayer.addChild(this.spriteNode, 0);
        
        var tileSprite;
        for(i=0; i<14; i++)
        {
            for(j=0; j< 14; j++)
            {
                var pos = MapMgr.gridToPos(i, j);
                tileSprite = cc.Sprite.create(s_Tile);
                tileSprite.setPosition(pos);
                this.tileBatchNode.addChild(tileSprite, 0);
            }
        }

        this.addSprite();
    },

    onMouseUp:function (event) {
        /*var xScale  = cc.EGLView.getInstance().getScaleX();
        var yScale = cc.EGLView.getInstance().getScaleY();
        var origin = cc.EGLView.getInstance().getViewPortRect();
        event.getLocation().x -= origin.origin.x;
        event.getLocation().y -= origin.origin.y;
        event.getLocation().x /= cc.Director.getInstance().getContentScaleFactor(); 
        event.getLocation().y /= cc.Director.getInstance().getContentScaleFactor();
        event.getLocation().x /= xScale;
        event.getLocation().y /= yScale;*/
        
        var touchLocation = this.convertToNodeSpace(event.getLocation());
        if (cc.rectContainsPoint(this.sortLabel.getBoundingBox(), touchLocation)) 
        {
            MapMgr.zSort();
        }
        if (cc.rectContainsPoint(this.resetLabel.getBoundingBox(), touchLocation)) 
        {
            MapMgr.clearSortList();
            this.spriteNode.removeAllChildren(true);
            this.addSprite();
        }
    },

    onTouchesEnded:function (touches, event) {
        if (touches.length <= 0)
             return;

        /*var touch = touches[0];
        var xScale  = cc.EGLView.getInstance().getScaleX();
        var yScale = cc.EGLView.getInstance().getScaleY();
        var origin = cc.EGLView.getInstance().getViewPortRect();
        touch.getLocation().x -= origin.origin.x;
        touch.getLocation().y -= origin.origin.y;
        touch.getLocation().x /= cc.Director.getInstance().getContentScaleFactor();
        touch.getLocation().y /= cc.Director.getInstance().getContentScaleFactor();
        touch.getLocation().x /= xScale;
        touch.getLocation().y /= yScale;*/
        
        var touchLocation = this.convertToNodeSpace(touch.getLocation());
        if (cc.rectContainsPoint(this.sortLabel.getBoundingBox(), touchLocation)) 
        {
            MapMgr.zSort();
        }
        if (cc.rectContainsPoint(this.resetLabel.getBoundingBox(), touchLocation)) 
        {
            MapMgr.clearSortList();
            this.spriteNode.removeAllChildren(true);
            this.addSprite();
        }
    },

    addSprite:function()
    {
        var testSprite1 = TestSprite.create(1, 1, 2, 1, cc.BLUE);
        this.spriteNode.addChild(testSprite1);
        testSprite1 = TestSprite.create(3, 5, 1, 1);
        this.spriteNode.addChild(testSprite1);
        testSprite1 = TestSprite.create(7, 8, 2, 2, cc.RED);
        this.spriteNode.addChild(testSprite1);   
        testSprite1 = TestSprite.create(8, 4, 2, 3, cc.YELLOW);
        this.spriteNode.addChild(testSprite1);  
        testSprite1 = TestSprite.create(6, 5, 1, 2);
        this.spriteNode.addChild(testSprite1);
        testSprite1 = TestSprite.create(13, 13, 1, 4);
        this.spriteNode.addChild(testSprite1);    
        testSprite1 = TestSprite.create(12, 12, 2, 1, cc.GREEN);
        this.spriteNode.addChild(testSprite1);  
        testSprite1 = TestSprite.create(10, 11, 3, 3, cc.BLUE);
        this.spriteNode.addChild(testSprite1);  
        testSprite1 = TestSprite.create(3, 12, 2, 1, cc.RED);
        this.spriteNode.addChild(testSprite1);  
        testSprite1 = TestSprite.create(2, 11, 1, 5, cc.BLUE);
        this.spriteNode.addChild(testSprite1);  
        testSprite1 = TestSprite.create(1, 12, 1, 4);
        this.spriteNode.addChild(testSprite1);  
        testSprite1 = TestSprite.create(3, 11, 1, 2, cc.PINK);
        this.spriteNode.addChild(testSprite1);  
        testSprite1 = TestSprite.create(12, 1, 1, 1, cc.MAGENTA);
        this.spriteNode.addChild(testSprite1);  
    }

});

var MyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
        layer.init();
    }
});


var TestSprite = cc.Sprite.extend({
    _width:1,
    _height:1,
    _posX:0,
    _posY:0,
    _z:0,
    _infoLabel:null,
    _drawPolyAry:null,
    _sortBehindList:null,
    _sortTheSameList:null,
    _sortVisit:false,

    ctor:function () {
        this._super();
        MapMgr.registerSort(this);
        this._infoLabel = cc.LabelTTF.create("123", "Arial", 12);
        this._infoLabel.setColor(cc.BLACK);
        this.addChild(this._infoLabel);
        this._sortBehindList = new Array(0);
        this._sortTheSameList = new Array(0);
    },
    draw:function () {
        cc.drawingUtil.setDrawColor4B(0,0,0,255);

        var color = this.getColor();

        cc.drawingUtil.drawSolidPoly(this._drawPolyAry, 6, cc.c4f(color.r, color.g, color.b, 1));

        cc.drawingUtil.drawLine(this._drawPolyAry[0], this._drawPolyAry[7]);
        cc.drawingUtil.drawLine(this._drawPolyAry[2], this._drawPolyAry[7]);
        cc.drawingUtil.drawLine(this._drawPolyAry[4], this._drawPolyAry[7]);
    },
    setGridSize:function (width, height) {
        this._width = width;
        this._height = height;
        this.setDrawPoly();
    },
    getGridSize:function() {
        return cc.p(this._width, this._height);
    },
    getGridTopIndex:function() {
        return cc.p(this._posX - this._width + 1, this._posY - this._height + 1);
    },
    setGridPosition:function (x, y) {
        this._posX = x;
        this._posY = y;
        var pos2 = MapMgr.gridToPos(x, y);
        this.setPosition(pos2);
        this.setDrawPoly();
    },
    getGridPosition:function() {
        return cc.p(this._posX, this._posY);
    },
    setDrawPoly:function() {
        var basePos = cc.p(0, 0);
        var objHeight = Math.max(this._width, this._height) * GRID_HEIGHT;
        
        basePos.y = basePos.y - GRID_HEIGHT /2;

        this._drawPolyAry =  new Array(8);
        this._drawPolyAry[0] = cc.p(basePos.x, basePos.y);
        this._drawPolyAry[1] = cc.p(basePos.x + (GRID_WIDTH /2) * this._height , basePos.y +( GRID_HEIGHT /2) * this._height);
        this._drawPolyAry[2] = cc.p(basePos.x + (GRID_WIDTH /2) * this._height , basePos.y +( GRID_HEIGHT /2) * this._height + objHeight);
        
        this._drawPolyAry[3] = cc.p(basePos.x + (GRID_WIDTH /2) * (this._height - this._width), basePos.y + objHeight + GRID_HEIGHT/2 * ( this._width + this._height ) );
        this._drawPolyAry[4] = cc.p(basePos.x - (GRID_WIDTH /2) * this._width , basePos.y + (GRID_HEIGHT /2) * this._width + objHeight); 
        this._drawPolyAry[5] = cc.p(basePos.x - (GRID_WIDTH /2) * this._width , basePos.y + (GRID_HEIGHT /2) * this._width); 
        this._drawPolyAry[6] = cc.p(basePos.x, basePos.y);
        this._drawPolyAry[7] = cc.p(basePos.x, basePos.y + objHeight);
        this._infoLabel.setString("(" + this._posX + "," + this._posY + ") [" + this._width + "," + this._height + "]" + this._z );
    },
    //----- sort ------
    setSortOrder:function(depth) {
        this._z = depth;
        this._infoLabel.setString("(" + this._posX + "," + this._posY + ") [" + this._width + "," + this._height + "]" + this._z );
    },
    resetSortList:function() {
        this._sortBehindList.length = 0;  
        this._sortTheSameList.length = 0; 
        this._sortVisit= false;
    },
});

TestSprite.create = function(x, y, width, height, color) {
    var sprite = new TestSprite();
    color = color || cc.WHITE;
    sprite.setGridPosition(x, y);
    sprite.setGridSize(width, height);
    sprite.setColor(color);
    return sprite;
};