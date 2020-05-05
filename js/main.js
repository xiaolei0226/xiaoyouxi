import {DataBus} from './databus.js';
import {Seabed} from './runtime/seabed.js';
import {SeaLevel} from './runtime/sealevel.js';
import {Button} from './runtime/button.js';
import {Music} from './runtime/music.js';
import {Fish} from './player/fish.js';
import {Score} from './player/score.js';
import {Obstacle} from './runtime/obstacle.js';
let databus = new DataBus();
let music = new Music();

export class Main{
  constructor(){
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    databus.canvas = this.canvas;
    databus.ctx = this.ctx;
    // 页面初始化
    this.init();
    this.registerEvent();
  }
  init(){
    this.bg = new Seabed();
    this.level = new SeaLevel();
    this.btn = new Button();
    this.fish = new Fish();
    this.score = new Score();
    this.createObstacle();
    this.startGame();
  }
  check(){
    const fishBorder = {
      top:this.fish.y,
      bottom:this.fish.y + this.fish.h,
      left:this.fish.x,
      right:this.fish.x + this.fish.w
    };
    for(let i=0;i<databus.obstaclelist.length;i++){
      const obstacle = databus.obstaclelist[i];
      const obstacleBorder = {
        top:obstacle.y,
        bottom:obstacle.y + obstacle.h,
        left:obstacle.x,
        right:obstacle.x + obstacle.w
      };
      if(this.isCheck(fishBorder,obstacleBorder)){
        console.log("抓到鱼了");
        databus.gameover = true;
        return;
      }
    }
    if(this.fish.x>databus.obstaclelist[0].x + databus.obstaclelist[0].img.width && this.score.isScore){
      wx.vibrateShort({
        success:function(){
          console.log('震动成功！')
        }
      });
      this.score.isScore = false;
      this.score.scoreNumber++;
    }
  }
  isCheck(fish,obstacle){
    let s = false;
    if(fish.top > obstacle.bottom ||
      fish.bottom < obstacle.top ||
      fish.right < obstacle.left ||
      fish.left > obstacle.right ||
      fish.bottom > databus.canvas.height
      ){
        s = true;
      }
      return !s;
  }
  startGame(){
    this.check();
    if(!databus.gameover){
      this.bg.render();
      this.level.render();
      // this.btn.render();
      this.fish.render();
      this.score.render();
      if(databus.obstaclelist[0].x + databus.obstaclelist[0].img.width <=0 && databus.obstaclelist.length == 4){
        databus.obstaclelist.shift();
        databus.obstaclelist.shift();
        this.score.isScore = true;
      }
      if(databus.obstaclelist[0].x <= (databus.canvas.width-databus.obstaclelist[0].img.width)/2 && databus.obstaclelist.length==2){
        this.createObstacle();
      }
      databus.obstaclelist.forEach(value=>{
        value.render();
      })
      let timer = requestAnimationFrame(() => {
        this.startGame()
      });
      databus.timer = timer;
    }else{
      databus.reset();
      this.btn.render();
      cancelAnimationFrame(databus.timer);
      wx.triggerGC();
    }
  }
  createObstacle(){   
    let minTop = databus.canvas.height/8;
    let maxTop = databus.canvas.height/2;
    let top = minTop + Math.random() * (maxTop-minTop);
    databus.obstaclelist.push(new Obstacle(top,'images/pi_up.png','up'))
    databus.obstaclelist.push(new Obstacle(top,'images/pi_down.png','down'))
  }
  registerEvent(){
    wx.onTouchStart(() => {
      console.log(1,databus.gameover);
      if(databus.gameover){
        console.log('游戏开始');
        databus.gameover = false;
        this.init();
      }else{
        this.fish.y = this.fish.newy;
        this.fish.time = 0;
      }
    })
  }
}