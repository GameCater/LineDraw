import UIAni from "./UIAni";

export default class UIAni_Rotate extends UIAni {

    constructor() {
        super();
        /** @prop {name:RotateTo, tips:"旋转到开始角度", type:Int, default:0}*/
        let RotateTo = 0;
        /** @prop {name:RotateCome, tips:"旋转到结束角度", type:Int, default:0}*/
        let RotateCome = 0;
        /** @prop {name:Time, tips:"动画时间单个循环时间，时间占比 当前0-开始0.25-目标0.75-当前1  必须整数10的倍数", type:Int, default:1000}*/
        let Time = 1000;

        this.RotateTo = RotateTo;
        this.RotateCome = RotateCome;
        this.Time = Time;
        // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
    }

    _Enable() {
        Laya.Tween.to(this.owner, { rotation: this.RotateTo }, this.Time * .25, Laya.Ease.linearIn, Laya.Handler.create(this, function () {
            this.TimeLine = Laya.TimeLine
                .to(this.owner, { rotation: this.RotateCome }, this.Time * .5)
                .to(this.owner, { rotation: this.RotateTo }, this.Time * .5)
            this.TimeLine.play(0, true);
        }
        ))


    }
    onDestroy() {
        this.TimeLine.destroy();
    }
}