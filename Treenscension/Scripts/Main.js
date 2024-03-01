//UI


//VARIABLES DECLARATION

//constant elements - for easy and frequent access
const elementNames = {
	head: 'jsHead',
	popupShadow: 'jsPopupShadow',
	popupContentSelected: 'jsPopupContentSelected',
}

const elementsObject = {
	head: document.getElementById(elementNames.head),
	popupShadow: document.querySelector(`.${elementNames.popupShadow}`),
}

//UI object 
const UI = {
	animations: {
		class: 'jsAnimation',
		links: [
			'Treenscension/Stylesheets/Animations.css',
			'Treenscension/Stylesheets/AnimatedBackgrounds.css',
		]
	},
	numbersFormat: {
		highPrecision: 4,
	},
}

//gameSpeed object
const ROUNDING_FACTOR = 1000000;
function GameSpeedObject(ticksPerSecond, ticksPerSecondUI) {
	this.paused = false;
	this.slowed = false;

	this.tick = {
		perSecondUI: ticksPerSecondUI,
		msUI: 1000/ticksPerSecondUI, 
		perSecond: ticksPerSecond,
		ms: 1000/ticksPerSecond,
	};

	this.actions = {
		base: 1/ticksPerSecond,
		timeMultiplier: 0,
		perTick: 0,
		perSecond: 0,
	};

	this.pause = 0;
	this.slow = 1;
	this.play = 1;
	this.playFast = 2;
	this.playFaster = 4;
	this.playEvenFaster = 10;
	this.playFastest = 500000000000000;

	this.updateTick = (newTick) => {
		this.tick.perSecond = newTick;
		this.tick.ms = Math.round(1000/this.tick.perSecond);

		this.actions.base = 1/this.tick.perSecond
		
		if (!this.slowed) {
			this.actions.perTick = Math.round(this.actions.base*this.actions.timeMultiplier*ROUNDING_FACTOR)/ROUNDING_FACTOR;
			this.actions.perSecond = this.actions.perTick*this.tick.perSecond; 	
		} else {
			this.actions.perTick = Math.round(this.actions.base*this.slow*ROUNDING_FACTOR)/ROUNDING_FACTOR;
			this.actions.perSecond = this.actions.perTick*this.tick.perSecond*this.slow;
		}
	};

	this.updateTickUI = (newTick) => {
		this.tick.perSecondUI = newTick;
		this.tick.msUI = Math.round(1000/newTick);
	}

	this.applyGameSpeed = () => {
		this.actions.perTick = Math.round(this.actions.base*this.actions.timeMultiplier*ROUNDING_FACTOR)/ROUNDING_FACTOR;
		this.actions.perSecond = this.actions.perTick*this.tick.perSecond; 
	};

	this.newMultiplier = (newMultiplier) => {
		this.actions.timeMultiplier = newMultiplier;
		this.applyGameSpeed();
	};

	this.setGameSpeedDirect = (newSpeed) => {
		this.actions.perTick = Math.round(this.actions.base*newSpeed*ROUNDING_FACTOR)/ROUNDING_FACTOR;
		this.actions.perSecond = this.actions.perTick*this.tick.perSecond*newSpeed;
	};

	this.updatePaused = (logicalValue) => {
		this.paused = logicalValue;
	}

	this.getActionsSecond = () => {
		return this.actions.perSecond;
	}

	this.getTicksSecondUI = () => {
		return this.tick.perSecondUI;
	}

	this.keys = {
		pause: 'pause',
		slow: 'slow',
		play: 'play',
		playFast: 'playFast',
		playFaster: 'playFaster',
		playEvenFaster: 'playEvenFaster',
		playFastest: 'playFastest',
	};
	this.map = new Map();
}
const gameSpeed = new GameSpeedObject(50, 50);

gameSpeed.map.set(gameSpeed.keys.pause, gameSpeed.pause);
gameSpeed.map.set(gameSpeed.keys.slow, gameSpeed.slow);
gameSpeed.map.set(gameSpeed.keys.play, gameSpeed.play);
gameSpeed.map.set(gameSpeed.keys.playFast, gameSpeed.playFast);
gameSpeed.map.set(gameSpeed.keys.playFaster, gameSpeed.playFaster);
gameSpeed.map.set(gameSpeed.keys.playEvenFaster, gameSpeed.playEvenFaster);
gameSpeed.map.set(gameSpeed.keys.playFastest, gameSpeed.playFastest);

const orphanParameterKeys = {
	resets: {
		condenseSoul: 'condenseSoulReset',
	}
}

