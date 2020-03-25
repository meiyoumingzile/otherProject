var Constant;
(function (Constant) {
    Constant.ErrorCode = {
        RATE_LIMITED: "RATE_LIMITED",
        NETWORK_FAILURE: "NETWORK_FAILURE",
        USER_INPUT: "USER_INPUT"
    };
    Constant.guiParams = {
        enableRotate: false,
        following: true,
        wireframe: true,
        switchPlayer: 0
    };
    Constant.VERSION = $T_GAME_VERSION;
    Constant.FullWidthScale = 1;
    Constant.MatchingTime = 4000;
    Constant.ReviveTime = 6000;
    Constant.CompleteDelay = 2000;
    Constant.starAmount = [0, 30, 24, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2]; //前12名有奖励,length = 13
})(Constant || (Constant = {}));
var GameConstant;
(function (GameConstant) {
    GameConstant.ToRadian = Math.PI / 180;
    GameConstant.ToDegree = 180 / Math.PI;
    GameConstant.V3Zero = new THREE.Vector3();
    GameConstant.V3Right = new tr.Vector3(1, 0, 0);
    GameConstant.V3Up = new tr.Vector3(0, 1, 0);
    GameConstant.BallR = .6;
    GameConstant.ObsSize = 2;
    GameConstant.FBXScale = GameConstant.BallR / 19.685;
    GameConstant.ObsScale = GameConstant.FBXScale * GameConstant.ObsSize * .5 / GameConstant.BallR;
    GameConstant.ReviveBackDist = 40;
    GameConstant.TrackLength = 300;
    GameConstant.RobotGap = 16;
    GameConstant.PlayersCount = 3;
    GameConstant.BaseSpeed = 50;
    GameConstant.BaseSpeedRobot = 48.4; // (TrackLength - (PlayersCount * .5 * RobotGap)) / 60;
    GameConstant.CameraFollowDist = 10;
    GameConstant.PlayerBoostLevelSpeed = 20;
    GameConstant.Maps = ["chushi", "kehuan", "shamo"];
    GameConstant.Map = GameConstant.Maps[0];
    GameConstant.MapColor = {
        shamo: 0xF9C090,
        kehuan: 0x091551,
        chushi: 0x45dcdd,
    };
    GameConstant.Anisotropy = 8;
})(GameConstant || (GameConstant = {}));
//# sourceMappingURL=Constant.js.map