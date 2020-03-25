class FriendRankItemRender extends eui.ItemRenderer implements eui.UIComponent {
	public constructor() {
		super();
	}

	lb_rank: eui.Label;
	lb_name: eui.Label;
	lb_score: eui.Label;

	img_bar: eui.Image;
	img_skin: eui.Image;
	img_head: eui.Image;
	img_headmerge: eui.Image;
	img_head_mask: eui.Image;

	btn_play: eui.Button;
	btn_share: eui.Button;

	private initialized = false;
	protected childrenCreated(): void {
		super.childrenCreated();
		this.initialized = true;
	}

	protected dataChanged() {
		if (!this.initialized) return;
		if (!this.data) return;
		let data = this.data as RankPlayerVO;

		//改变头像
		//this.img_head=this.data.iconDisplay;
		//#

		
		//this.img_bar.width = Constant.FullWidthScale * 581;
		let rank = this.itemIndex + 1;
		if(rank>0){
			this.img_bar.source = "rank_bg_"+(rank<4?rank:4)+".png";
			this.img_headmerge.source = "rank_hmerge_"+(rank<4?rank:4)+".png";
			
			this.lb_rank.text =rank + "";
			this.img_head.source=data.photo;
			this.lb_name.text=data.name;
			this.img_skin.source=app.status.skinItemData[data.skin - 1].thumb;;
			this.lb_score.$setText(data.score+"");
			this.img_head.mask = this.img_head_mask;//设置遮掩
			this.btn_play.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
				this.onTapPlay();
			}, this)
			this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
				this.onTapShare();
			}, this)

			//this.img_portrait_bg.source = "rank-portrait-rank" + rank + ".png";
			// let skin = app.status.skinItemData[this.data.skin - 1].thumb;
			// skin && (this.img_skin.source = `resource/assets/skin/${skin}`);
		}
		

		/*if (this.data["bg"]) {
			this.img_bar.source = this.data["bg"];
		}
		if (this.data["name_color"]) {
			this.lb_name.textColor = this.data["name_color"];
		}
		*/

		// 是自己的这条数据，play=>share
		if (this.data.id === app.platform.id()) {
			this.btn_play.visible = false;
			this.btn_share.visible = true;
		}



	}
	async onTapPlay() {
		let bo = await app.platform.createCtx(this.data.id);
		bo && this.dispatchEventWith('PlayWithFriend', true);
		// app.platform.logEvent(Log.EventType.RankClick, { type: app.status.playerType, source: "btnChallenge" });
	}

	async onTapShare() {
		await ShareHelper.sendGenericUpdate(true);
		// app.platform.logEvent(Log.EventType.RankClick, { type: app.status.playerType, source: "btnShare" });
	}
}