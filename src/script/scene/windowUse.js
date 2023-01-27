import GameFIG_WX from "../GameFIG/GameFIG_WX";




var windowUse_this;
//使用本脚本请使用WindowUse.Get() 方法，切勿单独new 
//本脚本控制所有场景需要预先加载的资源,本游戏资源不多在Loading.js全部预加载完毕~ 请合理使用，例如多个场景资源过多，切换时注意优先清理关闭场景资源，再缓存新场景资源。
//本脚本仅作为跨脚本共用脚本，并非主逻辑脚本！主逻辑请挂置主场景对应Runtime！列如：家里和学校都可以使用的新手引导
//本脚本所有数据仅临时储存，与GameGIF逻辑不同，此脚本为场景逻辑数据交互，GameGIF更多是玩家数据和其他对外接口和一些常用函数！
//综上所述 此脚本不能“公用”仅提供逻辑参考，不要与GameGIF 同时拷贝到其他项目使用！！！！！！！！
/**公共变量函数储存脚本 */
export default class windowUse extends Laya.Script {

    constructor() {
        super();
        this.drawTexture = [];
        this.GameFIG = GameFIG_WX.Get();
        this.MapConfig = [//数据结构 参考
            [
                [36, 40, 71, 36],
            ],
            [
                [36, 40, 71, 36],
            ],
            [
                [36, 40, 71, 36],
            ],
            [
                [36, 40, 71, 36],
            ],
            [
                [36, 40, 71, 36],
            ],

        ]
        this.QDconfig = [
            { key: ["TS"], much: 3 },
            { key: ["YS"], much: 2 },
            { key: ["YS"], much: 3 },
            { key: ["TS"], much: 5 },
            { key: ["YS"], much: 5 },
            { key: ["YS"], much: 10 },
            { key: ["TS", "YS"], much: 10 }
        ]
    }

    /**
     * Get 单例获取全局变量储存脚本
     * @return {windowUse} 
     */
    static Get() {
        if (windowUse_this == undefined) {
            windowUse_this = new windowUse();
        }
        return windowUse_this;
    }

    LoadMapConfig(overHander = new Laya.Handler()) {
        // 地图数据加载完成后执行传递的其他回调
        Laya.loader.load("xml/MapConfig.json", Laya.Handler.create(this, function (overHander) {
            this.MapConfig = Laya.loader.getRes("xml/MapConfig.json");
            overHander.run();
        }, [overHander]), null, Laya.Loader.JSON); //加载地图数据
    }
}