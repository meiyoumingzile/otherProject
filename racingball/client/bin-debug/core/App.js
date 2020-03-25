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
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        return _super.call(this) || this;
    }
    App.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var skinItemData, friendList, friendRankList, worldRankList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.platform = PlatformFactory.create();
                        this.storager = new Storager();
                        this.http = new HttpService();
                        this.ui = new Director(Context.stage);
                        this.ad = ADFactory.create();
                        this.ad.on("iad_showed", function (count) {
                            // this.platform.logEvent(Log.EventType.iad_times, { result: count })
                        });
                        this.ad.on("rad_showed", function (count) {
                            // this.platform.logEvent(Log.EventType.rad_times, { result: count })
                        });
                        AudioPlayer.init();
                        this.pp = new PlayerPersistent();
                        skinItemData = skinDB2SkinData();
                        friendList = null;
                        friendRankList = null;
                        worldRankList = null;
                        this.status = {
                            playerType: null,
                            localRobotData: null,
                            friendList: friendList,
                            friendRankList: friendRankList,
                            worldRankList: worldRankList,
                            skinItemData: skinItemData,
                            lastPlayADTime: Date.now(),
                            lastPlayRADTime: Date.now(),
                            playTimes: 0,
                            finishTimes: 0,
                        };
                        return [4 /*yield*/, this.pp.pullData()];
                    case 1:
                        _a.sent();
                        this.pp.lastPlayTimestamp = Date.now();
                        this.pp.pushData();
                        return [2 /*return*/];
                }
            });
        });
    };
    App.startup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var app;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        app = new App();
                        Object.defineProperty(window, 'app', { get: function () { return app; }, configurable: true });
                        return [4 /*yield*/, app.init()];
                    case 1:
                        _a.sent();
                        app.registCommand(AppConstant.Notify.startup, StartupCmd);
                        app.notify(AppConstant.Notify.startup);
                        return [2 /*return*/, app];
                }
            });
        });
    };
    App.onGameReady = function () {
        return __awaiter(this, void 0, void 0, function () {
            var vconsole, _a, _b, _c, score, data, friendIDs_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        vconsole = new VConsole();
                        window["vconsole"] = vconsole;
                        if (app.storager.get('vconsole') === 'show') {
                        }
                        else {
                            vconsole.hideSwitch();
                            Utils.removeLog();
                        }
                        /** vConsole end */
                        // app.ui.addPopup(new LoadingView);
                        return [4 /*yield*/, Utils.wait(200)];
                    case 1:
                        /** vConsole end */
                        // app.ui.addPopup(new LoadingView);
                        _d.sent();
                        new Game().resetLevel(app.pp.currentLevel);
                        _a = Context.isFB;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, FBInstant.startGameAsync()];
                    case 2:
                        _a = (_d.sent());
                        _d.label = 3;
                    case 3:
                        _a;
                        return [4 /*yield*/, app.platform.checkBotSubscribe()];
                    case 4:
                        _d.sent();
                        return [4 /*yield*/, app.platform.tryCreateShortcut()];
                    case 5:
                        _d.sent();
                        this.setupAudio();
                        if (app.platform.getContextID()) {
                            app.ui.addPopup(new GameView);
                            LocalRobotData.getRobotsInfo().then(function (arr) {
                                app.status.localRobotData = arr;
                                Game.inst.start();
                            });
                        }
                        else {
                            app.ui.addPopup(new HomeView);
                        }
                        app.platform.logEvent(Log.EventType.LoadDetail, { type: "ready" });
                        RES.loadGroup("audio");
                        RES.loadGroup('rank');
                        RES.loadGroup('skin');
                        RES.loadGroup('invite');
                        RES.loadGroup('share');
                        return [4 /*yield*/, app.platform.updateScore(0, JSON.stringify({ skin: app.pp.currentSkinID }))];
                    case 6:
                        _d.sent();
                        //开始获取排行榜
                        egret.log("Load leaderboard.");
                        _b = app.status;
                        return [4 /*yield*/, app.platform.getFriendRankList()];
                    case 7:
                        _b.friendRankList = _d.sent();
                        _c = app.status;
                        return [4 /*yield*/, app.platform.getWorldRankList()];
                    case 8:
                        _c.worldRankList = _d.sent();
                        egret.log("Leaderboard loaded success.");
                        if (app.platform instanceof PlatformFB) {
                            score = app.pp.starCount;
                            data = {
                                nickname: app.platform.name(),
                                playerInfo: { head: app.platform.photo(), score: score },
                            };
                            app.platform.setSessionData(data);
                            friendIDs_1 = [];
                            app.platform.getConnectedFriendList().then(function (res) {
                                if (res.length) {
                                    res.forEach(function (item) { return friendIDs_1.push(item.getID()); });
                                    Http.post('https://fb-bot.capjoy.com/api/v0/upload_61', {
                                        data: JSON.stringify({
                                            action: "friends",
                                            playerId: app.platform.id(),
                                            payload: friendIDs_1
                                        })
                                    });
                                }
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    App.setupAudio = function () {
        Context.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (e.target instanceof eui.Button) {
                AudioPlayer.playSound("click.mp3");
            }
        }, null);
    };
    return App;
}(Facade));
__reflect(App.prototype, "App");
//# sourceMappingURL=App.js.map