//Only change this for name changes
const buttonObjects = {
	section: {
		gameSpeed: {
			name: 'gameSpeed',
			hideTarget: false,
			select: true,
		},
		main: {
			name: 'main',
			hideTarget: true,
			select: false,
		},
		statistics: {
			name: 'statisticsTab',
			hideTarget: true,
			select: false,
		},
		skills: {
			name: 'skillsTab',
			hideTarget: true,
			select: false,
		},
		options: {
			name: 'optionsTab',
			hideTarget: true,
			select: false,
		}
	},

	delegatorElements: {	//for event delegation
		gameSpeed: 'gameSpeed',
		side: 'side',
		statistics: 'statisticsTab',
		skills: 'skillsTab',
		options: 'optionsTab',
		reset: 'resetButtons',
	},

	splitElements: {	//for elements that are section but can't use event delegation
		header: 'header',
		popup: 'jsPopupButtonBox', //these are actually split elements that are delegators
		toggle: 'jsToggleButton',
		input: 'jsInputButton',
		enter: 'jsEnterBlur',
	},

	uniqueElements: {
		popup: 'jsPopupShadowID',
	},
}

//

//constructed selection objects
const groupNamesSpeed = [buttonObjects.delegatorElements.gameSpeed];
const gameSpeedButtons = new ButtonSelectionObject(buttonObjects.section.gameSpeed, groupNamesSpeed);

const groupNamesMain = [buttonObjects.delegatorElements.side, buttonObjects.splitElements.header];
const mainTab = new ButtonSelectionObject(buttonObjects.section.main, groupNamesMain);

const groupNamesStatistics = [buttonObjects.delegatorElements.statistics];
const statisticsTab = new ButtonSelectionObject(buttonObjects.section.statistics, groupNamesStatistics);

const groupNamesSkills = [buttonObjects.delegatorElements.skills];
const skillsTab = new ButtonSelectionObject(buttonObjects.section.skills, groupNamesSkills);

const groupNamesOptions = [buttonObjects.delegatorElements.options];
const optionsTab = new ButtonSelectionObject(buttonObjects.section.options, groupNamesOptions);

//event parameters object
const eventParameters = {
	gameSpeed: {
		pause: [gameSpeed.keys.pause],
		play: [gameSpeed.keys.play],
		playFast: [gameSpeed.keys.playFast],
		playFaster: [gameSpeed.keys.playFaster],
		playEvenFaster: [gameSpeed.keys.playEvenFaster],
		playFastest: [gameSpeed.keys.playFastest],
		slow: [gameSpeed.keys.slow],
	},

	resets: {
		condenseSoul: [],
	},

	map: new Map(),
}



//event listeners parameters object
const eventListenersParameters = {	//this is tricky, always put event parameter as a string and use a bidimensional array with the second array being the array without 'event'
	gameSpeedClick: [['event', gameSpeedButtons], [gameSpeedButtons]],
	mainTabClick: [['event', mainTab], [mainTab]],
	statisticsTabClick: [['event', statisticsTab], [statisticsTab]],
	skillsTabClick: [['event', skillsTab], [skillsTab]],	
	optionsTabClick: [['event', optionsTab], [optionsTab]],
	resetClick: [['event'], []],
	closePopup: [['event'], []],
	toggleButton: [['event'], []],
	inputButton: [['event'], []],
	enterBlur: [['event'], []],
}


//markers
const markers = {
	toggleButton: 'toggleButton',
	toggleButtonOnCSS: 'buttonOn',
	get toggleButtonOn() {
		return `js${this.toggleButtonOnCSS.charAt(0).toUpperCase() + this.toggleButtonOnCSS.slice(1)}`;
	},
	button: 'jsButtonMark',
}

//updateable html elements
const updateableHTMLElements = document.querySelectorAll('.jsVariable');

//updater variables map
const updaterKeys = {
	actionsSecond: 'daysSecond',
}
const updatersMap = new Map();

updatersMap.set(updaterKeys.actionsSecond, gameSpeed.getActionsSecond.bind(gameSpeed));



//LOAD RUN

//events
//gameSpeed buttons click event
delegatorElement('click', buttonObjects.delegatorElements.gameSpeed, selectButton, eventListenersParameters.gameSpeedClick);

//main tab click event 
const headerButton = `${buttonObjects.splitElements.header}Button`;
splitElements('click', headerButton, selectButton, eventListenersParameters.mainTabClick);
delegatorElement('click', buttonObjects.delegatorElements.side, selectButton, eventListenersParameters.mainTabClick);

//statics tab click event
delegatorElement('click', buttonObjects.delegatorElements.statistics, selectButton, eventListenersParameters.statisticsTabClick);

