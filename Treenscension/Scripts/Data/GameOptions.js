//game options constructor
function GameOptions() {
  const updateTickElement = document.getElementById('inputUpdateTick');
  const updateTickUIElement = document.getElementById('inputUpdateTickUI');
  const toggleAnimationsElement = document.getElementById('toggleAnimations');
  const changeLanguageElement = document.getElementById('changeLanguage');

  this.tickSecond = updateTickElement.dataset.default;
  this.tickSecondUI = updateTickUIElement.dataset.default;
  this.animations = toggleAnimationsElement.dataset.default;
  this.language = changeLanguageElement.dataset.default;

  this.keys = {
    tickSecond: updateTickElement.dataset.saveKey,
    tickSecondUI: updateTickUIElement.dataset.saveKey,
    animations: toggleAnimationsElement.dataset.saveKey,
    language: changeLanguageElement.dataset.saveKey,
  }
}

//insert getters
function insertGettersGameOptions(gameOptions) {

  Object.defineProperty(gameOptions, 'msTickUI', {
    get: () => {
      return 1000/gameOptions.tickSecondUI;
    }
  });
  Object.defineProperty(gameOptions, 'msTick', {
    get: () => {
      return 1000/gameOptions.tickSecond;
    }
  })
};


//insert methods
function insertGameOptionsMethods(gameOptions) {
  
  gameOptions.updateValue = function (key, value) {
    gameOptions[key] = value;
  }

  gameOptions.getValue = function (key) {
    return gameOptions[key];
  }
}

//load or create gameOptions

const loadGameOptionsObject = () => {
  try {
    //retrieve game options from local storage
    const gameOptionsString = localStorage.getItem(keysJSON.saveOptions);
    this.gameOptions = JSON.parse(gameOptionsString) || new GameOptions();

    //insert functions back to object
    insertGettersGameOptions(this.gameOptions)
    insertGameOptionsMethods(this.gameOptions);
  }
  //error loading game options
  catch (error) {
    console.error('Error loading game options:', error);
    
    //recreate game options
    this.gameOptions = new GameOptions();
    insertGettersGameOptions(this.gameOptions)
    insertGameOptionsMethods(this.gameOptions);
  }
}