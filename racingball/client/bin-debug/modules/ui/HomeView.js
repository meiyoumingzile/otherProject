var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var HomeView = (function (_super) {
    __extends(HomeView, _super);
    function HomeView() {
        var _this = _super.call(this) || this;
        _this.modalAlpha = .4;
        return _this;
    }
    HomeView.prototype.childrenCreated = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var tw, sc, i, friendRankList, _a, arr, loadingView, skins_star, index, time, tapped;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _super.prototype.childrenCreated.call(this);
                        //app.pp.cleanData();
                        //app.platform.updateScore(Math.round(10), JSON.stringify({ skin: app.pp.currentSkinID }));
                        this.bestGrade.text = "BEST\n" + Math.round(app.pp.starCount);
                        tw = egret.Tween.get(this.btn_friendly, { loop: true });
                        tw.to(0, 0).call(function () { this.scaleX = 1; this.scaleY = 1; }).wait(2000);
                        sc = [-0.1, 0.05, -0.03, 0.05, -0.03];
                        for (i = 0; i < 5; i++) {
                            tw.to({ scaleX: 1.0 + sc[i], scaleY: 1.0 - sc[i] }, 100 - i * 10)
                                .to({ scaleX: 1, scaleY: 1 }, 55);
                        }
                        _a = app.status.friendRankList;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, app.platform.getFriendRankList()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        friendRankList = _a;
                        arr = [];
                        friendRankList.map(function (value) {
                            var player = RankPlayerVO.createFromLeaderBoardEntry(value);
                            if (player.id != app.platform.id())
                                arr.push(player);
                        });
                        GameView.sortByScore(arr, 0, arr.length - 1, function (a, b) {
                            return a.score > b.score;
                        });
                        this.dg_friends.dataProvider = new eui.ArrayCollection(arr);
                        loadingView = app.ui.getPopup(LoadingView);
                        loadingView && app.ui.rmPopup(loadingView);
                        this.gp_dev_tools.visible = app.storager.get('vconsole') === 'show';
                        this.btn_clear.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                            app.pp.cleanData();
                        }, this);
                        this.txt_go.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                            var level = parseInt(_this.txt_level.text); //将字符串转化为整数
                            if (level < 1 || isNaN(level)) {
                                egret.log("Invalid parameter!");
                                return;
                            }
                            app.pp.currentLevel = level;
                            app.pp.pushData();
                            Game.inst.resetLevel(level);
                        }, this);
                        skins_star = app.status.skinItemData.filter(function (v) { return v.price.type === 2; }).map(function (i) { return i.id; });
                        index = 1;
                        time = 800;
                        Utils.makeArrayRandom(skins_star);
                        this.btn_rare.icon = app.status.skinItemData[skins_star[0] - 1].thumb;
                        this.ticker = egret.setInterval(function () {
                            if (index === skins_star.length) {
                                Utils.makeArrayRandom(skins_star);
                                index = 0;
                            }
                            _this.btn_rare.icon = app.status.skinItemData[skins_star[index] - 1].thumb;
                            index++;
                        }, this, time);
                        this.txt_star_amount.text = app.pp.starCount + "";
                        // this.img_game.mask = this.img_game_mask;
                        // this.img_game.source = "bump.jpg";
                        this.img_logo.scale = Constant.FullWidthScale;
                        this.gp_play.scale = Constant.FullWidthScale;
                        this.gp_btns.scale = Constant.FullWidthScale;
                        this.gp_btns.layout.gap = (this.stage.stageWidth - this.btn_rank.width * this.gp_btns.numChildren) / this.gp_btns.numChildren;
                        this.btn_single.addEventListener("touchTap", function () {
                            app.platform.logEvent(Log.EventType.HomeClick, { type: app.status.playerType, source: "btnPlay" });
                            _this.close();
                            // app.ui.addPopup(new MatchView);
                            //Game.inst.start();
                            app.notify(AppConstant.Notify.enter_game);
                        }, this);
                        this.btn_friendly.addEventListener("touchTap", function () {
                            app.platform.logEvent(Log.EventType.HomeClick, { type: app.status.playerType, source: "btnPlay" });
                            Common.invite().then(function () {
                                _this.close();
                                // app.ui.addPopup(new MatchView);
                                app.notify(AppConstant.Notify.enter_game);
                            });
                        }, this);
                        // this.gp_game.addEventListener("touchTap", () => {
                        // 	app.platform.logEvent(Log.EventType.ChangeGame, { type: app.status.playerType, result: 0 });
                        // 	app.platform.logEvent(Log.EventType.HomeClick, { type: app.status.playerType, source: "btnOtherGame" });
                        // 	let bo = app.platform.switchGame("274629043216304");
                        // 	if (bo) {
                        // 		app.platform.logEvent(Log.EventType.ChangeGame, { type: app.status.playerType, result: 1 });
                        // 	} else {
                        // 		app.platform.logEvent(Log.EventType.ChangeGame, { type: app.status.playerType, result: 2 });
                        // 	}
                        // }, this);
                        this.btn_rank.addEventListener("touchTap", function () {
                            _this.close();
                            app.ui.addPopup(new RankView);
                            app.platform.logEvent(Log.EventType.HomeClick, { type: app.status.playerType, source: "btnRank" });
                        }, this);
                        this.btn_skin.addEventListener("touchTap", function () {
                            _this.close();
                            app.ui.addPopup(new SkinView);
                            app.platform.logEvent(Log.EventType.HomeClick, { type: app.status.playerType, source: "btnSkin" });
                        }, this);
                        this.btn_rare.addEventListener("touchTap", function () {
                            /*this.close();
                            app.ui.addPopup(new InviteView);
                            app.platform.logEvent(Log.EventType.HomeClick, { type: app.status.playerType, source: "btnInviteSkin" });
                            */
                            _this.onTapShare();
                        }, this);
                        this.btn_audio.addEventListener("touchTap", function () {
                            AudioPlayer.setMute(!AudioPlayer.isMute());
                            _this.updateAudioBtn();
                        }, this);
                        this.updateAudioBtn();
                        //判断是否移动端环境,移动声音按钮位置
                        if (!egret.Capabilities.isMobile) {
                            this.btn_audio.top = 40;
                        }
                        Game.inst.complete && Game.inst.resetLevel(app.pp.currentLevel);
                        // Context.isFB && RES.getResByUrl(FBInstant.player.getPhoto()) //缓存头像
                        /** vConsole */
                        this.vconsole_switcher.touchEnabled = true;
                        tapped = 0;
                        this.vconsole_switcher.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                            if (++tapped > 9) {
                                tapped = 0;
                                if (app.storager.get('vconsole') !== 'show') {
                                    app.storager.set('vconsole', 'show');
                                    window['vconsole'].showSwitch();
                                    Utils.recoverLog();
                                    _this.gp_dev_tools.visible = true;
                                }
                                else {
                                    app.storager.rm('vconsole');
                                    window['vconsole'].hideSwitch();
                                    Utils.removeLog();
                                    _this.gp_dev_tools.visible = false;
                                }
                            }
                        }, this);
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeView.prototype.updateAudioBtn = function () {
        this.btn_audio.getChildAt(0).source = !AudioPlayer.isMute() ? "home-btn-audio-off.png" : "home-btn-audio-on.png";
    };
    HomeView.prototype.listResponse = function () {
        return [AppConstant.Notify.refresh_invite_count];
    };
    HomeView.prototype.doResponse = function (name, data) {
        if (name === AppConstant.Notify.refresh_invite_count) {
            this.refreshNotify();
        }
    };
    HomeView.prototype.refreshNotify = function () {
        if (app.pp.newStarSkinAmount) {
            this.gp_notify_skin.visible = true;
            this.txt_notify_skin.text = app.pp.newStarSkinAmount + "";
        }
        if (app.pp.checkNewInviteSkin()) {
            this.gp_notify_invite.visible = true;
            this.txt_notify_invite.text = app.pp.newInviteSkinAmount + "";
        }
    };
    HomeView.prototype.onExit = function () {
        _super.prototype.onExit.call(this);
        egret.Tween.removeAllTweens();
        egret.clearInterval(this.ticker);
    };
    /*private _timeLine:.TimeLine;
    private startShake(){
        
        if(!this._timeLine){
            var timeLine:egret.Timer = new egret.Timer(500,1);
            timeLine
            .addLabel("shake0", 0).to(this.owner, {scaleX: 1, scaleY: 1}, 2000)
            .addLabel("shake", 0).to(this.owner, {scaleX: 0.9, scaleY: 1.1}, 100)
            .addLabel("shake1", 0).to(this.owner, {scaleX: 1, scaleY: 1}, 55)
            .addLabel("shake2", 0).to(this.owner, {scaleX: 1.05, scaleY: 0.95}, 80)
            .addLabel("shake3", 0).to(this.owner, {scaleX: 1, scaleY: 1}, 55)
            .addLabel("shake4", 0).to(this.owner, {scaleX: 0.97, scaleY: 1.02}, 60)
            .addLabel("shake5", 0).to(this.owner, {scaleX: 1, scaleY: 1}, 40)
            .addLabel("shake6", 0).to(this.owner, {scaleX: 1.05, scaleY: 0.95}, 50)
            .addLabel("shake7", 0).to(this.owner, {scaleX: 1, scaleY: 1}, 40)
            .addLabel("shake8", 0).to(this.owner, {scaleX: 0.97, scaleY: 1.03}, 40)
            .addLabel("shake9", 0).to(this.owner, {scaleX: 1, scaleY: 1}, 40)


            this._timeLine = timeLine;
        }

        // this._timeLine.offAllCaller(this);
        // this._timeLine.once(Laya.Event.COMPLETE, this, ()=>{
        //     Laya.timer.once(2500,this,()=>{
        //         this.startShake();
        //     })
        // })
        this._timeLine.play(0,true);
    }*/
    HomeView.prototype.onTapShare = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ShareHelper.sendGenericUpdate(true)];
                    case 1:
                        _a.sent();
                        app.platform.logEvent(Log.EventType.RankClick, { type: app.status.playerType, source: "btnShare" });
                        return [2 /*return*/];
                }
            });
        });
    };
    return HomeView;
}(BasePopup));
__reflect(HomeView.prototype, "HomeView");
//# sourceMappingURL=HomeView.js.map