//skills tab click event
delegatorElement('click', buttonObjects.delegatorElements.skills, selectButton, eventListenersParameters.skillsTabClick);

//options tab click event
delegatorElement('click', buttonObjects.delegatorElements.options, selectButton, eventListenersParameters.optionsTabClick);

//reset click event
delegatorElement('click', buttonObjects.delegatorElements.reset, openPopup, eventListenersParameters.resetClick);

//close popup click event
delegatorElement('click', buttonObjects.uniqueElements.popup, closePopup, eventListenersParameters.closePopup);
splitElements('click', buttonObjects.splitElements.popup, closePopup, eventListenersParameters.closePopup);

//toggle buttons
splitElements('click', buttonObjects.splitElements.toggle, toggleButton, eventListenersParameters.toggleButton);

//input buttons
splitElements('blur', buttonObjects.splitElements.input, inputButton, eventListenersParameters.inputButton);

//blur on enter
splitElements('keydown', buttonObjects.splitElements.enter, enterBlur, eventListenersParameters.enterBlur);

//UI LOOP
const loopUI = function() {
	updateVariablesUI();

	//restart loop
	setTimeout(() => {
		requestAnimationFrame(loopUI);
	}, gameSpeed.tick.msUI);
}



//FUNCTIONS

//event listener functions
//adds event listener for each element with a certain class
function splitElements(event, splitClass, callback, parametersArray) {
	const nodeList = document.querySelectorAll(`.${splitClass}`);
	
	nodeList.forEach(node => {
		node.addEventListener(event, function(event) {
			const hasEvent = parametersArray[0].includes('event');

			if (hasEvent) {
				callback(event, ...parametersArray[1]); 
			} else {
				callback(...parametersArray[1]);
			}
			
		});
	});
}

//adds event listener for delegator element
function delegatorElement(event, delegatorID, callback, parametersArray) {
	const delegator = document.getElementById(delegatorID);

	delegator.addEventListener(event, function(event) {
		const hasEvent = parametersArray[0].includes('event');
		if (hasEvent) {
			callback(event, ...parametersArray[1]); 
		} else {
			callback(...parametersArray[1]);
		}

	});
}

//tab objects constructor
function GroupObject(className) {
	this.className = `${className}Button`;
	this.CSSSelected = `${className}Selected`;
}

function ButtonSelectionObject(parentClassObject, groupNamesArray) { 
	this.class = parentClassObject.name;
	this.groups = [];
	groupNamesArray.forEach(className => {
		const group = new GroupObject(className);
		this.groups.push(group);
	});
	
	this.hideTarget = parentClassObject.hideTarget;
	this.stickySelection = parentClassObject.select;

	this.jsSelected = `js${parentClassObject.name.charAt(0).toUpperCase() + parentClassObject.name.slice(1)}Selected`;
}


//event functions
//change game speed
function setGameSpeed(key) {
	const newSpeed = gameSpeed.map.get(key);
	gameSpeed.slowed = false;

	if (key !== gameSpeed.keys.pause) {
		gameSpeed.updatePaused(false);
	} else {
		gameSpeed.updatePaused(true);
	}

	if (key !== gameSpeed.keys.slow) {
		
		gameSpeed.newMultiplier(newSpeed);
		return true;
	}

	gameSpeed.slowed = true;
	gameSpeed.setGameSpeedDirect(gameSpeed.slow);
	return true;
}

//select button
function selectButton(event, buttonObject) {
	const clickedElement = event.target;

	//ensure it's a button
	if (clickedElement.classList.contains(markers.button)) {
		const previousTab = document.querySelector(`.${buttonObject.jsSelected}`);
		
		//check if clicked element was clicked again or doesn't have sticky selection
		if (previousTab !== clickedElement || !buttonObject.stickySelection) {
			//toggle selectedJS
			clickedElement.classList.toggle(buttonObject.jsSelected);
				
			//find group to add CSS
			const clickedElementGroup = findGroup(clickedElement, buttonObject);
			clickedElement.classList.toggle(clickedElementGroup.CSSSelected);

			//activate target
			if (buttonObject.hideTarget) {
				const clickedElementTarget = document.querySelector(clickedElement.dataset.target);
				clickedElementTarget.classList.toggle('hidden');
			}
				
			

			//remove previous tab selected CSS
			if (previousTab && previousTab !== clickedElement) {
				
				const previousTabGroup = findGroup(previousTab, buttonObject);
				previousTab.classList.remove(buttonObject.jsSelected);
				previousTab.classList.remove(previousTabGroup.CSSSelected);
				

				if (buttonObject.hideTarget) {
					const previousTabTarget = document.querySelector(previousTab.dataset.target);
					previousTabTarget.classList.toggle('hidden');
				}
			}
		}
	}

	callElementFunction(clickedElement);
}

