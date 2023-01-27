
import { GameFIG_Config } from "../GameFIG/GameFIG_Config";
import GameAll from "./GameAll";

var load_this;

export default class load extends GameAll {
    constructor() {
        super();

    }

    /**
     * 登录、加载地图、加载draw文件夹下的图片资源
     */
    Loadother() {
        this.LoadMuch = 6;
        this.loadNow = 0;
        this.GameFIG.Main_Use(Laya.Handler.create(this,()=>{
            this.LoadAdd("Main_use", 1);
     
        },[]));
        this.windowUser.LoadMapConfig(Laya.Handler.create(this, this.LoadAdd, ["LoadJson", 1]))
        for (var a = 0; a < 4; a++) {
            var Texture = new Laya.Texture();
            this.windowUser.drawTexture.push(Texture);
            Texture.load("draw/"+a+".png", Laya.Handler.create(this, this.LoadAdd, ["Texture"+a, 1]));
        }
    }
    LoadFist() {
        if (this.GameFIG.wx) {
            var FenBaoAll = [
            ]
            this.FenBaoLoad(FenBaoAll, Laya.Handler.create(this, this.Loadother));
        } else {
            this.Loadother();
        }
    }
    onEnable() {
        load_this = this;
        this.back.height = Laya.stage.height;
        this.LoadText.y = this.LoadText.y / 1334 * Laya.stage.height;
        this.LoadLable.y = this.LoadLable.y / 1334 * Laya.stage.height;
        this.logo.y = this.logo.y / 1334 * Laya.stage.height;
        var Save = this.GameFIG.fetchLocalData(GameFIG_Config.GameConfig.GameName + "设置储存");
        if (Save) {
            GameFIG_Config.GameConfig.otherSet = Save;
        }
        this.LoadFist();

    }

    // 分包加载
    FenBaoLoad(FenBaoAll = [], hander = new Laya.Handler()) {//挨个加载分包
        this.FenBaoadd = 0;
        if (!FenBaoAll.length) { hander.run(); return };
        for (var a = 0; a < FenBaoAll.length; a++) {
            var loadTask = this.GameFIG.wx.loadSubpackage({
                name: FenBaoAll[a], // name 可以填 name 或者 root
                success: function (res) {
                    load_this.FenBaoadd++;
                    if (load_this.FenBaoadd == FenBaoAll.length) {
                        hander.run()
                    }
                    load_this.LoadLable.text = Math.floor(load_this.FenBaoadd / FenBaoAll.length * 100) + "%";
                },
                fail: function (res) {
                    // 分包加载失败通过 fail 回调
                }
            })
        }


    }
    
    LoadAdd(name = "", much = 1) {
        this.loadNow += much;
        if (this.loadNow == this.LoadMuch) {//加载完毕
            this.GotoGame();
        }
        // 设置进度条加载百分比
        this.loadRes(this.loadNow / this.LoadMuch);
        console.log("已经加载:" + name);
    }
    GotoGame() {
        this.OpenView(this.viewAll.Main, {}, false, false, true);
    }
    loadRes(res) {
        this.LoadLable.text = (parseInt(res * 100)) + "%";
    }

}