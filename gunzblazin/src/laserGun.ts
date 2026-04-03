// laserGun.ts
import { subscribe } from './observer';
import { addAnimationClass, addShot, publishTopicAfterXSeconds } from './common';

// laserGun.ts
subscribe('machine_gun_done', () => {
  addAnimationClass('laser-gun');
  for (let i = 0; i < 10; i++) {
    addShot('laser', 'laser-gun', 30, 'right', 100 + i * 1000);
  }
});