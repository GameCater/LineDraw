
import { GameFIG_Config } from "./GameFIG_Config";
import GameFIG_WX from "./GameFIG_WX";
/**游戏工具类_头条 */
export class GameFIG_TT extends GameFIG_WX {
    constructor() { //请务必设置这里面的参数
        super();
        GameFIG_TT.instance = this;
        this.wx = Laya.Browser.window.tt;
        this.TTviedwPath = "";//抖音的录屏本地储存地址
        this.viewGetSet();
    }
    /**
      *  Get 单例获取工具类
      * @return {GameFIG_TT} 
      */
    static Get() {
        if (GameFIG_TT.instance == undefined) {
            GameFIG_TT.instance = new GameFIG_TT();
        }
        return GameFIG_TT.instance;
    }
    /**录屏设置 */
    viewGetSet() {
        if (GameFIG_TT.instance.wx) {
            this.recorder = GameFIG_TT.instance.wx.getGameRecorderManager();
            this.recorder.onStart((res) => {
                console.log("录屏开始");
                // do something;
            });
            this.recorder.onPause((res) => {
                console.log("录屏暂停");
                // do something;
            });
            this.recorder.onResume((res) => {
                console.log("录屏继续");
                // do something;
            });
            this.recorder.onStop((res) => {
                console.log("录屏结束");
                // do something;
                console.log(res.videoPath);
                this.TTviedwPath = res.videoPath;
            });
            this.recorder.onError((res) => {
                console.log("录屏错误", res);

            });

        }

    }


    GetGameInitConfig() { //设置游戏分享按钮 和转发信息
        if (GameFIG_TT.instance.wx) {
            //分享
            GameFIG_TT.instance.wx.showShareMenu({
                success(res) {
                    console.log("已成功显示转发按钮");
                },
                fail(err) {
                    console.log("showShareMenu 调用失败", err.errMsg);
                },
                complete(res) {
                    console.log("showShareMenu 调用完成");
                },
            });
            var fxrand = Math.floor(Math.random() * ((GameFIG_Config.shareInfo.length - 1) - (0) + 1) + (0)); //max-min
            GameFIG_TT.instance.wx.onShareAppMessage(function (res) {
                console.log(res.channel);
                // do something
                const shareData = {
                    title: GameFIG_Config.shareInfo[fxrand].title,
                    imageUrl: GameFIG_Config.shareInfo[fxrand].img,
                    query: "k1=v1&k2=v2",
                    success() {
                        console.log("分享成功");
                    },
                    fail(e) {
                        console.log("分享失败", e);
                    },
                };
                const r = Object.assign({ channel: res.channel }, shareData);
                //channel值无法修改，并会在调用tt.shareAppMessage时自动带上
                switch (res.channel) {
                    case "video":
                        r.extra = {
                            hashtag_list: ["小游戏", "休闲小游戏"],
                            videoTopics: ["小游戏", "休闲小游戏"], // 抖音小视频话题列表
                            videoPath: GameFIG_TT.instance.TTviedwPath, // 如果为抖音或者头条小视频，可以直接传本地视频路径
                            //以抖音为例，使用videoPath后，用户点击拍抖音时会去分享开发者指定的视频。
                        };
                        break;
                    case "article":
                    default:
                        break;
                }
                return r;
            });

        }
    }
    /**
     * * 主动分享
     * @param {*} successhander成功
     * @param {*} failhander 
     * @param {*} shareFun 分享方法 video(视频),token(口令),article(图文内容) 后两者是头条分享暂时不接
     */
    FXget(shareFun = "video") { //分享

        if (GameFIG_TT.instance.wx) {

            var fxrand = Math.floor(Math.random() * ((GameFIG_Config.shareInfo.length - 1) - (0) + 1) + (0)); //max-min
            GameFIG_TT.instance.wx.shareAppMessage({
                channel: shareFun,
                title: GameFIG_Config.shareInfo[fxrand].title,
                extra: {
                    hashtag_list: ["小游戏", "休闲小游戏"],
                    videoTopics: ["小游戏", "休闲小游戏"], // 抖音小视频话题列表
                    videoPath: GameFIG_TT.instance.TTviedwPath, // 如果为抖音或者头条小视频，可以直接传本地视频路径
                },
                success: (res) => {
                    console.log("分享成功");
                    GameFIG_TT.instance.ShareGet(true);
                },
                fail: () => {
                    console.log("分享视频失败");
                    GameFIG_TT.instance.WXLog(false, null);
                }
            });
        }

    }
    /**
     * 开始录屏
     * @param {Number} time 录制时间最少3秒最多五分钟
     * @param {Boolean} xisopenShui 是否开启水印
     * @param {Number} x 水印x
     * @param {Number} y 水印y
     */
    viewGetStart(time = 30, isopenShui = true, x = 0, y = 0) {
        //添加水印并且居中处理
        this.recorder.start({
            duration: time,//录屏的时长，单位 s，必须大于 3s，最大值 300s（5 分钟）。
            isMarkOpen: isopenShui,//是否开启水印
            locLeft: x,
            locTop: y,
        });
    }


    /**录屏暂停 */
    viewGetPause() {
        if (this.recorder) {
            this.recorder.pause();
        }
    }
    /**录屏继续 */
    viewGetResume() {
        if (this.recorder) {
            this.recorder.resume();
        }
    }
    /**停止录屏 */
    viewGetStop() {
        if (this.recorder) {
            this.recorder.stop();
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
        if (GameFIG_TT.instance.wx) {
            if (AotoSPFX == 0) {
                this.TVorShare = !this.TVorShare;
            } else {
                this.TVorShare = AotoSPFX;
            }
            if (this.TVorShare) { //视频
                if (this.readtf && this.redio != undefined) {
                    GameGGConfig.redio.show();

                } else {
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
}
