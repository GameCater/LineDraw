
import { GameFIG_Config } from "./GameFIG_Config";
import GameFIG_WX from "./GameFIG_WX";
/**游戏工具类_头条 */
export class GameFIG_QQ extends GameFIG_WX {
    constructor() { //请务必设置这里面的参数
        super();
        GameFIG_QQ.instance = this;
        this.wx = Laya.Browser.window.qq;

    }
    /**
      *  Get 单例获取工具类
      * @return {GameFIG_QQ} 
      */
    static Get() {
        if (GameFIG_QQ.instance == undefined) {
            GameFIG_QQ.instance = new GameFIG_QQ();
        }
        return GameFIG_QQ.instance;
    }

    /**主动分享 */
    FXget() { //分享
        if (this.wx) {
            var fxrand = Math.floor(Math.random() * ((GameFIG_Config.shareInfo.length - 1) - (0) + 1) + (0)); //max-min
            this.wx.shareAppMessage({
                imageUrl: GameFIG_Config.shareInfo[fxrand].img, //转发标题
                title: GameFIG_Config.shareInfo[fxrand].title, //转发标题
                //   query: 'inviter_id=' + window.player.P_id + '&share_id=' + window.shareInfo[fxrand].id,
                success: (res) => {
                    console.log("分享成功");
                    GameFIG_QQ.instance.ShareGet(true);
                },
                fail: () => {
                    console.log("分享视频失败");
                    GameFIG_QQ.instance.WXLog(false, null);
                }
            })
        }

    }
    /**设置游戏分享按钮 和转发信息 */
    GetGameInitConfig() {
        if (GameFIG_WX.instance.wx) {
            //分享
            // 显示当前页面的转发按钮
            GameFIG_WX.instance.wx.updateShareMenu({
                withShareTicket: true
            });
            GameFIG_WX.instance.wx.showShareMenu({
                // 是否使用带 shareTicket 的转发
                showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment'],
                withShareTicket: true
            });
            var fxrand = Math.floor(Math.random() * ((GameFIG_Config.shareInfo.length - 1) - (0) + 1) + (0)); //max-min


            GameFIG_WX.instance.wx.onShareAppMessage(() => ({
                title: GameFIG_Config.shareInfo[fxrand].title,
                imageUrl: GameFIG_Config.shareInfo[fxrand].img, // 图片 URL Laya.URL.basePath + 'gamemain/share.png'
                success: function (res) { },
                fail: function (res) { }
            }))

        }
    }
    /**
   * 打开广告_分享汇总方法 抖音分享修改为百分百获取有修改需求自定义
   * @param {*bool} AotoSPFX  true视频 false分享 0 随机
   * @param {*Laya.Handler} success_Hander 成功分享/观看视频时调用
   * @param {*Laya.Handler}fail_Hander 失败分享/观看视频时调用
   */
    GG_all(AotoSPFX = 0, success_Hander, fail_Hander) {
        if (success_Hander) {
            this.GG_all_Okhander = success_Hander;
        }
        if (fail_Hander) {
            this.GG_all_failHander = fail_Hander;
        }
        if (GameFIG_QQ.instance.wx) {
            if (AotoSPFX == 0) {
                this.TVorShare = !this.TVorShare;
            } else {
                this.TVorShare = AotoSPFX;
            }
            if (this.TVorShare) { //视频
                if (this.readtf && this.redio != undefined) {
                    this.redio.show();

                } else {
                    if (GameFIG_QQ.instance.redio) {
                        GameFIG_QQ.instance.redio.load();
                    }

                    this.readtf = false;
                    this.TVorShare = false;
                    this.FXget();
                }
            } else { //分享
                this.FXget();
            }
        } else {

            if (success_Hander) {
                success_Hander.run();
            }
        }


    }

    dtgg() { //视频广告
        if (GameFIG_Config.GameGGConfig.SPid != "") {
            this.redio = GameFIG_WX.instance.wx.createRewardedVideoAd({
                adUnitId: GameFIG_Config.GameGGConfig.SPid,

            });
            this.redio.onLoad(() => {
                GameFIG_WX.instance.readtf = true;
                console.log("视频广告加载完毕");
            })

            this.redio.onError(err => {
                GameFIG_WX.instance.readtf = false;
                GameFIG_WX.instance.TVorShare = false;
            })
            this.redio.onClose(res => {
                GameFIG_QQ.instance.redio.load();
                // 用户点击了【关闭广告】按钮
                if (res && res.isEnded || res === undefined) {
                    if (GameFIG_WX.instance.GG_all_Okhander) {
                        GameFIG_WX.instance.GG_all_Okhander.run();
                        GameFIG_WX.instance.GG_all_Okhander = undefined;
                    }
                } else {
                    if (GameFIG_WX.instance.GG_all_failHander) {
                        GameFIG_WX.instance.GG_all_failHander.run();
                        GameFIG_WX.instance.GG_all_failHander = undefined;
                    }
                }
            })
        }

    }
}
