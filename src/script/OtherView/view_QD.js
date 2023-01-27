import view_all from "./view_all";

export default class view_QD extends view_all {

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
        this.QD_lb.text = "已累计签到" + (this.GameFIG_Config.player_Config.QD.day) + "天"
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