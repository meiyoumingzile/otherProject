class GameView extends BasePopup {
	public constructor() {
		super();
		this.modal = false;
	}
	
	group_swipe: eui.Group;
	gp_dev_tools: eui.Group;
	gp_recommend: eui.Group;
	txt_current_level: eui.Label;
	txt_ranking: eui.Label;
	label_distance:eui.Label;

	btn_gameover: eui.Button;
	btn_try: eui.Button;
	dieRot: eui.Button;
	btn_close: eui.Button;
	img_notice:eui.Image;
	img_finger: eui.Image;
	img_recommend_ball: eui.Image;
	friendRankEntries: RankPlayerVO[] = [];
	nowrank:number;
	gpPassPos:egret.Point;

	protected async childrenCreated(){
		super.childrenCreated();
		this.gpPassPos=new egret.Point(440,224);
		// let loadingView = app.ui.getPopup(LoadingView);
		// loadingView && app.ui.rmPopup(loadingView);
		Game.inst.nowPlayerCount=GameConstant.PlayersCount;
		this.gp_dev_tools.visible = app.storager.get('vconsole') === 'show';
		this.btn_gameover.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			GameConstant.TrackLength = 200;//
		}, this)
		this.dieRot.addEventListener("touchTap", () => {
			//this.
		}, this);
		// let skins = app.status.skinItemData.filter(v => (v.price.type === 3 || v.price.type === 1) && app.pp.havingSkinIDs.indexOf(v.id) < 0);
		// // console.log(skins);
		// let randomSkin = Utils.randomInArr(skins);
		// this.img_recommend_ball.source = randomSkin.thumb;
		// this.btn_try.addEventListener("touchTap", () => {
		// 	Common.showRAD('adSkin', () => { Game.inst.player.setSkin(randomSkin.id); });
		// }, this);
		// this.img_recommend_ball.addEventListener("touchTap", () => {
		// 	Common.showRAD('adSkin', () => { Game.inst.player.setSkin(randomSkin.id); });
		// }, this);

		// this.stage.addEventListener("touchBegin", (e: egret.TouchEvent) => {
		// 	if (e.target !== this.btn_try) {
		// 		this.group_swipe.removeFromParent();
		// 		this.gp_recommend.removeFromParent();
		// 	}
		// }, this);

		// this.btn_close.addEventListener("touchBegin", (e: egret.TouchEvent) => {
		// 	this.group_swipe.removeFromParent();
		// 	this.gp_recommend.removeFromParent();
		// }, this);

		// if (!app.ad.hasRAD() || !app.ad.suportAD()) {
		// 	console.log("ad not ready");
		// 	this.gp_recommend.removeFromParent();
		// }
		this.stage.addEventListener("touchBegin", () => {
			this.group_swipe.removeFromParent();
			this.img_notice.visible=false;
		}, this);

		this.txt_current_level.text = "CurrentLevel: " + app.pp.currentLevel;

		egret.Tween.get(this.img_finger, { loop: true }).to({ x: 401 }, 1000, egret.Ease.sineInOut).to({ x: 0 }, 1000, egret.Ease.sineInOut);

		egret.Tween.get(this.img_wheel, { loop: true }).to({ rotation: 360 }, 1500);

		this.initGraphics();
		Game.inst.onProgressUpdate = this.setProgress.bind(this);
		RES.loadGroup('end');

		//以下是对好友排序，然后得到自己前面的人。
		this.friendRankEntries=Array(10);
		var img=["game-icon-try-down.png","game-icon-close-down.png","game_begin1.png",
		"game_begin2.png"];
		for(var i=0;i<10;i++){
			this.friendRankEntries[i]=new RankPlayerVO();
			this.friendRankEntries[i].name="hh"+i;
			this.friendRankEntries[i].photo=img[i%4];
			this.friendRankEntries[i].score=1200-i*100+100;
			this.friendRankEntries[i].id=i+2+"";
		}
		/*let friendRankList: FBInstant.LeaderboardEntry[] = app.status.friendRankList || await app.platform.getFriendRankList();
		friendRankList.map((value) => {
			this.friendRankEntries.push(RankPlayerVO.createFromLeaderBoardEntry(value));
		})*/
		this.nowrank=this.friendRankEntries.length-1;
		GameView.sortByScore(this.friendRankEntries,0,this.nowrank,(a,b)=>{
			return a.score>b.score;
		});
		/*friendRankList.map((value) => {
			this.friendRankEntries.push(RankPlayerVO.createFromLeaderBoardEntry(value));
		})*/

	}

	_slideDistance: number = 428;
	// img_progressbar_black: eui.Image;
	// img_progressbar_yellow: eui.Image;
	//group_progressbar: eui.Group;
	img_wheel: eui.Image;
	rect: egret.Shape;
	initGraphics() {
		this.validateNow();//验证并更新此对象的属性和布局，如果需要的话重绘对象

		let rect = this.rect = new egret.Shape();
		// rect.x = this.group_progressbar.x - this.group_progressbar.width;
		// rect.y = this.group_progressbar.y;
		rect.graphics.clear();

		rect.graphics.beginFill(0x00ffff, 1);
		// rect.graphics.drawRect(0, 0, this.group_progressbar.width, this.group_progressbar.height);
		this.addChild(rect);

		// this.img_progressbar_yellow.mask = rect;
	}
	/**progress from 0-1 */
	setProgress(distance: number) {
		// if (percentage < 0 || percentage > 1) {
		// 	console.warn("parameters error");
		// 	return;
		// }
		// this.rect.x = this.group_progressbar.x - this.group_progressbar.width + this._slideDistance * percentage;
		// this.img_wheel.x = this._slideDistance * percentage;
		this.label_distance.text = Math.round(distance)+"";
		app.pp.starCount=Math.max(distance,app.pp.starCount);
		
		//以下是超越的人
		if(~this.nowrank&&this.friendRankEntries[this.nowrank].score<distance){
			var sur=new SurpassPlayerHead(this.gpPassPos,-100,
				this.friendRankEntries[this.nowrank].photo,this.friendRankEntries[this.nowrank].score+"");
			this.addChild(sur);
			this.nowrank--;
		}
	}


	public static sortByScore(arr,l,r,cmp){
		var i=l,j=r;
		var k=(l+r)>>1;
		while(i<=j){
			while(cmp(arr[i],arr[k]))i++;
			while(cmp(arr[k],arr[j]))j--;
			if(i<=j){
				var t=arr[i];
				arr[i]=arr[j];
				arr[j]=t;
				i++;j--;
			}
		}
		if(i<r)GameView.sortByScore(arr,i,r,cmp);
		if(j>l)GameView.sortByScore(arr,l,j,cmp);
    }
}