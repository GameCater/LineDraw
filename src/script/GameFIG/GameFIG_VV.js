

import { GameFIG_Config } from "./GameFIG_Config";
import GameFIG_WX from "./GameFIG_WX";
/**游戏工具类_Vivo */
export class GameFIG_VV extends GameFIG_WX {
    constructor() { //请务必设置这里面的参数
        super();
        this.nowtp = 0;
        GameFIG_VV.instance = this;
        this.wx = Laya.Browser.window.qg;
        if (GameFIG_Config.GameGGConfig.Vivo.isSDK) {
            window['King_SDK_Manager'].init();//初始化sdk
        }

    }
    /**
      *  Get 单例获取工具类
      * @return {GameFIG_VV} 
      */
    static Get() {
        if (GameFIG_VV.instance == undefined) {
            GameFIG_VV.instance = new GameFIG_VV();
        }
        return GameFIG_VV.instance;
    }
    WXLogin() {
        this.LoadSuccess_Fun.runWith(GameFIG_Config.player_Config);
        return;//后续需要接入登录打开后半段 暂时不用
        if (GameFIG_VV.instance.wx.getSystemInfoSync().platformVersionCode >= 1063) {
            GameFIG_VV.instance.wx.login().then((res) => {
                if (res.data.token) {
                    // 使用token进行服务端对接
                    var wxCode = res.data.token;
                    GameFIG_VV.instance.getcode(wxCode); //获取真实code     
                }
            }, (err) => {
                console.log('登录失败' + JSON.stringify(err));
                GameFIG_VV.instance.TiShiKuang("登录失败_WXLogin");
                GameFIG_VV.instance.LoadSuccess_Fun.runWith(GameFIG_Config.player_Config);
            });
        }
    }
    /**添加到桌面按钮 */
    AddDesktop() {
        if (GameFIG_VV.instance.wx) {
            if (GameFIG_Config.GameGGConfig.Vivo.isSDK) {
                window['King_SDK_Manager'].addInstallShortcut();
            } else {
                GameFIG_VV.instance.wx.hasShortcutInstalled({//原生测试  注意打包后添加不了 大部分是打包logo错误引发
                    success: function (status) {
                        if (status) {
                            GameFIG_VV.instance.TiShiKuang("已添加");
                        } else {
                            GameFIG_VV.instance.wx.installShortcut({
                                success: function () {
                                    console.log('创建成功')
                                    GameFIG_VV.instance.TiShiKuang("添加成功");
                                },
                                fail: function (res) {
                                    console.log('创建失败', res)
                                    GameFIG_VV.instance.TiShiKuang("添加失败");
                                },
                            })
                        }
                    }
                })
            }
        }

    }
    /**banner展示 */
    bannershow() {
        if (this.wx) {
            if (GameFIG_Config.GameGGConfig.Vivo.isSDK) {
                window['King_SDK_Manager'].showNativeBanner();
            } else {
                if (!this.banner) {
                    this.bannerVivo = false;
                    this.JtGG();
                } else if (this.bannerVivo) {
                    this.banner.show().then(() => {
                        console.log('banner广告展示完成');
                        GameFIG_VV.instance.bannerVivo = false;
                    }).catch((err) => {
                        console.log('banner广告展示失败', JSON.stringify(err));
                        GameFIG_VV.instance.banner = null;
                        GameFIG_VV.instance.bannerVivo = false;
                        GameFIG_VV.instance.JtGG()
                        //  GameFIG_this.TiShiKuang("errCode2:"+err.errCode)
                    })
                }

            }

        }

    }
    changgebanner(width = 300, TFshow = false) {//重写方便适应老项目
        if (TFshow) {
            this.bannershow();
        }
    }
    hidebanner() {//重写 方便适应老项目
        if (this.wx) {
            if (GameFIG_Config.GameGGConfig.Vivo.isSDK) {
                window['King_SDK_Manager'].hideAllBanner();
            } else {
                if (this.banner) {
                    this.banner.destroy();
                    this.banner = null;
                    this.bannerVivo = false;
                    this.JtGG();
                }
            }
        }
    }
    /**插屏广告展示 */
    InterShow() {
        if (this.wx) {

            if (GameFIG_Config.GameGGConfig.Vivo.isSDK) {
                window['King_SDK_Manager'].showNativeInter();
                this.hidebanner();
            } else {
                if (!this.interMask) {
                    this.interMask = new Laya.Sprite();
                    this.interMask.width = Laya.stage.width;
                    this.interMask.height = Laya.stage.height;
                }
                this.interMask.offAll();
                Laya.stage.addChild(this.interMask);
                this.interMask.zOrder = 99;
                this.interMask.on(Laya.Event.CLICK, this, function () { });
                if (this.wx.createCustomAd && this.NoTFist) {
                    if (GameFIG_Config.GameConfig.InitFBL.isHoS) {
                        var xitong = this.GetSystermInfo();//screenWidth screenHeight
                        var pianyi = GameFIG_Config.GameConfig.InitFBL.isHoS ? 0 : 180;
                        var MoBanH = xitong.screenHeight / 1080 * 760;
                        var MoBanW = MoBanH / 760 * 1080;
                        MoBanH = MoBanH < 525 ? 525 : MoBanH;
                        MoBanW = MoBanW < 720 ? 720 : MoBanW;
                        var GaoDu = xitong.screenHeight / 2 - MoBanH / 2 + pianyi;
                        var Kuandu = xitong.screenWidth / 2 - MoBanW / 2;

                    } else {
                        var pianyi = GameFIG_Config.GameConfig.InitFBL.width == 750 ? 180 : 0;
                        if (GameFIG_Config.GameConfig.InitFBL.isHoS) {
                            var GaoDu = Laya.stage.height / 2 - Laya.stage.height / 720 * 525 * 0.5 + pianyi;
                            var Kuandu = Laya.stage.width / 2 - Laya.stage.height / 720 * 720 * 0.5;
                        } else {
                            var GaoDu = Laya.stage.height / 2 - Laya.stage.width / 720 * 525 * 0.5 + pianyi;
                            var Kuandu = Laya.stage.width / 2 - Laya.stage.width / 720 * 720 * 0.5;
                        }
                    }

                    //   this.TiShiKuang("H:" + xitong.screenHeight + "W:" +  xitong.screenWidth + "高度:" + Math.floor(GaoDu) + "宽:" + Math.floor(Kuandu), 2000);
                    this.customAd = this.wx.createCustomAd({
                        posId: GameFIG_Config.GameGGConfig.Vivo.CunTu,
                        style: {
                            left: Kuandu,
                            top: GaoDu
                        }
                    });
                    this.customAd.onError(err => {
                        if (GameFIG_VV.instance.customAdShow) {
                            console.log("原生模板广告加载失败", err);
                            GameFIG_VV.instance.InterNext();
                            GameFIG_VV.instance.customAd = null;
                            GameFIG_VV.instance.interMask.removeSelf();
                        }

                    });
                    this.customAd.onClose(err => {
                        GameFIG_VV.instance.customAd = null;
                        GameFIG_VV.instance.bannershow();
                        GameFIG_VV.instance.interMask.removeSelf();
                    });
                    this.customAd.show().then(() => {
                        GameFIG_VV.instance.customAdShow = true;
                        console.log('原生模板广告展示完成');
                        GameFIG_VV.instance.hidebanner();
                    }).catch((err) => {
                        if (!GameFIG_VV.instance.customAdShow) {
                            console.log('原生模板广告展示失败', JSON.stringify(err));
                            GameFIG_VV.instance.InterNext();
                            GameFIG_VV.instance.customAd = null;
                        }
                    })
                } else {
                    GameFIG_VV.instance.NoTFist = true;
                    GameFIG_VV.instance.InterNext();
                }

            }
        }

    }
    InterNext() {
        this.interstitialAd = this.wx.createInterstitialAd({
            posId: GameFIG_Config.GameGGConfig.Vivo.ChaPin
        });
        this.interstitialAd.onClose(err => {
            GameFIG_VV.instance.bannershow();
            GameFIG_VV.instance.interMask.removeSelf();
        });
        this.interstitialAd.onError(err => {
            console.log("插屏广告加载失败", err);
            GameFIG_VV.instance.interMask.removeSelf();
        });
        this.interstitialAd.show().then(() => {
            console.log('插屏广告展示完成');
            GameFIG_VV.instance.hidebanner();
        }).catch((err) => {
            console.log('插屏广告展示失败', JSON.stringify(err));
            GameFIG_VV.instance.interMask.removeSelf();
        })
    }
    JtGG(width = 300) { //图片广告
        if (!GameFIG_Config.GameGGConfig.TPid) {
            return;
        }

        if (this.GetSystermInfo().platformVersionCode >= 1031) { //id不为空时
            this.banner = this.wx.createBannerAd({
                posId: GameFIG_Config.GameGGConfig.TPid[this.nowtp],
                adIntervals: 30,
                style: {}
            })
            this.banner.onClose(res => {
                GameFIG_VV.instance.banner = null;
                GameFIG_VV.instance.bannerVivo = false;
                GameFIG_VV.instance.JtGG();
            })
            this.banner.onLoad(res => {
                console.log("banner广告加载成功");
                GameFIG_VV.instance.bannerVivo = true;
            })
            this.banner.onError(err => {
                GameFIG_VV.instance.bannerVivo = false;
                GameFIG_VV.instance.banner = null;
                //   GameFIG_this.TiShiKuang("errCode1:"+err.errCode)
            })

        } else { }

    }
    dtgg() { //视频广告v

        if (GameFIG_Config.GameGGConfig.SPid) {
            this.redio = this.wx.createRewardedVideoAd({
                posId: GameFIG_Config.GameGGConfig.SPid,

            });
            this.redio.onLoad(() => {
                GameFIG_VV.instance.readtf = true;
                console.log("视频广告加载完毕");
            })

            this.redio.onError(err => {
                GameFIG_VV.instance.readtf = false;
                GameFIG_VV.instance.TVorShare = false;
                // GameFIG_this.TiShiKuang("视频加载失败");
                if (GameFIG_VV.instance.fail_HanderUse) {
                    GameFIG_VV.instance.fail_HanderUse.run();
                    GameFIG_VV.instance.fail_HanderUse = undefined;
                }
            })
            this.redio.onClose(res => {
                Laya.SoundManager.muted = false;
                // 用户点击了【关闭广告】按钮
                if (res && res.isEnded) {
                    if (GameFIG_VV.instance.success_HanderUse) {
                        GameFIG_VV.instance.success_HanderUse.run();
                        GameFIG_VV.instance.success_HanderUse = undefined;
                    }
                    GameFIG_VV.instance.TiShiKuang("已获得观影奖励");
                } else {
                    if (GameFIG_VV.instance.fail_HanderUse) {
                        GameFIG_VV.instance.fail_HanderUse.run();
                        GameFIG_VV.instance.fail_HanderUse = undefined;
                    }
                    GameFIG_VV.instance.TiShiKuang("未完成观影无法获得奖励");
                }
                GameFIG_VV.instance.redio.load();

            })

        }


    }
    initGG() { //重写
        if (this.wx && !GameFIG_Config.GameGGConfig.Vivo.isSDK) {
            this.JtGG();
            this.dtgg();
        }
    }
    GetGameInitConfig() { //重写

    }
    /**
    * 打开广告_分享汇总方法 vivo分享修改为百分百获取有修改需求自定义
    * @param {*bool} AotoSPFX  true视频 false分享 0 随机
    * @param {*Laya.Handler} success_Hander 成功分享/观看视频时调用
    * @param {*Laya.Handler}fail_Hander 失败分享/观看视频时调用
    */
    GG_all(AotoSPFX = 0, success_Hander, fail_Hander) {
        Laya.SoundManager.muted = true;
        if (success_Hander) {
            this.success_HanderUse = success_Hander;

        }
        if (fail_Hander) {
            this.fail_HanderUse = fail_Hander;
        }
        if (this.wx) {
            if (AotoSPFX == 0) {
                this.TVorShare = !this.TVorShare;
            } else {
                this.TVorShare = AotoSPFX;
            }
            if (this.TVorShare) { //视频

                if (GameFIG_Config.GameGGConfig.Vivo.isSDK) {
                    window['King_SDK_Manager'].showRewardedVideoAd(function (res) {
                        if (res) {
                            console.log('播放成功，下发游戏奖励');
                            GameFIG_VV.instance.TiShiKuang("观看完成,已获取奖励");
                            if (GameFIG_VV.instance.success_HanderUse) {
                                GameFIG_VV.instance.success_HanderUse.run();
                                GameFIG_VV.instance.success_HanderUse = undefined;
                            }
                            Laya.SoundManager.muted = false;
                        } else {
                            console.log('播放失败');
                            GameFIG_VV.instance.TiShiKuang("观看失败,无法获取奖励");
                            if (GameFIG_VV.instance.fail_HanderUse) {
                                GameFIG_VV.instance.fail_HanderUse.run();
                                GameFIG_VV.instance.fail_HanderUse = undefined;
                            }
                            Laya.SoundManager.muted = false;
                        }

                    });
                } else {
                    if (this.readtf && this.redio) {
                        this.redio.show().then(() => {

                        }).catch((err) => {
                            GameFIG_VV.instance.redio.load();
                            console.log('激励视频广告展示失败', JSON.stringify(err));
                            GameFIG_VV.instance.TiShiKuang("广告获取失败");
                            if (GameFIG_VV.instance.fail_HanderUse) {
                                GameFIG_VV.instance.fail_HanderUse.run();
                                GameFIG_VV.instance.fail_HanderUse = undefined;
                            }
                            Laya.SoundManager.muted = false;
                        });

                    } else {
                        GameFIG_VV.instance.TiShiKuang("暂无广告");
                        GameFIG_VV.instance.redio.load();
                        Laya.SoundManager.muted = false;
                    }
                }




            } else { //分享
                this.FXget();
                Laya.SoundManager.muted = false;
            }
        } else {

            if (success_Hander) {
                success_Hander.run();
                Laya.SoundManager.muted = false;
            }
        }


    }
    /**
     * * 主动分享
     * @param {*} successhander成功
     * @param {*} failhander 
     * @param {*} shareFun 分享方法 video(视频),token(口令),article(图文内容) 后两者是头条分享暂时不接
     */
    FXget() { //分享
        if (this.wx) {
            if (this.wx.getSystemInfoSync().platformVersionCode >= 1056) {
                this.wx.share({
                    success: (res) => {
                        console.log("分享成功");
                        GameFIG_VV.instance.ShareGet(true);
                    },
                    fail: () => {
                        console.log("分享失败");
                        GameFIG_VV.instance.WXLog(false, null);
                    }
                });
            }
        }

    }

