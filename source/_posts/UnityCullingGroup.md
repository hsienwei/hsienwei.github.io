title: Unity Culling Group簡介
date: 2017-06-05 01:01:51
tags:
- unity
- Culling Group
---

以下內容主要來自公司內部分享

# Culling Group (Unity)

[link](https://docs.unity3d.com/Manual/CullingGroupAPI.html)  
該API於Unity 5.1後版本出現  
主要用於攝影機可見範圍判定  
個人感覺算是容易使用  
API中提供距離判定功能, 以長度為主  
物件在出現與消失, 以及距離段變更會有通知

主要用他來決定一些特效是否要產出與播放以及當看不到時關閉某些效果  
主要的考量點還是在能少算就少算  

	// 建立  
	CullingGroup group = new CullingGroup();  
一開始的Group建立  

	// 設置攝影機  
	group.targetCamera = Camera.main;  
設定攝影機, 攝影機可以之後再切換, 切換後會通知你物件的可見狀況

	// 設定BoundingSphere  
	BoundingSphere[] spheres = new BoundingSphere[1000];
	spheres[0] = new BoundingSphere(Vector3.zero, 1f);
	group.SetBoundingSpheres(spheres);
	group.SetBoundingSphereCount(1);
這裡主要是設定BoundingSphere, 之後只要更新位置, 就可以收到Culling Group的通知, BoundingSphere的大小依照需要來調整  
另外是BoundingSphere的個數因為要丟一個array進去, 個人感覺需要另外作管理, 一開始給一個大一點的array後來再去管理裡面的使用狀況

	// 關閉
	group.Dispose();
	group = null;
要記得不用時一定要關閉他, 不做這個動作下一次可能運作會不正常, 且Unity會跳一個error來提示

	// 區間帶設置
	group.SetBoundingDistances(new float[] { 5000, 10000, 15000, 20000, 25000});
	int DistanceBand = group.GetDistance(Idx);
這裡主要是設置區間帶, 在可視狀態變更時會一起給你區間帶的Index, 可以用來作一些處理  
有一點要注意, 像我最後設置25000, 則多於這個距離的都會判定為不可視

	// 狀態通知設置
	group.onStateChanged = StateChangedMethod;
	
	private void StateChangedMethod(CullingGroupEvent evt)
	{
		if(evt.hasBecomeVisible)
			Debug.LogFormat("Sphere {0} has become visible!", evt.index);
		if(evt.hasBecomeInvisible)
			Debug.LogFormat("Sphere {0} has become invisible!", evt.index);
	}
主要是通知你可視狀態的變更, 回傳Index, 再以Index來得到要處理的物件作處理, 所以紀錄Index與其對應的物件是必要的
