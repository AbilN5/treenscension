

//UI


//VARIABLES DECLARATION

//constant elements - for easy and frequent access
const elementNames = {
	head: 'jsHead',
	popupShadow: 'jsPopupShadow',
	popupContentSelected: 'jsPopupContentSelected',
	save: 'jsSave',
	saveOptions: 'jsSaveOptions',
	gameplayOptions: 'gameplayOptions',
}

const elementsObject = {
	head: document.getElementById(elementNames.head),
	popupShadow: document.querySelector(`.${elementNames.popupShadow}`),
	save: document.querySelectorAll(`.${elementNames.save}`),
	saveOptions: document.querySelectorAll(`.${elementNames.saveOptions}`),
	gameplayOptions: document.getElementById(elementNames.gameplayOptions),
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
		simple: 'jsSimpleButton',
		toggle: 'jsToggleButton',
		list: 'jsListButton',
		input: 'jsInputButton',
		enter: 'jsEnterBlur',
		changeShortcut: 'jsShortcutButton',
		toDefault: 'jsToDefaultButton',
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
	gameSpeedStates: {
		pause: [gameSpeed.gameStates.keys.pause],
		play: [gameSpeed.gameStates.keys.play],
		playFast: [gameSpeed.gameStates.keys.playFast],
		playFaster: [gameSpeed.gameStates.keys.playFaster],
		playEvenFaster: [gameSpeed.gameStates.keys.playEvenFaster],
		playFastest: [gameSpeed.gameStates.keys.playFastest],
		slow: [gameSpeed.gameStates.keys.slow],
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
	simpleButton: [['event'], []],
	toggleButton: [['event'], []],
	listButton: [['event'], []],
	inputButton: [['event'], []],
	enterBlur: [['event'], []],
	changeShortcut: [['event'], []],
	toDefault: [['event'], []],
}


//markers
const markers = {
	toggleButton: 'jsToggleButton',
	toggleButtonOnCSS: 'buttonOn',
	get toggleButtonOn() {
		return `js${this.toggleButtonOnCSS.charAt(0).toUpperCase() + this.toggleButtonOnCSS.slice(1)}`;
	},
	inputButton: 'jsInputButton',
	listButton: 'jsListButton',
	simpleButton: 'jsSimpleButton',
	button: 'jsButtonMark',
	shortcutButton: 'jsShortcutButton',
	shortcutInvalid: 'invalid',
	shortcutsLock: 'jsShortcutsLock',
}

//updateable html elements
const updateableHTMLElements = document.querySelectorAll('.jsVariable');

//updater variables map
const updaters = {
	get daysSecond() {
		return gameSpeed.gameplay.actionSecond;
	}
}



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

//direct effect buttons - simple buttons
splitElements('click', buttonObjects.splitElements.simple, simpleButtonClick, eventListenersParameters.simpleButton);

//toggle buttons
splitElements('click', buttonObjects.splitElements.toggle, toggleButton, eventListenersParameters.toggleButton);

//list buttons
splitElements('change', buttonObjects.splitElements.list, listButton, eventListenersParameters.listButton);

//input buttons
splitElements('blur', buttonObjects.splitElements.input, inputButton, eventListenersParameters.inputButton);

//blur on enter
splitElements('keydown', buttonObjects.splitElements.enter, enterBlur, eventListenersParameters.enterBlur);

//change shortcut
splitElements('keydown', buttonObjects.splitElements.changeShortcut, changeShortcut, eventListenersParameters.changeShortcut);

//save Options - keep this at last
saveOptionsListeners();



//LOAD SAVE UI
function loadSaveOptions() {
	const elements = elementsObject.saveOptions;

	if (elements[1].dataset.saveKey) { //ensure not first load

		elements.forEach((element) => {
			const savedValue = gameOptions.getValue(element.dataset.saveKey);
			
			//case: input button
			if (element.classList.contains(markers.inputButton)) {
				if (savedValue !== element.value) {

					//input value
					element.value = savedValue;
					
					triggerEventNoBubble('blur', element)
				}
	
			} else 
			
			//case: toggle button
			if (element.classList.contains(markers.toggleButton)) { 
				if (savedValue !== element.innerHTML) {
	
					//triggerEvent
					triggerEventNoBubble('click', element);
				}
			} else 
			
			//case: list button
			if (element.classList.contains(markers.listButton)) {
				if (savedValue !== element.value) {
	
					//input value
					element.value = savedValue;
	
					//trigger event
					triggerEventNoBubble('change', element);
				}
			}
		});
	}
}


//UI LOOP
const loopUI = function() {
	updateVariablesUI();

	//restart loop
	setTimeout(() => {
		requestAnimationFrame(loopUI);
	}, gameOptions.msTickUI);
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

//direct effect button - simple button
function simpleButtonClick(event) {
	//get function to execute
	const clickedElement = event.target;
	const functionCalled = functionsMap.map.get(clickedElement.dataset.eventKey);
	const passEvent = clickedElement.dataset.passEvent;

	//call function
	if (passEvent === 'true') {
		functionCalled(event)
		return true;
	}

	functionCalled();
	return true;
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

//list button
function listButton(event) {
	const listElement = event.target;

	const value = listElement.value;
	const functionCalled = functionsMap.map.get(listElement.dataset.eventKey);

	//call function passing value as parameter
	callElementFunctionValue(listElement, value);
}

//input button
function inputButton(event) {
	const inputElement = event.target;

	const expectedData = inputElement.dataset.type;

	//log error if data missing
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
	callElementFunctionValue(inputElement, value);
}

//blur on enter
function enterBlur(event) {
	const pressedKey = event.key;

	if (pressedKey === 'Enter') {
		event.target.blur();
	}
}

//change shortcut
function changeShortcut(event) {
	const button = event.target;

	//check if not reserved key
	const key = event.key;

	//check if not same key
	if (key === button.innerHTML.toLowerCase()) {
		//blur element
		button.blur();
		
		//prevent event propagation
		event.stopPropagation();

		return;
	}

	const reservedKeys = ['Enter', 'Tab', 'Escape', 'ArrowUp',  'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Delete', 'Backspace']; 
	
	const invalid = reservedKeys.includes(key) || shortcutsMap.has(key);

	//show value is not valid
	if (invalid) {
		//save current shortcut
		const currentShortcut = button.innerHTML;
	
		//display not valid
		button.innerHTML = markers.shortcutInvalid;

		//make element not clickable for 2 seconds
		const msTimer = 2000;
		button.classList.add('invisible');
		
		//blur element
		button.blur();

		//set button back to normal
		setTimeout(function() {
			button.classList.remove('invisible');
			button.innerHTML = currentShortcut;
		}, msTimer);

		//prevent event propagation
		event.stopPropagation();

		return;
	}

	//get used variables
	const upperCaseKey = key.toUpperCase();
	const previousKey = button.innerHTML.toLowerCase();
	const functionArrayCalled = shortcutsMap.get(previousKey);

	//update map
	shortcutsMap.delete(previousKey);
	shortcutsMap.set(key, functionArrayCalled);

	//update button
	button.innerHTML = upperCaseKey;

	//blur button
	event.stopPropagation();
	button.blur();
}

//reset tab to default
function toDefaultButtons(event) {
	const parentNode = document.getElementById(event.target.dataset.parentId);
	const buttonsToReset = parentNode.querySelectorAll(`.${markers.button}`);
	
	//filter stateless buttons
	const filteredButtons = Array.from(buttonsToReset).filter(element => {
		return !element.classList.contains(markers.simpleButton);
	});

	//reset shortcuts if gameplay tab
	if (parentNode === elementsObject.gameplayOptions) {
		localStorage.removeItem(keysJSON.shortcutsMap);
		
		shortcutsMap = new Map();
		setShortcuts();
	}

	//trigger events to default
	filteredButtons.forEach((element) => {
		if (!element.dataset.default) {
			console.log('button missing default value (data-default)');
			return;
		}

		//case: toggle button
		if (element.classList.contains(markers.toggleButton)) {
			//check if not default
			if (element.innerHTML !== element.dataset.default) {
				triggerEventNoBubble('click', element);
			}
		} else

		//case: input button
		if (element.classList.contains(markers.inputButton)) {
			//check if not default
			if (element.value !== element.dataset.default) {
				element.value = element.dataset.default;

				triggerEventNoBubble('blur', element)
			}
		} else

		//case: shortcut button
		if (element.classList.contains(markers.shortcutButton)) {
			//check if not default
			if (element.innerHTML !== element.dataset.default.toUpperCase()) {
				element.innerHTML = element.dataset.default.toUpperCase();
			}
		} else

		//case: list button
		if (element.classList.contains(markers.listButton)) {
			if (element.value !== element.dataset.default) {
				element.value = element.dataset.default;

				triggerEventNoBubble('change', element);
			}
		}
	});
}

//save UI inputs listeners
function saveOptionsListeners() {
	const elements = elementsObject.save; 

	//iterate all saveable elements
	elements.forEach((element) => {

		//find element type and add event listener
		//case: input button
		if (element.classList.contains(markers.inputButton)) {
			element.addEventListener('blur', function(event) {
				const inputElement = event.target;

				//save
				gameOptions.updateValue(inputElement.dataset.saveKey, inputElement.value);

				saveToLocalStorage(keysJSON.saveOptions, gameOptions);
			});
		} else 
		
		//case: toggle button
		if (element.classList.contains(markers.toggleButton)) { 
			element.addEventListener('click', function(event) {
				const toggleElement = event.target;

				//save
				gameOptions.updateValue(toggleElement.dataset.saveKey, toggleElement.innerHTML);
				
				saveToLocalStorage(keysJSON.saveOptions, gameOptions)
			});
		} else 
		
		//case: shortcut button
		if(element.classList.contains(markers.shortcutButton)) {
			element.addEventListener('keydown', function(event) {
				const shortcutButton = event.target;
				

				//ensure shortcut was changed
				if (shortcutButton.innerHTML !== markers.shortcutInvalid) {
					
					//save
					saveToLocalStorage(keysJSON.shortcutsMap, mapToJSON(shortcutsMap));
				}
			});
		} else

		//case: list button
		if (element.classList.contains(markers.listButton)) {
			element.addEventListener('change', function(event) {
				const listElement = event.target;

				//save
				gameOptions.updateValue(listElement.dataset.saveKey, listElement.value);

				saveToLocalStorage(keysJSON.saveOptions, gameOptions)
			});
		}
	});
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

//treenscension
function treenscension() {
	console.log('treenscended');
}

//expand universe
function expandUniverse() {
	console.log('universe expanded');
}

//compress universe
function compressUniverse() {
	console.log('universe compressed')
}

//Update UI
//variables
function updateVariablesUI() {
	updateableHTMLElements.forEach(element => {
		let variableToUse = updaters[element.dataset.variableKey];

		if (typeof variableToUse === 'number') {
			variableToUse = roundToSignificantFigures(variableToUse, UI.numbersFormat.highPrecision);
		}
		
		element.innerText = variableToUse;
	});
}

//Utility functions
//json conversions

//map <-> JSON
function mapToJSON(map) {
	return Array.from(map.entries());
}

function JSONToMap(jsonArray) {
	return new Map(JSON.parse(jsonArray));
}

//save to local storage
function saveToLocalStorage(name, object) {
	const saveString = JSON.stringify(object);
	localStorage.setItem(name, saveString);
}

//trigger event (bubbles: false)
function triggerEventNoBubble(event, element) {
	const triggeredEvent = new Event(event, {bubbles: false});
	element.dispatchEvent(triggeredEvent);
}


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

function callElementFunctionValue(element, value) {
	const functionCalled = functionsMap.map.get(element.dataset.eventKey);
	const parametersKey = element.dataset.parametersKey;

	if (!functionCalled) {
		console.log("button missing function (function wasn't found or data-event-key missing)");
		return;
	}

	if (parametersKey) {
		const parametersArray = eventParameters.map.get(parametersKey);

		functionCalled(value, ...parametersArray);
		return true;
	}

	functionCalled(value)
	return true;
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
const ROUNDING_FACTOR = 10000000
const RANGE_SMALL_NUMBER = ROUNDING_FACTOR;
const LOW_ROUNDING_FACTOR = 100;

function roundToSignificantFigures(number, precision) {
	//if inside rannge
	if ((Math.abs(number) > RANGE_SMALL_NUMBER || Math.abs(number) < 1/RANGE_SMALL_NUMBER) && number !== 0) {
		return number.toPrecision(precision);
	}

	return Math.round(number*LOW_ROUNDING_FACTOR)/LOW_ROUNDING_FACTOR;
}


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