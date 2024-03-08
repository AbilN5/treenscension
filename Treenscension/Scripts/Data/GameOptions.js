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
  
  //update value inside gameOptions
  gameOptions.updateValue = function(key, value) {
    gameOptions[key] = value;
  }

  //retrive value from gameOptions
  gameOptions.getValue = function(key) {
    return gameOptions[key];
  }

  //update ticks (gameplay)
  gameOptions.updateTick = function(newValue) {
    gameOptions.updateValue('tickSecond', newValue);
  }
  
  //update ticks (UI only)
  gameOptions.updateTickUI = function(newValue) {
    gameOptions.updateValue('tickSecondUI', newValue);
  }

  //toggle animations
  gameOptions.toggleAnimations = function() {
    const animationLinks = document.querySelectorAll(`.${UI.animations.class}`);
  
    //remove links if existent
    if (animationLinks[0]) {
      animationLinks.forEach((link) => {
        link.parentNode.removeChild(link);
      });
    } else  { //create if nonexistent
      UI.animations.links.forEach((link) => {
        //create link
        const newLink = document.createElement('link');
        newLink.setAttribute('class', UI.animations.class);
        newLink.setAttribute('rel', 'stylesheet');
        newLink.setAttribute('href', link);
  
        //insert link
        elementsObject.head.insertBefore(newLink, elementsObject.head.firstChild);
      });
    }
  }

  //change language
  function changeLanguage(newLanguage) {
    console.log(newLanguage);
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