//toggle button
function toggleButton(event) {
	const clickedElement = event.target;
	
	//toggle on/off classes
	clickedElement.classList.toggle(markers.toggleButtonOnCSS);
	clickedElement.classList.toggle(markers.toggleButtonOn);

	//change text
	let elementText = clickedElement.innerText;
	if (clickedElement.dataset.customToggle) {
		elementText = (elementText === clickedElement.dataset.customOn) ? clickedElement.dataset.customOff : clickedElement.dataset.customOn;
	} else {
		elementText = (elementText === 'ON') ? 'OFF' : 'ON';
	}
	clickedElement.innerText = elementText;

	callElementFunction(clickedElement);
}

//input button
function inputButton(event) {
	const inputElement = event.target;
	
	const functionCalled = functionsMap.map.get(inputElement.dataset.eventKey);
	const parametersKey = inputElement.dataset.parametersKey;
	const expectedData = inputElement.dataset.type;

	//log error if data missing
	if (!functionCalled) {
		console.log("button missing function (function wasn't found or data-event-key missing)");
		return;
	}

	if (!expectedData) {
		console.log('button missing expected data (data-type)');
		return;
	}

	if (!inputElement.dataset.default) {
		console.log('button missing default value (data-default)');
		return;
	}

	

	//retrieve function to call
	function processInput(element, expectedData) {
		
		if (expectedData === 'integer' || expectedData === 'float') {
			const inputValue = element.value;
			let value;

			if (expectedData === 'integer') {
				value = parseInt(inputValue);
			} else {
				value = parseFloat(inputValue);
			}	
			

			//ensure input is a number
			if (!isNaN(value)) {
				value = processRange(value, element.dataset.range)
				
				//update input area if value updated
				if (value !== inputValue) {
					element.value = value;
				}
				 
				return value;
			} 
			
			//return default if not valid
			if (element.dataset.default) {

				let defaultValue = element.dataset.default;
				if (expectedData === 'integer') {
					defaultValue = parseInt(defaultValue);
				} else {
					defaultValue = parseFloat(defaultValue);
				}
	
				element.value = defaultValue;
				return defaultValue;
			}
		} 
	
		//check if button expects string
		if (expectedData === 'string') {
			return inputElement.value;
		}

	}
	const value = processInput(inputElement, expectedData);

	//call function
	if (parametersKey) {
		const parametersArray = eventParameters.map.get(parametersKey);

		functionCalled(value, ...parametersArray);
		return true;
	}

	functionCalled(value)
	return true;
}

//blur on enter
function enterBlur(event) {
	const pressedKey = event.key;

	if (pressedKey === 'Enter') {
		event.target.blur();
	}
}

//open popup
function openPopup(event) {
	const clickedElement = event.target;

	//ensure the element was unlocked and is a button
	if (!clickedElement.classList.contains('locked') && clickedElement.classList.contains(markers.button)) {
		const popup = document.getElementById(clickedElement.dataset.target);
		
		//show popup
		elementsObject.popupShadow.classList.remove('hidden');
		popup.classList.remove('hidden');

		//add identifier for current popup
		popup.classList.add(elementNames.popupContentSelected);
	}
}

//close popup
function closePopup(event) {
	const clickedElement = event.target;
	
	//ensure it's a button
	if (clickedElement.classList.contains(markers.button)) {
		//close popup
		//find popup to add hidden class
		const popup = document.querySelector(`.${elementNames.popupContentSelected}`);

		//ensure it wasn't closed yet
		if (popup) {
			//hide popup
			elementsObject.popupShadow.classList.add('hidden');
			popup.classList.add('hidden');

			//remove identifier
			popup.classList.remove(elementNames.popupContentSelected);

			//call function if any
			callElementFunction(clickedElement); 
		}
	}
}

//Resets
//condense soul
function condenseSoul() {
	console.log('soul condensed');
}

//Update UI
//variables
function updateVariablesUI() {
	updateableHTMLElements.forEach(element => {
		const variableFunction = updatersMap.get(element.dataset.variableKey);
		let variableToUse = variableFunction()

		if (typeof variableToUse === 'number') {
			variableToUse = roundToSignificantFigures(variableToUse, UI.numbersFormat.highPrecision);
		}
		
		element.innerText = variableToUse;
	});
}

