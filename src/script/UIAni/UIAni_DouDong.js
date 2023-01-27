import UIAni from "./UIAni";
//IDE 自定义组件
export default class UIAni_DouDong extends UIAni {

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
            .to(this.owner, {}, this.Time_JianGe)
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
        if (this.TimeLine) {
            this.TimeLine.destroy();
        }
      
    }
}