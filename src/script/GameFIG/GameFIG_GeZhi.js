import { GameFIG_Config } from "./GameFIG_Config";
import GameFIG_WX from "./GameFIG_WX";
var wx = Laya.Browser.window.wx; //微信api
var GameFIG = GameFIG_WX.Get();
/**格子广告 仅微信有效 暂不支持其他平台*/
export class GameFIG_GeZhi {
    constructor() { //请务必设置这里面的参数
    }
    /**
    * 小游戏跳转接口
    *  @param {string} oppid 传入游戏appid
    *  @param {Laya.Handler} OverFun 完成回调 成功失败都会执行
    */
    GoGame(oppid = "", OverFun = new Laya.Handler) {
        if (wx) {
            if (GameFIG.compareVersion("2.2.0") >= 0) {
                wx.navigateToMiniProgram({
                    appId: oppid,
                    path: url,
                    extraData: {
                        path: "MGG游戏"
                    },
                    success(res) {
                        if (OverFun) {
                            OverFun();
                        }
                    },
                    fail() {
                        if (OverFun) {
                            OverFun();
                        }
                    }
                })
            } else {
                if (OverFun) {
                    OverFun();
                }
            }
        } else {
            if (OverFun) {
                OverFun();
            }
        }
    }
    /**
   * 单个盒子
   * @param {*} node 节点
   * @param {boolean} isLoop  是否循环
   * @param {Number} LoopTime  循环时间
   * @param {Laya.Sprite} Texture_node  需要修改图片的物体 默认自己
   */
    SetOnceBOX(node, isLoop = false, LoopTime = 1000, Texture_node) {
        var RandID = Math.floor(Math.random() * ((GameFIG_Config.BoxInfo.length - 1) - (0) + 1) + (0)); //0-10
        if (Texture_node) {
            Texture_node.texture = window.boxInfo[RandID].logo;
        } else {
            node.getChildAt(0).texture = window.boxInfo[boxid][a].logo;
        }
        node.offAll();
        this.butTween(node, Laya.Handler.create(this, this.GoGame, [window.boxInfo[boxid][a].appid, window.boxInfo[boxid][a].url, window.boxInfo[boxid][a].locationid, window.boxInfo[boxid][a].id, this.OverQuanDao.bind(this), TfOpenBanner]), false);
        Laya.timer.once(time, this, this.SetOnceBOX, [node, time, boxid, ttff, TfOpenBanner], false);

    }
}
