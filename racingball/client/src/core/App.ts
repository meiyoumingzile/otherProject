class App extends Facade {

	ui: Director;
	storager: Storager;
	pp: PlayerPersistent;
	ad: AdvertiseFB | AdvertiseDev;
	platform: PlatformFB | PlatformDev;
	status: {
		playerType: "new_player" | "old_player",
		friendList: FBInstant.ConnectedPlayer[],
		friendRankList: FBInstant.LeaderboardEntry[],
		worldRankList: FBInstant.LeaderboardEntry[],
		localRobotData: RobotInfo[],
		lastPlayADTime: number,
		lastPlayRADTime: number,
		skinItemData: SkinItemData[],
		playTimes: number,
		finishTimes: number,
	};

	http: HttpService;

	constructor() {
		super()
	}

	async init() {
		this.platform = PlatformFactory.create();
		this.storager = new Storager();
		this.http = new HttpService();
		this.ui = new Director(Context.stage);
		this.ad = ADFactory.create();
		this.ad.on("iad_showed", (count: number) => {
			// this.platform.logEvent(Log.EventType.iad_times, { result: count })
		})
		this.ad.on("rad_showed", (count: number) => {
			// this.platform.logEvent(Log.EventType.rad_times, { result: count })
		})
		AudioPlayer.init();

		this.pp = new PlayerPersistent();
		const skinItemData = skinDB2SkinData();
		const friendList = null;
		const friendRankList = null;
		const worldRankList = null;
		this.status = {
			playerType: null,
			localRobotData: null,
			friendList,
			friendRankList,
			worldRankList,
			skinItemData,
			lastPlayADTime: Date.now(),
			lastPlayRADTime: Date.now(),
			playTimes: 0,
			finishTimes: 0,
		}
		await this.pp.pullData();
		this.pp.lastPlayTimestamp = Date.now();
		this.pp.pushData();
	}

	public static async startup(): Promise<App> {
		let app = new App();
		Object.defineProperty(window, 'app', { get: () => app, configurable: true });
		await app.init();
		app.registCommand(AppConstant.Notify.startup, StartupCmd);
		app.notify(AppConstant.Notify.startup);
		return app;
	}

	static async onGameReady() {
		/** vConsole */
		const vconsole = new VConsole();
		window["vconsole"] = vconsole;
		if (app.storager.get('vconsole') === 'show') {

		} else {
			vconsole.hideSwitch();
			Utils.removeLog();
		}
		/** vConsole end */
		// app.ui.addPopup(new LoadingView);
		await Utils.wait(200);

		new Game().resetLevel(app.pp.currentLevel);
		Context.isFB && await FBInstant.startGameAsync();

		await app.platform.checkBotSubscribe();
        await app.platform.tryCreateShortcut()

		this.setupAudio()

		if (app.platform.getContextID()) {
			app.ui.addPopup(new GameView);
			LocalRobotData.getRobotsInfo().then(arr => {
				app.status.localRobotData = arr;
				Game.inst.start();
			})
		} else {
			app.ui.addPopup(new HomeView);
		}
		app.platform.logEvent(Log.EventType.LoadDetail, { type: "ready" })

		RES.loadGroup("audio");
		RES.loadGroup('rank');
		RES.loadGroup('skin');
		RES.loadGroup('invite');
		RES.loadGroup('share');
		await app.platform.updateScore(0, JSON.stringify({ skin: app.pp.currentSkinID }));

		//开始获取排行榜
		egret.log("Load leaderboard.")
		app.status.friendRankList = await app.platform.getFriendRankList();
		app.status.worldRankList = await app.platform.getWorldRankList();
		egret.log("Leaderboard loaded success.")

		if (app.platform instanceof PlatformFB) {

			//上报玩家数据
			const score = app.pp.starCount;
			const data = {
				nickname: app.platform.name(),
				playerInfo: { head: app.platform.photo(), score },
				// data: robotData
			};
			app.platform.setSessionData(data);

			// 上报好友数据
			const friendIDs = [];
			app.platform.getConnectedFriendList().then(res => {
				if (res.length) {
					res.forEach(item => friendIDs.push(item.getID()));
					Http.post('https://fb-bot.capjoy.com/api/v0/upload_61', {
						data: JSON.stringify({
							action: "friends",
							playerId: app.platform.id(),
							payload: friendIDs
						})
					});
				}
			})
		}
	}

	private static setupAudio() {
		Context.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
			if (e.target instanceof eui.Button) {
				AudioPlayer.playSound("click.mp3");
			}
		}, null);
	}
}