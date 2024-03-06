//Gamespeed object constructor 
function GameSpeedObject(tickUI, tickGame) {
  this.UI = {
    tickSecond: tickUI,
  }

  this.gameplay = {
    tickSecond: tickGame,
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
function insertGettersGameSpeed(gameSpeed) {
  
  Object.defineProperty(gameSpeed.UI,'ms', {
    get: () => {
    return 1000/gameSpeed.UI.tickSecond;
    }
  });

  Object.defineProperty(gameSpeed.gameplay, 'ms', {
    get: () => {
      return 1000/gameSpeed.gameplay.tickSecond;
    }
  });

  Object.defineProperty(gameSpeed.gameplay, 'actionTick', {
    get: () => {
      return !gameSpeed.gameStates.slowed ? 
      gameSpeed.gameplay.base*gameSpeed.gameplay.multiplier()/gameSpeed.gameplay.tickSecond 
      : 
      gameSpeed.gameplay.base/gameSpeed.gameplay.tickSecond; 
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
function insertMethods(gameSpeed) {

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

  //update ticks
  gameSpeed.gameplay.updateTick = function(newTick) {
    gameSpeed.gameplay.tickSecond = newTick;
  }

  gameSpeed.UI.updateTick = function(newTick) {
    gameSpeed.UI.tickSecond = newTick;
  }
}

//prepare gameSpeed object
function prepareGameSpeed(gameSpeed) {
  insertGettersGameSpeed(gameSpeed);
  insertMethods(gameSpeed);
  gameSpeed.gameStates.setGameState(gameSpeed.gameStates.keys.pause);
}

//load gameSpeed object and prepare it to be used
const loadGameSpeedObject = () => {
  try {
    if (gameSave.gameSpeed) {
      this.gameSpeed = gameSave.gameSpeed;
      prepareGameSpeed(this.gameSpeed);
      return true;
    } 
    
    this.gameSpeed = new GameSpeedObject(50, 50);
    gameSave.gameSpeed = this.gameSpeed;
    prepareGameSpeed(this.gameSpeed);
    return false;

  } catch (error) {
    console.error('Error loading gameSpeed from game save', error);
    
    this.gameSpeed = new GameSpeedObject(50, 50);
    gameSave.gameSpeed = this.gameSpeed;
    prepareGameSpeed(this.gameSpeed);
    return false;

  }
}