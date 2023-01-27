import UIAni from "./UIAni";
/**打开页面弹窗的出场方式 仅支持规范操作 萌游吱吱 定制版 */
export default class UIAni_ViewOpenShow extends UIAni {

    constructor() {
        super();
        /** @prop {name:Type, tips:"出场方式0 中间缩放变大,1左进场 2左上进场 3右进场 4右上进场  5渐变进场", type:Int, default:0}*/
        let Type = 0;
        /** @prop {name:Time, tips:"出场时间", type:Int, default:1000}*/
        let Time = 1000;
        /** @prop {name:Ease, tips:"出场缓动类型", type:Ease}*/
        let Ease = Laya.Ease.linearIn;
        /** @prop {name:EndType, tips:"退出方式0 中间缩放变小,1左退场 2左上退场 3右退场 4右上退场 5渐变退场 6直接关闭", type:Int, default:0}*/
        let EndType = 0;
        /** @prop {name:EndTime, tips:"退出时间", type:Int, default:1000}*/
        let EndTime = 1000;
        /** @prop {name:EndEase, tips:"退出缓动类型", type:Ease}*/
        let EndEase = Laya.Ease.linearIn;
        /** @prop {name:TypeChoose, tips:"类型 0父物体继承view_all 1自身继承view_all", type:Int,default:0}*/
        let TypeChoose =0;
        // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
        this.Type = Type;
        this.Time = Time;
        this.EndType = EndType;
        this.EndTime = EndTime;
        this.EndEase = EndEase;
        this.Ease = Ease;
        this.TypeChoose = TypeChoose;
    }
    _Enable() {
        this.EndEase = Laya.Ease[this.EndEase];
        this.Ease = Laya.Ease[this.Ease];
        if (this.TypeChoose==0){
            this.owner.parent.EndFun = Laya.Handler.create(this, this.End);
        }else{
            this.owner.EndFun = Laya.Handler.create(this, this.End);
        }
        this.begin();
    }
    begin() {
        this.ClassAll = [
            {//中间缩放
                begin: { scaleX: 0.2, scaleY: 0.2 },
                End: { scaleX: 1, scaleY: 1 }
            },
            {//左进场
                begin: { x: this.owner.x - Laya.stage.width },
                End: { x: this.owner.x }
            },
            {//左上进场
                begin: { x: 0, y: 0, scaleX: 0, scaleY: 0 },
                End: { x: 667 / 1334 * Laya.stage.width, y: 375, scaleX: 1, scaleY: 1 }
            },
            {//右进场
                begin: { x: this.owner.x + Laya.stage.width },
                End: { x: this.owner.x }
            },
            {//右上进场
                begin: { x: Laya.stage.width, y: 0, scaleX: 0, scaleY: 0 },
                End: { x: 667 / 1334 * Laya.stage.width, y: 375, scaleX: 1, scaleY: 1 }
            },
            {//渐变进场
                begin: { alpha: 0 },
                End: { alpha: 1 }
            },

        ]

        for (var js in this.ClassAll[this.Type].begin) {
            this.owner[js] = this.ClassAll[this.Type].begin[js];
        }
        Laya.Tween.to(this.owner, this.ClassAll[this.Type].End, this.Time, this.Ease);
    }
    End(Handler) {
        if(this.EndType!=6){
            this.ClassEndAll = [
                {//中间缩放
                    End: { scaleX: 0.2, scaleY: 0.2 },
                },
                {//左退场
                    End: { x: this.owner.x - Laya.stage.width }
                },
                {//左上退场
                    End: { x: 0, y: 0, scaleX: 0, scaleY: 0 }
                },
                {//右退场
                    End: { x: this.owner.x + Laya.stage.width }
                },
                {//右上退场
                    End: { x: Laya.stage.width, y: 0, scaleX: 0, scaleY: 0 }
                },
                {//渐变进场
                    End: { alpha: 0 }
                },
                
            ]
            Laya.Tween.to(this.owner, this.ClassEndAll[this.EndType].End, this.EndTime, this.EndEase, Handler);
        }else{
            Handler.run();
        }
        
    }

}

