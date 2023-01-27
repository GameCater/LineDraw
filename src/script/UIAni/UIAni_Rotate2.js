export default class UIAni_Rotate2 extends Laya.Script {

    constructor() {
        super();
        /** @prop {name:speed,tips:"旋转速度",type:Number,default:10}*/
    }
    onUpdate() {
        this.owner.rotation+=this.speed;
    }

}