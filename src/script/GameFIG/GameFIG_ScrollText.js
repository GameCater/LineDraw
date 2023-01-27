/**游戏滚动文本 */
export class GameFIG_ScrollText {
    constructor() { //请务必设置这里面的参数
    }
    /**
      * 添加Text鼠标滚动监听(注意* 仅供Laya.Text类型非label)
      * @param {*} text 需要滚动的文本组件
      * @param {*} MoveBack 需要滚动背景节点
      */
    addScrollText(text, MoveBack = Laya.stage) {
        this.ScrollText = text;
        this.ScrollText.overflow = Laya.Text.SCROLL;
        MoveBack.on(Laya.Event.MOUSE_DOWN, this, this.startScrollText);
        this.MoveBack = MoveBack;
    }
    /* 开始滚动文本 */
    startScrollText(e) {
        this.ScrollText_prevX = this.ScrollText.mouseX;
        this.ScrollText_prevY = this.ScrollText.mouseY;
        this.MoveBack.on(Laya.Event.MOUSE_MOVE, this, this.scrollText);
        this.MoveBack.on(Laya.Event.MOUSE_UP, this, this.finishScrollText);
        this.MoveBack.on(Laya.Event.MOUSE_OUT, this, this.finishScrollText);
    }
    /* 停止滚动文本 */
    finishScrollText(e) {
        this.MoveBack.off(Laya.Event.MOUSE_MOVE, this, this.scrollText);
        this.MoveBack.off(Laya.Event.MOUSE_UP, this, this.finishScrollText);
        this.MoveBack.off(Laya.Event.MOUSE_OUT, this, this.finishScrollText);
    }
    /* 鼠标滚动文本 */
    scrollText(e) {
        var nowX = this.ScrollText.mouseX;
        var nowY = this.ScrollText.mouseY;
        this.ScrollText.scrollX += this.ScrollText_prevX - nowX;
        this.ScrollText.scrollY += this.ScrollText_prevY - nowY;
        this.ScrollText_prevX = nowX;
        this.ScrollText_prevY = nowY;
    }
}
