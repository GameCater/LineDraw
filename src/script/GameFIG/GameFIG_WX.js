import { GameFIG_Config } from "./GameFIG_Config";
import { GameFIG_ColorFilter } from "./GameFIG_ColorFilter";

// GameFIG 2.0.0版本 剥离版 不再集成至一个脚本 缩小文件大小
//当前集成工具:
//1声音管理  2数据管理  3服务器(云开发_服务器开发)管理  4平台(登录广告)管理  5按钮管理  6随机管理 7提示框交互框

//使用说明
//请勿new此对象，单例获取GameFIG_WX.Get()
//请优先在首次进入游戏时  调用Main_Use再去调用内部工具 防止部分数据未加载. 自动运行登录-广告初始化-主动通过本地储存/网络更新玩家数据。
//当前数据储存方案  优先本地储存为主覆盖服务器储存，当本地储存数据丢失再获取服务器数据 当本地储存ID不一致 重置本地和服务器数据 不再同时保存缓解服务器压力，但可能会出现 服务器同步不及时问题 注意上传时机
/**游戏工具类_微信_MGG服务器版本  */
export default class GameFIG_WX {
    constructor() { //请务必设置这里面的参数
        GameFIG_WX.instance = this;
        this.wx = Laya.Browser.window.wx; //微信api
        this.CallUpdateList = [];//玩家数据更新后，这些回调也要调用。
        this._InitPlyer();//初始化玩家参数
        this._InitwxCloud();//初始化云开发参数
        this._InitMusic();//初始化音乐参数
        this._InitBanben();//初始化缓存信息
        this._InitOther();//初始化其他  用户信息表

    }
    /**初始化其他 */
    _InitOther() {
        this.TouchHander = {};//微信监听 触发事件集
        Date.prototype.Format = function (fmt) { //author: meizz 
            var o = {
                "M+": this.getMonth() + 1, //月份 
                "d+": this.getDate(), //日 
                "h+": this.getHours(), //小时 
                "m+": this.getMinutes(), //分 
                "s+": this.getSeconds(), //秒 
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                "S": this.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        String.prototype.colorRgb = function () {
            // 16进制颜色值的正则
            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            // 把颜色值变成小写
            var color = this.toLowerCase();
            if (reg.test(color)) {
                // 如果只有三位的值，需变成六位，如：#fff => #ffffff
                if (color.length === 4) {
                    var colorNew = "#";
                    for (var i = 1; i < 4; i += 1) {
                        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
                    }
                    color = colorNew;
                }
                // 处理六位的颜色值，转为RGB
                var colorChange = [];
                for (var i = 1; i < 7; i += 2) {
                    colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
                }
                // return "RGB(" + colorChange.join(",") + ")";
                return { r: colorChange[0], g: colorChange[1], b: colorChange[2] }
            } else {
                return color;
            }
        };
        if (GameFIG_Config.NameConfig.IsSet) {
            Laya.loader.create(GameFIG_Config.NameConfig.url, Laya.Handler.create(this, function () {
                var liebiao = Laya.loader.getRes(GameFIG_Config.NameConfig.url);
                GameFIG_Config.NameConfig.Biao = [];
                for (var js in liebiao) {
                    GameFIG_Config.NameConfig.Biao.push(liebiao[js]);
                }
            }));//加载段位表
        }

    }
    /**
    *  返回一个bool
     * @param {*} D1 第一日期 Date类型
     * @param {*} D2 第二日期 Date类型
    */
    TFdate(D1, D2) {//判断是否同一天
        //字符串日期,用new Date(字符串) 转换成日期类型
        //一定要有上面这些  才能.Format 转换
        if (!D1 || !D2) {
            return false;//第一次
        }
        if (D1.Format("yyyy-MM-dd") == D2.Format("yyyy-MM-dd")) {
            return true;
        } else {
            return false;
        }

    }
    /**初始化_缓存数据_版本信息 */
    _InitBanben() {
        if (!this.GetBanBenID() || GameFIG_Config.player_Config_TFsave == false) {
            this.removeLocalData();//如果版本更新 清除之前版本的所有数据缓存
        }
        this.saveLocalData("banbenID:" + GameFIG_Config.GameConfig.GameName + GameFIG_Config.GameConfig.banbenID, GameFIG_Config.GameConfig.banbenID)
    }
    /**
     * 获取当前游戏缓存版本ID
     */
    GetBanBenID() {
        return this.fetchLocalData("banbenID:" + GameFIG_Config.GameConfig.GameName + GameFIG_Config.GameConfig.banbenID);
    }
    /**
     *  Get 单例获取工具类
     * @return {GameFIG_WX} 
     */
    static Get() {
        if (GameFIG_WX.instance == undefined) {
            GameFIG_WX.instance = new GameFIG_WX();
            window.GameFIG = GameFIG_WX.instance;
        }
        return GameFIG_WX.instance;
    }
    /**获取游戏配置类 */
    get player_Config() {
        return GameFIG_Config.player_Config;
    }
    /**设置游戏配置类 */
    set player_Config(res) {
        GameFIG_Config.player_Config = res;
    }
    //--------------------------------------初始化游戏变量--------------------------------------------------
    /**内部初始化音乐播放 */
    _InitMusic() {
        this.YXBiaoKey = {};
        this.Open = {
            YX: true,
            ZD: true,
            MC: true
        }; //声音开关
        /**当前已加载的音效地址 */
        this.VoiceURL = {};

    }
    /**内部初始化玩家信息 */
    _InitPlyer() {
        if (GameFIG_Config.isRandPlayer) {
            GameFIG_Config.player_Config.Name = this.GetRandName();
            GameFIG_Config.player_Config.openid = (new Date()).getTime() + ""; //暂时测试使用 保证openid的唯一性
        }
        if (GameFIG_Config.HeadConfig.IsSet) {
            GameFIG_Config.player_Config.HeadUrl = this.GetRandHead()
        }

        GameFIG_Config.player_Config.Sgin = GameFIG_Config.GameConfig.banbenID;
    }
    /**内部初始化微信云开发  */
    _InitwxCloud() {
        this.WXcloud_MSG = null;
        if (GameFIG_WX.instance.wx && GameFIG_Config.GameYun.isOpenYun) {
            GameFIG_WX.instance.wx.cloud.init(); //初始化云
            this.WXcloud_MSG = GameFIG_WX.instance.wx.cloud.database({ //初始化云数据库
                env: GameFIG_Config.GameYun.env //这里填写云环境id
            });
        }
    }
    /**内部初始化格子广告 */
    _InitGeZhi() {

    }
    /**
    *  GameFIG主入口  请务必在主脚本第一时间调用
    * @param {Laya.Handler} LoginHander  登录成功回调
    * @param {Laya.Handler} InitHander   获取启动参数完成回调
    * @param {Laya.Handler} GeZhiHander  获取格子广告完成回调
    */
    Main_Use(LoginHander = new Laya.Handler(), InitHander = new Laya.Handler(), GeZhiHander = new Laya.Handler()) {
        if (this.fetchLocalData(GameFIG_Config.GameConfig.GameName + GameFIG_Config.GameConfig.banbenID)) {
            GameFIG_Config.player_Config = this.fetchLocalData(GameFIG_Config.GameConfig.GameName + GameFIG_Config.GameConfig.banbenID);
            this.PlayerSgin = true;//本地已经注册
        } else {//首次注册


        }
        console.log("进入")
        window.begintime = Math.floor(new Date().getTime() / 1000);//游戏开始时间
        var hander = undefined;
        if (GameFIG_WX.instance.wx) {//走服务器登录流程---登录微信--获取真实code---获取玩家注册信息--
            hander = Laya.Handler.create(this, function (success, data) {
                if (data) {
                    GameFIG_Config.player_Config = data;
                }
                success.run();
            }, [LoginHander])
        } else {
            LoginHander.run();

        }
        this.Login(hander);// 
        this.GameBegin();

        if (GameFIG_Config.ServerConfig.GetMain.isOpen) {
            this.getServerConfig(InitHander);
        } else {
            InitHander.run();
            this.GetGameInitConfig();
        }
        if (GameFIG_Config.ServerConfig.Getadver.isOpen) {
            this.getServerGezhi(GeZhiHander);
        } else {
            GeZhiHander.run();
        }
    }
    /**
      * 游戏开始可在加载页面调用此函数 加载广告
      */
    GameBegin() {
        if (GameFIG_WX.instance.wx) {
            this.GetUpdate(); //更新检测 
            this.initGG();
            GameFIG_WX.instance.wx.onShow(function (res) { //微信进入监听
                console.log(res);
                console.log("回到游戏界面");
                if (GameFIG_WX.instance.shareNow == true) {
                    GameFIG_WX.instance.shareNow = false;
                    GameFIG_WX.instance.ShareGet();
                }
                if (!this.WathGGnow) {
                    GameFIG_WX.instance.ResumeMusic();
                }
            })
            GameFIG_WX.instance.wx.onHide(function (res) { //微信退出后台监听
                console.log(res);
                console.log("退出游戏");
                if (GameFIG_Config.WXset.PHB.open) {
                    GameFIG_WX.instance.SetWXphb(GameFIG_Config.player_Config[GameFIG_Config.WXset.PHB.key]);
                }
                GameFIG_WX.instance.UpdatePlayerMsg(true);
                GameFIG_WX.instance.PauseMusic();
            })
        }

    }
    //-----------------------------------------------------------------广告管理------------------------------------------

    initGG() { //初始化广告
        this.nowtp = Math.floor(Math.random() * ((GameFIG_Config.GameGGConfig.TPid.length - 1) - (0) + 1) + (0)); //max-min
        this.JtGG(); //初始化所有bander广告
        this.dtgg(); //视频广告
        this.ChaPinCreat();//初始化插屏
        this.CreatYuanShen();//初始化原生
    }
    ChaPinCreat() {
        // 创建插屏广告实例，提前初始化
        if (this.wx.createInterstitialAd && GameFIG_Config.GameGGConfig.ChaPin != "") {
            this.interstitialAd = this.wx.createInterstitialAd({
                adUnitId: GameFIG_Config.GameGGConfig.ChaPin
            })
        }
    }
    /**插屏展示 */
    InterShow() {
        // 在适合的场景显示插屏广告
        if (this.wx && this.interstitialAd) {
            this.interstitialAd.show().catch((err) => {
                console.error("wx插屏错误", err);
            })
        }
    }
    CreatYuanShen() {//原生广告
        // 创建插屏广告实例，提前初始化
        if (this.wx.createCustomAd && GameFIG_Config.GameGGConfig.YuanShen != "") {
            this.CustomAdTrue = false;
            if (this.CustomAd) {
                this.CustomAd.destroy();
            }
            var info = this.wx.getSystemInfoSync();
            var left = info.windowWidth / 2 - 360 / 2;
            var top = info.windowHeight - 106;
            this.CustomAd = this.wx.createCustomAd({
                adUnitId: GameFIG_Config.GameGGConfig.YuanShen,
                adIntervals: 30,
                style: {
                    left: left,
                    top: top,
                    fixed: true
                }
            })
            this.CustomAd.onError((err) => {
                this.CustomAd = null;
                this.CustomAdTrue = false;
            })
            this.CustomAd.onLoad(() => {
                console.log("原生模板加载完成")
                this.CustomAdTrue = true;
            })
        }
    }
    ShowYuanShen() {
        if (this.wx) {
            if (this.CustomAd && this.CustomAdTrue) {
                this.CustomAd.show().then(() => {

                }).catch((err) => {
                    GameFIG_WX.instance.CreatYuanShen();
                })
            } else {
                GameFIG_WX.instance.CreatYuanShen();
            }

        }
    }
    HideYuanShen() {
        if (this.wx) {
            if (this.CustomAd && this.CustomAdTrue) {
                this.CustomAd.hide().then(() => {
                }).catch((err) => {
                    GameFIG_WX.instance.CreatYuanShen();
                })
            } else {
                GameFIG_WX.instance.CreatYuanShen();
            }
        }
    }
    JtGG(width = 300) { //图片广告
        if (GameFIG_Config.GameGGConfig.TPid.length == 0) {
            return;
        }
        if (this.banner) {
            this.banner.destroy();
        }
        if (this.nowtp > GameFIG_Config.GameGGConfig.TPid.length - 1) {
            this.nowtp = 0;
        }
        if (this.compareVersion('2.0.4') >= 0) { //id不为空时
            this.banner = GameFIG_WX.instance.wx.createBannerAd({
                adUnitId: GameFIG_Config.GameGGConfig.TPid[GameFIG_WX.instance.nowtp],
                adIntervals: 30,
                style: {
                    left: 15,
                    top: 0,
                    width: width
                }
            })
            this.banner.onResize(res => {
                GameFIG_WX.instance.banner.style.top = GameFIG_WX.instance.wx.getSystemInfoSync().windowHeight - res.height - 20;
                GameFIG_WX.instance.banner.style.left = 667 / 1334 * GameFIG_WX.instance.wx.getSystemInfoSync().windowWidth - res.width / 2;
            })
            this.banner.onLoad(res => {
                console.log("banner广告加载成功");

                if (GameFIG_WX.instance.showBanner == true) {
                    console.log("banner广告加载成功");
                    GameFIG_WX.instance.showBanner = false;
                    GameFIG_WX.instance.bannershow(GameFIG_WX.instance.showBannerTT.weizhiID, GameFIG_WX.instance.showBannerTT.pos);
                }
            })
            this.banner.onError(err => { })

        } else { }
        this.nowtp++;
        //   this.saveLocalData("GuangGaoID疯狂", { "id": GameGGConfig.nowtp });

    }
    dtgg() { //视频广告

        if (GameFIG_Config.GameGGConfig.SPid != "") {
            this.redio = GameFIG_WX.instance.wx.createRewardedVideoAd({
                adUnitId: GameFIG_Config.GameGGConfig.SPid,
                success: function (res) {

                }
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
    /**
     * 
     * @param {*} isCanGet100 调用分享是否能100%获取
     */
    ShareGet(isCanGet100 = false) { //分享获取
        if (isCanGet100 == false) {
            var MS = parseInt((Date.parse(new Date()) - Date.parse(this.sharetime))); //获取秒数
            if (MS < 1000) { //0
                GameFIG_WX.instance.WXLog(false, null);
            } else if (MS < 3000) { //20
                var r = Math.random();
                if (r <= 0.2) {
                    GameFIG_WX.instance.GETshareGift();
                } else {
                    GameFIG_WX.instance.WXLog(false, null);
                }
            } else { //100  90  80 
                var r = Math.random();
                if (r <= GameFIG_Config.GameGGConfig.shareBFB) {
                    GameFIG_WX.instance.GETshareGift();
                } else {
                    GameFIG_WX.instance.WXLog(false, null);
                }
            }
        } else {
            GameFIG_WX.instance.GETshareGift();
        }

    }

    GETshareGift() { //获取分享礼物
        if (GameFIG_WX.instance.GG_all_Okhander) {
            GameFIG_WX.instance.GG_all_Okhander.run();
            GameFIG_WX.instance.GG_all_Okhander = undefined;
        }

    }
    /**
     * 分享成功 失败窗口
     * @param {*bool} success 是否分享成功
     *  @param {*str} success 分享成功,显示物品名称
     *  @param {*index} success 分享失败标识 方便重新分享
     */
    WXLog(success, str) {
        if (success) {
            GameFIG_WX.instance.wx.showModal({
                title: '分享成功',
                content: str,
                showCancel: false, //隐藏取消
                confiemText: "谢谢",
                success(res) {
                    if (res.confirm) {

                    } else if (res.cancel) {

                    } else if (res.fail) {

                    }
                }
            })
        } else {
            if (GameFIG_WX.instance.GG_all_failHander) {
                GameFIG_WX.instance.GG_all_failHander.run();
                GameFIG_WX.instance.GG_all_failHander = undefined;
            }

        }

    }

    TVLog(success, str, index) {
        if (success) {
            GameFIG_WX.instance.wx.showModal({
                title: '观影完毕',
                content: str,
                showCancel: false, //隐藏取消
                confiemText: "谢谢",
                success(res) {
                    if (res.confirm) {

                    } else if (res.cancel) {

                    } else if (res.fail) {

                    }
                }
            })
        } else {
            GameFIG_WX.instance.wx.showModal({
                title: '观影失败',
                showCancel: false, //隐藏取消
                content: str,
                success(res) {
                    if (res.confirm) {

                    } else if (res.cancel) {


                        // 播放中途退出，不下发游戏奖励
                    } else if (res.fail) {


                        // 播放中途退出，不下发游戏奖励
                    }
                }
            })
        }

    }

    /**
     * 切换banner
     * @param {*} width 重新加载的宽高
     * @param {*} TFshow 重新加载后是否继续显示
     */
    changgebanner(width, TFshow = false) {
        if (GameFIG_WX.instance.wx && GameFIG_Config.GameGGConfig.TPid.length > 0) {
            this.hidebanner();
            this.showBanner = TFshow;
            this.JtGG(width);
        }

    }
    hidebanner() {
        if (GameFIG_WX.instance.wx && GameFIG_Config.GameGGConfig.TPid.length > 0) {
            this.showBanner = false;
            this.banner.hide();
        }

    }
    /**
     * 显示banner 
     * @param {*} weizhiID 显示区域位置 0底部居中  1底部左对齐 2底部右对齐 3相对于1334*750的位置比例 例如{x:667,y:750} 为底部居中
     * @param {*} pos 显示区域位置 相对于1334*750的位置比例 例如{x:667,y:750} 为底部居中  仅weizhiID为3有效
     */
    bannershow(weizhiID = 0, pos = { x: 0, y: 0 }) {
        if (GameFIG_WX.instance.wx && GameFIG_Config.GameGGConfig.TPid.length > 0) {
            this.showBannerTT = {
                weizhiID: weizhiID,
                pos: pos,
            }
            this.banner.show();
            if (weizhiID == 0) {
                this.banner.style.top = GameFIG_WX.instance.wx.getSystemInfoSync().windowHeight - this.banner.style.realHeight - 20 / GameFIG_Config.GameConfig.InitFBL.height * GameFIG_WX.instance.wx.getSystemInfoSync().windowHeight;
                this.banner.style.left = 667 / GameFIG_Config.GameConfig.InitFBL.width * GameFIG_WX.instance.wx.getSystemInfoSync().windowWidth - this.banner.style.realWidth / 2;
            } else if (weizhiID == 1) {
                this.banner.style.top = GameFIG_WX.instance.wx.getSystemInfoSync().windowHeight - this.banner.style.realHeight - 20 / GameFIG_Config.GameConfig.InitFBL.height * GameFIG_WX.instance.wx.getSystemInfoSync().windowHeight;
                this.banner.style.left = 20 / GameFIG_Config.GameConfig.InitFBL.height * GameFIG_WX.instance.wx.getSystemInfoSync().windowHeight;
            } else if (weizhiID == 2) {
                this.banner.style.top = GameFIG_WX.instance.wx.getSystemInfoSync().windowHeight - this.banner.style.realHeight - 20 / GameFIG_Config.GameConfig.InitFBL.height * GameFIG_WX.instance.wx.getSystemInfoSync().windowHeight;
                this.banner.style.left = GameFIG_WX.instance.wx.getSystemInfoSync().windowWidth - (this.banner.style.realWidth + 20 / GameFIG_Config.GameConfig.InitFBL.height * GameFIG_WX.instance.wx.getSystemInfoSync().windowHeight);
            } else if (weizhiID == 3) {
                this.banner.style.top = pos.y / GameFIG_Config.GameConfig.InitFBL.height * GameFIG_WX.instance.wx.getSystemInfoSync().windowHeight - this.banner.style.realHeight / 2;
                this.banner.style.left = pos.x / GameFIG_Config.GameConfig.InitFBL.width * GameFIG_WX.instance.wx.getSystemInfoSync().windowWidth - this.banner.style.realWidth / 2;
            }

        }

    }
    /**
     * 打开广告_分享汇总方法
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
        if (GameFIG_WX.instance.wx) {
            if (AotoSPFX == 0) {
                this.TVorShare = !this.TVorShare;
            } else {
                this.TVorShare = AotoSPFX;
            }
            if (this.TVorShare) { //视频
                if (this.readtf && this.redio != undefined) {
                    this.redio.show();

                } else {
                    this.readtf = false;
                    this.TVorShare = false;
                    this.FXget();
                    this.shareNow = true;
                    this.sharetime = new Date();
                }
            } else { //分享
                this.FXget();
                this.shareNow = true;
                this.sharetime = new Date();
            }
        } else {
            this.TiShiKuang("暂无广告");
            if (fail_Hander) {
                fail_Hander.run();
            }
        }


    }
    /**主动分享 */
    FXget() { //分享
        if (GameFIG_WX.instance.wx) {
            var fxrand = Math.floor(Math.random() * ((GameFIG_Config.shareInfo.length - 1) - (0) + 1) + (0)); //max-min
            GameFIG_WX.instance.wx.shareAppMessage({
                imageUrl: GameFIG_Config.shareInfo[fxrand].img, //转发标题
                title: GameFIG_Config.shareInfo[fxrand].title, //转发标题
                //   query: 'inviter_id=' + window.player.P_id + '&share_id=' + window.shareInfo[fxrand].id,
            })
        }

    }
    //-----------------------------------------------------------------平台公用------------------------------------------
    /**
        * 获取系统信息
        * @param 常用 screenWidth screenHeight
        */
    GetSystermInfo() {
        if (GameFIG_WX.instance.wx) {
            return GameFIG_WX.instance.wx.getSystemInfoSync();
        }
        return {};
    }
    GetUpdate() { //获取新版本
        var updateManager = GameFIG_WX.instance.wx.getUpdateManager()
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log("版本更新检测");
            console.log(res);

        })
        updateManager.onUpdateReady(function () {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            GameFIG_WX.instance.TiShiKuang("有新更新");
            updateManager.applyUpdate()
        })

        updateManager.onUpdateFailed(function () {
            // 新版本下载失败

            GameFIG_WX.instance.TiShiKuang("更新失败");
        })


    }
    /**版本对比 */
    compareVersion(v2) {
        var v1 = GameFIG_WX.instance.wx.getSystemInfoSync().SDKVersion;
        v1 = v1.split('.');
        v2 = v2.split('.');
        var len = Math.max(v1.length, v2.length);

        while (v1.length < len) {
            v1.push('0');
        }
        while (v2.length < len) {
            v2.push('0');
        }

        for (let i = 0; i < len; i++) {
            const num1 = parseInt(v1[i]);
            const num2 = parseInt(v2[i]);

            if (num1 > num2) {
                return 1;
            } else if (num1 < num2) {
                return -1;
            }
        }

        return 0;
    }
    /**
        * 微信授权按钮 萌果版
        * @param {Laya.Handler} success 成功回调
        * @param {Laya.Handler} fail_Hander 失败回调
        * @param {*} POS 相对于左上角偏移
        * @param {*} Sacle 相对于按钮大小 默认全屏
        */
    ShouQuan(success = new Laya.Handler(), fail_Hander = new Laya.Handler(), POS = { x: 0, y: 0 }, Sacle = { w: 1920, h: 1920 }, color = "") {
        if (GameFIG_WX.instance.wx) {
            var button = GameFIG_WX.instance.wx.createUserInfoButton({ //创建微信授权按钮
                type: 'text',
                text: '授权',
                style: {
                    left: POS.x / GameFIG_Config.GameConfig.InitFBL.width * GameFIG_WX.instance.wx.getSystemInfoSync().windowWidth,
                    top: POS.y / GameFIG_Config.GameConfig.InitFBL.height * GameFIG_WX.instance.wx.getSystemInfoSync().windowHeight,
                    width: Sacle.w / GameFIG_Config.GameConfig.InitFBL.width * GameFIG_WX.instance.wx.getSystemInfoSync().windowWidth,
                    height: Sacle.h / GameFIG_Config.GameConfig.InitFBL.height * GameFIG_WX.instance.wx.getSystemInfoSync().windowHeight,
                    lineHeight: 40,
                    backgroundColor: color,
                    color: color,
                    textAlign: 'center',
                    fontSize: 16,
                    borderRadius: 4
                }
            });
            button.show();
            button.onTap((res) => {
                button.hide();
                if (res.errMsg == "getUserInfo:ok") {
                    GameFIG_Config.player_Config.Name = res.userInfo.nickName;
                    GameFIG_Config.player_Config.HeadUrl = res.userInfo.avatarUrl;
                    //   GameFIG_WX.instance.Player.playerConfig.userInfo= res.userInfo; 是否需要玩家其他详细数据，需要打开
                    success.run();
                    GameFIG_WX.instance.UpdatePlayerMsg();
                    button.destroy();
                    if (GameFIG_Config.ServerConfig.isopen) {
                        GameFIG_WX.instance.ShouQuan_Info_Update(res.iv, res.encryptedData);
                    }

                } else if (res.errMsg != "getUserInfo:ok") {
                    GameFIG_WX.instance.wx.showModal({
                        title: '是否重新授权',
                        content: "授权后可在好友排行榜看到自己哦~",
                        success(res) {
                            if (res.confirm) {
                                button.destroy();
                                GameFIG_WX.instance.ShouQuan(success, fail_Hander, POS, Sacle);
                            } else if (res.cancel) {
                                GameFIG_Config.player_Config.DoNotSQ = true;
                                GameFIG_WX.instance.UpdatePlayerMsg();
                                console.log("已取消授权");
                                fail_Hander.run();
                                button.destroy();
                            } else if (res.fail) {
                                button.destroy();
                                fail_Hander.run();
                            }
                        }
                    })
                    return;
                }
            });
        }

    }
    /**
     * 授权玩家信息后上传
     * @param {*} iv 
     * @param {*} encrypteData 
     */
    ShouQuan_Info_Update(iv, encrypteData) {
        var header = {
            'content-type': 'application/json',
            'Authorization': GameFIG_Config.ServerConfig.jwt,
        };
        var data = {
            "name": GameFIG_Config.GameConfig.GameName,
            "openid": GameFIG_Config.player_Config.openid,
            "jwt": GameFIG_Config.ServerConfig.jwt,
            "iv": iv,
            "encrypteData": encrypteData,
            "session_key": GameFIG_Config.ServerConfig.sessid
        }
        if (this.wx) {
            this.wx.request({
                url: GameFIG_Config.ServerConfig.serverUrlPre + "/wx_auth/",
                method: "POST",
                header: header,
                data: data,
                success(res) {
                    console.log("授权信息上传成功");
                },
                complete(res) {

                }
            })
        }

    }
    TFshouquan(OkFUN = function () { }, failFUN = function () { }) {
        if (GameFIG_WX.instance.wx) {
            GameFIG_WX.instance.wx.getSetting({ //判断是否授权
                success: OkFUN,
                fail: failFUN
            })
        } else {
            failFUN();
        }

    }
    /**
    * 获取微信用户头像 姓名 此接口会调用微信授权按钮 请确保  微信登录成功之后调用
    * @param {*} callback 回调 获得返回玩家信息 失败返回{}
    */
    GetUserInfo(callback = new Laya.Handler()) {
        this.TFshouquan(function (res) {
            if (res.authSetting['scope.userInfo']) //如果授权
            {
                GameFIG_WX.instance.wx.getUserInfo({
                    success: (res) => {
                        GameFIG_Config.player_Config.Name = res.userInfo.nickName;
                        GameFIG_Config.player_Config.HeadUrl = res.userInfo.avatarUrl;
                        GameFIG_WX.instance.UpdatePlayerMsg();
                        callback.runWith(res.userInfo);
                    }
                })
            } else {
                callback.runWith({ msg: "未授权" });
                console.log("未授权")
            }
        }, function () {
            callback.runWith({});
        })
    }
    /**
     * 通过微信的触摸监听 调用微信api  部分api需要配合使用  例如微信订阅 仅触发一次
     * 可在触发前多次调用此函数 会保存回调集合 例如在触发前 多次订阅 触发后也会多次订阅 不会替换覆盖 相当于保存操作
     * @param {*} TouchHander 按下回调
     */
    WxAddTouch_Fun(TouchHander = new Laya.Handler()) {
        if (this.wx) {
            var keys = Object.keys(this.TouchHander);
            this.TouchHander[keys.length] = TouchHander;
            this.wx.onTouchEnd(this.TouchRecover.bind(this));
        }
    }
    TouchRecover() {
        for (var js in this.TouchHander) {
            this.TouchHander[js].run();
        }
        this.TouchHander = {};
        this.wx.offTouchEnd(this.TouchRecover.bind(this));
    }
    /**
     * 手动微信订阅授权弹窗 订阅ID  自动通知服务器 发送订阅消息
     * @param {} tmplIds 订阅msg 仅限一个一个订阅 不要多个模板同时订阅
     * @param {Laya.Handler} complete  成功失败回调 参数 true .false
     */
    WxDingYueTongzhi(tmplMsg = {}, complete = new Laya.Handler()) {
        if (this.wx) {
            this.WxAddTouch_Fun(Laya.Handler.create(this, function (tmplMsgs) {
                this.wx.requestSubscribeMessage({
                    tmplIds: [tmplMsgs.ID],
                    success(res) {
                        if (res.errMsg == "requestSubscribeMessage:ok") {
                            console.log("消息订阅成功", res)
                            GameFIG_WX.instance.SendDinYue(tmplMsgs);
                            complete.runWith(true);
                        } else {
                            console.log("消息订阅失败")
                            complete.runWith(false);
                        }

                    },
                    fail(res) {
                        console.log("消息订阅失败", res)
                        complete.runWith(false);
                    }
                })
            }, [tmplMsg]))

        }

    }
    /**
     * 发送订阅消息 ：配合WxDingYueTongzhi自动发送：
     * @param {*} tmplMsgs 订阅msg
     */
    SendDinYue(tmplMsgs) {
        if (GameFIG_Config.ServerConfig.SendDinYue.isOpen) {
            var severInfo = GameFIG_Config.ServerConfig;
            var data = {
                "data": tmplMsgs.data,//模板内容 
                "name": GameFIG_Config.GameConfig.GameName,
                "user": GameFIG_Config.player_Config.openid,
                "template": tmplMsgs.ID,
                "date": this.GetTimeCuoByTime(tmplMsgs.Time.Day, tmplMsgs.Time.hours, tmplMsgs.Time.minutes)
            };
            severInfo.SendDinYue.header["Authorization"] = GameFIG_Config.ServerConfig.jwt;
            this.Wx_SendSever(severInfo.SendDinYue.Type, severInfo.SendDinYue.header, severInfo.serverUrlPre + severInfo.SendDinYue.URL, data, function (res) {
                console.log("订阅发送成功", res);
            }, function (res) {
                console.log("订阅发送失败", res);
            });
        }

    }
    /**
     * 微信零钱发放
     * @param {*} amount 金额/分
     * @param {*} desc 标题
     */
    SendMoney(amount = 3, desc = "红包领取") {
        if (GameFIG_Config.ServerConfig.SendMoney.isOpen) {
            var severInfo = GameFIG_Config.ServerConfig;
            var data = {
                "name": GameFIG_Config.GameConfig.GameName,
                "user": GameFIG_Config.player_Config.openid,
                "amount": amount,
                "desc": desc
            };
            severInfo.SendMoney.header["Authorization"] = GameFIG_Config.ServerConfig.jwt;
            this.Wx_SendSever(severInfo.SendMoney.Type, severInfo.SendMoney.header, severInfo.serverUrlPre + severInfo.SendMoney.URL, data, function (res) {
                console.log("零钱发送成功", res);
            }, function (res) {
                console.log("零钱发送失败", res);
            });
        }

    }
    /**
     * 通过当前时间 根据参数获取 对应时间 例如：Day=0 代表今天 Day=-1 代表昨天,  (Day=1 hours=8 minutes=0) 代表 明天 8点0分 时间搓
     */
    GetTimeCuoByTime(Day = 0, hours = 8, minutes = 0) {
        var NowTime = new Date();
        var Cuo = NowTime.getTime();
        Cuo += Day * 24 * 60 * 60 * 1000;
        NowTime = new Date(Cuo);
        NowTime.setHours(hours, minutes, 0, 0);
        var Time = Math.floor(NowTime.getTime() / 1000);
        console.log("时间测试:" + Time);
        console.log("时间测试2:", NowTime.Format("yyyy-MM-dd hh:mm"));
        return Time
    }


    //-----------------------------------------------------------------服务器管理------------------------------------
    /**
         * 微信登录---获取真实code----获取用户注册信息---获取用户信息
         * @param {*} Fun Laya.Handler成功回调方法
         */
    Login(Fun) {
        this.LoadSuccess_Fun = Fun;
        if (GameFIG_WX.instance.wx) { //登录微信
            this.WXLogin();
        } else {
            console.log("当前不在微信环境下无法登录");

        }
    }
    /**登录微信 */
    WXLogin() {
        this.TiShiKuang("正在登录");
        GameFIG_WX.instance.wx.login({
            success: (loginres) => {
                if (loginres.code) {
                    var wxCode = loginres.code;
                    if (GameFIG_Config.ServerConfig.isopen) {
                        GameFIG_WX.instance.getcode(wxCode); //获取真实code 
                    } else {
                        GameFIG_WX.instance.LoadSuccess_Fun.run();
                    }

                }
            }
        });
    }
    /**获取真实id */
    getcode(code) {

        var data = {
            "name": GameFIG_Config.GameConfig.GameName,
            "code": code,
        };
        var severInfo = GameFIG_Config.ServerConfig;
        this.Wx_SendSever(severInfo.GetCode.Type, severInfo.GetCode.header, severInfo.serverUrlPre + severInfo.GetCode.URL, data, function (res) {
            if (res.statusCode == 404) {
                console.log("Error404")
                GameFIG_WX.instance.TiShiKuang("网络错误_getcode");
                GameFIG_WX.instance.LoadSuccess_Fun.run();
                return
            }
            var resdate = res.data;
            GameFIG_Config.player_Config.openid = resdate.user.openid;
            GameFIG_Config.ServerConfig.sessid = resdate.user.session_key;
            GameFIG_Config.ServerConfig.jwt = "Bearer " + resdate.jwt;
            console.log('获得openiD:' + resdate.user.openid)
            if (GameFIG_WX.instance.PlayerSgin) {//本地缓存有不用注册
                if (GameFIG_WX.instance.LoadSuccess_Fun) {
                    GameFIG_WX.instance.LoadSuccess_Fun.run();
                }
                GameFIG_WX.instance.Severlogin = true;
                GameFIG_WX.instance.UpdatePlayerMsg(true);
            } else {
                GameFIG_WX.instance.getplayer(); //注册用户信息
            }
            console.log("获取真实code")
        }, function (res) {
            GameFIG_WX.instance.TiShiKuang("网络错误_getcode");
            GameFIG_WX.instance.LoadSuccess_Fun.run();
        })
    }
    /**获取用户注册信息 */
    getplayer() {

        var data = {
            "name": GameFIG_Config.GameConfig.GameName,
        };
        var severInfo = GameFIG_Config.ServerConfig;
        severInfo.GameInFo_Post.header["Authorization"] = GameFIG_Config.ServerConfig.jwt;
        this.Wx_SendSever(severInfo.GameInFo_Post.Type, severInfo.GameInFo_Post.header, severInfo.serverUrlPre + severInfo.GameInFo_Post.URL, data, function (res) {
            if (res.statusCode != 404) {
                var resdate = res.data.gameInfo.ortherInfo == "" ? {} : JSON.parse(res.data.gameInfo.ortherInfo);
                console.log("玩家数据", resdate);
                if (resdate.Sgin == GameFIG_Config.GameConfig.banbenID) {
                    console.log("已注册");
                    GameFIG_Config.player_Config = resdate;
                    if (GameFIG_WX.instance.LoadSuccess_Fun != undefined) {
                        GameFIG_WX.instance.LoadSuccess_Fun.run();
                    }
                } else { //未注册
                    console.log("未注册");
                    if (GameFIG_WX.instance.LoadSuccess_Fun != undefined) {
                        GameFIG_WX.instance.LoadSuccess_Fun.run();
                    }
                }
                GameFIG_WX.instance.UpdatePlayerMsg();
                GameFIG_WX.instance.Severlogin = true;
            } else {
                if (GameFIG_WX.instance.LoadSuccess_Fun != undefined) {
                    GameFIG_WX.instance.LoadSuccess_Fun.run();
                }
            }
        }, function (res) {
            GameFIG_WX.instance.TiShiKuang("网络错误_getPlayer");
            if (GameFIG_WX.instance.LoadSuccess_Fun != undefined) {
                GameFIG_WX.instance.LoadSuccess_Fun.run();
            }
        })



    }
    /**获取游戏网络启动配置信息 */
    getServerConfig(InitHander) {
        var date = { name: GameFIG_Config.GameConfig.GameName }
        var sever = GameFIG_Config.ServerConfig.GetMain;
        this.Http_SendSever(date, sever.URL, sever.Type, sever.header, this, function (res) {
            var resdate = res;
            for (var js in res.ortherMS) {//暂时需要处理一下 全是string类型 T..T!
                var Obj = res.ortherMS[js];
                for (var ts in Obj) {
                    GameFIG_Config.GameConfig.otherSet[ts] = Obj[ts];
                }
            }
            if (resdate.shareConfig.length > 0) {
                GameFIG_Config.shareInfo = resdate.shareConfig;
            }
            this.GetGameInitConfig();
            InitHander.runWith(res);
        }, function (data) {
            console.log(data);
            this.GetGameInitConfig();
        })

    }
    /**
     * 获取游戏格子
     * @param {*} OverHander 完成回调
     */
    getServerGezhi(OverHander) {
        var date = { name: GameFIG_Config.GameConfig.GameName }
        var sever = GameFIG_Config.ServerConfig.Getadver;
        this.Http_SendSever(date, sever.URL, sever.Type, sever.header, this, function (res) {
            var resdate = res;
            if (resdate.results.length > 0) {
                GameFIG_Config.BoxInfo = resdate.results;
            }
            OverHander.run();
        }, function (data) {
            console.log(data);
            OverHander.run();
        })

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
                withShareTicket: true
            });
            var fxrand = Math.floor(Math.random() * ((GameFIG_Config.shareInfo.length - 1) - (0) + 1) + (0)); //max-min
            // 绑定分享参数
            GameFIG_WX.instance.wx.onShareTimeline(() => {
                return {
                    title: GameFIG_Config.shareInfo[fxrand].title,
                    imageUrl: GameFIG_Config.shareInfo[fxrand].img, // 图片 URL
                    query: 'a=1&b=2'
                }
            })

            GameFIG_WX.instance.wx.onShareAppMessage(() => ({
                title: GameFIG_Config.shareInfo[fxrand].title,
                imageUrl: GameFIG_Config.shareInfo[fxrand].img, // 图片 URL Laya.URL.basePath + 'gamemain/share.png'
                success: function (res) { },
                fail: function (res) { }
            }))

        }
    }
    /**
     * 更新储存玩家本地/服务器数据
     * @param {Boolean} ttff  是否同时保存至服务器  尽量间隔长一点保存至服务器 不要修改一个变量上传一次 钱着不住烧
     */
    UpdatePlayerMsg(ttff = false) {
        var data = {
            "data": JSON.stringify(GameFIG_Config.player_Config),
            "name": GameFIG_Config.GameConfig.GameName
        };

        var severInfo = GameFIG_Config.ServerConfig;
        severInfo.GameInFo.header["Authorization"] = GameFIG_Config.ServerConfig.jwt;
        if (this.Severlogin && ttff) {
            this.Wx_SendSever(severInfo.GameInFo.Type, severInfo.GameInFo.header, severInfo.serverUrlPre + severInfo.GameInFo.URL, data, function (res) {
                console.log("玩家数据上传成功");
            }, function (res) {
                console.log("玩家数据上传失败");
            });

        }
        this.saveLocalData(GameFIG_Config.GameConfig.GameName + GameFIG_Config.GameConfig.banbenID, GameFIG_Config.player_Config);
    }

    /**
         * 微信_访问链接
         * @param {string} method  "POST"/"GET"
         * @param {*} header  {'content-type': 'application/x-www-form-urlencoded'}
         * @param {string} SeverApiurl 需要访问的服务器API
         * @param {*} Data 需要传输的数据 {}
         * @param {Function} success 成功回调 注意接收参数
         * @param {Function} fail 失败回调 注意接收参数
         */
    Wx_SendSever(method = "POST", header = { 'content-type': 'application/x-www-form-urlencoded' }, SeverApiurl = "", Data = {}, success, fail) {
        if (GameFIG_WX.instance.wx) {
            GameFIG_WX.instance.wx.request({
                url: SeverApiurl,
                method: method,
                header: header,
                data: Data,
                success: success,
                fail: fail,
                dataType: "json",
            })
        } else {
            console.log("当前不在微信端");
        }

    }
    /**
     * http 访问链接
     * @param {*} date 需要传输数据
     * @param {string} URL 地址
     * @param {string} Type "GET/POST"
     * @param {*} header "application/json"
     * @param {*} caller 回调执行域 this
     * @param {Function} success 成功回调
     * @param {Function} fail 失败回调
     */
    Http_SendSever(date = {}, URL = "", Type = "GET", header = "", caller = this, success = function () { }, fail = function () { }) {
        //通用html版本 注意GET POST区别
        //Data= "a=b&c=d";
        //GET  xhr.send("www.adc.com?a=b&c=d","","GET","Josn")
        //POST  xhr.send("www.adc.com","a=b&c=d","POST","Josn")
        date = this.PinJie_Fun(date);
        var xhr = new Laya.HttpRequest();
        xhr.http.timeout = 10000; //设置超时时间；
        xhr.once(Laya.Event.COMPLETE, caller, success);
        xhr.once(Laya.Event.ERROR, caller, fail);
        if (Type == "GET") {
            xhr.send(URL + "?" + date, "", Type, "json", header);
        } else if (Type == "POST") {
            xhr.send(URL, date, Type, "json", header);
        } else {
            console.error("Http----Type is Not Right,Type只支持POST/GET");
        }

    }
    /**
     * json转字符串拼接 上传数据专用
     * @param {*} date 传入Json类型data{a:b,c:d} 
     * @param retrue--拼接字符串  "a=b&c=d"
     */
    PinJie_Fun(date) {
        var newDate = "";
        for (var index in date) {
            newDate += index + "=" + date[index] + "&";
        }
        newDate = newDate.substr(0, newDate.length - 1);
        return newDate;
    }

    //-----------------------------------------------------------------按钮管理------------------------------------
    /**
     * 按钮动画汇总
     * @param {Laya.Node} but  按钮
     * @param {Laya.Handler} FunHander  点击按钮后的回调
     * @param {Number} keyMusicID   播放音效传入音效表ID  
     * @param {Boolean} TFScaleAuto 是否不进行缩放模拟
     * @param {*} color 触发颜色 触发改变按钮颜色 抬起恢复 #000000
     */
    butTween(but, FunHander = new Laya.Handler(), keyMusicID = undefined, TFScaleAuto = false, color) {
        if (!TFScaleAuto) {
            but.off(Laya.Event.MOUSE_DOWN, this, this.ButAdd); //清除当前所有事件 防止重复
            but.on(Laya.Event.MOUSE_DOWN, this, this.ButAdd, [but, FunHander])
        }
        but.off(Laya.Event.CLICK, this, this.ButRunFun);
        but.off(Laya.Event.MOUSE_DOWN, this, this.butDownFun);
        // 按钮音效
        but.on(Laya.Event.MOUSE_DOWN, this, this.butDownFun, [keyMusicID]);
        // 按钮点击回调
        but.on(Laya.Event.CLICK, this, this.ButRunFun, [FunHander]);
        // 按钮滤镜
        if (color) {
            but.off(Laya.Event.MOUSE_DOWN, this, this.AddColorBut);
            but.on(Laya.Event.MOUSE_DOWN, this, this.AddColorBut, [but, color]);
        }
    }
    ButRunFun(hander) {
        hander.run();
    }
    AddColorBut(but, color) {
        GameFIG_ColorFilter.SetColorByColorMax(but, 20, 0, 0, 0, color)
        but.on(Laya.Event.MOUSE_UP, this, this.RemoveColor, [but]);
        but.on(Laya.Event.MOUSE_OUT, this, this.RemoveColor, [but]);
    }
    RemoveColor(but) {
        but.filters = [];
        but.off(Laya.Event.MOUSE_UP, this, this.RemoveColor, [but]);
        but.off(Laya.Event.MOUSE_OUT, this, this.RemoveColor, [but]);
    }
    ButAdd(but, FunHander) {
        this.TweenScalSim(but)
        but.on(Laya.Event.MOUSE_UP, this, this.TweenScalBig, [but, FunHander]);
        but.on(Laya.Event.MOUSE_OUT, this, this.TweenScalBig, [but, undefined]);
    }
    /**
     * 
     * @param {*} but 传入按钮
     */
    TweenScalSim(but) {
        Laya.Tween.to(but, {
            scaleX: 0.8,
            scaleY: 0.8
        }, 100, Laya.Ease.linearOut);
    }
    /**
     * 
     * @param {*} but 传入按钮
     * @param {*} Hander 传入回调方法Laya.hander
     */
    TweenScalBig(but, Hander) {
        Laya.Tween.to(but, {
            scaleX: 1,
            scaleY: 1
        }, 100, Laya.Ease.linearOut);
        if (Hander != undefined) {
            Hander.run();
        }
        but.off(Laya.Event.MOUSE_UP, this, this.TweenScalBig);
        but.off(Laya.Event.MOUSE_OUT, this, this.TweenScalBig);
    }
    butDownFun(id) {
        if (!isNaN(id)) {
            this.PlaySound2(GameFIG_Config.MusicJson[id].URL);
        }
    }

    //-----------------------------------------------------------------声音管理-------------------------------------
    /**
       * 播放音乐 (网络加载模式)
       * @param {*} id 音乐表ID
       */
    PlayMusic(id) {
        if (this.Open.MC) {
            this.SoundManager = Laya.SoundManager.playMusic(GameFIG_Config.MusicJson[id].URL, 0);
        }
    }
    /**暂停音乐 */
    PauseMusic() {
        if (this.SoundManager && this.Open.MC == true) {
            this.SoundManager.pause();
        }
    }
    /**继续音乐 */
    ResumeMusic() {
        if (this.SoundManager && this.Open.MC == true) {
            this.SoundManager.resume();
        }
    }
    /**停止音乐 */
    StopMusic() {
        if (this.SoundManager) {
            this.SoundManager.stop();
            this.SoundManager = null;
        }
    }
    /**
     * 播放音效 (网络加载模式)
     * @param {Number} id 音乐表ID
     * @param {Number} isloop 是否循环 默认1次  0表示无限循环
     * @param {Number} volume 音量范围从 0（静音）至 1（最大音量）。//暂时不用，没啥用
     */
    PlaySound(id, isloop = 1, volume = 1.0) {
        if (this.Open.YX) {
            return Laya.SoundManager.playSound(GameFIG_Config.MusicJson[id].URL, isloop);
        }
    }
    /**
     * 播放音效3 (默认此ID的音效只会有一个在场上)
     * @param {Number} id 音乐表ID
     * @param {Number} much 允许最多几个在场
     * @param {Number} isloop 是否循环 默认1次  0表示无限循环
     */
    PlaySound3(id, much = 1, isloop = 1) {
        if (this.Open.YX) {
            if (this.YXBiaoKey[id] == undefined) {
                this.YXBiaoKey[id] = {};
            }
            var len = Object.keys(this.YXBiaoKey[id]).length;
            if (len < much) {
                this.YXBiaoKey[id][len + "Top2"] = Laya.SoundManager.playSound(GameFIG_Config.MusicJson[id].URL, isloop, Laya.Handler.create(this, function (reid, len2) {
                    delete this.YXBiaoKey[reid][len2 + "Top2"];

                }, [id, len]));

            }
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

        if (this.wx) {//微信状态
            if (this.Open.YX) {
                if (this.innerAudioContext) {
                    this.innerAudioContext.stop();
                    this.innerAudioContext.destroy()
                }
                this.innerAudioContext = this.wx.createInnerAudioContext({ useWebAudioImplement: tfShort })
                this.innerAudioContext.src = url;
                this.innerAudioContext.play();
                this.innerAudioContext.onPlay(() => {
                    console.log('开始播放')
                    OkHander.runWith(this.innerAudioContext.duration);

                })
                this.innerAudioContext.onEnded(() => {
                    console.log('播放结束')
                    overHander.run();
                    this.innerAudioContext = null;
                    // this.innerAudioContext.destroy();
                })
                this.innerAudioContext.onError((res) => {
                    console.log(res.errMsg)
                    console.log(res.errCode)
                    console.log("音频加载错误");
                    this.innerAudioContext = null;
                })
            }
        } else {
            if (this.Open.YX) {//网络预加载音效保持和文字同步进行
                OkHander.run();
                if (this.PlaySound2_Sound != undefined) {
                    Laya.SoundManager.removeChannel(this.PlaySound2_Sound);
                    Laya.SoundManager.destroySound(url);
                }
                if (!tfShort) {
                    Laya.timer.once(100, this, function (params) {
                        this.PlaySound2_Sound = Laya.SoundManager.playSound(url, isloop, overHander);
                    })
                } else {
                    this.PlaySound2_Sound = Laya.SoundManager.playSound(url, isloop, overHander);
                }

            }

            // }
        }

    }
    /**
       * 微信震动
       * @param {*} TF true,短 false 长
       */
    wxZD(TF) {
        if (GameFIG_WX.instance.wx && this.Open.ZD) {
            if (TF) {
                GameFIG_WX.instance.wx.vibrateShort();
            } else {
                GameFIG_WX.instance.wx.vibrateLong();
            }
        }
    }

    //-----------------------------------------------------------------数据&文件管理-------------------------------------



    //-----------------------------------------------------------------声音管理工具-------------------------------------




    //-----------------------------------------------------------------数据管理工具-------------------
    /**
     * 导出信息至本地——json
     * @param {*} MSG 数据json格式
     *  @param {*} Faliname 导出文件名 
     */
    SaveMsgToJson(MSG, Faliname) {
        //--此方法为具体格式 每一步都不可缺少   保存MSG至本地  
        var elementA = document.createElement('a');
        elementA.setAttribute('href', 'data:text/plain;charset=utf-8,' + JSON.stringify(MSG));
        elementA.setAttribute('download', Faliname + ".json");
        elementA.style.display = 'none';
        document.body.appendChild(elementA);
        elementA.click();
        document.body.removeChild(elementA);
    }
    /**
     * 本地储存数据
     * @param key 对应的 key 值
     * @param data 对应的数据
     */
    saveLocalData(key, data) {
        Laya.LocalStorage.setItem(key, JSON.stringify(data));
    }
    /**
     * 获取本地数据
     * @param key 对应的 key 值
     */
    fetchLocalData(key) {
        let data = Laya.LocalStorage.getItem(key) ? JSON.parse(Laya.LocalStorage.getItem(key)) : null;
        return data;
    }
    /** 清除本地所有数据*/
    removeLocalData() {
        Laya.LocalStorage.clear();
    }

    /**
     * 保存图片到本机相册接口
     * @param {String} filePath 本地路径，不支持网络路径
     * @param {Laya.Handler} okHnader 成功回调
     * @param {Laya.Handler} fail_Hander 失败回调
     */
    WXSaveImage(filePath, okHnader, fail_Hander) {
        if (GameFIG_WX.instance.wx) {
            GameFIG_WX.instance.wx.saveImageToPhotosAlbum({
                filePath: filePath,
                success() {
                    okHnader.run();
                },
                fail() {
                    fail_Hander.run();
                }
            })
        } else {
            fail_Hander.run();
        }
    }
    /**
    * 微信本地图片获取
    *  @param {Number} Count 获取几张 最多9
    * @param {Laya.Handler} ChooseOverHander 成功回调 res路径集合
    */
    WXchooseImage(Count = 1, ChooseOverHander = Laya.Handler) {
        if (GameFIG_WX.instance.wx) {
            GameFIG_WX.instance.wx.chooseImage({
                count: Count,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success(res) {
                    console.log(res);
                    console.log("获取本机图片成功");
                    // tempFilePath可以作为img标签的src属性显示图片
                    const tempFilePaths = res.tempFilePaths
                    ChooseOverHander.runWith(res.tempFilePaths);
                },
                fail(res) {
                    console.log(res);
                    GameFIG_WX.instance.TiShiKuang("获取本机图片失败");
                }
            })
        }
    }
    /**
     * 微信上传接口
     * @param {String} filePath 上传路径，单次只能上传一个
     * @param {Laya.Handler} OkHander 成功回调
     * @param {Laya.Handler} fail_Hander 失败回调
     * @param {Laya.Handler} UpdateHander 每帧上传回调
     * @returns {uploadTask} uploadTask.abort()// 取消上传任务
     */
    WXUploadFile(filePath = "", OkHander = new Laya.Handler(), fail_Hander = new Laya.Hander(), UpdateHander = new Laya.Handler()) {
        if (GameFIG_WX.instance.wx) {
            var uploadTask = GameFIG_WX.instance.wx.uploadFile({
                url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
                filePath: filePath,
                name: 'file',
                header: null,
                formData: {
                    'user': 'test'
                },
                success(res) {
                    GameFIG_WX.instance.WxHideLoading();
                    OkHander.run();
                },
                fail(res) {
                    console.log(res);
                    GameFIG_WX.instance.TiShiKuang("提交失败!");
                    GameFIG_WX.instance.WxHideLoading();
                    fail_Hander.run();
                },
            })

            GameFIG_WX.instance.WxShowLoading("上传准备", true);
            uploadTask.onProgressUpdate((res) => {
                UpdateHander.runWith(res);
                console.log('上传进度', res.progress)
                console.log('已经上传的数据长度', res.totalBytesSent)
                console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
            })
            return uploadTask;
        }
    }
    /**
     * 
     * @param {String} name 名字
     * @param {String} text  文本
     * @param {Laya.Handler} OkHander 成功回调
     */
    Getvoice(name2 = "", text2 = "", OkHander = new Laya.Handler()) {
        if (this.VoiceURL[name2] == undefined) {
            var data = {
                name: name2,
                text: text2
            }
            var sever = GameFIG_Config.ServerConfig.GetVoice;
            this.Http_SendSever(data, sever.URL, sever.Type, sever.header, this, function (res) {
                // console.log("音频返回")
                // console.log(res)

                // console.log("音频获取成功", res);
                GameFIG_WX.instance.VoiceURL[name2] = res.voice_url;
                OkHander.runWith(res.voice_url);
            }, function (data) {
                OkHander.runWith("");
            })
        } else {
            OkHander.runWith(this.VoiceURL[name2]);
        }


    }
    /**
     * 更新玩家数据统一接口
     * @param {*} obj 
     */
    UpdatePlayerByKey(obj = {}, ttff = false) {
        for (var js in obj) {
            this.player_Config[js] = obj[js];
        }
        this.UpdatePlayerMsg(ttff);
    }
    /**
     * 设置值
     * @param {*} value 值
     */
    SetWXphb(value) {
        if (this.wx) {
            this.wx.setUserCloudStorage({
                KVDataList: [{ "key": "GK", "value": value + "" }],//value必须为string类型 别TM动
                success: res => {
                    console.log("更新微信排行榜成功");
                },
                fail: res => {
                    console.log("更新微信排行榜失败", res);
                }
            });
        }
    }
    //-----------------------------------------------------------------随机工具-----------------------------------------
    /**获取随机头像 */
    GetRandHead() {
        var randLen = this.GetRandNub(GameFIG_Config.HeadConfig.min, GameFIG_Config.HeadConfig.max);
        var headurl = GameFIG_Config.HeadConfig.head + randLen + GameFIG_Config.HeadConfig.end;
        return headurl;
    }
    /**
     * 根据随机字集合随机名字
     * @param {*} nameKu  名字集合 例如 {head:["张","王","李"],end:["伟","然","心"]} 不填系统默认集合
     * @returns 随机组合head+end
     */
    GetRandName(nameKu) {
        if (!nameKu) {
            nameKu = {
                head: ["张", "王", "李", "果", "周", "赵", "菲", "习", "毛", "邓"],
                end: ["三", "四", "小二", "麻子", "干饭", "心", "宝", "云", "林"]
            }
        }

        nameKu.head = this.Randshuzhu(nameKu.head);
        nameKu.end = this.Randshuzhu(nameKu.end);
        var GetRandHead = this.GetRandNub(0, nameKu.head.length - 1);
        var GetRandend = this.GetRandNub(0, nameKu.end.length - 1);
        var TestName = "";
        TestName += nameKu.head[GetRandHead];
        TestName += nameKu.end[GetRandend];
        return TestName;
    }
    /**通过json文件获取随机玩家信息:注意配置GameFIG_Config.NameConfig */
    GetRandNameByJosn() {
        if (GameFIG_Config.NameConfig.Biao.length > 0) {
            var rand = this.GetRandNub(0, GameFIG_Config.NameConfig.Biao.length - 1);
            return GameFIG_Config.NameConfig.Biao[rand];
        }
    }
    /**
     * 随机打乱数组
     * @param array
     */
    Randshuzhu(array) {
        let random = (a, b) => Math.random() > 0.5 ? -1 : 1;
        return array.sort(random);
    }
    /**
     * 获取min~max的正整数
     * @param {*} min 最小数正整数
     * @param {*} max 最大数正整数
     */
    GetRandNub(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min); //0-10
    }
    /**
    * 获取min~max的整数 例如-50~50
    * @param {*} min 最小数整数
    * @param {*} max 最大数正整数
    */
    GetRandNub2(min, max) {
        var biaoxu = 0;
        if (min < 0) {
            biaoxu = min * -1;
            max += biaoxu;
            min = 0;
        }
        return Math.floor(Math.random() * (max - min + 1) + min) - biaoxu; //0-10
    }
    //-----------------------------------------------------------------页面管理----------------------------------
    /**
    * 初始化页面跳转
    * @param {*} array 页面数组 例如：[this.zjm_ceng,this.load_Ceng]
    * @param {*} back 页面调整背景 this.backback
    */
    InitViewToView(array, back) {
        this.viewID = array;
        this.back_back = back;
    }
    /**
     * 打开页面 使用前请调用**InitViewToView**
     * @param {*} whereid 从何id
     * @param {*} toid 去哪儿id
     * @param {*} isclose 是否关闭当前页面
     * @param {*} openOrCloseBcke 关闭或者开启遮罩
     * @param {*} OverHander 完成回调
     */
    ViewToView(whereid, toid, isclose = true, openOrCloseBcke = false, OverHander = new Laya.Handler()) {
        if (isclose == true) {
            this.viewID[whereid].visible = false;
        }
        this.viewID[toid].visible = true;
        if (this.back_back) {
            if (openOrCloseBcke) {
                this.back_back.visible = true;
                this.back_back.on(Laya.Event.CLICK, this, function () { });
            } else {
                this.back_back.visible = false;
                this.back_back.offAll();
            }
        }
        OverHander.run();
    }
    //-----------------------------------------------------------------交互框提示框---------------------------
    /**
 * 微信自带提示框
 * @param {*} msg 提示信息 
 * @param {*} time 显示的时间  默认2000毫秒
 * @param {*} TFMask 是否开启按钮mask 防止点击穿透 默认false
 */
    TiShiKuang(msg, time = 2000, TFMask = false) {
        if (GameFIG_WX.instance.wx != undefined) {
            GameFIG_WX.instance.wx.showToast({
                title: msg,
                icon: 'none',
                duration: time,
                mask: TFMask
            })
        } else {
            alert(msg);
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
        if (GameFIG_WX.instance.wx) {
            GameFIG_WX.instance.wx.showModal({
                title: biaoti,
                content: msg,
                showCancel: true, //隐藏取消
                success(res) {
                    if (res.confirm) { //点了确定
                        if (success_Hander) {
                            success_Hander.run();
                        }

                    } else if (res.cancel) { //点了取消
                        if (cancel_Hander) {
                            cancel_Hander.run();
                        }
                    } else if (res.fail) { //其他错误
                        if (cancel_Hander) {
                            cancel_Hander.run();
                        }
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
     * 微信加载提示
     * @param {String} msg 提示文字
     * @param {Boolean} mask 是否开启遮罩，防止点击穿透
     */
    WxShowLoading(msg = "", mask = false) {
        if (GameFIG_WX.instance.wx) {
            GameFIG_WX.instance.wx.showLoading({
                title: msg,
                mask: mask
            })
        }



    }
    WxHideLoading() {
        if (GameFIG_WX.instance.wx) {
            GameFIG_WX.instance.wx.hideLoading();
        }
    }
    /**
     * 简单解密字符 加减乘除
     * @param {*} keys 钥匙 字符  
     */
    GameJieMI(key = "") {
        var keys = key.split("");
        var number = parseInt(keys[0]);
        var nowID = 0;
        for (var a = 1; a < keys.length; a++) {
            var key = parseInt(keys[a]);
            if (nowID == 0) {
                number += key;
            } else if (nowID == 1) {
                number -= key;
            }
            else if (nowID == 2) {
                number *= key;
            } else if (nowID == 3) {
                number /= key;
            }

            nowID++;
            if (nowID == 4) {
                nowID = 0;
            }
        }

    }
    GameGetMI(value) {

    }
    /**
     * 创建意见反馈按钮
     * @param {*} x 位置X 基于laya
     * @param {*} y 位置y 基于laya
     * @param {*} width 宽
     * @param {*} height 高
     * @param {*} EvenCall 点击回调
     */
    GameYiJian(x, y, width, height, EvenCall) {
        if (this.wx && this.compareVersion('2.1.2') >= 0) {
            var Info = this.GetSystermInfo();
            this.FeedBut = this.wx.createFeedbackButton({
                type: 'text',
                text: '',
                style: {
                    left: x * Info.screenWidth / Laya.stage.width,
                    top: y * Info.screenHeight / Laya.stage.height,
                    width: width * Info.screenWidth / Laya.stage.width,
                    height: height * Info.screenHeight / Laya.stage.height,
                    lineHeight: 40,
                    backgroundColor: '',
                    color: '',
                    textAlign: 'center',
                    fontSize: 16,
                    borderRadius: 4
                }
            })
            this.FeedBut.onTap(EvenCall);
            this.HideYiJian();
        }
    }
    /**显示意见反馈 */
    ShowYiJian() {
        if (this.FeedBut) {
            this.FeedBut.show();
        }
    }
    /**隐藏意见反馈 */
    HideYiJian() {
        if (this.FeedBut) {
            this.FeedBut.hide();
        }
    }
    /** 
   *  @param {*} oppid 游戏appid
   * @param {*} OverFun 回调
  */
    GoToGame(oppid = "", OverFun = new Laya.Handler()) {
        if (this.wx) {
            if (this.compareVersion("2.2.0") >= 0) {
                this.wx.navigateToMiniProgram({
                    appId: oppid,
                    path: "",
                    extraData: {
                        path: "MGG游戏"
                    },
                    success(res) {
                        OverFun.run();
                    },
                    fail() {
                        OverFun.run();
                    }
                })
            } else {
                OverFun.run();
            }
        } else {
            OverFun.run();
        }

    }


    //是否有刘海屏
    // 刘海手机里iphoneX系列刘海高度最高：60px，以最大值适配，若判断为刘海屏UI高度统一下调60px
    hasScreenFringe() {
        if (this.wx) {
            this.fringeScreenModels = ["iPhone XR", "iPhone XS Max",
                "iPhone X", "iPhone x", "vivo X21A", "ASUS Zenfone 5",
                "Ulefone T2 Pro", "Leagoo S9", "HUAWEI P20", "DooGee V",
                "OPPO R15", "LG G7", "SAMSUNG S9", "COR-AL00",
                "vivo Y83A", "LLD-AL20", "vivo Z1", "PACM00", "PAAM00"]
            if (!this.systemInfo) {
                this.systemInfo = this.wx.getSystemInfoSync();
            }

            if (this.systemInfo.model != null) {
                for (let i in this.fringeScreenModels) {
                    if (this.systemInfo.model.indexOf(this.fringeScreenModels[i]) > -1) {
                        // 是已知机型里的刘海手机
                        return true;
                    }
                }
            }

            // 屏幕宽高比大于2，基本上90%的手机可以确定是刘海屏，就算个别手机不是也按刘海屏处理
            // 竖屏游戏判断：
            if (this.systemInfo.windowHeight >= 800 || this.systemInfo.windowHeight / this.systemInfo.windowWidth > 2) {
                return true;
            }

        }

        // // 横屏游戏判断：
        // if (this.systemInfo.windowWidth >= 800 || this.systemInfo.windowWidth / this.systemInfo.windowHeight > 2) {
        //     return true;
        // }

        return false;
    }
}
/**位运算 */
GameFIG_WX.LayaWei = [

]