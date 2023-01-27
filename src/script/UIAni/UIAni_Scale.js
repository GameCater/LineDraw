import UIAni from "./UIAni";

export default class UIAni_Scale extends UIAni {

    constructor() {
        super();
        /** @prop {name:scaleTo, tips:"缩放到", type:float, default:0.8}*/
        let scaleTo = 0.8;
        /** @prop {name:scaleCome, tips:"缩放回", type:float, default:1}*/
        let scaleCome = 1;
        /** @prop {name:Time, tips:"动画时间", type:Int, default:500}*/
        let Time = 500;
        this.scaleTo = scaleTo;
        this.scaleCome = scaleCome;
        this.Time = Time;
        // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
    }

    _Enable() {
        
        this.TimeLine = Laya.TimeLine
            .to(this.owner, { scaleX: this.scaleTo, scaleY: this.scaleTo }, this.Time)
            .to(this.owner, { scaleX: this.scaleCome, scaleY: this.scaleCome }, this.Time)
        this.TimeLine.play(0, true);

    }
    onDestroy() {
        this.TimeLine.destroy();
    }
}