class InviteView extends BasePopup {
	public constructor() {
		super();
	}

	btn_home: eui.Button;
	btn_invite: eui.Button;
	btn_play: eui.Button;

	pageViewContr: PagesViewController;
	pages: ISkinRenderData[][] = [];
	gp_skin: eui.Group;
	list_page_indicator: eui.List;
	sc_skins: eui.Scroller;
	list_invite: eui.List;
	gp_portrait: eui.Group;
	txt_refer: eui.Label;
	private _onTouchEndOld;
	private _selected_item: ISkinRenderData;
	private invitedList = [];
	private skinRenderData: ISkinRenderData[];

	protected async childrenCreated() {
		super.childrenCreated();
		app.pp.newInviteSkinAmount = 0;
		app.pp.pushData();

		this.btn_home.addEventListener("touchTap", this.onTapHome, this);
		this.btn_invite.addEventListener("touchTap", this.onTapInvite, this);
		this.btn_play.addEventListener("touchTap", () => {
			let id = this.skinRenderData[this._current_page].id;
			if (app.pp.havingSkinIDs.includes(id)) {
				app.pp.currentSkinID = id;
				app.pp.pushData();
				Game.inst.player.setSkin(id);
			}
			this.close();
			//app.ui.addPopup(new MatchView);
			app.notify(AppConstant.Notify.enter_game);
		}, this);

		const skins = app.status.skinItemData.filter(v => v.price.type === 2).sort((a, b) => (a.order - b.order)).map(i => i.id);
		this.skinRenderData = skins.map(id => ({
			id,
			thumb: app.status.skinItemData[id - 1].thumb
		}));

		this.gp_skin.addChild(this.createSkinGroup("", true));
		this.skinRenderData.forEach((value) => {
			let group = this.createSkinGroup(value.thumb);
			this.inviteAmountArr.push(app.status.skinItemData[value.id - 1].price.num);
			this.gp_skin.addChild(group);
		})
		this.gp_skin.addChild(this.createSkinGroup("", true));

		this.validateNow();
		this.sc_skins.addEventListener(egret.Event.CHANGE, () => {
			if (this.sc_skins.viewport.scrollH < 0) return;
			if (this.sc_skins.viewport.scrollH > this.sc_skins.viewport.contentWidth - this.sc_skins.width) return;

			this.scrollH = this.sc_skins.viewport.scrollH;
			this.centerH = this.scrollH + .5 * this.stage.stageWidth;
			let currentPage = Math.floor(this.centerH / this._gp_width) - 1;
			if (currentPage !== this._current_page) {
				this.onPageChanged(currentPage);
			}
			this.refreshSkinList();
		}, this);

		let temp: any = this.sc_skins;
		this._onTouchEndOld = temp.onTouchEnd;
		temp.onTouchEnd = this.touchEndEvent.bind(this);


		let dataFriends: FBInstant.ConnectedPlayer[] = app.status.friendList || await app.platform.getConnectedFriendList();
		let entries: RankPlayerVO[] = [];

		let invitedIDs = app.pp.invitedGuys;
		let invitedInfo = Context.gameModel.skinInviteInfo;
		this.invitedList = [];

		dataFriends && dataFriends.forEach(value => {
			entries.push(RankPlayerVO.createFromContextPlayer(value));
		})
		egret.log("invitedIDs", invitedIDs);
		egret.log("陌生人信息", invitedInfo);
		invitedIDs.forEach((value) => {
			let index = entries.findIndex(v => v.id === value);
			if (index >= 0) {									//如果在好友列表中
				this.invitedList.push(entries[index].photo);
			} else if (invitedInfo[value] && invitedInfo[value].head) {		//不在好友列表中在陌生人信息中
				this.invitedList.push(invitedInfo[value].head);
			} else {											//全都不在用默认头像
				this.invitedList.push("default_portrait.png");
			}
		})


		this.sc_skins.dispatchEventWith(egret.Event.CHANGE);
		this.refreshSkinList();
		this.refreshPortraitList();
		this.refreshAmount();
	}
	private _gp_width: number = 0;
	private createSkinGroup(source: string, placeholder: boolean = false) {
		const width = this.stage.stageWidth;
		let group = new eui.Group;
		this._gp_width = group.width = width / 3;
		let img = new eui.Image;
		let mask = new eui.Image;
		group.addChild(img);
		img.horizontalCenter = img.verticalCenter = 0;
		group.addChild(mask);
		mask.horizontalCenter = mask.verticalCenter = 0;
		img.source = placeholder ? "" : source;
		mask.source = placeholder ? "" : "invite-mask-ball.png";
		mask.alpha = .3;
		return group;
	}

