class Player extends PlayerBase {
	constructor() {
		super();
		this.setSkin(app.pp.currentSkinID);
	}

	reset() {
		super.reset();
		this.cameraDirty = true;
		Game.inst.cameraCtr.update(0);
	}
	cameraDirty = false;
	_xMoved = 0;
	moveX(x: number) {
		if (!this.dead && !this._slowdown) {
			this._xMoved += x * .03;
		}
	}

	update(dt: number) {
		if (this.dead) return;

		let pos = this.group.position;
		if (this._xMoved) {
			pos.x += this._xMoved;
			pos.x < -4.5 && (pos.x = -4.5)
			pos.x > 4.5 && (pos.x = 4.5)
			this._xMoved = 0;
			this.cameraDirty = true;
		}

		super.update(dt);
		this.updateInvincible(dt);
		this.checkLowCamera();
	}

	private _obsPageLow: number;
	checkLowCamera() {
		if (this._obsPageLow == this._obsPage) return;
		this._obsPageLow = this._obsPage
		let obs = Game.inst.obstacleCtr.getObstacleByPage(this._obsPageLow - 1);
		if (obs instanceof Obstacle && obs.lowGate) {
			let camera = Game.inst.cameraCtr;
			camera.tweenAngleYTo(-4 * GameConstant.ToRadian, () => {
				camera.tweenAngleYTo(-10 * GameConstant.ToRadian)
			})
		}
	}

	_invincibleFx: PlayerInvincibleFx;
	_invincibleTime = 0;
	set invincible(v: boolean) {
		this._invincible = v;
		this._invincibleFx || (this._invincibleFx = new PlayerInvincibleFx(), this.group2.add(this._invincibleFx.mesh));
		this._invincibleFx.active = v;
		this._invincibleTime = v ? 4 : 0;
	}

	updateInvincible(dt: number) {
		if (this._invincibleTime > 0) {
			this._invincibleTime -= dt;
			this._invincibleTime <= 0 && (this.invincible = false);
		}
	}

	die() {
		
            app.platform.updateScore(Math.round(app.pp.starCount), JSON.stringify({ skin: app.pp.currentSkinID })).then(() => { RankCtr.loadLeaderBoardAsync() });
       //更新服务器的score数据

		if (super.die()) {
			if (Game.inst.revived <= 0) {
				app.platform.logEvent(Log.EventType.GameOver, { type: app.status.playerType, level: app.pp.currentLevel, result: 2 })
			}
			AudioPlayer.pauseMusic();
			AudioPlayer.playSound("die-player.mp3")
			let flag = app.status.playerType == "old_player" || app.pp.currentLevel > 1
			if (flag && app.ad.hasRAD() && Game.inst.revived < 1 && this.group.position.z < -5 * GameConstant.BaseSpeed) {
				Game.inst.revived++;
				Utils.callLater(() => {
					Game.inst.ticker.stop();
					app.ui.addPopup(new ReviveView(this.rank + 1, Game.inst.currentProgress));
					let gameView = app.ui.getPopup(GameView);
					if (gameView) {
						// gameView.group_progressbar.visible = false;
						// gameView.txt_ranking.visible = false;
					}
				}, 500);
			} else {
				Game.inst.finish();
				/*Utils.callLater(() => {
					Game.inst.fail();
					Game.inst.resetLevel(app.pp.currentLevel);
					Game.inst.stop();
					app.ui.getPopup(GameView).close();
					app.ui.addPopup(new HomeView);
					
				}, 1500)*/
			}

			if (Game.inst.revived <= 0) {
				if (-this.group.position.z <= 5 * GameConstant.BaseSpeed) {
					app.platform.logEvent(Log.EventType.GameOver, { type: app.status.playerType, level: app.pp.currentLevel, result: 0 })
				} else if (!app.ad.hasRAD()) {
					app.platform.logEvent(Log.EventType.GameOver, { type: app.status.playerType, level: app.pp.currentLevel,result: 2 })
				}
			}
			return true;
		} else {
			return false;
		}
		//this.player._speed = 0;
        
	}

	onHitBoost() {
		AudioPlayer.playSound("boost.mp3")
	}
}