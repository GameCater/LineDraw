import UIAni_ViewOpenShow from "./UIAni_ViewOpenShow";

/**打开页面弹窗的出场方式 仅支持规范操作 萌游吱吱 定制版 */
export default class UIAni_ViewOpenShow_Cut extends UIAni_ViewOpenShow {

    constructor() {
        super();
        /** @prop {name:TypeChoose, tips:"类型 0父物体继承view_all 1自身继承view_all", type:Int,default:0}*/
        let TypeChoose = 0;
        /** @prop {name:Type, tips:"出场方式0 从上往下显示 1从左往右显示 2从下往上显示 3从右往左显示", type:Int, default:0}*/
        let Type = 0;
        /** @prop {name:Time, tips:"出场时间", type:Int, default:1000}*/
        let Time = 1000;
        /** @prop {name:TypeEnd, tips:"退出方式0 从下往上消失 1从右往左消失 2从上往下消失 3从左往右消失 4直接退出", type:Int, default:0}*/
        let TypeEnd = 0;
        /** @prop {name:TimeEnd, tips:"出场时间", type:Int, default:1000}*/
        let TimeEnd = 1000;
        /** @prop {name:Ease, tips:"出场缓动类型", type:Ease}*/
        let Ease = Laya.Ease.linearIn;
        /** @prop {name:EndEase, tips:"退出缓动类型", type:Ease}*/
        let EndEase = Laya.Ease.linearIn;
        // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
        this.Type = Type;
        this.TypeEnd = TypeEnd;
        this.Time = Time;
        this.TimeEnd = TimeEnd;
        this.EndEase = EndEase;
        this.Ease = Ease;
        this.TypeChoose = TypeChoose;
    }

    begin() {
        this.owner.scrollRect = new Laya.Rectangle(0, 0, this.owner.width, this.owner.height);
        var TypeAll = [
            { height: 0 },
            { width: 0 },
            { y: Laya.stage.height },
            { x: Laya.stage.width }
        ]

        var ThirdTween = Laya.Tween.from(this.owner.scrollRect, TypeAll[this.Type], this.Time, this.Ease);
    }
    End(Handler) {
        if (this.TypeEnd != 4) {
            var TypeAll = [
                { height: 0 },
                { width: 0 },
                { y: Laya.stage.height },
                { x: Laya.stage.width }
            ]
            var ThirdTween = Laya.Tween.to(this.owner.scrollRect, TypeAll[this.TimeEnd], this.TimeEnd, this.EndEase, Handler);

        } else {
            Handler.run();
        }

    }

}

