
import GameAll from "./GameAll";
import { Cocos_Api_MG } from "../GameFIG/Cocos_Api_MG";
import { GameFIG_ColorFilter } from "../GameFIG/GameFIG_ColorFilter";

/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class GameUI extends GameAll {
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
            }))
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
            this.GameFIG.butTween(cell, Laya.Handler.create(this, this.GamePlay, [nowGk], false), 1, true, "#000000")
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
                cell.texture = "editor/edit_selected2.png"
            } else {
                cell.texture = "editor/edit_selected.png"
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
        console.log("游戏胜利")
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
            }))
        }))

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
            this.FigerTween = Laya.Tween.to(this.MoveFiger, { x: point.x + 32, y: point.y + 38 }, time, Laya.Ease.linearIn, Laya.Handler.create(this, this.MoveFigerTween, [overHander]))
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
                        console.log("请勿重复点位")
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
                    console.log("请勿设置对称折叠点")
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
            console.log("多指插入")
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
                arr.push(this.windowUser.MapConfig[this.NowGKid][a])
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
        this.level_GK.texture = "image/" + (80 + id) + ".png"
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
            this.GameFIG.TiShiKuang("低于两个点不会保存")
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