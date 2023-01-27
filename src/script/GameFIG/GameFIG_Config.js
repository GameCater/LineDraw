//游戏默认所有参数 剥离至此类中 请优先设置此脚本的所有参数
/**游戏配置类 */
export class GameFIG_Config {
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

}
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
}
/**云开发配置 */
GameFIG_Config.GameYun = {
    isOpenYun: false,//是否打开云开发
    env: "qiu3d-2gireleh214b1e86", //这里填写云环境id
    login: "login", //获取真实ID的云函数名称
    GameHB: "FaHB",//发红包
    GetInitPlayer: "", //获取用户注册信息
    updatePlayer: "", //更新玩家至云端
    getjson: "", //获取云json
}
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
    
}
GameFIG_Config.isRandPlayer = false//是否随机设置玩家信息 开启后自动设置 （名字 Openid） 有需求在GameFIG_WX设置initPlayer 
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
]
/**头像表 注意格式 */
GameFIG_Config.HeadConfig = {
    IsSet: true,//是否自动设置头像 
    head: "head/head",//头部路径名字 比如完整路径head/head0.pnd 取head/head 后面方便获取 一定要按顺序走
    min: 0,//起点index  例如  head0.png
    max: 17,//终点index 例如  head17.png
    end: ".png"//后缀
}
/**玩家信息表 注意格式 */
GameFIG_Config.NameConfig = {
    IsSet: false,//是否自动加载玩家信息表 开启后可直接调用GetRandNameByJosn
    url: "json/GameFIG_UserInfo.json",//路径
    Biao: [//isSet为false的情况下可以自定义依然可以调用GetRandNameByJosn  否则会被加载url 覆盖掉
        { "name": "小可爱", "age": 18, "city": "成都", "sex": "女", "ID": 0 },
        { "name": "王麻子", "age": 22, "city": "上海", "sex": "女", "ID": 1 },
        { "name": "蓝百合", "age": 23, "city": "广州", "sex": "女", "ID": 2 },
    ]
}
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
}
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
}


