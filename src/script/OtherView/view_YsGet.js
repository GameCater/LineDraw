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