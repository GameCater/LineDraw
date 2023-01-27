import { GameFIG_Config } from "./GameFIG_Config";
/**单个格子广告*/
export default class GameFIG_GG_One extends Laya.Script {
    constructor() { //请务必设置这里面的参数
        super();
        /** @prop {name:Type,tips:"类型",type:Option,option:"定时切换,固定展示",default:"定时切换"}*/
        this.Type = "定时切换"
        /** @prop {name:time,tips:"定时切换时间",type:Int,default:5000}*/
        this.time = 5000;
        /** @prop {name:Texture_node,tips:"需要修改图片的对象 默认自己",type:Node}*/
        this.Texture_node = null;
        /** @prop {name:TFRand,tips:"是否随机展示",type:Bool,default:true}*/
        this.TFRand = true;
        /** @prop {name:RandID,tips:"广告ID_非随机",type:Int,default:0}*/
        this.RandID = 0;
         /** @prop {name:Name_node,tips:"需要修改名字的对象 ",type:Node}*/
         this.Name_node = null;
    }
    onEnable() {
        this.Texture_node = this.Texture_node ? this.Texture_node : this.owner;
        this.GameFIG = window.GameFIG_Get;
        this.SetOnceBOX();

    }
    /**
   * 单个盒子
   */
    SetOnceBOX() {
        if (this.TFRand) {
            this.RandID = Math.floor(Math.random() * ((GameFIG_Config.BoxInfo.length - 1) - (0) + 1) + (0)); //0-10
        }
        var boxinfo = GameFIG_Config.BoxInfo[this.RandID];
        this.Texture_node.texture = boxinfo.logo;
        if(this.Name_node){
            this.Name_node.text=boxinfo.name;
        }
        this.GameFIG.butTween(this.owner, Laya.Handler.create(this.GameFIG, this.GameFIG.GoToGame, [boxinfo.appid], false));
        if (this.Type == "定时切换") {
            Laya.timer.once(this.time ? this.time : 5000, this, this.SetOnceBOX);
        }
    }
}