    /**
     * 
     * @param {*} biaoti 标题
     * @param {*} msg 内容
     * @param {Laya.Handler} success_Hander 成功回调 
     * @param {Laya.Handler} cancel_Hander 失败/取消 回调
     */
    JiaoHukuang(biaoti, msg, success_Hander, cancel_Hander) {
        if (GameFIG_VV.instance.wx) {
            GameFIG_VV.instance.wx.showDialog({
                title: biaoti,
                message: msg,
                buttons: [
                    {
                        text: '确定',
                        color: '#33dd44'
                    }
                ],
                success: function (data) {
                    if (success_Hander) {
                        success_Hander.run();
                    }
                },
                cancel: function () {
                    if (cancel_Hander) {
                        cancel_Hander.run();
                    }
                },
                fail: function (data, code) {
                    if (cancel_Hander) {
                        cancel_Hander.run();
                    }
                }
            })
        } else {
            if (success_Hander) {
                success_Hander.run();
            }
        }
    }
    /**
         * vivo自带提示框
         * @param {String} msg 提示信息 
         * @param {Number} duration 显示的时长 默认200 短时间 超过就是长时间 已自适应微信版本
         */
    TiShiKuang(msg, duration = 200) {
        if (GameFIG_VV.instance.wx != undefined) {
            GameFIG_VV.instance.wx.showToast({
                message: msg,
                duration: duration > 200 ? 1 : 0
            })
        } else {
            alert(msg);
        }

    }
    ShowHenFu() {
        if (this.wx) {
            this.hidebanner();
            this.closeBoxPortalAd();
            this.HenFuClose = false;
            if (this.wx.createBoxBannerAd) {
                this.HenFuBox = this.wx.createBoxBannerAd({
                    posId: GameFIG_Config.GameGGConfig.Vivo.HenFuID
                })
                this.HenFuBox.onError(function (err) {

                    //  GameFIG_this.TiShiKuang("横幅加载失败" + err.errCode);
                    GameFIG_VV.instance.bannershow();
                    GameFIG_VV.instance.showBoxPortalAd(375);
                })
                // 广告数据加载成功后展示
                this.HenFuBox.show().then(function () {
                    if (GameFIG_VV.instance.HenFuClose) {
                        GameFIG_VV.instance.closeBoxBanner();
                    }
                })
                this.HenFuBox.onClose(function () {
                    console.log('close')
                    GameFIG_VV.instance.bannershow();
                    GameFIG_VV.instance.showBoxPortalAd(375);
                })
            } else {
                console.log('暂不支持互推盒子相关 API')
                //  this.TiShiKuang("横幅加载失败1");
                GameFIG_VV.instance.bannershow();
                GameFIG_VV.instance.showBoxPortalAd(375);
            }
        }
    }
    closeBoxBanner() {
        if (this.HenFuBox != null) {
            this.HenFuBox.destroy()
            this.HenFuBox = null;
            this.bannershow();
            GameFIG_VV.instance.showBoxPortalAd(375);
        } else {
            this.bannershow();
            this.HenFuClose = true;
        }
    }

