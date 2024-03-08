//gameSpeed declaration
let gameSpeed;

//Gamespeed object constructor 
function GameSpeedObject(tickUI, tickGame) {

  this.gameplay = {
    base: 1,
  }

  this.gameStates = {
    pause: 0,
	  slow: 1,
	  play: 1,
	  playFast: 2,
	  playFaster: 4,
	  playEvenFaster: 10,
	  playFastest: 500000000000000,
    paused: false,
    slowed: false,
    current: this.pause,
    
    keys: {
      pause: 'pause',
      slow: 'slow',
      play: 'play',
      playFast: 'playFast',
      playFaster: 'playFaster',
      playEvenFaster: 'playEvenFaster',
      playFastest: 'playFastest',
    }
  };

  this.multipliers = {

  };

  this.multiplierCallers = {
  };
}

//insert getters for object, as they can't be saved on local storage
function insertGettersGameSpeed() {

  Object.defineProperty(gameSpeed.gameplay, 'actionTick', {
    get: () => {
      return !gameSpeed.gameStates.slowed ? 
      gameSpeed.gameplay.base*gameSpeed.gameplay.multiplier()/gameOptions.tickSecond 
      : 
      gameSpeed.gameplay.base/gameOptions.tickSecond; 
    }
  });

  Object.defineProperty(gameSpeed.gameplay, 'actionSecond', {
    get: () => {
      return !gameSpeed.gameStates.slowed ? 
      gameSpeed.gameplay.base*gameSpeed.gameplay.multiplier() 
      : 
      gameSpeed.gameplay.base;
    }
  });
}

//insert multiplier calculation method
function insertGameSpeedMethods() {

  //multiplier method
  gameSpeed.gameplay.multiplier = function() {
    let multiplier = gameSpeed.gameStates.current;

    for (const multiplierCaller in gameSpeed.multiplierCallers) {
      multiplier *= gameSpeed.multiplierCallers[multiplierCaller]();
    }

    return multiplier;
  }

  //change game state
  gameSpeed.gameStates.setGameState = function(gameState) {
    gameSpeed.gameStates.current = gameSpeed.gameStates[gameState];
  
    gameSpeed.gameStates.slowed = gameState === gameSpeed.gameStates.keys.slow;
    gameSpeed.gameStates.paused = gameState === gameSpeed.gameStates.keys.pause;
  }
}

//prepare gameSpeed object
function prepareGameSpeed() {
  insertGettersGameSpeed();
  insertGameSpeedMethods();
  gameSpeed.gameStates.setGameState(gameSpeed.gameStates.keys.pause);
}

//load gameSpeed object and prepare it to be used
const loadGameSpeedObject = () => {
  try {
    if (gameSave.gameSpeed) {
      gameSpeed = gameSave.gameSpeed;
      prepareGameSpeed();
      return true;
    } 
    
    gameSpeed = new GameSpeedObject(50, 50);
    gameSave.gameSpeed = gameSpeed;
    prepareGameSpeed();
    return false;

  } catch (error) {
    console.error('Error loading gameSpeed from game save', error);
    
    gameSpeed = new GameSpeedObject(50, 50);
    gameSave.gameSpeed = gameSpeed;
    prepareGameSpeed();
    return false;

  }
}