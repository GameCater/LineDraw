

/**定制UI动画父类 */
export default class UIAni extends Laya.Script {
    constructor() {
        super();
        // this.Owner.StartFun = null;//开始播放动画调用方法 Laya.hander
        // this.Owner.EndFun = null;//结束播放动画调用方法 Laya.hander
    }

    onEnable() {
        this._Enable();
    }
    _Enable() {

    }
    PlayOver(index){
        
    }

}