	_current_page: number = 0;
	scrollH: number = 0;
	centerH: number = 0;
	private onPageChanged(index: number) {
		this._current_page = index;
		this.refreshPortraitList();
		this.refreshAmount();
	}
	private inviteAmountArr = [];
	private refreshAmount() {
		const shouldInviteAmount = this.inviteAmountArr[this._current_page];
		const hasInviteAmount = app.pp.invitedGuys.length;
		this.txt_refer.text = (shouldInviteAmount === 1 ? "Refer one Friend" : "Refer " + shouldInviteAmount + " Friends");
		if (hasInviteAmount < shouldInviteAmount) {
			this.btn_play.visible = false;
			this.btn_invite.visible = true;
			this.btn_invite.label = hasInviteAmount + "/" + shouldInviteAmount;

		} else {
			this.btn_play.visible = true;
			this.btn_invite.visible = false;
			// this.btn_invite.label = shouldInviteAmount + "/" + shouldInviteAmount;
		}
	}
	private refreshPortraitList() {
		const shouldInviteAmount = this.inviteAmountArr[this._current_page];
		let showList = this.invitedList.slice(0, shouldInviteAmount);
		while (showList.length < shouldInviteAmount) {
			showList.push("");
		}
		this.list_invite.dataProvider = new eui.ArrayCollection(showList);
		(this.gp_portrait.layout as eui.HorizontalLayout).horizontalAlign = this.list_invite.width < this.stage.stageWidth ? "center" : "left";
	}

	private refreshSkinList() {
		let scrollH = this.scrollH;

		for (let i = 0; i < this.gp_skin.numChildren - 2; i++) {
			let img = this.gp_skin.getChildAt(i + 1).$children[0];
			let mask = this.gp_skin.getChildAt(i + 1).$children[1];
			const distance = Math.abs(this.centerH - (1.5 + i) * this._gp_width);
			if (distance < this._gp_width) {
				const scale = 1.4 - (distance / this._gp_width) * 0.4;
				img.scale = scale;
				mask.scale = scale;
				mask.alpha = (distance / this._gp_width) * 0.3;

			} else {
				img.scale = 1;
				mask.alpha = .3;
			}
		}

	}
	scrollToPage(index: number) {
		if (this.sc_skins.viewport.scrollH < 0) return;
		if (this.sc_skins.viewport.scrollH > this.sc_skins.viewport.contentWidth - this.sc_skins.width) return;

		const timeInSecond = 300;
		const x = index * this._gp_width;

		this.sc_skins.stopAnimation();
		egret.Tween.removeTweens(this.sc_skins.viewport);
		// 滚动动画
		egret.Tween.get(this.sc_skins.viewport, {
			onChange: () => {
				this.sc_skins.dispatchEventWith(eui.UIEvent.CHANGE);
			}
		}).to({ scrollH: x }, timeInSecond)
			.call(() => {
				// egret.log("over");
			});
	}
	public touchEndEvent(event: egret.TouchEvent) {
		this._onTouchEndOld.call(this.sc_skins, event);
		if (!event.$isPropagationStopped) {
			this.scrollToPage(this._current_page);
		}
	}
	onTapHome() {
		this.close();
		app.ui.addPopup(new HomeView);
	}
	async onTapInvite() {
		app.platform.logEvent(Log.EventType.InviteGetSkin, { type: app.status.playerType, result: 0 });
		ShareHelper.sendGenericUpdate(true, {
			invite_skin_data: { playerId: app.platform.id(), skinId: 0 }
		});
	}
	listResponse(): number[] {
		return [AppConstant.Notify.refresh_invite_count];
	}

	doResponse(name: number, data?: any) {
		if (name === AppConstant.Notify.refresh_invite_count) {
			this.refreshAvator();
		}
	}
	async refreshAvator() {
		let dataFriends: FBInstant.ConnectedPlayer[] = app.status.friendList || await app.platform.getConnectedFriendList();
		let entries: RankPlayerVO[] = [];

		let invitedIDs = app.pp.invitedGuys;
		let invitedInfo = Context.gameModel.skinInviteInfo;
		this.invitedList = [];

		dataFriends && dataFriends.forEach(value => {
			entries.push(RankPlayerVO.createFromContextPlayer(value));
		})
		egret.log("invitedIDs", invitedIDs);
		egret.log("陌生人信息", invitedInfo);
		invitedIDs.forEach((value) => {
			let index = entries.findIndex(v => v.id === value);
			if (index >= 0) {									//如果在好友列表中
				this.invitedList.push(entries[index].photo);
			} else if (invitedInfo[value] && invitedInfo[value].head) {		//不在好友列表中在陌生人信息中
				this.invitedList.push(invitedInfo[value].head);
			} else {											//全都不在用默认头像
				this.invitedList.push("default_portrait.png");
			}
		})
		this.refreshPortraitList();
	}
}