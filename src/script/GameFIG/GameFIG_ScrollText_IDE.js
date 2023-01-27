import { GameFIG_ScrollText } from "./GameFIG_ScrollText";

/**游戏滚动文本 */
export default class GameFIG_ScrollText_IDE extends Laya.Script {
    constructor() { //请务必设置这里面的参数
        super();
        /** @prop {name:backNode,tips:"背景节点不填则默认Laya.stage",type:Node"}*/
        this.ScrollText = new GameFIG_ScrollText();
    }
    onEnable() {
        if (!this.backNode) {
            this.backNode = Laya.stage;
        }
        this.ScrollText.addScrollText(this.owner, this.backNode);
    }
}
