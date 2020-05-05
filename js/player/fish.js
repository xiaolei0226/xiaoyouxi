// 鱼
import {DataBus} from '../databus.js'
let databus = new DataBus();

export class Fish{
  constructor(){
    this.img = wx.createImage();
    this.img.src = 'images/fish1.png';
    this.x = databus.canvas.width/4;
    this.y = databus.canvas.height/2;
    this.w = 41;
    this.h = 30;
    this.time = 0;
    this.newy = databus.canvas.height/2;
  }
  render(){
    let g = 0.98 / 2.9;
    let offsetUp = 30;
    let offsetY = (g*this.time*(this.time-offsetUp))/2;
    this.newy = this.y + offsetY;
    this.time ++;
    databus.ctx.drawImage(this.img,0,0,this.w,this.h,this.x,this.newy,this.w,this.h)
  }
}