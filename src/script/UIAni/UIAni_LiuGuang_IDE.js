import UIAni from "./UIAni";

export default class UIAni_LiuGuang_IDE extends UIAni {

    constructor() {
        super();
        /** @prop {name:Much, tips:"循环距离", type:Int, default:0}*/
        /** @prop {name:Time, tips:"循环一次时间", type:Int, default:0}*/
        /** @prop {name:Time2, tips:"间隔时间-循环模式有效", type:Int, default:0}*/
        /** @prop {name:Type,tips:"类型",type:Option,option:"默认循环,单次调用"}*/
        /** @prop {name:Nodes, tips:"循环完成调用动画集合——单次调用有效", type:Nodes}*/
        /** @prop {name:TFfirst,tips:"是否第一个播放——单次调用有效_首次间隔时间无效",type:Boolean,"}*/
        // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
    }
    SetTimeLine() {
        if (this.TimeLine_1) {
            this.TimeLine_1.destroy();
        }
        if (this.TimeLine_2) {
            this.TimeLine_2.destroy();
        }

        var LastOX = this.owner.x;
        var LastMX = this.owner.mask.x;
        this.TimeLine_1 = Laya.TimeLine
            .to(this.owner, { x: this.Much + this.owner.x }, this.Time, Laya.Ease.linearIn, 0)
            .to(this.owner, { x: LastOX }, 0, Laya.Ease.linearIn, this.Time_JianGe);

        this.TimeLine_2 = Laya.TimeLine
            .to(this.owner.mask, { x: this.owner.mask.x - this.Much }, this.Time, Laya.Ease.linearIn, 0)
            .to(this.owner.mask, { x: LastMX }, 0, Laya.Ease.linearIn, this.Time_JianGe);

        this.TimeLineAll = [
            this.TimeLine_1,
            this.TimeLine_2
        ]
    }
    _Enable() {
        this.Much = this.Much ? this.Much : 1;//防止没值报错
        this.Time = this.Time ? this.Time : 100;//防止没值报错
        this.Time2 = this.Time2 ? this.Time2 : 100;//防止没值报错



        if (this.Type == "默认循环") {
            this.Time_JianGe = this.Time2;
            this.SetTimeLine();
            this.TimeLine_1.play(0, true);
            this.TimeLine_2.play(0, true);
        } else {
            if (this.TFfirst) {
                this.Time_JianGe = 0;
                this.SetTimeLine();
                for (var a = 0; a < this.TimeLineAll.length; a++) {
                    this.TimeLineAll[a].play(0, false);
                    this.TimeLineAll[a].on(Laya.Event.COMPLETE, this, this.PlayOver, [a])
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
        if (this.TimeLine_1) {
            this.TimeLine_1.destroy();
        }
        if (this.TimeLine_2) {
            this.TimeLine_2.destroy();
        }

    }
}