//animations
function toggleAnimations() {
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

//Utility functions
//find group of element
function findGroup(element, buttonObject) {
	return buttonObject.groups.find(group => element.classList.contains(group.className));
}

//toggle hide of target
function toggleHideTarget(element) {
	const elementTarget = document.querySelector(element.dataset.target);
	elementTarget.classList.toggle('hidden');
}

//call function based on element data-event-key
function callElementFunction(element) {
	//perform functions if any
	if (element.dataset.eventKey) {
		const functionCalled = functionsMap.map.get(element.dataset.eventKey);

		//pass parameters if any
		if (element.dataset.parametersKey) {
			const parameters = eventParameters.map.get(element.dataset.parametersKey);
			functionCalled(...parameters);
			return true;
		}

		functionCalled();
		return true;
	}
}

//process numbers based on range (x-y)
function processRange(value, range) {
	const rangeParts = range.split('-');

	//get min/max
	const min = rangeParts[0] !== '' ? parseFloat(rangeParts[0]) : undefined;
	const max = rangeParts[1] !== '' ? parseFloat(rangeParts[1]) : undefined;

	//compare value with range
	if (min !== undefined && value < min) {
		value = min;
	}
	if (max !== undefined && value > max) {
		value = max;
	} 

	return value;
}

//round number to significant digit
const RANGE_SMALL_NUMBER = ROUNDING_FACTOR;
const LOW_ROUNDING_FACTOR = 100;

function roundToSignificantFigures(number, precision) {
	//if inside rannge
	if ((Math.abs(number) > RANGE_SMALL_NUMBER || Math.abs(number) < 1/RANGE_SMALL_NUMBER) && number !== 0) {
		return number.toPrecision(precision);
	}

	return Math.round(number*LOW_ROUNDING_FACTOR)/LOW_ROUNDING_FACTOR;
}

//EVENTS MAP
const functionsMap = {
	functions: {
		setGameSpeed: setGameSpeed,
		selectButton: selectButton,
		condenseSoul: condenseSoul,
		toggleAnimations: toggleAnimations,
		updateTick: gameSpeed.updateTick,
		updateTickUI: gameSpeed.updateTickUI,
	},

	key: {
		setGameSpeed: 'setGameSpeed',
		selectButton: 'selectButton',
		condenseSoul: 'condenseSoul',
		toggleAnimations: 'toggleAnimations',
		updateTick: 'updateTick',
		updateTickUI: 'updateTickUI'
	},

	map: new Map(),
}
//function keys
functionsMap.map.set(functionsMap.key.setGameSpeed, functionsMap.functions.setGameSpeed);
functionsMap.map.set(functionsMap.key.selectButton, functionsMap.functions.selectButton);
functionsMap.map.set(functionsMap.key.condenseSoul, functionsMap.functions.condenseSoul);
functionsMap.map.set(functionsMap.key.toggleAnimations, functionsMap.functions.toggleAnimations);
functionsMap.map.set(functionsMap.key.updateTick, functionsMap.functions.updateTick);
functionsMap.map.set(functionsMap.key.updateTickUI, functionsMap.functions.updateTickUI);

//gamespeed parameter keys
eventParameters.map.set(gameSpeed.keys.pause, eventParameters.gameSpeed.pause);
eventParameters.map.set(gameSpeed.keys.slow, eventParameters.gameSpeed.slow);
eventParameters.map.set(gameSpeed.keys.play, eventParameters.gameSpeed.play);
eventParameters.map.set(gameSpeed.keys.playFast, eventParameters.gameSpeed.playFast);
eventParameters.map.set(gameSpeed.keys.playFaster, eventParameters.gameSpeed.playFaster);
eventParameters.map.set(gameSpeed.keys.playEvenFaster, eventParameters.gameSpeed.playEvenFaster);
eventParameters.map.set(gameSpeed.keys.playFastest, eventParameters.gameSpeed.playFastest);

//reset parameter keys
eventParameters.map.set(orphanParameterKeys.resets.condenseSoul, eventParameters.resets.condenseSoul);



//INITIALIZE ALL LOOPS
loopUI();
//Log logic 
/*
	event constructor - to be made

	const logTable = {
		repetition,
		eventObject: {},
		logCurrent: 0,
		logMax: 200
	}

	function eventObject(eventType, eventListenersParametersArray, eventString) {
		eventType = eventType;
		eventListenersParameters = eventListenersParametersArray;
		eventString = eventString; //save it with the paramters to use and use eval to make it a template string
	}

	function onEvent(repetition, eventObject) {

		if (eventType === logTable.eventType) {
				
			logTable.repetition += repetition; 
		}

	}

*/
