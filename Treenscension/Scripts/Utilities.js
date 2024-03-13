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

//replace string to question marks
function replaceToQuestion(string) {
	return string.replace(/[^:]/g, '?');
}

//add bold
function addBold(string) {
	return `<b>${string}</b>`;
}