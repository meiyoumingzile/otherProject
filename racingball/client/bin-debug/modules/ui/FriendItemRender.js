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
var FriendItemRender = (function (_super) {
    __extends(FriendItemRender, _super);
    function FriendItemRender() {
        var _this = _super.call(this) || this;
        _this.initialized = false;
        return _this;
    }
    FriendItemRender.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    FriendItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.initialized = true;
        /*this.addEventListener(egret.TouchEvent.TOUCH_TAP,async()=>{
            app.ui.busy();
            let bo = await platform.createCtx(this.data.id);
            app.ui.rmBusy();
            if(bo){
                app.model.player.incrPlayWithFriendCount();
                app.notify(Constant.Notify.start_game);
                app.ui.toast(app.lang.getString("lab_playWith","Playing with {name}",{name:this.data.name}));
            }
            //platform.log(Constant.LogEvent.create,{type:"home_friend",result:bo?1:0})
            this.onTapPlay();
        },this);*/
    };
    FriendItemRender.prototype.dataChanged = function () {
        if (!this.initialized)
            return;
        if (!this.data)
            return;
        var data = this.data;
        this.txt_name.text = data.name;
        this.node_head.source = data.photo;
        this.node_head.mask = this.node_head_mask;
        this.node_head.touchEnabled = true;
        this.node_head.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapPlay, this);
    };
    FriendItemRender.prototype.onTapPlay = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, app.platform.createCtx(this.data.id)];
                    case 1:
                        bo = _a.sent();
                        bo && this.dispatchEventWith('PlayWithFriend', true);
                        return [2 /*return*/];
                }
            });
        });
    };
    FriendItemRender.cur_friendRander = null;
    return FriendItemRender;
}(eui.ItemRenderer));
__reflect(FriendItemRender.prototype, "FriendItemRender", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=FriendItemRender.js.map