    /**
     * 游戏首页等适合展示Icon的场景常驻展示（每次回到此页面均调用一次）
     * @param {Number} marginTop 距离顶部位置 Laya比例中的高度 会自适应手机
     */
    showBoxPortalAd(marginTop = 400) {
        marginTop = 400;
        if (this.wx) {
            if (this.GetSystermInfo().platformVersionCode >= 1092) {
                this.boxPortalAd = this.wx.createBoxPortalAd({
                    posId: GameFIG_Config.GameGGConfig.Vivo.boxPortalAdID,
                    image: '',
                    marginTop: marginTop / GameFIG_Config.GameConfig.InitFBL.height * this.GetSystermInfo().screenHeight
                })
                this.boxPortalAd.onError(function (err) {
                    console.log("盒子九宫格广告加载失败", err)

                })
                this.boxPortalAd.onClose(function () {
                    console.log('close')
                    if (!GameFIG_VV.instance.boxPortalAd) {
                        return
                    }
                    // 当九宫格关闭之后，再次展示Icon
                    GameFIG_VV.instance.boxPortalAd.show();
                }.bind(this))
                // 广告数据加载成功后展示
                this.boxPortalAd.show().then(function () {
                    console.log('show success')
                })
            } else {
                console.log('暂不支持互推盒子相关 API')
            }

        } else {
            console.log('当前不在vivo手机运行')
        }
    }
    /**场景切换等需要关闭时调用 */
    closeBoxPortalAd() {
        if (this.boxPortalAd != null) {
            this.boxPortalAd.destroy()
            this.boxPortalAd = null;
        }
    }
    /**
          * 播放音效2 单人播放(网络加载模式) 仅会存在一个音源，播放新的会关闭之前未播放完的音效
          * @param {String} url 地址
          * @param {Number} isloop 是否循环 默认1次  0表示无限循环
          * @param {Boolean} tfShort 是否是短音频 
          * @param { Laya.Handler} OkHander 加载完成回调 参数返回音频长度 一般在微信都不灵这个长度
          * @param { Laya.Handler} overHander 播放结束回调
          */
    PlaySound2(url, isloop = 1, tfShort = true, OkHander = new Laya.Handler(), overHander = new Laya.Handler()) {

        if (GameFIG_VV.instance.wx) {//微信状态
            if (this.Open.YX) {
                if (this.innerAudioContext) {
                    this.innerAudioContext.stop();
                    this.innerAudioContext.destroy()
                } else {
                    this.innerAudioContext = GameFIG_VV.instance.wx.createInnerAudioContext()
                }

                this.innerAudioContext.src = url
                this.innerAudioContext.play();
                this.innerAudioContext.onPlay(() => {
                    console.log('开始播放')
                    OkHander.runWith(this.innerAudioContext.duration);

                })
                this.innerAudioContext.onEnded(() => {
                    console.log('播放结束')
                    overHander.run();
                    // this.innerAudioContext.destroy();
                })

            }
        } else {

            if (this.Open.YX) {//网络预加载音效保持和文字同步进行
                OkHander.run();
                if (this.PlaySound2_Sound != undefined) {

                    this.PlaySound2_Sound.stop();
                    Laya.SoundManager.removeChannel(this.PlaySound2_Sound);
                }
                if (!tfShort) {
                    Laya.timer.once(100, this, function (params) {
                        this.PlaySound2_Sound = Laya.SoundManager.playSound(url, isloop, overHander);
                    })
                } else {
                    this.PlaySound2_Sound = Laya.SoundManager.playSound(url, isloop, overHander);
                }
            }
        }

    }
}
