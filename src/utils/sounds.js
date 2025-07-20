const startsound = new Audio("/SnakeGame/startGame.mp3");
const bonussound = new Audio("/SnakeGame/bonus.mp3");
const stopsound = new Audio("/SnakeGame/stopGame.mp3");

export const playStartSound = () => {
  startsound.currentTime = 0;
  startsound.play();
};

export const playBonusSound = () => {
  bonussound.currentTime = 0;
  bonussound.play();
};

export const playStopSound = () => {
  stopsound.currentTime = 0;
  stopsound.play();
};
