(function () {
  'use strict';

  //游戏默认所有参数 剥离至此类中 请优先设置此脚本的所有参数
  /**游戏配置类 */
  class GameFIG_Config {
      constructor() {
      }
  }
  /**游戏默认参数 otherSet为启动参数*/
  GameFIG_Config.GameConfig = {
      banbenID: "1.0.0",//版本ID,玩家数据需要重置的时候修改。
      GameName: "MMline",//不同游戏游戏名请勿重复---------
      InitFBL: { width: 750, height: 1334, isHoS: false },//屏幕分辨率标准
      otherSet: {//这部分可以通过网络设置启动参数

      }
  };
  /**所有广告配置 */
  GameFIG_Config.GameGGConfig = { //广告设置
      appid: "wxab9701e15ff4a175", //当前小游戏appid 无请设置""
      TPid: [ //图片bannerID合集 无请设置 []
       
      ],
      SPid: "", //激励视频ID 无请设置""
      ChaPin: "",//微信插屏 无请设置""
      YuanShen: "",//微信原生格子 无请设置""
      shareBFB: 85, //3秒分享成功率百分比
      Vivo: {//vivo特殊广告Id
          isSDK: false,//是否使用SDK 否则使用官方API
          Cp_ID: "8e5022c1e2d7104eebcb",
          App_ID: "105521591",
          App_key: "9d3b971c2dc5b85d7b25ed997324d396",
          ChaPin: "",//插屏
          CunTu: "",//原生纯图
          boxPortalAdID: "",//VIVO的9宫格广告
          HenFuID: ""//横幅
      }

  };
  /**服务器配置 */
  GameFIG_Config.ServerConfig = {//注意设置部分isOpen 功能开关
      isopen: false,//是否开启服务器
      isLogin: false,//是否登录成功 否则部分接口不能使用
      jwt: "",//请勿设置 自动设置 萌果果后台专用
      sessid: "",//请勿设置 自动设置 萌果果后台专用
      serverUrlPre: "", //服务器地址--萌果服务器专用
      GameInFo: { Type: "PUT", URL: "/gameInfo/", header: { 'content-type': 'application/x-www-form-urlencoded' } },//修改玩家信息--萌果服务器专用
      GetCode: { Type: "POST", URL: "/wx_login/", header: { 'content-type': 'application/json' } },//获得登录Code--萌果服务器专用
      GameInFo_Post: { Type: "POST", URL: "/gameInfo/", header: { 'content-type': 'application/json' } },//获得玩家数据--萌果服务器专用
      GetMain: { isOpen: false, Type: "GET", URL: "", header: "application/json" },//获取启动参数--萌果服务器专用
      GetVoice: { isOpen: false, Type: "GET", URL: "", header: "application/json" },//实时语音转换--萌果服务器专用
      Getadver: { isOpen: false, Type: "GET", URL: "", header: "application/json" },//获取格子广告--萌果服务器专用
      SendMoney: { isOpen: false, Type: "GET", URL: "/paymoney/", header: { 'content-type': 'application/json' } },//给微信用户发零钱
      SendDinYue: { isOpen: false, Type: "GET", URL: "/subscribe/", header: { 'content-type': 'application/json' } }//给微信用户发送订阅消息
  };
  /**云开发配置 */
  GameFIG_Config.GameYun = {
      isOpenYun: false,//是否打开云开发
      env: "qiu3d-2gireleh214b1e86", //这里填写云环境id
      login: "login", //获取真实ID的云函数名称
      GameHB: "FaHB",//发红包
      GetInitPlayer: "", //获取用户注册信息
      updatePlayer: "", //更新玩家至云端
      getjson: "", //获取云json
  };
  //是否开启自动保存数据否则每次清除数据 测试专用
  GameFIG_Config.player_Config_TFsave = true;//
  /**玩家数据*/
  GameFIG_Config.player_Config = {//注意请勿删除默认参数 关联GameFIG_WX脚本很多逻辑
      Name: "小可爱", //名字*******默认参数请勿删除,可修改
      HeadUrl: "head/head0.png",//头像*******默认参数请勿删除,可修改
      FirstTime: "", //首次注册时间//默认参数请勿删除,可修改
      openid: "", //唯一openid*******默认参数请勿删除,可修改
      lastTime: "", //上次退出时间*******默认参数请勿删除,可修改
      Sgin: "1.0.0", //注册版本号*******默认参数请勿删除,可修改
      DoNotSQ:false,//不许再弹授权
      //-------------------------------------
      YS: 0,// 钥匙
      TS: 10,// 提示
      GK: [0, 0, 0, 0, 0],//关卡剩余解锁数量
      GKLeve: [0, 0, 40, 60, 100],//需要多少钥匙解锁
      QD: { day: 0, LastDay: null },//签到
      
  };
  GameFIG_Config.isRandPlayer = false;//是否随机设置玩家信息 开启后自动设置 （名字 Openid） 有需求在GameFIG_WX设置initPlayer 
  /**音乐表可根据读json表替换 也可以手动添加 注意格式 */
  GameFIG_Config.MusicJson = [
      {
          name: "背景音乐",
          URL: "sound/bgm_main.mp3"
      }, //0
      {
          name: "按钮",
          URL: "sound/buttonClick.mp3"
      }, //1
      {
          name: "游戏链接",
          URL: "sound/game_click.mp3"
      }, //2
      {
          name: "游戏胜利1",
          URL: "sound/game_success.mp3"
      }, //3
    
      {
          name: "游戏胜利3",
          URL: "sound/lose.mp3"
      }, //4
  ];
  /**头像表 注意格式 */
  GameFIG_Config.HeadConfig = {
      IsSet: true,//是否自动设置头像 
      head: "head/head",//头部路径名字 比如完整路径head/head0.pnd 取head/head 后面方便获取 一定要按顺序走
      min: 0,//起点index  例如  head0.png
      max: 17,//终点index 例如  head17.png
      end: ".png"//后缀
  };
  /**玩家信息表 注意格式 */
  GameFIG_Config.NameConfig = {
      IsSet: false,//是否自动加载玩家信息表 开启后可直接调用GetRandNameByJosn
      url: "json/GameFIG_UserInfo.json",//路径
      Biao: [//isSet为false的情况下可以自定义依然可以调用GetRandNameByJosn  否则会被加载url 覆盖掉
          { "name": "小可爱", "age": 18, "city": "成都", "sex": "女", "ID": 0 },
          { "name": "王麻子", "age": 22, "city": "上海", "sex": "女", "ID": 1 },
          { "name": "蓝百合", "age": 23, "city": "广州", "sex": "女", "ID": 2 },
      ]
  };
  /**分享信息 */
  GameFIG_Config.shareInfo = [{
      img: "",
      title: "一起玩游戏"
  },
  {
      img: "",
      title: "全新游戏等你来玩"
  }
  ];
  /**盒子广告 */
  GameFIG_Config.BoxInfo = [
      { appid: "wxe0e6edde9a341680 ", logo: "head/01.png", name: "俄罗斯方块", path: "" },
  ];
  /**腾讯云小游戏联机引擎 */
  GameFIG_Config.MGOBEConfig = {
      IsOpen: false,
      gameid: "obg-kpe8h5e8",
      secretKey: "95d73f4f19d4caaab9d1050b0efd88194249150b",
      url: "kpe8h5e8.wxlagame.com"
  };
  /**微信 APi设置 */
  GameFIG_Config.WXset = {
      PHB: { open: false, key: "maxCore" },//是否开启自动更新微信排行榜 (游戏关闭时自动更新) key是指player_Config对应的字段名 关闭后也可手动开启刷新 GameFIG.SetWXphb
      WxOpenYu: {//微信好友排行榜 绘制  仅针对MG版 自动绘制对应数量
          OpenDraw: {//是否开启对应绘制
              head: true,
              name: true,
              Pm: true,
              Score: true,
              DrawYe: true
          },
          Pos: {//起始位置 左上角
              head: { x: 160, y: 150 },
              name: { x: 280, y: 204 },
              Pm: { x: 95, y: 204 },
              Score: { x: 450, y: 204 },
          },
          Size: {//绘制大小 
              head: 70,
              name: 40,
              Pm: 40,
              Score: 40,
          },
          Color: {//绘制颜色
              name: "#000000",
              Pm: "#000000",
              Score: "#000000",
          },
          MaxbyOne: 5,//一页最多绘制多少个
          DrawJianJu: 130,//绘制间距
          DrawMyCore: {//单独绘制我的排名
              open: false,//是否绘制
              Pos: {//起始位置
                  head: { x: 0, y: 0 },
                  name: { x: 0, y: 0 },
                  Pm: { x: 0, y: 0 },
                  Score: { x: 0, y: 0 },
              },
              Size: {//绘制大小 
                  head: 70,
                  name: 20,
                  Pm: 20,
                  Score: 20,
              },
              Color: {//绘制颜色
                  name: "#FFFFFF",
                  Pm: "#FFFFFF",
                  Score: "#FFFFFF",
              },
          },
          DrawYe: { x: 316, y: 830, scale: 40, color: "#FFFFF" },//需要绘制的页面
          ScoreText: "",
          DrawPic: {//绘制其他图片
              isDraw: true,//是否开启绘制
              Arr: [//位置信息+条件绘制
                  { x: 68, y: 152, scalex: 60, scaley: 75, url: "UIAll/phb/1.png", Need: { key: "nowYE", value: 0 } },
                  { x: 68, y: 282, scalex: 60, scaley: 75, url: "UIAll/phb/2.png", Need: { key: "nowYE", value: 0 } },
                  { x: 68, y: 412, scalex: 60, scaley: 75, url: "UIAll/phb/3.png", Need: { key: "nowYE", value: 0 } }
              ]
          }
      },
      WxOpenInit: {
          MaxbyOne: 5,//一页最多绘制多少个
      },//排行榜初始化
      WxDrawAny: {//自定义绘制
          DrawArr: [//需要绘制多少个，就填多少个
              {
                  OpenDraw: {//是否开启对应绘制
                      head: true,
                      name: false,
                      Pm: true,
                      Score: true,
                  },
                  Pos: {//起始位置
                      head: { x: 76, y: 187 },
                      name: { x: 0, y: 0, type: "center" },
                      Pm: { x: 111, y: 140, type: "center" },
                      Score: { x: 111, y: 315, type: "center" },
                  },
                  Size: {//绘制大小 
                      head: 70,
                      name: 20,
                      Pm: 30,
                      Score: 20,
                  },
                  Color: {//绘制颜色
                      name: "#FFFFFF",
                      Pm: "#00000",
                      Score: "#00000",
                  },
                  index: 0,//配合 indexType 绘制不同位置数据 排行榜会优先默认哦
                  indexType: "MR",//"MR"默认顺序 从大到小 0第一名 1第二名以此类推  "CY":超越顺序 0是玩家排名位置  1是即将超越的玩家 -1是已经超越的位置   例如数组arr[40个] 玩家在12名 1就是绘制11名 -1就是绘制13名
              },
              {
                  OpenDraw: {//是否开启对应绘制
                      head: true,
                      name: false,
                      Pm: true,
                      Score: true,
                  },
                  Pos: {//起始位置
                      head: { x: 268, y: 187 },
                      name: { x: 0, y: 0, type: "center" },
                      Pm: { x: 303, y: 140, type: "center" },
                      Score: { x: 303, y: 315, type: "center" },
                  },
                  Size: {//绘制大小 
                      head: 70,
                      name: 20,
                      Pm: 30,
                      Score: 20,
                  },
                  Color: {//绘制颜色
                      name: "#FFFFFF",
                      Pm: "#00000",
                      Score: "#00000",
                  },
                  index: 1,//配合 indexType 绘制不同位置数据 排行榜会优先默认哦
                  indexType: "MR",//"MR"默认顺序 从大到小 0第一名 1第二名以此类推  "CY":超越顺序 0是玩家排名位置  1是即将超越的玩家 -1是已经超越的位置   例如数组arr[40个] 玩家在12名 1就是绘制11名 -1就是绘制13名
              },
              {
                  OpenDraw: {//是否开启对应绘制
                      head: true,
                      name: false,
                      Pm: true,
                      Score: true,
                  },
                  Pos: {//起始位置
                      head: { x: 460, y: 187 },
                      name: { x: 0, y: 0, type: "center" },
                      Pm: { x: 303, y: 140, type: "center" },
                      Score: { x: 303, y: 315, type: "center" },
                  },
                  Size: {//绘制大小 
                      head: 70,
                      name: 20,
                      Pm: 30,
                      Score: 20,
                  },
                  Color: {//绘制颜色
                      name: "#FFFFFF",
                      Pm: "#00000",
                      Score: "#00000",
                  },
                  index: 2,//配合 indexType 绘制不同位置数据 排行榜会优先默认哦
                  indexType: "MR",//"MR"默认顺序 从大到小 0第一名 1第二名以此类推  "CY":超越顺序 0是玩家排名位置  1是即将超越的玩家 -1是已经超越的位置   例如数组arr[40个] 玩家在12名 1就是绘制11名 -1就是绘制13名
              },
          ],
          ISCY: false,//是否需要优先找到自己的位置 不用情况下false节省性能
      },//超越好友绘制设置
      /**开放域key */
      OpenKeyAll: {
          GetOnce: "GetRank",// 获取常规排行榜
          GetNext: "getnext",//获取下一页  配合常规排行榜
          GetLast: "getlast",//获取上一页  配合常规排行榜
          Clear: "clear",    //清除
          DrawAny: "DrawAny",  //绘制任意排行榜 例如 超越  前三名 等等
          Init: "InitDraw",   //初始化

      },
      DinYueID: {//订阅ID  
          QDLQ: {
              ID: "J3rtExCRt5oPS_9muBAxlHd4Lgk9AX7XBafs7qN6BRU", Time: { Day: 1, hours: 19, minutes: 40 }, data: {
                  "thing3": {
                      "value": "签到提醒"
                  },
                  "thing4": {
                      "value": "待领取"
                  }
              }
          }//签到
      }
  };

  /**游戏颜色滤镜 */
  class GameFIG_ColorFilter {
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

  // GameFIG 2.0.0版本 剥离版 不再集成至一个脚本 缩小文件大小
  //当前集成工具:
  //1声音管理  2数据管理  3服务器(云开发_服务器开发)管理  4平台(登录广告)管理  5按钮管理  6随机管理 7提示框交互框

  //使用说明
  //请勿new此对象，单例获取GameFIG_WX.Get()
  //请优先在首次进入游戏时  调用Main_Use再去调用内部工具 防止部分数据未加载. 自动运行登录-广告初始化-主动通过本地储存/网络更新玩家数据。
  //当前数据储存方案  优先本地储存为主覆盖服务器储存，当本地储存数据丢失再获取服务器数据 当本地储存ID不一致 重置本地和服务器数据 不再同时保存缓解服务器压力，但可能会出现 服务器同步不及时问题 注意上传时机
  /**游戏工具类_微信_MGG服务器版本  */
  class GameFIG_WX {
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
          };
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
          this.saveLocalData("banbenID:" + GameFIG_Config.GameConfig.GameName + GameFIG_Config.GameConfig.banbenID, GameFIG_Config.GameConfig.banbenID);
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
              GameFIG_Config.player_Config.HeadUrl = this.GetRandHead();
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
          console.log("进入");
          window.begintime = Math.floor(new Date().getTime() / 1000);//游戏开始时间
          var hander = undefined;
          if (GameFIG_WX.instance.wx) {//走服务器登录流程---登录微信--获取真实code---获取玩家注册信息--
              hander = Laya.Handler.create(this, function (success, data) {
                  if (data) {
                      GameFIG_Config.player_Config = data;
                  }
                  success.run();
              }, [LoginHander]);
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
              });
              GameFIG_WX.instance.wx.onHide(function (res) { //微信退出后台监听
                  console.log(res);
                  console.log("退出游戏");
                  if (GameFIG_Config.WXset.PHB.open) {
                      GameFIG_WX.instance.SetWXphb(GameFIG_Config.player_Config[GameFIG_Config.WXset.PHB.key]);
                  }
                  GameFIG_WX.instance.UpdatePlayerMsg(true);
                  GameFIG_WX.instance.PauseMusic();
              });
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
              });
          }
      }
      /**插屏展示 */
      InterShow() {
          // 在适合的场景显示插屏广告
          if (this.wx && this.interstitialAd) {
              this.interstitialAd.show().catch((err) => {
                  console.error("wx插屏错误", err);
              });
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
              });
              this.CustomAd.onError((err) => {
                  this.CustomAd = null;
                  this.CustomAdTrue = false;
              });
              this.CustomAd.onLoad(() => {
                  console.log("原生模板加载完成");
                  this.CustomAdTrue = true;
              });
          }
      }
      ShowYuanShen() {
          if (this.wx) {
              if (this.CustomAd && this.CustomAdTrue) {
                  this.CustomAd.show().then(() => {

                  }).catch((err) => {
                      GameFIG_WX.instance.CreatYuanShen();
                  });
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
                  });
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
              });
              this.banner.onResize(res => {
                  GameFIG_WX.instance.banner.style.top = GameFIG_WX.instance.wx.getSystemInfoSync().windowHeight - res.height - 20;
                  GameFIG_WX.instance.banner.style.left = 667 / 1334 * GameFIG_WX.instance.wx.getSystemInfoSync().windowWidth - res.width / 2;
              });
              this.banner.onLoad(res => {
                  console.log("banner广告加载成功");

                  if (GameFIG_WX.instance.showBanner == true) {
                      console.log("banner广告加载成功");
                      GameFIG_WX.instance.showBanner = false;
                      GameFIG_WX.instance.bannershow(GameFIG_WX.instance.showBannerTT.weizhiID, GameFIG_WX.instance.showBannerTT.pos);
                  }
              });
              this.banner.onError(err => { });

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
              });

              this.redio.onError(err => {
                  GameFIG_WX.instance.readtf = false;
                  GameFIG_WX.instance.TVorShare = false;
              });
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
              });
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
              });
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
              });
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
              });
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
              };
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
              });
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
          var updateManager = GameFIG_WX.instance.wx.getUpdateManager();
          updateManager.onCheckForUpdate(function (res) {
              // 请求完新版本信息的回调
              console.log("版本更新检测");
              console.log(res);

          });
          updateManager.onUpdateReady(function () {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              GameFIG_WX.instance.TiShiKuang("有新更新");
              updateManager.applyUpdate();
          });

          updateManager.onUpdateFailed(function () {
              // 新版本下载失败

              GameFIG_WX.instance.TiShiKuang("更新失败");
          });


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
                      });
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
          };
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
              });
          }

      }
      TFshouquan(OkFUN = function () { }, failFUN = function () { }) {
          if (GameFIG_WX.instance.wx) {
              GameFIG_WX.instance.wx.getSetting({ //判断是否授权
                  success: OkFUN,
                  fail: failFUN
              });
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
                  });
              } else {
                  callback.runWith({ msg: "未授权" });
                  console.log("未授权");
              }
          }, function () {
              callback.runWith({});
          });
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
                              console.log("消息订阅成功", res);
                              GameFIG_WX.instance.SendDinYue(tmplMsgs);
                              complete.runWith(true);
                          } else {
                              console.log("消息订阅失败");
                              complete.runWith(false);
                          }

                      },
                      fail(res) {
                          console.log("消息订阅失败", res);
                          complete.runWith(false);
                      }
                  });
              }, [tmplMsg]));

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
                  console.log("Error404");
                  GameFIG_WX.instance.TiShiKuang("网络错误_getcode");
                  GameFIG_WX.instance.LoadSuccess_Fun.run();
                  return
              }
              var resdate = res.data;
              GameFIG_Config.player_Config.openid = resdate.user.openid;
              GameFIG_Config.ServerConfig.sessid = resdate.user.session_key;
              GameFIG_Config.ServerConfig.jwt = "Bearer " + resdate.jwt;
              console.log('获得openiD:' + resdate.user.openid);
              if (GameFIG_WX.instance.PlayerSgin) {//本地缓存有不用注册
                  if (GameFIG_WX.instance.LoadSuccess_Fun) {
                      GameFIG_WX.instance.LoadSuccess_Fun.run();
                  }
                  GameFIG_WX.instance.Severlogin = true;
                  GameFIG_WX.instance.UpdatePlayerMsg(true);
              } else {
                  GameFIG_WX.instance.getplayer(); //注册用户信息
              }
              console.log("获取真实code");
          }, function (res) {
              GameFIG_WX.instance.TiShiKuang("网络错误_getcode");
              GameFIG_WX.instance.LoadSuccess_Fun.run();
          });
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
          });



      }
      /**获取游戏网络启动配置信息 */
      getServerConfig(InitHander) {
          var date = { name: GameFIG_Config.GameConfig.GameName };
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
          });

      }
      /**
       * 获取游戏格子
       * @param {*} OverHander 完成回调
       */
      getServerGezhi(OverHander) {
          var date = { name: GameFIG_Config.GameConfig.GameName };
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
          });

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
              });

              GameFIG_WX.instance.wx.onShareAppMessage(() => ({
                  title: GameFIG_Config.shareInfo[fxrand].title,
                  imageUrl: GameFIG_Config.shareInfo[fxrand].img, // 图片 URL Laya.URL.basePath + 'gamemain/share.png'
                  success: function (res) { },
                  fail: function (res) { }
              }));

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
              });
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
              but.on(Laya.Event.MOUSE_DOWN, this, this.ButAdd, [but, FunHander]);
          }
          but.off(Laya.Event.CLICK, this, this.ButRunFun);
          but.off(Laya.Event.MOUSE_DOWN, this, this.butDownFun);
          but.on(Laya.Event.MOUSE_DOWN, this, this.butDownFun, [keyMusicID]);
          but.on(Laya.Event.CLICK, this, this.ButRunFun, [FunHander]);
          if (color) {
              but.off(Laya.Event.MOUSE_DOWN, this, this.AddColorBut);
              but.on(Laya.Event.MOUSE_DOWN, this, this.AddColorBut, [but, color]);
          }
      }
      ButRunFun(hander) {
          hander.run();
      }
      AddColorBut(but, color) {
          GameFIG_ColorFilter.SetColorByColorMax(but, 20, 0, 0, 0, color);
          but.on(Laya.Event.MOUSE_UP, this, this.RemoveColor, [but]);
          but.on(Laya.Event.MOUSE_OUT, this, this.RemoveColor, [but]);
      }
      RemoveColor(but) {
          but.filters = [];
          but.off(Laya.Event.MOUSE_UP, this, this.RemoveColor, [but]);
          but.off(Laya.Event.MOUSE_OUT, this, this.RemoveColor, [but]);
      }
      ButAdd(but, FunHander) {
          this.TweenScalSim(but);
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
                      this.innerAudioContext.destroy();
                  }
                  this.innerAudioContext = this.wx.createInnerAudioContext({ useWebAudioImplement: tfShort });
                  this.innerAudioContext.src = url;
                  this.innerAudioContext.play();
                  this.innerAudioContext.onPlay(() => {
                      console.log('开始播放');
                      OkHander.runWith(this.innerAudioContext.duration);

                  });
                  this.innerAudioContext.onEnded(() => {
                      console.log('播放结束');
                      overHander.run();
                      this.innerAudioContext = null;
                      // this.innerAudioContext.destroy();
                  });
                  this.innerAudioContext.onError((res) => {
                      console.log(res.errMsg);
                      console.log(res.errCode);
                      console.log("音频加载错误");
                      this.innerAudioContext = null;
                  });
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
                      });
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
              });
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
                      const tempFilePaths = res.tempFilePaths;
                      ChooseOverHander.runWith(res.tempFilePaths);
                  },
                  fail(res) {
                      console.log(res);
                      GameFIG_WX.instance.TiShiKuang("获取本机图片失败");
                  }
              });
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
              });

              GameFIG_WX.instance.WxShowLoading("上传准备", true);
              uploadTask.onProgressUpdate((res) => {
                  UpdateHander.runWith(res);
                  console.log('上传进度', res.progress);
                  console.log('已经上传的数据长度', res.totalBytesSent);
                  console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend);
              });
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
              };
              var sever = GameFIG_Config.ServerConfig.GetVoice;
              this.Http_SendSever(data, sever.URL, sever.Type, sever.header, this, function (res) {
                  // console.log("音频返回")
                  // console.log(res)

                  // console.log("音频获取成功", res);
                  GameFIG_WX.instance.VoiceURL[name2] = res.voice_url;
                  OkHander.runWith(res.voice_url);
              }, function (data) {
                  OkHander.runWith("");
              });
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
              };
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
              });
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
              });
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
              });
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
              });
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
                  });
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
                  "vivo Y83A", "LLD-AL20", "vivo Z1", "PACM00", "PAAM00"];
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

  ];

  var windowUse_this;
  //使用本脚本请使用WindowUse.Get() 方法，切勿单独new 
  //本脚本控制所有场景需要预先加载的资源,本游戏资源不多在Loading.js全部预加载完毕~ 请合理使用，例如多个场景资源过多，切换时注意优先清理关闭场景资源，再缓存新场景资源。
  //本脚本仅作为跨脚本共用脚本，并非主逻辑脚本！主逻辑请挂置主场景对应Runtime！列如：家里和学校都可以使用的新手引导
  //本脚本所有数据仅临时储存，与GameGIF逻辑不同，此脚本为场景逻辑数据交互，GameGIF更多是玩家数据和其他对外接口和一些常用函数！
  //综上所述 此脚本不能“公用”仅提供逻辑参考，不要与GameGIF 同时拷贝到其他项目使用！！！！！！！！
  /**公共变量函数储存脚本 */
  class windowUse extends Laya.Script {

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

          ];
          this.QDconfig = [
              { key: ["TS"], much: 3 },
              { key: ["YS"], much: 2 },
              { key: ["YS"], much: 3 },
              { key: ["TS"], much: 5 },
              { key: ["YS"], much: 5 },
              { key: ["YS"], much: 10 },
              { key: ["TS", "YS"], much: 10 }
          ];
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

  window.FilterOne = { showXu: null };//仅一个背景虚化遮罩否则严重闪屏
  //主场景父类
  class GameAll extends Laya.Scene {
      constructor() {
          super();
          this.viewAll = {
              Main: "Scene/GameMain.scene",
              QD: "Scene/GameQD.scene",
              Win: "Scene/GameWin.scene",
              GetYs:"Scene/GameYSGet.scene"
          };
          this.GameFIG = GameFIG_WX.Get();
          this.GameFIG_Config = GameFIG_Config;
          this.windowUser = windowUse.Get();
      }
      Closed() {
         
      }
      onClosed() {
          this.destroy();
          this.Closed();
      }
      /**
       * 打开其他场景 
       * @param {String} key 地址
       * @param {*} other 传递参数 {}  EndHaner 结束回调  OpenSetHaner 打开设置完成回调
       * @param {Boolean} TFopenFilter 是否打开背景虚化 
       * @param {Boolean} TFhide 是否隐藏当前界面
       * @param {Boolean} TFclose 是否关闭其他场景 默认false
       * @param {Laya.Handler} LoadOverhander 加载完成回调
       * @param {Laya.Handler} Loadhander 加载进度回调
       * @param {Boolean} ShowTishi 是否显示提示正在加载其他场景 配合other.OpenSetHaner使用 必须同时为true
       */
      OpenView(key = "", other = {}, TFopenFilter = true, TFhide = false, TFclose = false, LoadOverhander, Loadhander, ShowTishi = false) {
          if (other.OpenSetHaner && ShowTishi) {//当前界面还没关闭
              this.windowUser.GameDiaoxianFun_Show("正在加载其他场景");
              Laya.stage.on(Laya.Event.CLICK, this, this.Clickoff);
          }
          //开启整体背景虚化
          if (TFopenFilter) {
              // this.getChildAt(0).srollRect = new Laya.Rectangle( this.getChildAt(0).x * -1, 0, Laya.stage.width, Laya.stage.height)
              this.OpenFilter();
          }
          if (TFhide) {
              this.visible = false;
          }

          //--打开场景 但不关闭当前场景
          Laya.Scene.open(key, TFclose, other, LoadOverhander, Loadhander);

      }
      Show() {
          this.visible = true;
      }
      /**打开背景遮罩 */
      OpenFilter(fiter = this) {
          var blurFilter = new Laya.BlurFilter();
          blurFilter.strength = 10;
          fiter.filters = [blurFilter];
          this.CloseFiter = fiter;
          //  this.visible = false;
          /**********************开启后全局一个虚化，防止多个虚化屏幕出现严重抖动
          // if (window.FilterOne.showXu != null) {
          //     this.LastXuHua = window.FilterOne.showXu;
          //     window.FilterOne.showXu.filters = null;
          // }
          // //注意 打开新虚化背景后会记录关闭之前的虚化背景是那个，当关闭新打开的虚化背景时 就会打开对应关闭的虚化。切勿乱跳
          // window.FilterOne[this["$_GID"].toString()] = this;
          // window.FilterOne.showXu = this;
           */
      }

      HideFilter() {

          if (this.CloseFiter != this) {
              this.visible = true;
              this.CloseFiter.destroy();
          } else {
              this.filters = null;
          }
          /**********************开启后全局一个虚化 
          // delete window.FilterOne[this["$_GID"].toString()];
          // if (this.LastXuHua != undefined) {
          //     var blurFilter = new Laya.BlurFilter();
          //     blurFilter.strength = 10;
          //     this.LastXuHua.filters = [blurFilter];
          //     this.LastXuHua = undefined;
          //     window.FilterOne.showXu = this.LastXuHua;
          // } else {
          //     window.FilterOne.showXu = null;
          // }
          */
      }
      Clickoff() {
          console.log("阻止加载点击");
      }
      /**显示此场景并执行上个场景的回调----防止直接打开页面未及时更新 仅限在不关闭当前场景的情况下 */
      OpenOver() {
          if (this.OpenDmsg.OpenSetHaner) {
              this.windowUser.GameDiaoxianFun_hide();
              Laya.stage.off(Laya.Event.CLICK, this, this.Clickoff);
              this.visible = true;
              this.OpenDmsg.OpenSetHaner.run();
              this.OpenDmsg.OpenSetHaner = undefined;
          }

      }
  }

  /**CocosApi*/
  class Cocos_Api_MG {//萌果专用
      constructor() {
      }
      /**
       * 角度转弧度
       * @param {*} angle 角度
       */
      static degreesToRadians(angle) {
          return angle * Cocos_Api_MG.RAD;
      };
      /**
       * 向量旋转
       * @param {*} vecotr2 向量{x:0,y:0} 
       * @param {*} radians 弧度
       */
      static rotateSelf_v2(vecotr2 = { x: 0, y: 0 }, radians = 0) {
          var sin = Math.sin(radians);
          var cos = Math.cos(radians);
          var x = vecotr2.x;
          vecotr2.x = cos * x - sin * vecotr2.y;
          vecotr2.y = sin * x + cos * vecotr2.y;
          return vecotr2;
      }
      /**
       * 获取目标物体对应当前物体的角度值
       * @param {*} start {x:当前物体x,y：当前物体y}
       * @param {*} end  {x:目标物体x，y:目标物体y}
       */
      static GetRotationByTwoNode(start, end) {

          var diff_x = end.x - start.x;
          var diff_y = end.y - start.y;
          if (diff_x == 0 && diff_y == 0) {
              return 0;
          }
          var jd = 360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);

          if (diff_x >= 0 && diff_y <= 0) {
              return jd + 360;
          } else if (diff_x >= 0 && diff_y >= 0) {
              return jd
          } else if (diff_x <= 0 && diff_y >= 0) {
              return jd + 180
          } else if (diff_x <= 0 && diff_y <= 0) {
              return jd + 180
          }

      }
      /**
       * 获取目标物体对应当前物体的距离
       * @param {*} start {x:当前物体x,y：当前物体y}
       * @param {*} end  {x:目标物体x，y:目标物体y}
       */
      static GetDistanceByTwoNode(start, end) {
          return Math.sqrt((start.x - end.x) * (start.x - end.x) + (start.y - end.y) * (start.y - end.y));
      }
      /**
       * 判断三点是否共线 /判断q点是否在P1 P2之间 尽量整数
       * @param {*} Pi {x:0,y:0} 
       * @param {*} Pj {x:0,y:0} 
       * @param {*} Q {x:0,y:0} 
       */
      static onSegment(Pi, Pj, Q) {
          if ((Q.x == Pi.x && Q.y == Pi.y) || (Q.x == Pj.x && Q.y == Pj.y) || (Pj.x == Pi.x && Pj.y == Pi.y)) {
              return false
          }
          if ((Q.x - Pi.x) * (Pj.y - Pi.y) == (Pj.x - Pi.x) * (Q.y - Pi.y)  //叉乘 
              //保证Q点坐标在pi,pj之间 
              && Cocos_Api_MG.min(Pi.x, Pj.x) <= Q.x && Q.x <= Cocos_Api_MG.max(Pi.x, Pj.x)
              && Cocos_Api_MG.min(Pi.y, Pj.y) <= Q.y && Q.y <= Cocos_Api_MG.max(Pi.y, Pj.y))
              return true;
          else
              return false;
      }
      /**找出两个数中的最小值 */
      static min(value1, value2) {
          if (value1 > value2) {
              return value2
          } else {
              return value1
          }
      }
      /**找出两个数中的最大值 */
      static max(value1, value2) {
          if (value1 > value2) {
              return value1
          } else {
              return value2
          }
      }
      /**数组hash去重 */
      static uniArray(arr) {
          var result = [], hash = {};
          for (var i = 0, elem; (elem = arr[i]) != null; i++) {
              if (!hash[elem]) {
                  result.push(elem);
                  hash[elem] = true;
              } else {
                  console.log(elem);
              }
          }
          return result;
      }
  }
  Cocos_Api_MG.RAD = Math.PI / 180;
  Cocos_Api_MG.DEG = 180 / Math.PI;

  /**
   * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
   * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
   * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
   */
  class GameUI extends GameAll {
      constructor() {
          super();
          this.GameSetOpen = true;//是否打开游戏设置
          this.AllQuan = [];//绘制圈圈
      }

      onEnable() {//启用函数
          // if (!this.GameFIG_Config.player_Config.DoNotSQ) {
          //     this.GameFIG.ShouQuan();
          // }
          // let data = Laya.LocalStorage.getItem("GameYS_2") ? JSON.parse(Laya.LocalStorage.getItem("GameYS_2")) : null;
          // if (!data) {
          //     Laya.Scene.open("YinShi.scene", false);
          // }
          this.GameFIG.PlayMusic(0);
          this.UpdateZJM();//更新主界面
          this.UIMMP();//自动调整UI位置
          this.AddBut();//初始化按钮
          this.SetGK();//设置关卡
          this.initGKlist();//初始化关卡列表
          this.SetGamelist();//初始化游戏列表
          this.GameFIG.InitViewToView([this.view_Begin, this.view_GK, this.view_Level, this.view_Game]);
          this.TFQianDao();//打开签到
      }
      TFQianDao() {
          if (this.GameFIG_Config.player_Config.QD.day < 7 && !this.GameFIG.TFdate(new Date(), new Date(this.GameFIG_Config.player_Config.QD.LastDay))) {
              this.OpenView(this.viewAll.QD, { mythis: this }, false, false, false);//游戏签到
          }
      }
      AddBut() {//添加按钮监听

          this.GameFIG.butTween(this.AddDesk, Laya.Handler.create(this.GameFIG, this.GameFIG.AddDesktop, [], false), 1, true, "#000000");//游戏开始
          this.GameFIG.butTween(this.Game_Begin, Laya.Handler.create(this.GameFIG, this.GameFIG.ViewToView, [0, 1, true, false], false), 1, true, "#000000");//游戏开始
          this.GameFIG.butTween(this.Game_QD, Laya.Handler.create(this, this.OpenView, [this.viewAll.QD, { mythis: this }, false, false, false], false), 1, true, "#000000");//游戏签到
          this.GameFIG.butTween(this.Game_Share, Laya.Handler.create(this.GameFIG, this.GameFIG.FXget, [], false), 1, true, "#000000");//游戏分享
          this.GameFIG.butTween(this.Game_Mc2, Laya.Handler.create(this, this.SetMC, [], false), 1, true, "#000000");//音乐开关
          this.GameFIG.butTween(this.Game_Mc, Laya.Handler.create(this, this.SetMC, [], false), 1, true, "#000000");//音乐开关
          this.GameFIG.butTween(this.Reture_GK, Laya.Handler.create(this.GameFIG, this.GameFIG.ViewToView, [1, 0, true], false), 1, true, "#000000");//返回
          this.GameFIG.butTween(this.Level_close, Laya.Handler.create(this.GameFIG, this.GameFIG.ViewToView, [2, 1, true], false), 1, true, "#000000");//返回
          this.GameFIG.butTween(this.Level_right, Laya.Handler.create(this, this.NextLastGK, [-1], false), 1, true, "#000000");//下一页
          this.GameFIG.butTween(this.Level_left, Laya.Handler.create(this, this.NextLastGK, [1], false), 1, true, "#000000");//上一页
          this.GameFIG.butTween(this.Game_Reture, Laya.Handler.create(this, this.GameReture, [], false), 1, true, "#000000");//游戏返回
          this.GameFIG.butTween(this.Game_backer, Laya.Handler.create(this, this.GameComeback, [], false), 1, true, "#000000");//游戏退一步
          this.GameFIG.butTween(this.Game_Reset, Laya.Handler.create(this, this.GameReset, [], false), 1, true, "#000000");//游戏重开
          // this.GameFIG.butTween(this.yinshi, Laya.Handler.create(this, () => {
          //     Laya.Scene.open("YinShi.scene", false, [true]);
          // }, [], false), 1, true, "#000000");//游戏隐私

          this.GameFIG.butTween(this.GameTishi, Laya.Handler.create(this, () => {
              this.GameFIG.GG_all(true, Laya.Handler.create(this, function () {
                  this.MoveFigerAni();
              }));
          }, [], false), 1, true, "#000000");


          if (this.GameSetOpen) {//打开游戏关卡编辑器
              var LateDate = this.GameFIG.fetchLocalData("MMdraw_Set" + this.GameFIG_Config.GameConfig.banbenID);
              if (LateDate) {
                  this.windowUser.MapConfig = LateDate;
              }
              this.Set_GK_MaxId = 0;
              this.Set_GK_MinId = 0;
              this.GameFIG.butTween(this.GameBianJi, Laya.Handler.create(this, this.GameGoBian, [], false), 1, true, "#000000");//主界面编辑按钮
              this.GameFIG.butTween(this.Set_CaiDan, Laya.Handler.create(this, this.OpenClose_Set, [], false), 1, true, "#000000");//编辑菜单栏
              this.GameFIG.butTween(this.Set_GKbegin1, Laya.Handler.create(this, this.Set_GoGK, [true], false), 1, true, "#000000");//编辑关卡大关跳转
              this.GameFIG.butTween(this.Set_GKbegin2, Laya.Handler.create(this, this.Set_GoGK, [false], false), 1, true, "#000000");//编辑关卡小关跳转
              this.GameFIG.butTween(this.Set_Add, Laya.Handler.create(this, this.AddGk, [false], false), 1, true, "#000000");//编辑关卡 新增
              this.GameFIG.butTween(this.Set_recover, Laya.Handler.create(this, this.RecoverGK, [false], false), 1, true, "#000000");//编辑关卡 删除
              this.GameFIG.butTween(this.Set_Save, Laya.Handler.create(this, this.SaveGK, [false], false), 1, true, "#000000");//编辑关卡 保存
              this.GameFIG.butTween(this.Set_Out, Laya.Handler.create(this, this.OUTGkToJson, [false], false), 1, true, "#000000");//编辑关卡 导出
              this.GameBianJi.visible = true;
          }

      }
      /**游戏返回 */
      GameReture() {
          this.GameFIG.ViewToView(3, 1, true, false);
          this.Set_UI.visible = false;
          this.GameClear();
      }
      /**设置关卡选择 */
      SetGK() {
          for (var a = 0; a < 5; a++) {
              this["GK" + a].getChildAt(1).getChildAt(0).value = this.GameFIG_Config.player_Config.GKLeve[a];
              if (this.GameFIG_Config.player_Config.GKLeve[a] == 0) {
                  this["GK" + a].getChildAt(0).visible = true;
                  this["GK" + a].getChildAt(1).visible = false;
                  this.GameFIG.butTween(this["GK" + a], Laya.Handler.create(this.GameFIG, this.GameFIG.ViewToView, [1, 2, true, false, Laya.Handler.create(this, this.SetGKlist, [a], false)], false), 1, true, "#000000");
              } else {
                  this.GameFIG.butTween(this["GK" + a], Laya.Handler.create(this, this.GetGK, [a], false), 1, true, "#000000");
              }
          }
      }
      /**
       * 解锁关卡
       * @param {*} id 
       */
      GetGK(id) {
          if (this.GameFIG_Config.player_Config.YS >= this.GameFIG_Config.player_Config.GKLeve[id]) {
              this.GameFIG_Config.player_Config.YS -= this.GameFIG_Config.player_Config.GKLeve[id];
              this.GameFIG_Config.player_Config.GKLeve[id] = 0;
              this.GameFIG.UpdatePlayerMsg();
              this.UpdateZJM();
              this.SetGK();
          } else {
              this.OpenView(this.viewAll.GetYs, { Mythis: this }, false, false, false);
          }
      }
      /**初始化关卡列表 */
      initGKlist() {
          this.NowGKYe = 0;
          this.GKlist.renderHandler = new Laya.Handler(this, this.updateList);
          this.GKlist.array = this.windowUser.MapConfig[0];

      }
      /**更新关卡列表 */
      updateList(cell, index) {
          var nowGk = index + this.NowGKYe * 16;
          cell.getChildAt(0).value = nowGk + 1;
          if (nowGk <= this.GameFIG_Config.player_Config.GK[this.NowGKid]) {
              cell.disabled = false;
              this.GameFIG.butTween(cell, Laya.Handler.create(this, this.GamePlay, [nowGk], false), 1, true, "#000000");
          } else {
              cell.disabled = true;
          }
          // cell.offAll();

      }
      /**
       * 设置游戏界面
       * @param {*} big 大关ID
       * @param {*} small 小关ID
       */
      SetGamelist(big = 0, small = 0) {
          var dataLate = this.windowUser.MapConfig[big][small];
          if (!this.Game_List.renderHandler) {
              this.Game_List.renderHandler = new Laya.Handler(this, this.UpdateGKList);
          }
          var data = [];
          for (var a = 0; a < 110; a++) {
              data.push(0);
          }
          for (var a = 0; a < dataLate.length; a++) {
              data[dataLate[a]] = 1;

          }
          this.Game_List.array = data;
          this.Game_List.refresh();
          this.RefreshLine(dataLate);
      }
      /**更新游戏界面 */
      UpdateGKList(cell, index) {
          if (this.GameSetOpen) {//编辑模式
              cell.getChildAt(0).value = index;
              cell.getChildAt(0).visible = true;
              if (cell.dataSource == 1) {
                  cell.texture = "editor/edit_selected2.png";
              } else {
                  cell.texture = "editor/edit_selected.png";
              }
              this.GameFIG.butTween(cell, Laya.Handler.create(this, this.SetGKMsg, [cell, index], false), 1, true, "#000000");//编辑关卡 导出
          } else {
              cell.getChildAt(0).visible = false;
          }
      }


      /**游戏胜利 */
      GameWin() {
          this.Game_backer.disabled = true;
          this.Game_Reset.disabled = true;
          this.GameTishi.disabled = true;
          this.Game_Reture.disabled = true;
          this.GameFIG.PlaySound(3);
          console.log("游戏胜利");
          for (var a = 0; a < this.AllQuan.length; a++) {
              this.AllQuan[a].Ani.play(0, true);
          }
          Laya.Tween.to(this.Game_back, { scaleX: 1.2, scaleY: 1.2 }, 1500, Laya.Ease.linearIn, Laya.Handler.create(this, () => {
              Laya.Tween.to(this.Game_back, { alpha: 0 }, 800, Laya.Ease.linearIn, Laya.Handler.create(this, () => {
                  //跳转胜利界面
                  if (this.GameFIG_Config.player_Config.GK[this.NowGKid] <= this.NowGameID && this.GameFIG_Config.player_Config.GK[this.NowGKid] < this.windowUser.MapConfig[this.NowGKid].length - 1) {//看看玩完了 或者 是不是玩的最新未解锁
                      this.GameFIG_Config.player_Config.GK[this.NowGKid]++;
                  }
                  this.GameFIG.UpdatePlayerMsg();
                  this.GameClear();
                  this.OpenView(this.viewAll.Win, {
                      GameUI_: this, EndHaner: Laya.Handler.create(this, () => {
                          this.HideFilter();
                      }
                      )
                  }, true, false, false);
              }));
          }));

      }
      GameNext() {//下一关
          var AllGK = 0;
          for (var a = 0; a < this.GameFIG_Config.player_Config.GK; a++) {
              AllGK += this.GameFIG_Config.player_Config.GK[a];
          }
          this.GameFIG.SetWXphb(AllGK);
          this.NowGameID++;
          if (this.NowGameID >= this.windowUser.MapConfig[this.NowGKid].length) {//否则重头玩
              this.NowGameID = 0;
          }
          this.GamePlay(this.NowGameID);
      }
      GameClear() {//游戏清理 防止逻辑错误  过关返回 使用
          this.MoveFigerClear();
          Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.ClearLineMove);
          Laya.stage.off(Laya.Event.MOUSE_UP, this, this.ClearLineMove);
          Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.QuanMoveGame);
          for (var a = 0; a < this.AllQuan.length; a++) {
              this.AllQuan[a].Ani.gotoAndStop(-1);//停到默认帧动画
          }
      }
      /**
       * 手指提示
       * @param {Laya.Handler} OverHander 结束回调
       */
      MoveFigerAni(OverHander = new Laya.Handler()) {
          this.GameTishi.visible = false;
          this.TweenFigerAll = this.windowUser.MapConfig[this.NowGKid][this.NowGameID].slice();
          this.TweenFigerAll = this.TweenFigerAll.concat(this.windowUser.MapConfig[this.NowGKid][this.NowGameID]);
          var point = this.Game_List.cells[this.TweenFigerAll[0]];
          this.MoveFiger.pos(point.x + 32, point.y + 38);
          this.MoveFiger.visible = true;
          this.MoveFigerTween(OverHander);
      }
      MoveFigerTween(overHander = new Laya.Handler()) {//手指动画执行
          this.TweenFigerAll.splice(0, 1);
          if (this.TweenFigerAll.length == 0) {
              this.GameTishi.visible = true;
              overHander.run();
              this.MoveFiger.visible = false;
              this.FigerTween = null;
          } else {
              var point = this.Game_List.cells[this.TweenFigerAll[0]];
              var Juli = Cocos_Api_MG.GetDistanceByTwoNode({ x: point.x + 32, y: point.y + 38 }, this.MoveFiger);
              var speed = 0.35;
              var time = Math.floor(Juli / speed);
              this.FigerTween = Laya.Tween.to(this.MoveFiger, { x: point.x + 32, y: point.y + 38 }, time, Laya.Ease.linearIn, Laya.Handler.create(this, this.MoveFigerTween, [overHander]));
          }
      }
      MoveFigerClear() {//手指动画清理 
          if (this.FigerTween) {
              this.GameTishi.visible = true;
              this.MoveFiger.visible = false;
              this.FigerTween.clear();
              this.FigerTween = null;
              this.TweenFigerAll = [];
          }
      }
      ClearLineMove() {//清理移动线
          this.DrawMoveLine.graphics.clear();

      }
      //是否链接成功
      TfConte(Circle) {
          if (this.LastQuan) {//如果上个圈在工作 则链接上个圈
              if (!this.GameConte(this.LastQuan, Circle)) {//无法链接则跳过 否则更新工作圈
                  return false;
              }
              this.GameFIG.PlaySound(2);
              this.ClearLineMove();
              Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.ClearLineMove);
              Laya.stage.off(Laya.Event.MOUSE_UP, this, this.ClearLineMove);
              Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.QuanMoveGame);
              this.LastQuan.Ani.gotoAndStop(-1);//停到默认帧动画
              this.AllContLine.push({ A: this.LastQuan, B: Circle });
              if (this.GameFIG_Config.player_Config.TS > 0 && this.AllContLine.length > 0) {//是否开启按钮
                  this.Game_backer.disabled = false;
              } else {
                  this.Game_backer.disabled = true;
              }
              this.AllContMie++;

              var point1 = this.Game_List.cells[this.LastQuan.SQID];
              var point2 = this.Game_List.cells[Circle.SQID];
              //  this.DrawConteLine.graphics.drawLine(point1.x + 32, point1.y + 38, point2.x + 32, point2.y + 38, "#37c8ec", 24);
              this.DrawLineFun(point1, point2);
              if (this.AllContMie == this.NeedContMie) {
                  this.GameWin();
                  return;
              }
          }
          Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.ClearLineMove);
          Laya.stage.on(Laya.Event.MOUSE_UP, this, this.ClearLineMove);
          Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.QuanMoveGame, [Circle]);
          Circle.Ani.play(0, true);
          this.LastQuan = Circle;
      }
      /**
      * 更新链接线 生成链接点
      * @param {*} dataLate 绘制数据
      */
      RefreshLine(dataLate) {
          this.DrawLine.graphics.clear();
          this.ClearLineMove();

          // this.DrawConteLine.graphics.clear();
          while (this.DrawConteLine.numChildren != 0) {
              this.RevcoverLine(this.DrawConteLine.getChildAt(0));
          }
          for (var a = 0; a < this.AllQuan.length; a++) {
              this.AllQuan[a].Ani.gotoAndStop(-1);//停到默认帧动画
              Laya.Pool.recover("Quan", this.AllQuan[a]);
              this.AllQuan[a].removeSelf();
              this.AllQuan[a].Ani.removeSelf();
          }
          this.LastQuan = null;//上个选中圈圈
          this.AllQuan = [];
          this.AllContLine = [];//已经链接线段集合
          this.AllContMie = 0;//已经链接线段数量 判断成功
          this.NeedContMie = dataLate.length - 1;//成功条件
          if (dataLate.length > 1) {
              for (var a = dataLate.length - 1; a >= 0; a--) {//绘制白条
                  var point1 = this.Game_List.cells[dataLate[a]];
                  if (a < dataLate.length - 1) {
                      var point2 = this.Game_List.cells[dataLate[a + 1]];
                      this.DrawLine.graphics.drawLine(point1.x + 32, point1.y + 38, point2.x + 32, point2.y + 38, "#bba50b", 24);
                  }
              }
              var dataLates = Cocos_Api_MG.uniArray(dataLate);
              for (var a = 0; a < dataLates.length; a++) {//绘制原点
                  var point1 = this.Game_List.cells[dataLates[a]];
                  var Circle1 = this.Game_back.addChild(Laya.Pool.getItemByCreateFun("Quan", this.PoolCircle, this));
                  this.Game_back.addChild(Circle1.Ani);
                  Circle1.SQID = dataLates[a];
                  Circle1.DataID = a;
                  Circle1.pos(point1.x + 32, point1.y + 38, true);
                  Circle1.Ani.pos(Circle1.x, Circle1.y, true);
                  Circle1.zOrder = 1;
                  if (!this.GameSetOpen) {//正常模式添加 点击监听
                      Circle1.on(Laya.Event.MOUSE_DOWN, this, this.ClickQuan, [Circle1]);
                      Circle1.on(Laya.Event.MOUSE_MOVE, this, this.GameQuanMoveOn, [Circle1]);
                  }
                  this.AllQuan.push(Circle1);
              }

          }


      }
      /**
       * 绘制线
       * @param {*} point1 起点
       * @param {*} point2 终点
       */
      DrawLineFun(point1, point2) {
          var Distes = Cocos_Api_MG.GetDistanceByTwoNode(point1, point2);
          var rote = Cocos_Api_MG.GetRotationByTwoNode(point1, point2);
          var ConteSprite = Laya.Pool.getItemByClass("DrawLine", Laya.Sprite);
          ConteSprite.graphics.clear();
          ConteSprite.graphics.fillTexture(this.windowUser.drawTexture[this.LineColorId], 0, 0, Distes, 18, "repeat-x");
          ConteSprite.width = Distes;
          ConteSprite.height = 18;
          ConteSprite.scaleY = 24 / 18;
          ConteSprite.pivot(0, ConteSprite.height / 2);
          // var color = this.windowUser.GKcolorLine[this.NowGKid]
          // ConteSprite.filters = [GameFIG_ColorFilter.SetColorFilterByColor(color.a, color.r, color.g, color.b)];
          this.DrawConteLine.addChild(ConteSprite);
          ConteSprite.pos(point1.x + 32, point1.y + 38);
          ConteSprite.rotation = rote;
      }
      /**
       * 回收线
       * @param {*} line 线对象
       */
      RevcoverLine(line) {
          Laya.Pool.recover("DrawLine", line);
          line.removeSelf();
      }
      /**游戏后退一步 */
      GameComeback() {
          if (this.GameFIG_Config.player_Config.TS > 0 && this.AllContLine.length > 0) {
              this.AllContMie--;
              //  this.DrawConteLine.graphics.clear();
              var Conteline = this.DrawConteLine.getChildAt(this.DrawConteLine.numChildren - 1);
              this.RevcoverLine(Conteline);
              this.GameFIG_Config.player_Config.TS--;
              this.AllContLine.pop();
              // for (var a = 0; a < this.AllContLine.length; a++) {
              //     var point1 = this.Game_List.cells[this.AllContLine[a].A.SQID];
              //     var point2 = this.Game_List.cells[this.AllContLine[a].B.SQID];
              //     // this.DrawConteLine.graphics.drawLine(point1.x + 32, point1.y + 38, point2.x + 32, point2.y + 38, "#37c8ec", 24);
              //     this.DrawLineFun(point1, point2);
              // }
              this.LastQuan.Ani.gotoAndStop(-1);//停到默认帧动画
              if (this.AllContLine.length > 0) {
                  this.AllContLine[this.AllContLine.length - 1].B.Ani.play(0, true);
                  this.LastQuan = this.AllContLine[this.AllContLine.length - 1].B;
                  Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.QuanMoveGame);
                  Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.QuanMoveGame, [this.LastQuan]);
              } else {
                  Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.QuanMoveGame);
                  this.LastQuan = null;
              }

              this.GameFIG.UpdatePlayerMsg();
              this.Game_backer.disabled = false;
              this.UpdateZJM();
              if (this.GameFIG_Config.player_Config.TS == 0 || this.AllContLine.length == 0) {
                  this.Game_backer.disabled = true;
              }

          } else {
              this.Game_backer.disabled = true;
          }


      }
      /**游戏重开 */
      GameReset() {
          this.GameClear();
          this.GamePlay(this.NowGameID);
      }
      /**主界面数值更新 */
      UpdateZJM() {
          this.ZJM_TS.value = this.GameFIG_Config.player_Config.TS;
          this.ZJM_YS.value = this.GameFIG_Config.player_Config.YS;
      }
      /**
       * 选择圈圈
       * @param {*} Circle 圈圈
       */
      ClickQuan(Circle) {
          this.TfConte(Circle);
      }
      /**移动到当前位置 检测是否碰撞 */
      GameQuanMoveOn(Circle) {
          if (!this.LastQuan) {
              return
          }
          this.TfConte(Circle);
      }
      /**
       * 两个对象圈链接起来
       * @param {*} conteA 圈A 选中圈
       * @param {*} conteB 圈B 链接圈
       */
      GameConte(conteA, conteB) {


          var GameNowMSG = this.windowUser.MapConfig[this.NowGKid][this.NowGameID];

          for (var a = 0; a < this.AllContLine.length; a++) {//判断次路径是否走过
              if (this.AllContLine[a].A.SQID == conteA.SQID && this.AllContLine[a].B.SQID == conteB.SQID || this.AllContLine[a].B.SQID == conteA.SQID && this.AllContLine[a].A.SQID == conteB.SQID) {
                  return false
              }
          }
          for (var a = 0; a < GameNowMSG.length; a++) {//判断是否是可走路径
              if (GameNowMSG[a] == conteA.SQID) {
                  var lastPoint = GameNowMSG[a - 1];
                  if (isNaN(lastPoint)) {
                      lastPoint = -1;
                  }
                  var nextPoint = GameNowMSG[a + 1];
                  if (isNaN(nextPoint)) {
                      nextPoint = -1;
                  }

                  if (lastPoint == conteB.SQID || nextPoint == conteB.SQID) {

                      return true
                  }
              }
          }


          return false;
      }
      /**目标球 */
      QuanMoveGame(Circle) {//绘制线条
          this.DrawMoveLine.graphics.clear();
          // this.DrawMoveLine.graphics.drawLine(Circle.x, Circle.y, this.Game_back.mouseX, this.Game_back.mouseY, "#37c8ec", 18);
          var point1 = Circle;
          var point2 = { x: this.Game_back.mouseX, y: this.Game_back.mouseY };
          var Distes = Cocos_Api_MG.GetDistanceByTwoNode(point1, point2);
          var rote = Cocos_Api_MG.GetRotationByTwoNode(point1, point2);
          var ConteSprite = this.DrawMoveLine;
          ConteSprite.graphics.fillTexture(this.windowUser.drawTexture[this.LineColorId], 0, 0, Distes, 18, "repeat-x");
          ConteSprite.width = Distes;
          ConteSprite.height = 18;
          ConteSprite.pivot(0, ConteSprite.height / 2);
          ConteSprite.pos(point1.x, point1.y);
          ConteSprite.rotation = rote;
      }
      /**对象池生成圈 */
      PoolCircle() {
          var Circle = new Laya.Sprite();
          Circle.width = 50;
          Circle.height = 50;
          Circle.pivotX = 25;
          Circle.pivotY = 25;
          Circle.graphics.drawCircle(25, 25, 25, "#bba50b");
          var tl = new Laya.Animation();
          //加载动画文件
          tl.loadAnimation("Ani/QuanScale.ani");
          Circle.Ani = tl;

          return Circle;
      }
      /**游戏开始 */
      GamePlay(GKiD) {
          this.LineColorId = this.GameFIG.GetRandNub(0, 3);
          this.GameFIG.bannershow();
          this.Game_back.scaleX = 1;
          this.Game_back.scaleY = 1;
          this.Game_back.alpha = 1;
          this.back.skin = "image/back2.png";
          this.GameFIG.ViewToView(2, 3, true, false);
          this.NowGameID = GKiD;//游戏小关卡id
          this.SetGamelist(this.NowGKid, this.NowGameID);
          this.OpenClose_SetList(false);
          if (GKiD == 0) {
              this.MoveFigerAni();
          }
          //----强制设置关卡标签居中
          this.Game_Leve.value = (this.NowGKid + 1) + "-" + (this.NowGameID + 1);
          this.Game_Leve_Top.autoSize = true;
          this.Game_Leve.autoSize = true;
          this.Game_Leve_Top.x = Laya.stage.width / 2 - (130 + this.Game_Leve.width) / 2;
          this.Game_Leve_Top.autoSize = false;
          this.Game_Leve.autoSize = false;
          this.Game_Reset.disabled = false;
          //
          this.GameTishi.disabled = false;
          this.Game_Reture.disabled = false;


      }

      /**
       * 设置关卡格子
       * @param {*} cell 格子
       * @param {*} SQID 关卡SQID 第几个格子
       */
      SetGKMsg(cell, SQID) {

          var dataLate = this.windowUser.MapConfig[this.Set_GK_MaxId][this.Set_GK_MinId];
          var isChaRu = false;//是否插入
          var ChaRuArr = [];//插入的数
          for (var a = 0; a < dataLate.length; a++) {
              var node = dataLate[a];
              if (node == SQID) {
                  var node_last = dataLate[a - 1];
                  var node_next = dataLate[a + 1];
                  if (this.LastSetPoint) {
                      if (this.LastSetPoint == node_last || this.LastSetPoint == node_next || this.LastSetPoint == node) {
                          console.log("请勿重复点位");
                          return;
                      }

                  }

              }
              //是否是折叠放置
              if (node != this.LastSetPoint) {//不是两个相同点判断
                  var LastPontPos = { x: this.LastSetPoint % 11, y: Math.floor(this.LastSetPoint / 11) };//找到工作点xy
                  var nodePos = { x: node % 11, y: Math.floor(node / 11) };//找到对称点xy
                  var SQIDPos = { x: SQID % 11, y: Math.floor(SQID / 11) };//找到目标点xy
                  //判断工作点与对称点的角度 是否==工作点与目标点的角度 并且距离比工对距离大  如果是则不准创建  
                  var WorkToNode = Math.floor(Cocos_Api_MG.GetRotationByTwoNode(LastPontPos, nodePos) * 1000) / 1000; //工作点对对称点的角度
                  var WorkToSQID = Math.floor(Cocos_Api_MG.GetRotationByTwoNode(LastPontPos, SQIDPos) * 1000) / 1000;//工作点对目标点的角度
                  var WorkToNodePos = Math.floor(Cocos_Api_MG.GetDistanceByTwoNode(LastPontPos, nodePos) * 1000) / 1000;//工作点对对称点的距离
                  var WorkToSQIDPos = Math.floor(Cocos_Api_MG.GetDistanceByTwoNode(LastPontPos, SQIDPos) * 1000) / 1000;//工作点对目标点的距离

                  var node_last = dataLate[a - 1];
                  var node_next = dataLate[a + 1];

                  if ((WorkToNode == WorkToSQID && WorkToNodePos < WorkToSQIDPos) || (WorkToNode == WorkToSQID && WorkToNodePos > WorkToSQIDPos && (node_last == this.LastSetPoint || this.LastSetPoint == node_next || this.LastSetPoint == node))) {
                      console.log("请勿设置对称折叠点");
                      return;
                  }

              }

              //是否是两个点的中间点 是则插入进去
              var pontA = dataLate[a - 1];
              var pontB = dataLate[a + 1];
              var CanChaRu = true;
              for (var i = 0; i < ChaRuArr.length; i++) {
                  if (((ChaRuArr[i].A == pontA && ChaRuArr[i].B == node) || (ChaRuArr[i].B == pontA && ChaRuArr[i].A == node)) || ((ChaRuArr[i].A == pontB && ChaRuArr[i].B == node) || (ChaRuArr[i].B == pontB && ChaRuArr[i].A == node))) {
                      CanChaRu = false;
                      break;
                  }
              }
              if (CanChaRu) {
                  var pontNodePos = { x: node % 11, y: Math.floor(node / 11) };//找到当前点xy
                  var pontSQIDPos = { x: SQID % 11, y: Math.floor(SQID / 11) };//找到目标点xy
                  if (pontA) {
                      var pontAPos = { x: pontA % 11, y: Math.floor(pontA / 11) };//找到A点xy 当前点前一个
                      if (Cocos_Api_MG.onSegment(pontAPos, pontNodePos, pontSQIDPos)) {//是否共线
                          console.log("中间插入");
                          isChaRu = true;
                          ChaRuArr.push({ A: pontA, B: node });
                      }
                  }
                  if (pontB) {
                      var pontBPos = { x: pontB % 11, y: Math.floor(pontB / 11) };//找到B点xy 当前点后一个
                      if (Cocos_Api_MG.onSegment(pontNodePos, pontBPos, pontSQIDPos)) {//是否共线
                          console.log("中间插入");
                          isChaRu = true;
                          ChaRuArr.push({ A: node, B: pontB });
                      }
                  }
              }



          }

          this.LastSetPoint = SQID;
          if (isChaRu) {//插入
              for (var a = 0; a < ChaRuArr.length; a++) {
                  for (var b = 0; b < dataLate.length - 1; b++) {
                      if (ChaRuArr[a].A == dataLate[b] && ChaRuArr[a].B == dataLate[b + 1]) {
                          dataLate.splice(b + 1, 0, SQID);
                          break;
                      }
                  }
              }
              console.log("多指插入");
          }
          dataLate.push(SQID);
          cell.offAll();
          this.SetGamelist(this.Set_GK_MaxId, this.Set_GK_MinId);
          this.SetPointShow();
      }
      /**关卡选择左右切换 */
      NextLastGK(add) {
          this.NowGKYe += add;
          this.SetGKYeList();
          this.SetNextLast();
      }
      /**设置上下页面按钮显示 */
      SetNextLast() {
          if (this.NowGKYe > 0) {
              this.Level_right.visible = true;
          } else {
              this.Level_right.visible = false;
          }
          if (this.NowGKYe != this.AllYe - 1) {
              this.Level_left.visible = true;
          } else {
              this.Level_left.visible = false;
          }
      }
      /**设置关卡页面 */
      SetGKYeList() {
          var arr = [];
          for (var a = this.NowGKYe * 16; a < this.NowGKYe * 16 + 16; a++) {
              if (this.windowUser.MapConfig[this.NowGKid][a]) {
                  arr.push(this.windowUser.MapConfig[this.NowGKid][a]);
              } else {
                  break;
              }

          }
          this.GKlist.array = arr;
          this.GKlist.refresh();
          this.Level_Ye.value = (this.NowGKYe + 1) + "-" + this.AllYe;
      }
      /**
       * 设置关卡列表
       * @param {*} id 第几关
       */
      SetGKlist(id = 0) {
          this.level_GK.texture = "image/" + (80 + id) + ".png";
          this.NowGKid = id;
          this.NowGKYe = 0;
          this.AllYe = Math.ceil(this.windowUser.MapConfig[id].length / 16);
          this.SetGKYeList();
          this.SetNextLast();
      }
      /**设置音效开关 */
      SetMC() {
          if (!this.GameFIG.Open.MC) {
              this.GameFIG.Open.MC = true;
              this.GameFIG.ResumeMusic();
              this.Game_Mc.texture = "image/45.png";
              this.Game_Mc2.texture = "image/45.png";

          } else {
              this.GameFIG.PauseMusic();
              this.Game_Mc.texture = "image/44.png";
              this.Game_Mc2.texture = "image/44.png";
              this.GameFIG.Open.MC = false;
          }

          this.GameFIG.Open.YX = !this.GameFIG.Open.YX;

      }
      /**自适应UI */
      UIMMP() {
          this.nodeUI = [
              { node: this.Main_YS, type: "单独" },
              { node: this.Main_TS, type: "单独" },
              { node: this.view_Begin, type: "所有" },
              { node: this.view_GK, type: "所有" },
              { node: this.view_Level, type: "所有" },
              { node: this.view_Game, type: "所有" },
              { node: this.GG_Down, type: "单独" },
          ];

          this.back.height = Laya.stage.height;
          this.height = Laya.stage.height;

          for (var a = 0; a < this.nodeUI.length; a++) {
              if (this.nodeUI[a].type == "所有") {
                  for (var b = 0; b < this.nodeUI[a].node.numChildren; b++) {
                      this.nodeUI[a].node.getChildAt(b).y = this.nodeUI[a].node.getChildAt(b).y / 1334 * Laya.stage.height;
                  }
              } else {//单独设置
                  this.nodeUI[a].node.y = this.nodeUI[a].node.y / 1334 * Laya.stage.height;
              }

          }
          if (this.GameFIG.hasScreenFringe() && Laya.stage.height > 1334) {
              this.Main_YS.y += 60;
              this.Main_TS.y += 60;
          }


      }
      //----------------------------------------------------------------游戏核心逻辑区
      //------------------------------游戏编辑逻辑
      /**导出关卡为json文件 */
      OUTGkToJson() {
          this.SaveGK();
          this.GameFIG.SaveMsgToJson(this.windowUser.MapConfig, "MapConfig");
      }
      /**保存关卡 */
      SaveGK() {
          for (var a = 0; a < this.windowUser.MapConfig; a++) {//寻找空数组
              for (var b = 0; b < this.windowUser.MapConfig[a].length; b++) {
                  if (this.windowUser.MapConfig[a][b].length == 0) {
                      this.windowUser.MapConfig[a].splice(b, 1);
                  }
              }
          }
          this.GameFIG.saveLocalData("MMdraw_Set" + this.GameFIG_Config.GameConfig.banbenID, this.windowUser.MapConfig);
      }
      /**删除关卡 */
      RecoverGK() {
          if (this.windowUser.MapConfig[this.Set_GK_MaxId].length > 0) {
              this.windowUser.MapConfig[this.Set_GK_MaxId].splice(this.Set_GK_MinId, 1);//清除数组
          }
          if (this.windowUser.MapConfig[this.Set_GK_MaxId].length == 0) {
              this.windowUser.MapConfig[this.Set_GK_MaxId][0] = [];
          }
          this.Set_MinGk.text = 0;
          this.Set_GoGK();
      }

      /**新增关卡 */
      AddGk() {
          this.OpenClose_SetList(true);
          this.Set_OK.visible = true;
          this.OpenClose_Set();
          var len = this.windowUser.MapConfig[this.Set_GK_MaxId].length;
          for (var a = 0; a < this.windowUser.MapConfig[this.Set_GK_MaxId].length; a++) {//优先找到空的关卡编辑
              if (this.windowUser.MapConfig[this.Set_GK_MaxId][a].length == 0) {
                  len = a;
              }
          }
          this.windowUser.MapConfig[this.Set_GK_MaxId][len] = new Array();
          this.Set_GK_MinId = len;
          this.LastSetPoint = null;
          this.SetPointShow();
          this.UpdateSetBian();
          this.SetGamelist(this.Set_GK_MaxId, this.Set_GK_MinId);
          this.OpenStageClick();
      }
      /**
       * 更新当前正在设置第几个点
       */
      SetPointShow() {
          var arr = this.windowUser.MapConfig[this.Set_GK_MaxId][this.Set_GK_MinId];
          this.Set_OK_Lable.text = "设置第" + (arr.length + 1) + "个点";
      }
      /**添加界面监听 */
      OpenStageClick() {
          this.Set_CaiDan.mouseEnabled = false;
          Laya.stage.on(Laya.Event.RIGHT_CLICK, this, this.CloseStageClick);
      }
      /**结束新增 */
      CloseStageClick() {
          Laya.stage.off(Laya.Event.RIGHT_CLICK, this, this.CloseStageClick);
          this.Set_CaiDan.mouseEnabled = true;
          this.OpenClose_Set();
          this.Set_OK.visible = false;
          if (this.windowUser.MapConfig[this.Set_GK_MaxId][this.Set_GK_MinId].length <= 1) {
              this.RecoverGK();//一个节点就删掉这个
              this.GameFIG.TiShiKuang("低于两个点不会保存");
          }
      }
      /**打开关闭编辑背景 */
      OpenClose_SetList(ttff = false) {
          this.Game_List.visible = ttff;
          this.Game_back.texture = ttff ? "editor/grid.png" : "";
      }
      /**打开关闭侧拉菜单 */
      OpenClose_Set() {
          if (this.SetCaiOpen) {
              Laya.Tween.to(this.Set_CaiDan.parent, { x: -39 }, 400, Laya.Ease.backIn, null, 0, true);
          } else {
              this.OpenClose_SetList(false);
              this.Game_List.visible = false;
              Laya.Tween.to(this.Set_CaiDan.parent, { x: 421 }, 400, Laya.Ease.backOut, null, 0, true);
          }
          this.SetCaiOpen = !this.SetCaiOpen;
      }
      /**打开关卡编辑 */
      GameGoBian() {
          this.Game_backer.visible = false;
          this.Game_Reset.visible = false;
          this.Set_UI.visible = true;
          this.back.skin = "image/back2.png";
          this.UpdateSetBian();
          this.OpenClose_Set();
          this.GameFIG.ViewToView(0, 3, true, false);

      }
      /**
       * 更新编辑文本显示数据
       */
      UpdateSetBian() {
          var len = this.windowUser.MapConfig[this.Set_GK_MaxId].length;//小关数量
          var len2 = this.windowUser.MapConfig[this.Set_GK_MaxId][this.Set_GK_MinId].length;
          this.Min_GK.text = "当前小关卡(0-" + (len - 1) + ")";
          this.Big_all.text = "当前大关卡总共" + len + "小关";
          this.small_all.text = "当前小关卡总共" + len2 + "个节点";
      }
      /**
       * 编辑关卡大小关跳转
       * @param {*} ttff true 大关 false 小关
       */
      Set_GoGK(ttff) {
          if (ttff) {
              this.Set_GK_MaxId = parseInt(this.Set_MaxGk.text);
              if (this.Set_GK_MaxId > 4 || this.Set_GK_MaxId < 0) {
                  this.Set_GK_MaxId = 0;
                  this.Set_MaxGk.text = 0;
                  this.GameFIG.TiShiKuang("0-4的整数");
              }
              this.Set_GK_MinId = 0;
              this.Set_MinGk.text = 0;

          } else {
              this.Set_GK_MinId = parseInt(this.Set_MinGk.text);
              var len = (this.windowUser.MapConfig[this.Set_GK_MaxId].length - 1);
              if (this.Set_GK_MinId > len || this.Set_GK_MinId < 0) {
                  this.Set_GK_MinId = 0;
                  this.Set_MinGk.text = 0;
                  this.GameFIG.TiShiKuang("0-" + len + "的整数");
              }

          }
          this.UpdateSetBian();
          this.SetGamelist(this.Set_GK_MaxId, this.Set_GK_MinId);
          this.SaveGK();
      }
      //-----------------------------------------
  }

  /**
   * 页面逻辑父类
     * @param {*} 页面继承逻辑后 OnEnale请使用_Enable
     * @param {*} 页面继承逻辑后 UIMMP 会自动调用 请重写方法
     * @param {*} 页面继承逻辑后 Addbut 会自动调用 请重写方法
     * @param {*} EndFun 动画结束调用方法 定制版
     * @param {*} EndHaner 场景关闭调用方法 定制版
     * @param {*} CloseGC 关闭当前场景(无关闭动画) 并执行 EndHaner 
     * @param {*} OtherCloseFun 有关闭动画时调用此结束 并调用CloseGC
     * 
   */
  class view_all extends GameAll {
      constructor() {
          super();
          this.nodeUI = [];
          this.OpenDmsg = {};
      }
      _Enable() {

      }
      onEnable() {
          this.zOrder = 11;
          this._Enable();
          this.UIMMP();
          this.Addbut();
      }

      UIMMP() {
          this.height = Laya.stage.height;
          for (var a = 0; a < this.nodeUI.length; a++) {
              if (this.nodeUI[a].type == "所有") {
                  for (var b = 0; b < this.nodeUI[a].node.numChildren; b++) {
                      this.nodeUI[a].node.getChildAt(b).y =  this.nodeUI[a].node.getChildAt(b).y / 1334 * Laya.stage.height;
                  }
              } else {//单独设置
                  this.nodeUI[a].node.y = this.nodeUI[a].node.y / 1334 * Laya.stage.height;
              }

          }
      }
      Addbut() {

      }
      onOpened(OpenedMsg) {
          if (OpenedMsg == null) {
              OpenedMsg = {};
          }
          this.OpenDmsg = OpenedMsg;
          this._Opened(OpenedMsg);
      }
      _Opened(OpenedMsg) {

      }
     /**
      * 关闭当前场景 并执行关闭函数
      * @param {*} res EndHaner返回参数
      */
      CloseGC(res) {
          if (this.OpenDmsg.EndHaner != undefined) {
              this.OpenDmsg.EndHaner.runWith(res);
          }
          this.close();
      }
      /**
       * 有关闭动画时调用此结束
       * @param {*} res EndHaner返回参数
       */
      OtherCloseFun(res) {
          if (this.EndFun) {
              this.EndFun.runWith(Laya.Handler.create(this, this.CloseGC,[res]));
          } else {
              this.CloseGC(res);
          }

      }
  }

  class view_QD extends view_all {

      constructor() {
          super();

      }
      _Enable() {
          this.nodeUI = [
              { node: this, type: "所有" },
          ];
          this.back.height = Laya.stage.height;
          this.UpdateThis();
          if (this.GameFIG_Config.player_Config.QD.day < 7 && !this.GameFIG.TFdate(new Date(), new Date(this.GameFIG_Config.player_Config.QD.LastDay))) {
              this.DouGet.visible = true;
              this.Get.visible = true;
              Laya.Tween.to(this.Get, { alpha: 1 }, 500, Laya.Ease.quadIn, null, 1000);
          } else {
              this.DouGet.visible = false;
              this.Get.visible = false;
          }
      }

      QDGame(tfdou) {
          if (this.GameFIG_Config.player_Config.QD.day < 7 && !this.GameFIG.TFdate(new Date(), new Date(this.GameFIG_Config.player_Config.QD.LastDay))) {
              if (tfdou) {
                  this.GameFIG.GG_all(true, Laya.Handler.create(this, this.GetQd, [2]), Laya.Handler.create(this, this.GetQd, [1]));
              } else {
                  this.GetQd(1);
              }
          } else {
              this.GameFIG.TiShiKuang("已全部签到");
          }

      }
      GetQd(much) {
          var config = this.windowUser.QDconfig[this.GameFIG_Config.player_Config.QD.day];
          for (var a = 0; a < config.key.length; a++) {
              this.GameFIG_Config.player_Config[config.key[a]] += config.much * much;
          }
          this.GameFIG_Config.player_Config.QD.day++;
          this.GameFIG_Config.player_Config.QD.LastDay = new Date();
          this.GameFIG.UpdatePlayerMsg();
          this.OpenDmsg.mythis.UpdateZJM();
          this.GameFIG.TiShiKuang("签到成功");
          this.DouGet.visible = false;
          this.Get.visible = false;
          this.UpdateThis();
      }
      UpdateThis() {
          this.QD_lb.text = "已累计签到" + (this.GameFIG_Config.player_Config.QD.day) + "天";
          for (var a = 0; a < 7; a++) {
              if (a < this.GameFIG_Config.player_Config.QD.day) {
                  this["day" + a].getChildByName("1").visible = true;
                  this["day" + a].getChildByName("2").visible = true;
              } else {
                  this["day" + a].getChildByName("1").visible = false;
                  this["day" + a].getChildByName("2").visible = false;
              }
          }
      }
      _Opened(res) {

      }
      Addbut() {
          this.GameFIG.butTween(this.close_but, Laya.Handler.create(this, this.OtherCloseFun, [], false), 2, true);
          this.GameFIG.butTween(this.Get, Laya.Handler.create(this, this.QDGame, [false], false), 2, true);
          this.GameFIG.butTween(this.DouGet, Laya.Handler.create(this, this.QDGame, [true], false), 2, true);
      }

  }

  /**定制UI动画父类 */
  class UIAni extends Laya.Script {
      constructor() {
          super();
          // this.Owner.StartFun = null;//开始播放动画调用方法 Laya.hander
          // this.Owner.EndFun = null;//结束播放动画调用方法 Laya.hander
      }

      onEnable() {
          this._Enable();
      }
      _Enable() {

      }
      PlayOver(index){
          
      }

  }

  /**打开页面弹窗的出场方式 仅支持规范操作 萌游吱吱 定制版 */
  class UIAni_ViewOpenShow extends UIAni {

      constructor() {
          super();
          /** @prop {name:Type, tips:"出场方式0 中间缩放变大,1左进场 2左上进场 3右进场 4右上进场  5渐变进场", type:Int, default:0}*/
          let Type = 0;
          /** @prop {name:Time, tips:"出场时间", type:Int, default:1000}*/
          let Time = 1000;
          /** @prop {name:Ease, tips:"出场缓动类型", type:Ease}*/
          let Ease = Laya.Ease.linearIn;
          /** @prop {name:EndType, tips:"退出方式0 中间缩放变小,1左退场 2左上退场 3右退场 4右上退场 5渐变退场 6直接关闭", type:Int, default:0}*/
          let EndType = 0;
          /** @prop {name:EndTime, tips:"退出时间", type:Int, default:1000}*/
          let EndTime = 1000;
          /** @prop {name:EndEase, tips:"退出缓动类型", type:Ease}*/
          let EndEase = Laya.Ease.linearIn;
          /** @prop {name:TypeChoose, tips:"类型 0父物体继承view_all 1自身继承view_all", type:Int,default:0}*/
          let TypeChoose =0;
          // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
          this.Type = Type;
          this.Time = Time;
          this.EndType = EndType;
          this.EndTime = EndTime;
          this.EndEase = EndEase;
          this.Ease = Ease;
          this.TypeChoose = TypeChoose;
      }
      _Enable() {
          this.EndEase = Laya.Ease[this.EndEase];
          this.Ease = Laya.Ease[this.Ease];
          if (this.TypeChoose==0){
              this.owner.parent.EndFun = Laya.Handler.create(this, this.End);
          }else{
              this.owner.EndFun = Laya.Handler.create(this, this.End);
          }
          this.begin();
      }
      begin() {
          this.ClassAll = [
              {//中间缩放
                  begin: { scaleX: 0.2, scaleY: 0.2 },
                  End: { scaleX: 1, scaleY: 1 }
              },
              {//左进场
                  begin: { x: this.owner.x - Laya.stage.width },
                  End: { x: this.owner.x }
              },
              {//左上进场
                  begin: { x: 0, y: 0, scaleX: 0, scaleY: 0 },
                  End: { x: 667 / 1334 * Laya.stage.width, y: 375, scaleX: 1, scaleY: 1 }
              },
              {//右进场
                  begin: { x: this.owner.x + Laya.stage.width },
                  End: { x: this.owner.x }
              },
              {//右上进场
                  begin: { x: Laya.stage.width, y: 0, scaleX: 0, scaleY: 0 },
                  End: { x: 667 / 1334 * Laya.stage.width, y: 375, scaleX: 1, scaleY: 1 }
              },
              {//渐变进场
                  begin: { alpha: 0 },
                  End: { alpha: 1 }
              },

          ];

          for (var js in this.ClassAll[this.Type].begin) {
              this.owner[js] = this.ClassAll[this.Type].begin[js];
          }
          Laya.Tween.to(this.owner, this.ClassAll[this.Type].End, this.Time, this.Ease);
      }
      End(Handler) {
          if(this.EndType!=6){
              this.ClassEndAll = [
                  {//中间缩放
                      End: { scaleX: 0.2, scaleY: 0.2 },
                  },
                  {//左退场
                      End: { x: this.owner.x - Laya.stage.width }
                  },
                  {//左上退场
                      End: { x: 0, y: 0, scaleX: 0, scaleY: 0 }
                  },
                  {//右退场
                      End: { x: this.owner.x + Laya.stage.width }
                  },
                  {//右上退场
                      End: { x: Laya.stage.width, y: 0, scaleX: 0, scaleY: 0 }
                  },
                  {//渐变进场
                      End: { alpha: 0 }
                  },
                  
              ];
              Laya.Tween.to(this.owner, this.ClassEndAll[this.EndType].End, this.EndTime, this.EndEase, Handler);
          }else{
              Handler.run();
          }
          
      }

  }

  class view_win extends view_all {

      constructor() {
          super();

      }
      _Enable() {
          this.GameFIG.InterShow();
          this.nodeUI = [

          ];
          this.back.height = Laya.stage.height;


          Laya.Tween.from(this.Win, { scaleX: 0.5, scaleY: 0.5 }, 500, Laya.Ease.backOut, Laya.Handler.create(this, () => {
              Laya.Tween.to(this.hua1, { x: 45, y: 435 }, 300, Laya.Ease.quadIn);
              Laya.Tween.to(this.hua2, { x: 736, y: 460 }, 300, Laya.Ease.quadIn);
              Laya.Tween.to(this.GameBack, { alpha: 1 }, 500, Laya.Ease.quadIn);
              Laya.Tween.to(this.close_but, { alpha: 1 }, 500, Laya.Ease.quadIn, null, 1000);

          }));

      }


      _Opened(res) {

      }
      Addbut() {

          this.GameFIG.butTween(this.close_but, Laya.Handler.create(this, () => {
              this.OpenDmsg.GameUI_.GameNext();
              this.CloseGC();
          }, [], false), 2, true);

          this.GameFIG.butTween(this.GameBack, Laya.Handler.create(this, () => {
              this.OpenDmsg.GameUI_.GameReture();
              this.CloseGC();
          }, [], false), 2, true);
          this.GameFIG.butTween(this.close_but, Laya.Handler.create(this, this.GetToNext, [1], false), 2, true);
          this.GameFIG.butTween(this.DouGet, Laya.Handler.create(this, () => {
              this.GameFIG.GG_all(true, Laya.Handler.create(this, this.GetToNext, [2]), Laya.Handler.create(this, this.GetToNext, [1]));
          }, [1], false), 2, true);

      }
      GetToNext(much) {
          this.GameFIG_Config.player_Config.TS+=much;
          this.GameFIG_Config.player_Config.YS+=much;
          this.GameFIG.UpdatePlayerMsg();
          this.OpenDmsg.GameUI_.UpdateZJM();
          this.OpenDmsg.GameUI_.GameNext();
          this.CloseGC();
      }

  }

  //IDE 自定义组件
  class UIAni_DouDong extends UIAni {

      constructor() {
          super();
          /** @prop {name:Time, tips:"循环一次时间-循环模式有效", type:Int, default:0}*/
          /** @prop {name:Max, tips:"抖动最大幅度", type:Int, default:0}*/
          /** @prop {name:Min, tips:"抖动最小幅度", type:Int, default:0}*/
          /** @prop {name:Time2, tips:"循环间隔时间-循环模式有效", type:Int, default:0}*/
          /** @prop {name:Type,tips:"类型",type:Option,option:"默认循环,单次调用"}*/
          /** @prop {name:Nodes, tips:"循环完成调用动画集合——单次调用有效", type:Nodes}*/
          /** @prop {name:TFfirst,tips:"是否第一个播放——单次调用有效_首次间隔时间无效",type:Boolean,"}*/
      }
      SetTimeLine() {
          if (this.TimeLine) {
              this.TimeLine.destroy();
          }
          this.TimeLine = Laya.TimeLine
              .to(this.owner, { rotation: this.Max ? this.Max : 20 }, this.Time ? this.Time / 5 : 100)
              .to(this.owner, { rotation: this.Max ? this.Max * -1 : -20 }, this.Time ? this.Time / 4 : 150)
              .to(this.owner, { rotation: this.Min ? this.Min : 5 }, this.Time ? this.Time / 4 : 150)
              .to(this.owner, { rotation: this.Min ? this.Min * -1 : -5 }, this.Time ? this.Time / 4 : 150)
              .to(this.owner, { rotation: 0 }, this.Time ? this.Time / 5 : 100)
              .to(this.owner, {}, this.Time_JianGe);
          this.TimeLineAll = [
              this.TimeLine,
          ];
      }
      _Enable() {
          this.Time2 = this.Time2 ? this.Time2 : 300;
          if (this.Type == "默认循环") {
              this.Time_JianGe = this.Time2;
              this.SetTimeLine();
              this.TimeLine.play(0, true);
          } else {
              if (this.TFfirst) {
                  this.Time_JianGe = 0;
                  this.SetTimeLine();
                  for (var a = 0; a < this.TimeLineAll.length; a++) {
                      this.TimeLineAll[a].play(0, false);
                      this.TimeLineAll[a].on(Laya.Event.COMPLETE, this, this.PlayOver, [a]);
                  }
              }
          }
      }
      PlayOver(index) {
          this.TimeLineAll[index].off(Laya.Event.COMPLETE, this, this.PlayOver);
          if (this.Nodes && this.Nodes.length > 0) {
              for (var a = 0; a < this.Nodes.length; a++) {
                  this.Nodes[a].Time_JianGe = this.Nodes[a].Time2;
                  this.Nodes[a].SetTimeLine();
                  for (var b = 0; b < this.Nodes[a].TimeLineAll.length; b++) {
                      this.Nodes[a].TimeLineAll[b].play(0, false);
                      this.Nodes[a].TimeLineAll[b].on(Laya.Event.COMPLETE, this.Nodes[a], this.Nodes[a].PlayOver, [a]);
                  }
              }
          }
      }
      onDestroy() {
          if (this.TimeLine) {
              this.TimeLine.destroy();
          }
        
      }
  }

  class view_QD$1 extends view_all {

      constructor() {
          super();

      }
      _Enable() {
          this.nodeUI = [
              { node: this, type: "所有" },
          ];
          this.back.height = Laya.stage.height;

      }


      _Opened(res) {

      }

      GetYs(much) {
          this.GameFIG_Config.player_Config.YS += much * 5;
          this.GameFIG.UpdatePlayerMsg();
          this.OpenDmsg.Mythis.UpdateZJM();
          this.OtherCloseFun();
      }
      OpenView() {
          this.Get_view.visible = true;
          this.Tishi.visible = false;
          Laya.Tween.to(this.get, { alpha: 1 }, 500, Laya.Ease.quadIn, null, 1000);
      }
      Addbut() {
          this.GameFIG.butTween(this.close_but, Laya.Handler.create(this, this.OtherCloseFun, [], false), 2, true);
          this.GameFIG.butTween(this.sure, Laya.Handler.create(this.GameFIG, this.GameFIG.GG_all, [true, Laya.Handler.create(this, this.OpenView, []), Laya.Handler.create(this, this.OtherCloseFun)], false), 2, true);

          this.GameFIG.butTween(this.cancel, Laya.Handler.create(this, this.OtherCloseFun, [], false), 2, true);
          this.GameFIG.butTween(this.Doubuget, Laya.Handler.create(this.GameFIG, this.GameFIG.GG_all, [true, Laya.Handler.create(this, this.GetYs, [2]), Laya.Handler.create(this, this.GetYs, [1])], false), 2, true);
          this.GameFIG.butTween(this.get, Laya.Handler.create(this, this.GetYs, [1], false), 2, true);

      }

  }

  var load_this;

  class load extends GameAll {
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
          this.windowUser.LoadMapConfig(Laya.Handler.create(this, this.LoadAdd, ["LoadJson", 1]));
          for (var a = 0; a < 4; a++) {
              var Texture = new Laya.Texture();
              this.windowUser.drawTexture.push(Texture);
              Texture.load("draw/"+a+".png", Laya.Handler.create(this, this.LoadAdd, ["Texture"+a, 1]));
          }
      }
      LoadFist() {
          if (this.GameFIG.wx) {
              var FenBaoAll = [
              ];
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
                          hander.run();
                      }
                      load_this.LoadLable.text = Math.floor(load_this.FenBaoadd / FenBaoAll.length * 100) + "%";
                  },
                  fail: function (res) {
                      // 分包加载失败通过 fail 回调
                  }
              });
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

  class UIAni_Scale extends UIAni {

      constructor() {
          super();
          /** @prop {name:scaleTo, tips:"缩放到", type:float, default:0.8}*/
          let scaleTo = 0.8;
          /** @prop {name:scaleCome, tips:"缩放回", type:float, default:1}*/
          let scaleCome = 1;
          /** @prop {name:Time, tips:"动画时间", type:Int, default:500}*/
          let Time = 500;
          this.scaleTo = scaleTo;
          this.scaleCome = scaleCome;
          this.Time = Time;
          // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
      }

      _Enable() {
          
          this.TimeLine = Laya.TimeLine
              .to(this.owner, { scaleX: this.scaleTo, scaleY: this.scaleTo }, this.Time)
              .to(this.owner, { scaleX: this.scaleCome, scaleY: this.scaleCome }, this.Time);
          this.TimeLine.play(0, true);

      }
      onDestroy() {
          this.TimeLine.destroy();
      }
  }

  /**This class is automatically generated by LayaAirIDE, please do not make any modifications. */

  class GameConfig {
      static init() {
          //注册Script或者Runtime引用
          let reg = Laya.ClassUtils.regClass;
  		reg("script/scene/GameUI.js",GameUI);
  		reg("script/OtherView/view_QD.js",view_QD);
  		reg("script/UIAni/UIAni_ViewOpenShow.js",UIAni_ViewOpenShow);
  		reg("script/OtherView/view_win.js",view_win);
  		reg("script/UIAni/UIAni_DouDong.js",UIAni_DouDong);
  		reg("script/OtherView/view_YsGet.js",view_QD$1);
  		reg("script/scene/load.js",load);
  		reg("script/UIAni/UIAni_Scale.js",UIAni_Scale);
      }
  }
  GameConfig.width = 750;
  GameConfig.height = 1334;
  GameConfig.scaleMode ="fixedwidth";
  GameConfig.screenMode = "none";
  GameConfig.alignV = "top";
  GameConfig.alignH = "left";
  GameConfig.startScene = "Scene/Load.scene";
  GameConfig.sceneRoot = "";
  GameConfig.debug = false;
  GameConfig.stat = false;
  GameConfig.physicsDebug = false;
  GameConfig.exportSceneToJson = true;

  GameConfig.init();

  class Main {
  	constructor() {
  		//根据IDE设置初始化引擎		
  		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
  		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
  		Laya["Physics"] && Laya["Physics"].enable();
  		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
  		Laya.stage.scaleMode = GameConfig.scaleMode;
  		Laya.stage.screenMode = GameConfig.screenMode;
  		Laya.stage.alignV = GameConfig.alignV;
  		Laya.stage.alignH = GameConfig.alignH;
  		//兼容微信不支持加载scene后缀场景
  		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

  		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
  		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
  		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
  		if (GameConfig.stat) Laya.Stat.show();
  		Laya.alertGlobalError(true);

  		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
  		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
  	}

  	onVersionLoaded() {
  		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
  		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
  	}

  	onConfigLoaded() {
  		//加载IDE指定的场景
  		GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
  	}
  }
  //激活启动类
  new Main();

}());
