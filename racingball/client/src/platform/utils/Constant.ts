namespace Constant {
    export let ErrorCode = {
        RATE_LIMITED: "RATE_LIMITED",
        NETWORK_FAILURE: "NETWORK_FAILURE",
        USER_INPUT: "USER_INPUT"
    }

    export let guiParams = {
        enableRotate: false,
        following: true,
        wireframe: true,
        switchPlayer: 0
    };

    export const VERSION = $T_GAME_VERSION;
    export let FullWidthScale = 1;
    export let MatchingTime = 4000;
    export const ReviveTime = 6000;
    export const CompleteDelay = 2000;
    export const starAmount = [0, 30, 24, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2];//前12名有奖励,length = 13
}

namespace GameConstant {

    export const ToRadian = Math.PI / 180;
    export const ToDegree = 180 / Math.PI;
    export const V3Zero = new THREE.Vector3();
    export const V3Right = new tr.Vector3(1, 0, 0);
    export const V3Up = new tr.Vector3(0, 1, 0);

    export const BallR = .6
    export const ObsSize = 2
    export const FBXScale = GameConstant.BallR / 19.685
    export const ObsScale = FBXScale * ObsSize * .5 / BallR
    export const ReviveBackDist = 40;
    export let TrackLength = 300;
    export const RobotGap = 16
    export const PlayersCount = 3;
    export const BaseSpeed = 50
    export const BaseSpeedRobot = 48.4;// (TrackLength - (PlayersCount * .5 * RobotGap)) / 60;
    export const CameraFollowDist = 10
    export const PlayerBoostLevelSpeed = 20;
    export const Maps = ["chushi", "kehuan", "shamo"];
    export let Map = Maps[0];
    export const MapColor = {
        shamo: 0xF9C090,
        kehuan: 0x091551,
        chushi: 0x45dcdd,
    }
    export const Anisotropy = 8;
}