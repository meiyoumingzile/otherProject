class PlayerPersistent {
	get newInviteSkinAmount(): number { return this.get("newInviteSkinAmount") };
	set newInviteSkinAmount(v: number) { this.set("newInviteSkinAmount", v) };

	get newStarSkinAmount(): number { return this.get("newStarSkinAmount") };
	set newStarSkinAmount(v: number) { this.set("newStarSkinAmount", v) };

	get starCount(): number { return this.get("startCount") };
	set starCount(v: number) { this.set("startCount", v) };

	get currentLevel(): number { return this.get("currentLevel") };
	set currentLevel(v: number) { this.set("currentLevel", v) };

	/** 当前皮肤ID */
	get currentSkinID(): number { return this.get("currentSkinID") };
	set currentSkinID(v: number) { this.set("currentSkinID", v) };

	/** 拥有皮肤ID所组成的数组 */
	get havingSkinIDs(): Array<number> { return this.get("havingSkinIDs") };
	set havingSkinIDs(v: Array<number>) { this.set("havingSkinIDs", v) };

	/** 皮肤获取进度数据 */
	get skinProgressData(): { [key: number]: number } { return this.get('skinProgressData') };
	set skinProgressData(v: { [key: number]: number }) { this.set('skinProgressData', v) };

	/** 每天邀请过某个人的唯一字符串标识 */
	get invitedGuys(): string[] { return this.get("invitedGuys") };
	set invitedGuys(v: string[]) { this.set("invitedGuys", v) };

	/** 最后一次登陆的时间戳 */
	get lastPlayTimestamp(): number { return this.get('lastPlayTimestamp') };
	set lastPlayTimestamp(v: number) { this.set('lastPlayTimestamp', v) };

	/** 连续登陆天数 */
	get continuousPlayDays(): number { return this.get('continuousPlayDays') };
	set continuousPlayDays(v: number) { this.set('continuousPlayDays', v) };

	/** 拒绝创建桌面图标的次数 */
	get shortcutRefused(): number { return this.get('shortcutRefused') };
	set shortcutRefused(v: number) { this.set('shortcutRefused', v) };

	/** 是否成功创建桌面图标 */
	get shortcutClaimed(): boolean { return this.get('shortcutClaimed') };
	set shortcutClaimed(v: boolean) { this.set('shortcutClaimed', v) };

	DataO: Object;
	readonly Data = {
		v: 0,

		newInviteSkinAmount: 0,
		newStarSkinAmount: 0,
		startCount: 0,
		currentLevel: 1,
		currentSkinID: 1,
		havingSkinIDs: [1],
		invitedGuys: [],
		recievedLoveGuys: [],
		skinProgressData: {},
		lastPlayTimestamp: 0,
		continuousPlayDays: 0,
		shortcutRefused: 0,
		shortcutClaimed: false,
	}

	readonly Keys = [
		"v", //version 

		'newInviteSkinAmount',
		'newStarSkinAmount',
		'startCount',
		'currentLevel',
		'currentSkinID',
		'havingSkinIDs',
		'invitedGuys',
		'recievedLoveGuys',
		'skinProgressData',
		'lastPlayTimestamp',
		'continuousPlayDays',
		'shortcutRefused',
		'shortcutClaimed',
	];

	get(k: string) {
		return this.Data[k];
	}

	set(k: string, v: any) {
		this.Data[k] = v;
		this.dirtyKeys_.push(k);
		this.Data["v"] = Date.now();
	}

	dirtyKeys_ = [];
	get dirty() { return this.dirtyKeys_.length > 0 }

	getDirtyData() {
		let ret = {};
		this.dirtyKeys_.push("v");
		this.dirtyKeys_.forEach(k => {
			ret[k] = this.Data[k]
		})
		this.dirtyKeys_.splice(0);
		return ret;
	}

	constructor() {
		this.DataO = Utils.deepClone(this.Data);
	}

	async pullData() {
		let data: Object;
		if (app.platform instanceof PlatformFB) {
			try {
				data = await app.platform.getPlayerData(this.Keys)
			} catch (e) {
				data = {};
			}
		} else {
			data = {};
		}

		let dataL = JSON.parse(localStorage.getItem('pData' + app.platform.id())) || {};

		let v = data["v"], vL = dataL["v"];
		if (!v && vL || v && vL && vL > v) {
			egret.log("pData:LOCAL", vL, v);
			data = dataL;
			app.platform instanceof PlatformFB && app.platform.setPlayerData(this.Data); //一般是由于上一次远程存储失败了,补上
		} else {
			egret.log("pData:REMOTE");
		}

		for (let k in data) {
			this.Data[k] = data[k];
		}

		if (!this.lastPlayTimestamp) {
			app.status.playerType = "new_player"
		} else {
			app.status.playerType = "old_player"
		}

		this.pushData();
	}

	async pushData() {
		if (this.dirty) {
			localStorage.setItem('pData' + app.platform.id(), JSON.stringify(this.Data));
			await app.platform.setPlayerData(this.getDirtyData());
		}
	}

	cleanData() {
		app.ui.toast("local clear");
		localStorage.removeItem('pData' + app.platform.id());
		app.platform.updateScore(Math.round(10), JSON.stringify({ skin: app.pp.currentSkinID }));
		app.pp.starCount=0;
		if (app.platform instanceof PlatformFB) {
			app.platform.setPlayerData(this.DataO).then(() => {
				this.pushData();
			}).catch(() => {
				app.ui.toast("remote clear failed");
			})
		}
	}
	tryBuySkin(id: number) {
		if (!this.skinProgressData[id]) this.skinProgressData[id] = 0;
		this.skinProgressData[id]++;
		this.skinProgressData = this.skinProgressData;
		let progress = this.skinProgressData[id]
		if (progress >= app.status.skinItemData[id - 1].price.num) {
			!this.havingSkinIDs.includes(id) && this.havingSkinIDs.push(id);
			this.havingSkinIDs = this.havingSkinIDs;
			this.pushData();
			// app.ui.toast("New skin unlocked")
			Game.inst.player.setSkin(id);
			return true;
		}
		this.pushData();
		return false;
	}

	checkNewSkin() {
		let skins_star = app.status.skinItemData.filter(v => v.price.type === 3).sort((a, b) => (a.order - b.order)).map(i => i.id);
		skins_star.forEach((id) => {
			let amount = app.pp.starCount;
			if (amount >= app.status.skinItemData[id - 1].price.num) {
				if (app.pp.havingSkinIDs.includes(id)) return;
				this.newStarSkinAmount++;
				app.pp.havingSkinIDs.push(id);
				app.pp.havingSkinIDs = app.pp.havingSkinIDs;
				app.pp.pushData();
				// Game.inst.player.setSkin(id);
			}
		})
		return !!this.newStarSkinAmount;
	}
	checkNewInviteSkin() {
		let skins_invite = app.status.skinItemData.filter(v => v.price.type === 2).sort((a, b) => (a.order - b.order)).map(i => i.id);
		skins_invite.forEach((id) => {
			let amount = app.pp.invitedGuys.length;
			if (amount >= app.status.skinItemData[id - 1].price.num) {
				if (app.pp.havingSkinIDs.includes(id)) return;
				this.newInviteSkinAmount++;
				app.pp.havingSkinIDs.push(id);
				app.pp.havingSkinIDs = app.pp.havingSkinIDs;
				app.pp.pushData();
			}
		})
		egret.log("this.newInviteSkinAmount", this.newInviteSkinAmount);
		return !!this.newInviteSkinAmount;
	}
}