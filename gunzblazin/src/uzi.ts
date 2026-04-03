import { subscribe, publish } from './observer';
import { addAnimationClass, addShot, publishTopicAfterXSeconds } from './common';

subscribe('pistol_done', () => {
  addAnimationClass('uzi');
  for (let i = 0; i < 10; i++) {
    addShot('bullet', 'uzi', 60, 'left', 100 + i * 200);
  }
  publishTopicAfterXSeconds('uzi_done', 2100);
});