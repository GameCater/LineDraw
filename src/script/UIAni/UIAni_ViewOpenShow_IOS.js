import UIAni_ViewOpenShow from "./UIAni_ViewOpenShow";

/**打开页面弹窗的出场方式 仅支持规范操作 萌游吱吱 定制版 */
export default class UIAni_ViewOpenShow_IOS extends UIAni_ViewOpenShow {

    constructor() {
        super();
        /** @prop {name:TypeChoose, tips:"类型 0父物体继承view_all 1自身继承view_all", type:Int,default:0}*/
        let TypeChoose = 0;
        /** @prop {name:POSX, tips:"输入打开按钮初始位置X：注意是以0,0为起点世界坐标", type:Int, default:0}*/
        let POSX = 0;
        /** @prop {name:POSY, tips:"输入打开按钮初始位置Y：注意是以0,0为起点世界坐标", type:Int, default:0}*/
        let POSY = 0;
        /** @prop {name:width_, tips:"输入打开按钮初始宽度", type:Int, default:0}*/
        let width_ = 0;
        /** @prop {name:height_, tips:"输入打开按钮初始高度", type:Int, default:0}*/
        let height_ = 0;
        /** @prop {name:URL_, tips:"输入打开按钮的图片URL", type:String, default:"",accept:res}*/
        let URL_ = "";
        /** @prop {name:Time, tips:"出场时间", type:Int, default:1000}*/
        let Time = 1000;
        /** @prop {name:ChangeTime, tips:"切换时间0~1", type:float, default:0.5}*/
        let ChangeTime = 0.5;
        /** @prop {name:EndTime, tips:"退出时间", type:Int, default:1000}*/
        let EndTime = 1000;
        /** @prop {name:Ease, tips:"出场缓动类型", type:Ease}*/
        let Ease = Laya.Ease.linearIn;
        /** @prop {name:EndEase, tips:"退出缓动类型", type:Ease}*/
        let EndEase = Laya.Ease.linearIn;
        // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
        this.Time = Time;
        this.EndTime = EndTime;
        this.ChangeTime = ChangeTime;
        this.POSX = POSX;
        this.POSY = POSY;
        this.URL_ = URL_;
        this.width_ = width_;
        this.height_ = height_;
        this.EndEase = EndEase;
        this.Ease = Ease;
        this.TypeChoose = TypeChoose;
    }

    begin() {

        //添加过渡效果---并不理想 IOS 按钮UI与界面是相识图像~
        // var begin = {
        //     x: this.owner.x,
        //     y: this.owner.y,
        //     width: this.owner.width,
        //     height: this.owner.height,
        //     pivotX: this.owner.pivotX,
        //     pivotY: this.owner.pivotY,
        //     alpha: 0
        // }
        // var Sprite = new Laya.Sprite();
        // Sprite.texture = this.URL_;
        // Sprite.width = this.width_;
        // Sprite.height_ = this.height_;
        // Sprite.pivot(this.width_ / 2, this.height_ / 2);
        // Sprite.pos(this.POSX, this.POSY, true);
        // Laya.stage.addChild(Sprite);
        // var Firstween = Laya.Tween.to(Sprite, begin, this.Time, Laya.Ease.linearIn);
        // var Change = Math.floor(this.Time * this.ChangeTime);
        var end = { x: this.POSX, y: this.POSY, scaleX: this.width_ / this.owner.width, scaleY: this.height_ / this.owner.height, alpha: 0 };
        var ThirdTween = Laya.Tween.from(this.owner, end, this.Time, this.Ease);
    }
    End(Handler) {
        var end = { x: this.POSX, y: this.POSY, scaleX: this.width_ / this.owner.width, scaleY: this.height_ / this.owner.height, alpha: 0 };
        var ThirdTween = Laya.Tween.to(this.owner, end, this.Time, this.EndEase, Handler);

    }

}

