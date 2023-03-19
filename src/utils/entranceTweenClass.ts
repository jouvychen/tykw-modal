import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'; // 补间动画
export class EntranceAnimations {
  public tween: typeof TWEEN;
  public constructor() {
    console.log('构造函数');
  }
  stop() {
    this.tween && this.tween.stop();
  }
  restart() {
    this.tween && this.tween.start();
  }
  animateCamera(camera:any, controls:any, newP:any, newT:any, time = 2000, callBack:any) {
    this.tween = new TWEEN.Tween({
      x1: camera.position.x,
      y1: camera.position.y,
      z1: camera.position.z,
      x2: controls.target.x,
      y2: controls.target.y,
      z2: controls.target.z,
    });
    this.tween.to({
      x1: newP.x,
      y1: newP.y,
      z1: newP.z,
      x2: newT.x,
      y2: newT.y,
      z2: newT.z,
    }, time);
    this.tween.onUpdate((object:any) => {
      camera.position.x = object.x1;
      camera.position.y = object.y1;
      camera.position.z = object.z1;
      controls.target.x = object.x2;
      controls.target.y = object.y2;
      controls.target.z = object.z2;
      controls.update();
    });
    this.tween.onComplete(() => {
      controls.enabled = true;
      callBack();
    });
    this.tween.easing(TWEEN.Easing.Cubic.InOut);
    this.tween.start();
  };
};
