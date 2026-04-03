import { subscribe, publish } from './observer';
import { addAnimationClass, addShot, publishTopicAfterXSeconds } from './common';

// Pistol fires immediately (no subscription needed - it starts the chain)
addAnimationClass('pistol');


addShot('bullet', 'pistol', 50, 'right', 100);
addShot('bullet', 'pistol', 50, 'right', 700);


// Notify everyone that pistol is done (after animation finishes)
publishTopicAfterXSeconds('pistol_done', 2000);