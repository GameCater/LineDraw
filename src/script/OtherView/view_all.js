import GameAll from "../scene/GameAll";


/**
 * 页面逻辑父类
   * @param {*} 页面继承逻辑后 OnEnale请使用_Enable
   * @param {*} 页面继承逻辑后 UIMMP 会自动调用 请重写方法
   * @param {*} 页面继承逻辑后 Addbut 会自动调用 请重写方法
   * @param {*} EndFun 动画结束调用方法 定制版
   * @param {*} EndHaner 场景关闭调用方法 定制版
   * @param {*} CloseGC 关闭当前场景(无关闭动画) 并执行 EndHaner 
   * @param {*} OtherCloseFun 有关闭动画时调用此结束 并调用CloseGC
   * 
 */
export default class view_all extends GameAll {
    constructor() {
        super();
        this.nodeUI = [];
        this.OpenDmsg = {};
    }
    _Enable() {

    }
    onEnable() {
        this.zOrder = 11;
        this._Enable();
        this.UIMMP();
        this.Addbut();
    }

    UIMMP() {
        this.height = Laya.stage.height;
        for (var a = 0; a < this.nodeUI.length; a++) {
            if (this.nodeUI[a].type == "所有") {
                for (var b = 0; b < this.nodeUI[a].node.numChildren; b++) {
                    this.nodeUI[a].node.getChildAt(b).y =  this.nodeUI[a].node.getChildAt(b).y / 1334 * Laya.stage.height;
                }
            } else {//单独设置
                this.nodeUI[a].node.y = this.nodeUI[a].node.y / 1334 * Laya.stage.height;
            }

        }
    }
    Addbut() {

    }
    onOpened(OpenedMsg) {
        if (OpenedMsg == null) {
            OpenedMsg = {};
        }
        this.OpenDmsg = OpenedMsg;
        this._Opened(OpenedMsg);
    }
    _Opened(OpenedMsg) {

    }
   /**
    * 关闭当前场景 并执行关闭函数
    * @param {*} res EndHaner返回参数
    */
    CloseGC(res) {
        if (this.OpenDmsg.EndHaner != undefined) {
            this.OpenDmsg.EndHaner.runWith(res);
        }
        this.close();
    }
    /**
     * 有关闭动画时调用此结束
     * @param {*} res EndHaner返回参数
     */
    OtherCloseFun(res) {
        if (this.EndFun) {
            this.EndFun.runWith(Laya.Handler.create(this, this.CloseGC,[res]));
        } else {
            this.CloseGC(res);
        }

    }
}