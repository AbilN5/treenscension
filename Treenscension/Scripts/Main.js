//UI


//VARIABLES DECLARATION

//constant elements - for easy and frequent access
const elementNames = {
	popupShadow: 'jsPopupShadow',
	popupContentSelected: 'jsPopupContentSelected',
}

const elementsObject = {
	popupShadow: document.querySelector(`.${elementNames.popupShadow}`),
}

//gameSpeed object
function gameSpeedObject(ticksPerSecond, ticksPerSecondUI) {
	this.paused = false;
	
	this.tick = {
		perSecondUI: ticksPerSecondUI,
		get msUI() {
			return 1000/ticksPerSecondUI;
		},
		perSecond: ticksPerSecond,
		get ms() {
			return 1000/ticksPerSecond;
		},
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
	this.playFastest = 50;

	this.updateTick = function(newTick) {
		this.tick.perSecond = newTick;
		this.tick.ms = 1000/this.tick.perSecond;

		this.actions.base = 1/this.tick.perSecond;
		this.actions.perTick = this.actions.base*this.actions.multiplier;
		this.actions.perSecond = this.actions.perTick*this.tick.perSecond; 
	};

	this.applyGameSpeed = function() {
		this.actions.perTick = this.actions.base*this.actions.timeMultiplier;
		this.actions.perSecond = this.actions.perTick*this.tick.perSecond;
	};

	this.newMultiplier = function(newMultiplier) {
		this.actions.timeMultiplier = newMultiplier;
		this.applyGameSpeed();
	};

	this.setGameSpeedDirect = function(newSpeed) {
		this.actions.perTick = newSpeed*this.actions.base;
		this.actions.perSecond = newSpeed*this.actions.perTick*this.tick.perSecond;
	};

	this.updatePaused = function(logicalValue) {
		this.paused = logicalValue;
	}

	this.updateTickUI = function(newTick) {
		this.tick.perSecondUI = newTick;
		this.tick.msUI = 1000/newTick;
	}

	this.getActionsSecond = function() {
		return this.actions.perSecond;
	}

	this.getTicksSecondUI = function() {
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
const gameSpeed = new gameSpeedObject(50, 50);

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
	}
}

//constructed selection objects
const groupNamesSpeed = [buttonObjects.delegatorElements.gameSpeed];
const gameSpeedButtons = new buttonSelectionObject(buttonObjects.section.gameSpeed, groupNamesSpeed);

const groupNamesMain = [buttonObjects.delegatorElements.side, buttonObjects.splitElements.header];
const mainTab = new buttonSelectionObject(buttonObjects.section.main, groupNamesMain);

const groupNamesStatistics = [buttonObjects.delegatorElements.statistics];
const statisticsTab = new buttonSelectionObject(buttonObjects.section.statistics, groupNamesStatistics);

const groupNamesSkills = [buttonObjects.delegatorElements.skills];
const skillsTab = new buttonSelectionObject(buttonObjects.section.skills, groupNamesSkills);

const groupNamesOptions = [buttonObjects.delegatorElements.options];
const optionsTab = new buttonSelectionObject(buttonObjects.section.options, groupNamesOptions);

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
}


//markers
const buttonMark = 'buttonMark';

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
splitElements('click', buttonObjects.splitElements.popup, closePopup, eventListenersParameters.closePopup);



//UI LOOP
const loopUI = function() {
	//ensure game isn't paused
	if (!gameSpeed.paused) {
		updateVariablesUI();
	}

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
function groupObject(className) {
	this.className = `${className}Button`;
	this.cssSelected = `${className}Selected`;
}

function buttonSelectionObject(parentClassObject, groupNamesArray) { 
	this.class = parentClassObject.name;
	this.groups = [];
	groupNamesArray.forEach(className => {
		const group = new groupObject(className);
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

	if (key) {
		gameSpeed.updatePaused(false);
	} else {
		gameSpeed.updatePaused(true);
	}

	if (key !== gameSpeed.keys.slow) {
		gameSpeed.newMultiplier(newSpeed);
		return true;
	}
	gameSpeed.setGameSpeedDirect(gameSpeed.slow);
	return true;
}

//select button
function selectButton(event, buttonObject) {
	const clickedElement = event.target;

	//ensure it's a button
	if (clickedElement.classList.contains(buttonMark)) {
		const previousTab = document.querySelector(`.${buttonObject.jsSelected}`);
		
		//check if clicked element was clicked again or doesn't have sticky selection
		if (previousTab !== clickedElement || !buttonObject.stickySelection) {
			//toggle selectedJS
			clickedElement.classList.toggle(buttonObject.jsSelected);
				
			//find group to add CSS
			const clickedElementGroup = findGroup(clickedElement, buttonObject);
			clickedElement.classList.toggle(clickedElementGroup.cssSelected);

			//activate target
			if (buttonObject.hideTarget) {
				const clickedElementTarget = document.querySelector(clickedElement.dataset.target);
				clickedElementTarget.classList.toggle('hidden');
			}
				
			

			//remove previous tab selected css
			if (previousTab && previousTab !== clickedElement) {
				
				const previousTabGroup = findGroup(previousTab, buttonObject);
				previousTab.classList.remove(buttonObject.jsSelected);
				previousTab.classList.remove(previousTabGroup.cssSelected);
				

				if (buttonObject.hideTarget) {
					const previousTabTarget = document.querySelector(previousTab.dataset.target);
					previousTabTarget.classList.toggle('hidden');
				}
			}
		}
	}

	callElementFunction(clickedElement);
}

//open popup
function openPopup(event) {
	const clickedElement = event.target;

	//ensure the element was unlocked and is a button
	if (!clickedElement.classList.contains('locked') && clickedElement.classList.contains(buttonMark)) {
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
	if (clickedElement.classList.contains(buttonMark)) {
		//find popup to add hidden class
		const popup = document.querySelector(`.${elementNames.popupContentSelected}`);

		//hide popup
		elementsObject.popupShadow.classList.add('hidden');
		popup.classList.add('hidden');

		//remove identifier
		popup.classList.remove(elementNames.popupContentSelected);

		//call function if any
		callElementFunction(clickedElement);
	}
}

//Resets
//condense soul
function condenseSoul() {
	console.log('soul condensed');
}

//Update UI
function updateVariablesUI() {
	updateableHTMLElements.forEach(element => {
		const variable = updatersMap.get(element.dataset.variableKey);
		element.innerText = variable();
	});
}

//Utility functions
function findGroup(element, buttonObject) {
	return buttonObject.groups.find(group => element.classList.contains(group.className));
}

function toggleHideTarget(element) {
	const elementTarget = document.querySelector(element.dataset.target);
	elementTarget.classList.toggle('hidden');
}

function callElementFunction(element) {
	//perform functions if any
	if (element.dataset.eventKey) {
		const functionCalled = functionsKey.map.get(element.dataset.eventKey);

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


//EVENTS MAP
const functionsKey = {
	key: {
		setGameSpeed: 'setGameSpeed',
		selectButton: 'selectButton',
		condenseSoul: 'condenseSoul',
	},

	map: new Map(),
	}

const setGameSpeedFunction = setGameSpeed;
const selectButtonFunction = selectButton;
const condenseSoulFunction = condenseSoul;

//function keys
functionsKey.map.set(functionsKey.key.setGameSpeed, setGameSpeedFunction);
functionsKey.map.set(functionsKey.key.selectButton, selectButtonFunction);
functionsKey.map.set(functionsKey.key.condenseSoul, condenseSoulFunction);

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
