var GRID_WIDTH = 58;
var GRID_HEIGHT = 26;

var MapMgr = MapMgr || {
	sortAry:null,
	m_iDepth:1,
    sortAry:new Array(0),

	registerSort : function(sortObj)
	{
		this.sortAry = this.sortAry || new Array();
		this.sortAry.push(sortObj);
	}, 

	zSort: function() {
		this.m_iDepth = 1
		var sortListLength = this.sortAry.length;
		var pNode = null;

		for(var i = 0; i < sortListLength; ++i)
    	{
        	this.sortAry[i].resetSortList();
        }

        for(var i = 0; i < sortListLength; ++i)
    	{
        	pNode = this.sortAry[i];
        	var index1 = pNode.getGridPosition();
        
        	for(var j = i+1; j < sortListLength; ++j)
        	{
            	var pOtherNode = this.sortAry[j];
            	var index2 = pOtherNode.getGridPosition();
            
            	if( index1.x == index2.x && index1.y == index2.y )
            	{
                	//同一格
                	pNode._sortTheSameList.push(pOtherNode);
            	}
            	else 
            	{
                	var topIndex2 = pOtherNode.getGridTopIndex();
                	if( topIndex2.x <= index1.x && topIndex2.y <= index1.y )
                	{
                    	pNode._sortBehindList.push(pOtherNode);
                	}
                	else
                	{
                    	var topIndex1 = pNode.getGridTopIndex();
                    	if(topIndex1.x <= index2.x && topIndex1.y <= index2.y)
                    	{
                    	    pOtherNode._sortBehindList.push(pNode);
                    	}
                	}
            	}
        	}
    	}

    	for(var i = 0; i < sortListLength; ++i)
		{
			pNode = this.sortAry[i];
        	this.place( pNode , true);
		}

	},

	place:function( pNode , isForce)
	{
        if(pNode._sortVisit)    return;
 		pNode._sortVisit = true;

     	var i=0;
     	var processList = null;
		var pSameNode = null;
    
		processList = pNode._sortBehindList;
 	    for(i = 0; i < processList.length; ++i)
     	{
     	    this.place( processList[i] , isForce);
     	}

        if(pNode.getParent() != null)
        {
            pNode.getParent().reorderChild( pNode , this.m_iDepth);
            pNode._z = this.m_iDepth;
            pNode.setSortOrder(this.m_iDepth);
        }
	
 	    //拜訪所有在同一格的物件
     	processList = pNode._sortTheSameList;
     	for(i=0; i < processList.length; ++i)
     	{
         	pSameNode = processList[i];
         	if( pSameNode._sortVisit == false )
         	{
				pSameNode._sortVisit = true;

				if(pSameNode.getParent() != null)
                {
						pSameNode.getParent().reorderChild( pSameNode , this.m_iDepth);
						pSameNode._z = this.m_iDepth;
                    	pSameNode.setSortOrder(this.m_iDepth);
                }
         	}
     	}
     	this.m_iDepth = this.m_iDepth + 1;
	},

	clearSortList:function()
	{
		this.sortAry = new Array();
	},

    posToGrid:function(pos)
    {
        var x = Math.round(pos.x/GRID_WIDTH +  pos.y/-GRID_HEIGHT);
        var y = Math.round(pos.y/-GRID_HEIGHT-pos.x/GRID_WIDTH );
        return cc.p(x, y);
    },

    gridToPos:function(x, y)
    {
        var pos =  cc.p( (x - y) * GRID_WIDTH/2, 
                         (x + y) * -GRID_HEIGHT/2);
        return pos;
    },
};

