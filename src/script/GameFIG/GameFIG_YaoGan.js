/**游戏摇杆 */
export class GameFIG_YaoGan {
    constructor() { //请务必设置这里面的参数
        GameFIG_YaoGan.instance = this;
        this.MovePOS = {
            x: 0,
            y: 0
        }
        this.MoveRot = 0;
        this.TFUSE = false;//摇杆是否可用
    }
    /**
      *  Get 单例获取游戏摇杆
      * @return {GameFIG_YaoGan} 
      */
    static Get() {
        if (GameFIG_YaoGan.instance == undefined) {
            GameFIG_YaoGan.instance = new GameFIG_YaoGan();
        }
        return GameFIG_YaoGan.instance;
    }

    /**
       * 获取目标物体对应当前物体的角度值
       * @param {*} start {x:当前物体x,y：当前物体y}
       * @param {*} end  {x:目标物体x，y:目标物体y}
       */
    GetRotationByTwoNode(start, end) {

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
     * 初始化摇杆：注意设置规范(整局只用初始化一次即可，除非后续变更参数)
     * @param {Number} Movespeed 移动速度
     * @param {Number} MoveJULIbiaoz 摇杆的可移动范围半径 从圆心可以移动到边缘的最大距离 按像素
     * @param {Boolean} TFHide 是否自动隐藏摇杆
     * @param {Laya.Sprite} bigCircle 大圆圈 **（必填）**
     * @param {Laya.Sprite} smallCircle 小圆圈 **（必填）**
     * @param {Laya.Sprite} move_ceng 摇杆移动层(摇杆在什么上面移动 超出则不移动 通常左半屏摇杆 右半屏其他按钮) （可选）
     * @param {Function} MoveFun 摇杆移动回调 返回两个参数 位置和 角度
     * @param {Function} Fun2 松开摇杆 调用方法 （可选）     
     * @param {Function} DownFun 首次按下摇杆 调用方法（可选）
     * @param {Laya.Sprite} YaoGanRoat 摇杆指针 （可选）
     * @param {Boolean} TF_EvenOver 是否 监听move_uo_out事件时候 将move_ceng 切换到顶部 防止其他UI挡住事件监听  默认true
     * @param 其他关联方法 OpenYaoGan(开启摇杆) CloseYaoGan(关闭摇杆)
     */
    InitYaoGan(Movespeed = 1, MoveJULIbiaoz = 100, TFHide = false, bigCircle = null, smallCircle = null, move_ceng = Laya.stage, MoveFun, Fun2, DownFun, YaoGanRoat, TF_EvenOver = true) {
        this.MoveJULIbiaoz = MoveJULIbiaoz;//玩家移动摇杆最大范围半径
        this.Movespeed = Movespeed;
        this.TFHide = TFHide;
        this.YaoGanRoat = YaoGanRoat;
        this.bigCircle = bigCircle; //同理
        this.smallCircle = smallCircle; //把小圆圈传递到当前脚本
        this.player_move = move_ceng; //同理
        this.DownFun = DownFun;
        this.MoveFun = MoveFun;
        this.HuaGan_Fun2 = Fun2; //传递方法过来（当鼠标抬起过后执行的方法）
        if (this.TFHide) {
            this.bigCircle.visible = false;
            this.smallCircle.visible = false;
        } else {
            this.bigCircle.visible = true;
            this.smallCircle.visible = true;
        }
        this.TF_EvenOver = TF_EvenOver;
    }
    /**
     * 开启角色摇杆
     */
    OpenYaoGan() {
        this.TFUSE = true; //当前摇杆可用
        this.player_move.on(Laya.Event.MOUSE_DOWN, this, this.player_move_Down);
        //.on(事件类型，作用域 ，回调方法)    
    }
    /**关闭角色摇杆*/
    CloseYaoGan() {
        if (this.TF_EvenOver) {
            this.player_move.zOrder = -1;
        }
        this.TFUSE = false;
        this.player_move.off(Laya.Event.MOUSE_DOWN, this, this.player_move_Down);
        this.player_move.off(Laya.Event.MOUSE_MOVE, this, this.player_move_Move);
        this.player_move.off(Laya.Event.MOUSE_OUT, this, this.player_move_out);
        this.player_move.off(Laya.Event.MOUSE_UP, this, this.player_move_up);
        if (this.HuaGan_Fun2) {
            this.HuaGan_Fun2();
        }
        if (this.TFHide) {
            this.bigCircle.visible = false;
            this.smallCircle.visible = false;
        }


    }
    /**
     * 玩家摇杆点击
     */
    player_move_Down() {
        if (this.TFUSE) { //限制滑杆可移动的位置
            if (this.TF_EvenOver) {
                this.player_move.zOrder = 15;
            }
            if (this.DownFun) {
                this.DownFun();
            }

            if (this.TFHide) {
                this.bigCircle.pos(Laya.stage.mouseX, Laya.stage.mouseY); //大圆圈的位置等于当前手指位置
                this.smallCircle.pos(Laya.stage.mouseX, Laya.stage.mouseY); //小圆圈位置等于当前手指位置
                this.bigCircle.visible = true; //显示大圆图片
                this.smallCircle.visible = true; //显示小圆图片（visible）是sprite的属性
            } else {
                this.smallCircle.pos(this.bigCircle.x, this.bigCircle.y); //小圆圈位置等于当前手指位置
            }
            this.player_move.on(Laya.Event.MOUSE_MOVE, this, this.player_move_Move); //当玩家手指移动时候执行的方法
            this.player_move.on(Laya.Event.MOUSE_OUT, this, this.player_move_out); //当玩家手指离开屏幕的时候执行的方法
            this.player_move.on(Laya.Event.MOUSE_UP, this, this.player_move_up); //当玩家抬起手指执行的方法
        }
    }

    player_move_Move() {
        // 鼠标与大圆中心x、y轴的距离
        var rotation = this.GetRotationByTwoNode(this.bigCircle, {
            x: Laya.stage.mouseX,
            y: Laya.stage.mouseY
        });
        this.MoveRot = rotation;
        if (isNaN(rotation)) {
            rotation = 0;
        }

        var xx = Laya.stage.mouseX - this.bigCircle.x; //
        var yy = Laya.stage.mouseY - this.bigCircle.y;

        // 勾股定理求斜边
        var obl = Math.sqrt(Math.pow(xx, 2) + Math.pow(yy, 2));
        var bfb = 0;
        if (obl <= this.MoveJULIbiaoz) { //在最远拉伸范围内
            bfb = obl / this.MoveJULIbiaoz;
            this.smallCircle.pos(Laya.stage.mouseX, Laya.stage.mouseY);
        } else { //在最远拉伸范围外
            var smallCircleX = (this.MoveJULIbiaoz * xx) / obl + this.bigCircle.x;
            var smallCircleY = (this.MoveJULIbiaoz * yy) / obl + this.bigCircle.y;
            this.smallCircle.pos(smallCircleX, smallCircleY);
            bfb = 1;
            var pos = this.GetMaxXXYY(rotation, this.MoveJULIbiaoz);
            xx = pos.x;
            yy = pos.y;
        }
        if (this.YaoGanRoat != undefined) {
            this.YaoGanRoat.rotation = rotation + 90;
        }

        this.MovePOS = this.DengbiZhuan(xx, yy);
        if (this.MoveFun) {
            this.MoveFun(this.MovePOS, this.MoveRot);
        }
    }

    player_move_out() {
        if (this.TF_EvenOver) {
            this.player_move.zOrder = -1;
        }
        if (this.HuaGan_Fun2) {
            this.HuaGan_Fun2();
        }
        if (this.TFHide) {
            this.bigCircle.visible = false;
            this.smallCircle.visible = false;

        } else {
            this.smallCircle.pos(this.bigCircle.x, this.bigCircle.y); //小圆圈位置等于当前手指位置
        }

        this.player_move.off(Laya.Event.MOUSE_MOVE, this, this.player_move_Move);
        this.player_move.off(Laya.Event.MOUSE_OUT, this, this.player_move_out);
        this.player_move.off(Laya.Event.MOUSE_UP, this, this.player_move_up);
    }
    player_move_up() {
        if (this.TF_EvenOver) {
            this.player_move.zOrder = -1;
        }
        if (this.HuaGan_Fun2) {
            this.HuaGan_Fun2();
        }
        this.player_move.off(Laya.Event.MOUSE_MOVE, this, this.player_move_Move);
        this.player_move.off(Laya.Event.MOUSE_OUT, this, this.player_move_out);
        this.player_move.off(Laya.Event.MOUSE_UP, this, this.player_move_up);
        if (this.TFHide) {
            this.bigCircle.visible = false;
            this.smallCircle.visible = false;
        } else {
            this.smallCircle.pos(this.bigCircle.x, this.bigCircle.y); //小圆圈位置等于当前手指位置
        }

    }
    /**移动距离转换为实际速度 */
    DengbiZhuan(xx, yy) {
        var bfb = this.Movespeed / this.MoveJULIbiaoz; //  速度/每寸可移动距离
        var speed = {
            x: xx * bfb,
            y: yy * bfb
        };
        return speed
    }
    /**
     * 获取最大方向值
     * @param {*} rotation 旋转角度
     * @param {*} length 长度
     * @param {*} return ---返回一个向量
     */
    GetMaxXXYY(rotation, length) { //sin(弧度)**
        //弧度=角度×π÷180°
        var hudu = 0;
        var xx = 0;
        var yy = 0;
        if (rotation == 0) {
            xx = length;
        } else if (rotation == 270) {
            yy = length * -1;
        } else if (rotation == 180) {
            xx = length * -1;
        } else if (rotation == 90) {
            yy = length;
        } else if (rotation < 360 && rotation > 270) { //第一象限内
            hudu = (rotation * -1) * Math.PI / 180;
            yy = Math.sin(hudu) * length * -1;
            xx = Math.cos(hudu) * length;
        } else if (rotation > 180 && rotation < 270) { //第二象限
            hudu = (90 - (270 - rotation)) * Math.PI / 180;
            yy = Math.sin(hudu) * length * -1;
            xx = Math.cos(hudu) * length * -1;
        } else if (rotation > 90 && rotation < 180) { //第三象限
            hudu = (90 - (180 - rotation)) * Math.PI / 180;
            xx = Math.sin(hudu) * length * -1;
            yy = Math.cos(hudu) * length;
        } else if (rotation > 0 && rotation < 90) { //第四象限
            hudu = (90 - rotation) * Math.PI / 180;
            xx = Math.sin(hudu) * length;
            yy = Math.cos(hudu) * length;
        }
        return {
            x: xx,
            y: yy
        };
    }


}
