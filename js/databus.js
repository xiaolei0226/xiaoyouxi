// 公共状态
let instance;
export class DataBus{
  constructor(){
    if(instance){
      return instance;
    }else{
      instance = this;
      this.gameover = false;//游戏状态
      this.canvas;
      this.ctx;//画布上下文对象
      this.obstaclelist = [];
      this.timer = null;
    }
  }
  reset(){
    this.gameover = true;
    this.obstaclelist = [];
    this.timer = null;
  }
}