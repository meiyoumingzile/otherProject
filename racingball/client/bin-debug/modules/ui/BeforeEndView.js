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
var BeforeEndView = (function (_super) {
    __extends(BeforeEndView, _super);
    function BeforeEndView() {
        var _this = _super.call(this) || this;
        _this.autoClose = true;
        _this.fullscreen = false;
        _this.modalAlpha = .6;
        return _this;
    }
    BeforeEndView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // this.stage.addEventListener("touchBegin", (e: egret.TouchEvent) => {
        // 	if (e.target !== this.btn_invite) {
        // 		this.close();
        // 		app.ui.addPopup(new EndView(Game.inst.player.rank));
        // 	}
        // }, this);
        this.btn_invite.addEventListener("touchTap", this.onTapInvite, this);
    };
    BeforeEndView.prototype.onTapInvite = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("onTapInvite");
                        // app.platform.logEvent(Log.EventType.InviteGetSkin, { type: app.status.playerType, result: 0 });
                        return [4 /*yield*/, ShareHelper.sendGenericUpdate(true, {
                                invite_skin_data: { playerId: app.platform.id(), skinId: 0 }
                            })];
                    case 1:
                        // app.platform.logEvent(Log.EventType.InviteGetSkin, { type: app.status.playerType, result: 0 });
                        _a.sent();
                        return [4 /*yield*/, Utils.wait(200)];
                    case 2:
                        _a.sent();
                        this.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    BeforeEndView.prototype.onExit = function () {
        app.ui.addPopup(new EndView());
    };
    return BeforeEndView;
}(BasePopup));
__reflect(BeforeEndView.prototype, "BeforeEndView");
//# sourceMappingURL=BeforeEndView.js.map