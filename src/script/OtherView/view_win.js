import view_all from "./view_all";

export default class view_win extends view_all {

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

        }))

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