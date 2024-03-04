//EVENTS MAP
const functionsMap = {
	functions: {
		setGameSpeed: setGameSpeed,
		selectButton: selectButton,
		condenseSoul: condenseSoul,
    treenscension: treenscension,
    expandUniverse: expandUniverse,
    compressUniverse: compressUniverse,
		challenge1: challenge1,
		challenge2: challenge2,
		challenge3: challenge3,
		challenge4: challenge4,
		challenge5: challenge5,
		challenge6: challenge6,
		challenge7: challenge7,
		challenge8: challenge8,
		challenge9: challenge9,
		challenge10: challenge10,
		toggleAnimations: toggleAnimations,
		updateTick: gameSpeed.updateTick,
		updateTickUI: gameSpeed.updateTickUI,
		changeLanguage: changeLanguage,
	},

	key: {
		setGameSpeed: 'setGameSpeed',
		selectButton: 'selectButton',
		condenseSoul: 'condenseSoul',
    treenscension: 'treenscension',
    expandUniverse: 'expandUniverse',
    compressUniverse: 'compressUniverse',
		challenge1: 'challenge1',
		challenge2: 'challenge2',
		challenge3: 'challenge3',
		challenge4: 'challenge4',
		challenge5: 'challenge5',
		challenge6: 'challenge6',
		challenge7: 'challenge7',
		challenge8: 'challenge8',
		challenge9: 'challenge9',
		challenge10: 'challenge10',
		toggleAnimations: 'toggleAnimations',
		updateTick: 'updateTick',
		updateTickUI: 'updateTickUI',
		changeLanguage: 'changeLanguage',
	},

	map: new Map(),
}
//function keys
functionsMap.map.set(functionsMap.key.setGameSpeed, functionsMap.functions.setGameSpeed);
functionsMap.map.set(functionsMap.key.selectButton, functionsMap.functions.selectButton);
functionsMap.map.set(functionsMap.key.condenseSoul, functionsMap.functions.condenseSoul);
functionsMap.map.set(functionsMap.key.treenscension, functionsMap.functions.treenscension);
functionsMap.map.set(functionsMap.key.expandUniverse, functionsMap.functions.expandUniverse);
functionsMap.map.set(functionsMap.key.compressUniverse, functionsMap.functions.compressUniverse);
functionsMap.map.set(functionsMap.key.challenge1, functionsMap.functions.challenge1);
functionsMap.map.set(functionsMap.key.challenge2, functionsMap.functions.challenge2);
functionsMap.map.set(functionsMap.key.challenge3, functionsMap.functions.challenge3);
functionsMap.map.set(functionsMap.key.challenge4, functionsMap.functions.challenge4);
functionsMap.map.set(functionsMap.key.challenge5, functionsMap.functions.challenge5);
functionsMap.map.set(functionsMap.key.challenge6, functionsMap.functions.challenge6);
functionsMap.map.set(functionsMap.key.challenge7, functionsMap.functions.challenge7);
functionsMap.map.set(functionsMap.key.challenge8, functionsMap.functions.challenge8);
functionsMap.map.set(functionsMap.key.challenge9, functionsMap.functions.challenge9);
functionsMap.map.set(functionsMap.key.challenge10, functionsMap.functions.challenge10);
functionsMap.map.set(functionsMap.key.changeShortcut, functionsMap.functions.changeShortcut);
functionsMap.map.set(functionsMap.key.toggleAnimations, functionsMap.functions.toggleAnimations);
functionsMap.map.set(functionsMap.key.updateTick, functionsMap.functions.updateTick);
functionsMap.map.set(functionsMap.key.updateTickUI, functionsMap.functions.updateTickUI);
functionsMap.map.set(functionsMap.key.changeLanguage, functionsMap.functions.changeLanguage);

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