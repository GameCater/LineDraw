

import UIAni from "./UIAni";

export default class UIAni_TanHuang extends UIAni {

    constructor() {
        super();
        this.IsRotate = false;//跟随鼠标旋转
    }

    _Enable() {
        this.owner.on(Laya.Event.MOUSE_DOWN, this, this.onStartDrag);
        this.owner.on(Laya.Event.DRAG_MOVE, this, this.DrageMove);
        this.dragRegion = new Laya.Rectangle(this.owner.x, this.owner.y, 0, 0);
    }
    onStartDrag(e) {
        //鼠标按下开始拖拽(设置了拖动区域和超界弹回的滑动效果)
        this.owner.startDrag(this.dragRegion, true, 200);
        this.IsRotate = true;
    }

    DrageMove() {
        this.owner.parent.rotation = this.getfangxiang({ x: 0, y: 0 }, { x: this.owner.parent.mouseX, y: this.owner.parent.mouseY }) - 90;
    }

    onDestroy() {

    }
    /**
     * 获取目标物体对应当前物体的角度值
     * @param {*} start {x:当前物体x,y：当前物体y}
     * @param {*} end  {x:目标物体x，y:目标物体y}
     */
    getfangxiang(start, end) {

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
}