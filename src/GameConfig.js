/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import GameUI from "./script/scene/GameUI"
import view_QD from "./script/OtherView/view_QD"
import UIAni_ViewOpenShow from "./script/UIAni/UIAni_ViewOpenShow"
import view_win from "./script/OtherView/view_win"
import UIAni_DouDong from "./script/UIAni/UIAni_DouDong"
import view_YsGet from "./script/OtherView/view_YsGet"
import load from "./script/scene/load"
import UIAni_Scale from "./script/UIAni/UIAni_Scale"

export default class GameConfig {
    static init() {
        //注册Script或者Runtime引用
        let reg = Laya.ClassUtils.regClass;
		reg("script/scene/GameUI.js",GameUI);
		reg("script/OtherView/view_QD.js",view_QD);
		reg("script/UIAni/UIAni_ViewOpenShow.js",UIAni_ViewOpenShow);
		reg("script/OtherView/view_win.js",view_win);
		reg("script/UIAni/UIAni_DouDong.js",UIAni_DouDong);
		reg("script/OtherView/view_YsGet.js",view_YsGet);
		reg("script/scene/load.js",load);
		reg("script/UIAni/UIAni_Scale.js",UIAni_Scale);
    }
}
GameConfig.width = 750;
GameConfig.height = 1334;
GameConfig.scaleMode ="fixedwidth";
GameConfig.screenMode = "none";
GameConfig.alignV = "top";
GameConfig.alignH = "left";
GameConfig.startScene = "Scene/Load.scene";
GameConfig.sceneRoot = "";
GameConfig.debug = false;
GameConfig.stat = false;
GameConfig.physicsDebug = false;
GameConfig.exportSceneToJson = true;

GameConfig.init();
