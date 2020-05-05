// 分数
import {DataBus} from '../databus.js'
let databus = new DataBus();
export class Score{
  constructor(){
    this.scroeNumber = 0;
    this.isScore = true;
  }
  render(){
    setInterval(function(){
      this.scroeNumber ++;
    },2000)
    databus.ctx.font = '30px 华文彩云';
    databus.ctx.fillStyle = '#fff';
    databus.ctx.fillText("count:"+this.scroeNumber,0,100,200)
  }
}