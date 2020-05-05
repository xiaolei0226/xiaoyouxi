// 音乐
let instance;
export class Music{
  constructor(){
    if(instance){
      return instance;
    }
    instance = this;
    this.bgmAudio = wx.createInnerAudioContext();
    this.bgmAudio.loop = true;
    this.bgmAudio.src = 'audios/bgm.mp3';
    // this.playBgm();
  }
  playBgm(){
    this.bgmAudio.play();

  }
}