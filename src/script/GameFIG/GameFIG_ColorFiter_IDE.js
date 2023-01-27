import { GameFIG_ColorFilter } from "./GameFIG_ColorFilter";

/**颜色滤镜IDE */
export default class GameFIG_ColorFiter_IDE extends Laya.Script {
    constructor() { //请务必设置这里面的参数
        super();
        /** @prop {name:Type,tips:"滤镜类型",type:Option,option:"边缘发光,随机颜色,指定颜色,灰色滤镜,模糊滤镜"}*/
        /** @prop {name:color1,tips:"边缘发光颜色",type:Color}*/
        /** @prop {name:width_color,tips:"边缘发光宽度",type:Int,default:5}*/
        /** @prop {name:color2,tips:"指定滤镜颜色",type:Color}*/
        /** @prop {name:Alpha,tips:"指定滤镜颜色透明度",type:Number,default:1}*/
        /** @prop {name:strength_Filter,tips:"模糊程度默认10",type:Int,default:10}*/
    }

    onAwake() {
     

        if (this.Type == "边缘发光") {
            GameFIG_ColorFilter.SetFilterGlow(this.owner, this.color1, this.width_color);
        } else if (this.Type == "随机颜色") {
            this.owner.filters = [GameFIG_ColorFilter.SetColorFilterRnd()];
        } else if (this.Type == "指定颜色") {
            var color = this.color2.colorRgb();
            this.owner.filters = [GameFIG_ColorFilter.SetColorFilterByColor(this.Alpha ? this.Alpha : 1, color.r, color.g, color.b)];
        } else if (this.Type == "灰色滤镜") {
            this.owner.filters = [GameFIG_ColorFilter.SetColorFilter_Black()];
        } else if (this.Type == "模糊滤镜") {
            var blurFilter = new Laya.BlurFilter();
            blurFilter.strength = this.strength_Filter ? this.strength_Filter : 10;
            this.owner.filters = [blurFilter];
        }
    }
}


