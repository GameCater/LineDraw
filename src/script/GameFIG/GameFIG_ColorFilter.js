import { GameFIG_Config } from "./GameFIG_Config";


/**游戏颜色滤镜 */
export class GameFIG_ColorFilter {
    constructor() { //请务必设置这里面的参数
    }
    /**
        * 设置图片边缘发光滤镜
        * @param {*} node 节点
        * @param {*} color 颜色 “#fffff”
        * @param {*} width 模糊大小
        * @param {*} posx 偏移x
        * @param {*} posy 偏移y
        * @ ---尽量不要每帧调用 耗费性能
        */
    static SetFilterGlow(node, color, width = 5, posx = 0, posy = 0) {
        var glowFilter = new Laya.GlowFilter(color, width, 0, 0);
        //设置滤镜集合为发光滤镜
        node.filters = [glowFilter];
    }
    /**
    * 随机颜色滤镜 
    * @ ---return filters 
    * @ ---尽量不要每帧调用 耗费性能
    */
    static SetColorFilterRnd() {
        var colorMatrix = [];
        for (var a = 0; a < 20; a++) {
            colorMatrix.push(GameFIG_Config.Get().GetRandNub(0, 1));
        }
        var redFilter = new Laya.ColorFilter(colorMatrix);
        return redFilter;
    }
    /**
     * 颜色滤镜
     * @param {*} A 透明度0~1
     * @param {*} R 红色0~255
     * @param {*} G 绿色0~255
     * @param {*} B 蓝色0~255
     */
    static SetColorFilterByColor(A = 0, R = 0, G = 0, B = 0) {
        var redFilter = new Laya.ColorFilter();
        redFilter.color(R, G, B, A);
        return redFilter;
    }
    /**
     * @注释 return filters 
     */
    static SetColorFilter_Black() {
        const ColorFilter = Laya.ColorFilter;
        //由 20 个项目（排列成 4 x 5 矩阵）组成的数组，灰图
        let grayscaleMat = [
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0, 0, 0, 1, 0
        ];
        //创建一个颜色滤镜对象，灰图
        let grayscaleFilter = new Laya.ColorFilter(grayscaleMat);
        // 灰度猩猩
        return grayscaleFilter;
        //   sprite.filters = [grayscaleFilter];
    }
    /**
     * 设置颜色多功能
     * @param {*} sprite 需要设置的节点
     * @param {*} brightness 亮度,范围:-100~100
     * @param {*} contrast 对比度,范围:-100~100
     * @param {*} saturation 饱和度,范围:-100~100
     * @param {*} hue 色调,范围:-180~180
     * @param {*} color 颜色 #000000 格式
     * @param {*} alpha alpha增量,范围:0~255
     */
    static SetColorByColorMax(sprite, brightness = 0, contrast = 0, saturation = 0, hue = 0, color = "#000000", alpha = 0) {
        var ColorFilterSetter = new Laya.ColorFilterSetter();
        ColorFilterSetter.brightness = brightness;
        ColorFilterSetter.contrast = contrast;
        ColorFilterSetter.saturation = saturation;
        ColorFilterSetter.hue = hue;
        ColorFilterSetter.color = color;
        ColorFilterSetter.alpha = alpha;
        ColorFilterSetter.target = sprite;
        sprite.ColorFilterSetter = ColorFilterSetter;
    }
}


