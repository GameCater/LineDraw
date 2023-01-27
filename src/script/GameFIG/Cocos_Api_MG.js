/**CocosApi*/
export class Cocos_Api_MG {//萌果专用
    constructor() {
    }
    /**
     * 角度转弧度
     * @param {*} angle 角度
     */
    static degreesToRadians(angle) {
        return angle * Cocos_Api_MG.RAD;
    };
    /**
     * 向量旋转
     * @param {*} vecotr2 向量{x:0,y:0} 
     * @param {*} radians 弧度
     */
    static rotateSelf_v2(vecotr2 = { x: 0, y: 0 }, radians = 0) {
        var sin = Math.sin(radians);
        var cos = Math.cos(radians);
        var x = vecotr2.x;
        vecotr2.x = cos * x - sin * vecotr2.y;
        vecotr2.y = sin * x + cos * vecotr2.y;
        return vecotr2;
    }
    /**
     * 获取目标物体对应当前物体的角度值
     * @param {*} start {x:当前物体x,y：当前物体y}
     * @param {*} end  {x:目标物体x，y:目标物体y}
     */
    static GetRotationByTwoNode(start, end) {

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
     * 获取目标物体对应当前物体的距离
     * @param {*} start {x:当前物体x,y：当前物体y}
     * @param {*} end  {x:目标物体x，y:目标物体y}
     */
    static GetDistanceByTwoNode(start, end) {
        return Math.sqrt((start.x - end.x) * (start.x - end.x) + (start.y - end.y) * (start.y - end.y));
    }
    /**
     * 判断三点是否共线 /判断q点是否在P1 P2之间 尽量整数
     * @param {*} Pi {x:0,y:0} 
     * @param {*} Pj {x:0,y:0} 
     * @param {*} Q {x:0,y:0} 
     */
    static onSegment(Pi, Pj, Q) {
        if ((Q.x == Pi.x && Q.y == Pi.y) || (Q.x == Pj.x && Q.y == Pj.y) || (Pj.x == Pi.x && Pj.y == Pi.y)) {
            return false
        }
        if ((Q.x - Pi.x) * (Pj.y - Pi.y) == (Pj.x - Pi.x) * (Q.y - Pi.y)  //叉乘 
            //保证Q点坐标在pi,pj之间 
            && Cocos_Api_MG.min(Pi.x, Pj.x) <= Q.x && Q.x <= Cocos_Api_MG.max(Pi.x, Pj.x)
            && Cocos_Api_MG.min(Pi.y, Pj.y) <= Q.y && Q.y <= Cocos_Api_MG.max(Pi.y, Pj.y))
            return true;
        else
            return false;
    }
    /**找出两个数中的最小值 */
    static min(value1, value2) {
        if (value1 > value2) {
            return value2
        } else {
            return value1
        }
    }
    /**找出两个数中的最大值 */
    static max(value1, value2) {
        if (value1 > value2) {
            return value1
        } else {
            return value2
        }
    }
    /**数组hash去重 */
    static uniArray(arr) {
        var result = [], hash = {};
        for (var i = 0, elem; (elem = arr[i]) != null; i++) {
            if (!hash[elem]) {
                result.push(elem);
                hash[elem] = true;
            } else {
                console.log(elem);
            }
        }
        return result;
    }
}
Cocos_Api_MG.RAD = Math.PI / 180;
Cocos_Api_MG.DEG = 180 / Math.PI;

