
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */


import { GameFIG_Config } from "../GameFIG/GameFIG_Config.js";


import windowUse from "./windowUse.js";
import GameFIG_WX from "../GameFIG/GameFIG_WX.js";




window.FilterOne = { showXu: null };//仅一个背景虚化遮罩否则严重闪屏
//主场景父类
export default class GameAll extends Laya.Scene {
    constructor() {
        super();
        this.viewAll = {
            Main: "Scene/GameMain.scene",
            QD: "Scene/GameQD.scene",
            Win: "Scene/GameWin.scene",
            GetYs:"Scene/GameYSGet.scene"
        }
        this.GameFIG = GameFIG_WX.Get();
        this.GameFIG_Config = GameFIG_Config;
        this.windowUser = windowUse.Get();
    }
    Closed() {
       
    }
    onClosed() {
        this.destroy();
        this.Closed();
    }
    /**
     * 打开其他场景 
     * @param {String} key 地址
     * @param {*} other 传递参数 {}  EndHaner 结束回调  OpenSetHaner 打开设置完成回调
     * @param {Boolean} TFopenFilter 是否打开背景虚化 
     * @param {Boolean} TFhide 是否隐藏当前界面
     * @param {Boolean} TFclose 是否关闭其他场景 默认false
     * @param {Laya.Handler} LoadOverhander 加载完成回调
     * @param {Laya.Handler} Loadhander 加载进度回调
     * @param {Boolean} ShowTishi 是否显示提示正在加载其他场景 配合other.OpenSetHaner使用 必须同时为true
     */
    OpenView(key = "", other = {}, TFopenFilter = true, TFhide = false, TFclose = false, LoadOverhander, Loadhander, ShowTishi = false) {
        if (other.OpenSetHaner && ShowTishi) {//当前界面还没关闭
            this.windowUser.GameDiaoxianFun_Show("正在加载其他场景");
            Laya.stage.on(Laya.Event.CLICK, this, this.Clickoff);
        }
        //开启整体背景虚化
        if (TFopenFilter) {
            // this.getChildAt(0).srollRect = new Laya.Rectangle( this.getChildAt(0).x * -1, 0, Laya.stage.width, Laya.stage.height)
            this.OpenFilter();
        }
        if (TFhide) {
            this.visible = false;
        }

        //--打开场景 但不关闭当前场景
        Laya.Scene.open(key, TFclose, other, LoadOverhander, Loadhander);

    }
    Show() {
        this.visible = true;
    }
    /**打开背景遮罩 */
    OpenFilter(fiter = this) {
        var blurFilter = new Laya.BlurFilter();
        blurFilter.strength = 10;
        fiter.filters = [blurFilter];
        this.CloseFiter = fiter;
        //  this.visible = false;
        /**********************开启后全局一个虚化，防止多个虚化屏幕出现严重抖动
        // if (window.FilterOne.showXu != null) {
        //     this.LastXuHua = window.FilterOne.showXu;
        //     window.FilterOne.showXu.filters = null;
        // }
        // //注意 打开新虚化背景后会记录关闭之前的虚化背景是那个，当关闭新打开的虚化背景时 就会打开对应关闭的虚化。切勿乱跳
        // window.FilterOne[this["$_GID"].toString()] = this;
        // window.FilterOne.showXu = this;
         */
    }

    HideFilter() {

        if (this.CloseFiter != this) {
            this.visible = true;
            this.CloseFiter.destroy();
        } else {
            this.filters = null;
        }
        /**********************开启后全局一个虚化 
        // delete window.FilterOne[this["$_GID"].toString()];
        // if (this.LastXuHua != undefined) {
        //     var blurFilter = new Laya.BlurFilter();
        //     blurFilter.strength = 10;
        //     this.LastXuHua.filters = [blurFilter];
        //     this.LastXuHua = undefined;
        //     window.FilterOne.showXu = this.LastXuHua;
        // } else {
        //     window.FilterOne.showXu = null;
        // }
        */
    }
    Clickoff() {
        console.log("阻止加载点击")
    }
    /**显示此场景并执行上个场景的回调----防止直接打开页面未及时更新 仅限在不关闭当前场景的情况下 */
    OpenOver() {
        if (this.OpenDmsg.OpenSetHaner) {
            this.windowUser.GameDiaoxianFun_hide();
            Laya.stage.off(Laya.Event.CLICK, this, this.Clickoff);
            this.visible = true;
            this.OpenDmsg.OpenSetHaner.run();
            this.OpenDmsg.OpenSetHaner = undefined;
        }

    }
}