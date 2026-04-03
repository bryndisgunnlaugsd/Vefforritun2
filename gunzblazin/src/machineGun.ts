// machineGun.ts
import { subscribe } from './observer';
import { addAnimationClass, addShot, publishTopicAfterXSeconds } from './common';

subscribe('uzi_done', () => {
  addAnimationClass('machine-gun');
  for (let i = 0; i < 10; i++) {
    addShot('bullet', 'machine-gun', 75, 'right', 100 + i * 400);
  }
  publishTopicAfterXSeconds('machine_gun_done', 4100);
});