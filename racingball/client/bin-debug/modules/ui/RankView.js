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
var RankView = (function (_super) {
    __extends(RankView, _super);
    function RankView() {
        var _this = _super.call(this) || this;
        _this._current_tab = "world";
        _this.worldRankEntries = [];
        _this.friendRankEntries = [];
        return _this;
    }
    //以上是列表的控件
    RankView.prototype.childrenCreated = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var friendRankList, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _super.prototype.childrenCreated.call(this);
                        this.gp_friends.scale = Constant.FullWidthScale;
                        this.rect_white_bar.width *= Constant.FullWidthScale;
                        this.img_portrait_champion.mask = this.img_portrait_champion_mask;
                        this.addEventListener('PlayWithFriend', function () {
                            this.close();
                            app.ui.addPopup(new GameView);
                            Game.inst.start();
                        }, this);
                        _a = app.status.friendRankList;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, app.platform.getFriendRankList()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        friendRankList = _a;
                        friendRankList.map(function (value) {
                            _this.friendRankEntries.push(RankPlayerVO.createFromLeaderBoardEntry(value));
                        });
                        GameView.sortByScore(this.friendRankEntries, 0, this.friendRankEntries.length - 1, function (a, b) {
                            return a.score > b.score;
                        });
                        if (this.friendRankEntries.length) {
                            this.img_portrait_champion.source = this.friendRankEntries[0].photo;
                            this.lb_champion_name.text = this.friendRankEntries[0].name;
                        }
                        this.dg_friends.dataProvider = new eui.ArrayCollection(this.friendRankEntries);
                        // let worldRankList: FBInstant.LeaderboardEntry[] = app.status.worldRankList || await app.platform.getWorldRankList();
                        /*friendRankList.map((value) => {
                            this.friendRankEntries.push(value);
                        })
                
                        this.myWorldEntry = app.platform.getWorldSelfEntry();
                        this.myFriendEntry = this.friendRankEntries.find(value => value.id === app.platform.id());
                
                        egret.log("this.myWorldEntry", this.myWorldEntry);
                        let rankPlayerVO = new RankPlayerVO();
                        Object.assign(rankPlayerVO, this.myWorldEntry);
                        rankPlayerVO["bg"] = "rank-bar-personal.png";
                        rankPlayerVO["name_color"] = 0xffffff;
                        this.node_world.data = rankPlayerVO;
                
                        rankPlayerVO = new RankPlayerVO();
                        Object.assign(rankPlayerVO, this.myFriendEntry);
                        rankPlayerVO["bg"] = "rank-bar-personal.png";
                        rankPlayerVO["name_color"] = 0xffffff;
                        this.node_friend.data = rankPlayerVO;
                
                        this.list_world.dataProvider = new eui.ArrayCollection(friendRankList);
                        //this.list_friend.dataProvider = //new eui.ArrayCollection(this.friendRankEntries);
                        */
                        this.btn_home.addEventListener("touchTap", this.onTapHome, this);
                        return [2 /*return*/];
                }
            });
        });
    };
    RankView.prototype.onTapHome = function () {
        this.close();
        app.ui.addPopup(new HomeView);
    };
    RankView.prototype.onTapWorld = function () {
        if (this._current_tab === "world") {
            //do nothing
        }
        else {
            AudioPlayer.playSound("click.mp3");
            this._current_tab = "world";
            this.img_portrait_champion.source = this.worldRankEntries[0] && this.worldRankEntries[0].photo;
            // this.txt_champion.text = this.worldRankEntries[0] && this.worldRankEntries[0].name;
            this.img_tab_friend.visible = false;
            this.img_tab_world.visible = true;
            this.view_stack.selectedIndex = 0;
        }
    };
    RankView.prototype.onTapFriend = function () {
        if (this._current_tab === "world") {
            AudioPlayer.playSound("click.mp3");
            this._current_tab = "friend";
            this.img_portrait_champion.source = this.friendRankEntries[0] && this.friendRankEntries[0].photo;
            // this.txt_champion.text = this.friendRankEntries[0] && this.friendRankEntries[0].name;
            this.img_tab_world.visible = false;
            this.img_tab_friend.visible = true;
            this.view_stack.selectedIndex = 1;
        }
        else {
            //do nothing
        }
    };
    RankView.prototype.onTapShare = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ShareHelper.sendGenericUpdate(true)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return RankView;
}(BasePopup));
__reflect(RankView.prototype, "RankView");
//# sourceMappingURL=RankView.js.map