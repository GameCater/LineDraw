import { GameFIG_Config } from "./GameFIG_Config";
/**格子列表滚动*/
export default class GameFIG_GG_List extends Laya.Script {
    constructor() { //请务必设置这里面的参数
        super();
        /** @prop {name:Type,tips:"类型",type:Option,option:"上下滚动,左右滚动",default:"上下滚动"}*/
        this.Type = "上下滚动";
        /** @prop {name:MuchLiePai,tips:"一排多少个/一列多少个",type:Int,default:5}*/
        this.MuchLiePai = 5;
        /** @prop {name:Texture_node,tips:"需要修改图片的对象 默认自己 0 1 2...代表子物体的第几个",type:Int}*/
        this.Texture_node = null;
        /** @prop {name:Time,tips:"滚动时间",type:Number,default:2000}*/
        this.Time = 2000;

    }

    onEnable() {
        this.SCakboxTF = false;//正反
        this.CanRun = true;
        this.GameFIG = window.GameFIG_Get;
        this.SetList();
    }

    SetList() {
        if (this.Type == "上下滚动") {
            this.owner.repeatY = Math.ceil(GameFIG_Config.BoxInfo.length / this.owner.repeatX);

        } else {
            this.owner.repeatX = Math.ceil(GameFIG_Config.BoxInfo.length / this.owner.repeatY);
        }

        this.owner.scrollBar.hide = true;
        this.owner.renderHandler = new Laya.Handler(this, this.updateList);
        this.owner.array = GameFIG_Config.BoxInfo;
        if (GameFIG_Config.BoxInfo.length <= this.MuchLiePai) {
            this.CanRun = false;
        } else {
            this.owner.on(Laya.Event.MOUSE_DOWN, this, this.ListDown);
            this.Play();
        }

    }
    ListDown() {
        this.owner.on(Laya.Event.MOUSE_UP, this, this.ListUp);
        this.owner.on(Laya.Event.MOUSE_OUT, this, this.ListUp);
        this.Stop();
    }
    ListUp() {
        this.owner.off(Laya.Event.MOUSE_UP, this, this.ListUp);
        this.owner.off(Laya.Event.MOUSE_OUT, this, this.ListUp);
        this.Play();
    }
    updateList(cell, index) {
        var boxinfo = GameFIG_Config.BoxInfo[index];
        if (!this.Texture_node) {
            cell.texture = boxinfo.logo;
        } else {
            cell.getChildAt(this.Texture_node).texture = boxinfo.logo;
        }
        this.GameFIG.butTween(cell, Laya.Handler.create(this.GameFIG, this.GameFIG.GoToGame, [boxinfo.appid], false));
    }

    Stop() {
        this.CanRun = false;
    }
    Play() {
        if (GameFIG_Config.BoxInfo.length > this.MuchLiePai &&  !this.CanRun) {
            this.CanRun = true;
            this.ListRun();
        }
    }
    /**
      * 列表滚动
      * @param {*} index 列表ID
      */
    ListRun(index) {
        if (!this.CanRun) {
            return;
        }
        var jindu = this.owner.scrollBar.value / this.owner.scrollBar.max;
        if (isNaN(jindu)) {
            jindu = 0;
        }
        if (jindu > 1) {
            jindu = 1;
        } else if (jindu < 0) {
            jindu = 0;
        }
        if (this.SCakboxTF) {
            if (this.owner.repeatY == 1 || this.owner.repeatX == 1) {
                var togo = GameFIG_Config.BoxInfo.length - this.MuchLiePai;

            } else {
                if (this.SCakboxTF) { //左右
                    var togo = parseInt(GameFIG_Config.BoxInfo.length) - this.MuchLiePai * this.owner.repeatY;
                } else {
                    var togo = parseInt(GameFIG_Config.BoxInfo.length) - this.MuchLiePai * this.owner.repeatX;
                }
            }
            var time = parseInt(togo * jindu) * this.Time;
            this.owner.tweenTo(0, time, Laya.Handler.create(this, this.ListRun2, [index]));
        } else {

            if (this.owner.repeatY == 1 || this.owner.repeatX == 1) {
                var togo = GameFIG_Config.BoxInfo.length - this.MuchLiePai;
                // var relto = togo;
            } else {
                if (window.RunListOpen[index].repeatXTF) { //左右
                    var togo = parseInt(GameFIG_Config.BoxInfo.length) - this.MuchLiePai * this.owner.repeatY;
                } else {
                    var togo = parseInt(GameFIG_Config.BoxInfo.length) - this.MuchLiePai * this.owner.repeatX;
                }
                togo++;
            }
            var time = (togo - parseInt(togo * jindu)) * this.Time;
            this.owner.tweenTo(togo, time, Laya.Handler.create(this, this.ListRun2, [index]));
        }

    }
    ListRun2(index) {
        if (this.SCakboxTF) {
            this.SCakboxTF = false;
        } else {
            this.SCakboxTF = true;
        }
        this.ListRun(index);
    }
}
