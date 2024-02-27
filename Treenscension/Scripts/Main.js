//UI


		//VARIABLES DECLARATION

		function gameSpeedObject(ticksPerSecond) {
			this.paused = false;
			
			this.tick = {
				perSecond: ticksPerSecond,
				get ms()  {
					return 1000/ticksPerSecond;
				}
			};

			this.actions = {
				base: 1/ticksPerSecond,
				timeMultiplier: 1,
				get perSecond() { 
					return (1/ticksPerSecond)*this.timeMultiplier;
				},
				
				applyGameSpeed: function() {
					this.perSecond = this.base*this.timeMultiplier;
				},

				newMultiplier: function(newMultiplier) {
					this.timeMultiplier = newMultiplier;
					this.applyGameSpeed();
				},

				setGameSpeedDirect: function(newSpeed) {
					this.perSecond = newSpeed;
				}
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
				this.tick.ms = 1000/perSecond;

				this.actions.base = 1/this.tick.perSecond;
				this.actions.perSecond = this.actions.base*this.actions.multiplier; 
			};

			this.keys = {
				pause: 'pause',
				slow: 'slow',
				play: 'play',
				playFast: 'playFast',
				playFaster: 'playFaster',
				playEvenFaster: 'playEvenFaster',
				playFastest: 'playFastest',
			};
		}
		const gameSpeed = new gameSpeedObject(50);
		

		//Only change this for name changes
		const buttonObjects = {
			section: {
				gameSpeed: {
					name: 'gameSpeed',
					hideTarget: false,
					select: true,
          mandatorySelection: true,
				},
        main: {
					name: 'main',
					hideTarget: true,
					select: true,
          mandatorySelection: false,
				},
				statistics: {
					name: 'statisticsTab',
					hideTarget: true,
					select: false,
          mandatorySelection: false,
				},
				skills: {
					name: 'skillsTab',
					hideTarget: true,
					select: false,
				},
			},

			delegatorElements: {	//for event delegation
				gameSpeed: 'gameSpeed',
        side: 'side',
				statistics: 'statisticsTab',
				skills: 'skillsTab',
			},

			splitElements: {	//for elements that are section but can't use event delegation
				header: 'header'
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



    //event parameters object
    const eventParameters = {
      gameSpeed: {
        pause: [gameSpeed.pause],
        play: [gameSpeed.play],
        playFast: [gameSpeed.playFast],
        playFaster: [gameSpeed.playFaster],
        playEvenFaster: [gameSpeed.playEvenFaster],
        playFastest: [gameSpeed.playFastest],
        slow: [gameSpeed.slow],
      },

      map: new Map(),
    }

    eventParameters.map.set(gameSpeed.keys.pause, eventParameters.gameSpeed.pause);
		eventParameters.map.set(gameSpeed.keys.slow, eventParameters.gameSpeed.slow);
		eventParameters.map.set(gameSpeed.keys.play, eventParameters.gameSpeed.play);
		eventParameters.map.set(gameSpeed.keys.playFast, eventParameters.gameSpeed.playFast);
		eventParameters.map.set(gameSpeed.keys.playFaster, eventParameters.gameSpeed.playFaster);
		eventParameters.map.set(gameSpeed.keys.playEvenFaster, eventParameters.gameSpeed.playEvenFaster);
		eventParameters.map.set(gameSpeed.keys.playFastest, eventParameters.gameSpeed.playFastest);

		//event listeners parameters object
		const eventListenersParameters = {	//this is tricky, always put event parameter as a string and use a bidimensional array with the second array being the array without 'event'
			gameSpeedClick: [['event', gameSpeedButtons], [gameSpeedButtons]],
      mainTabClick: [['event', mainTab], [mainTab]],
			statisticsTabClick: [['event', statisticsTab], [statisticsTab]],
			skillsTabClick: [['event', skillsTab], [skillsTab]],	
		}


		//markers
		const buttonMark = 'buttonMark';


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

			if (this.stickySelection) {
				this.jsSelected = `js${parentClassObject.name.charAt(0).toUpperCase() + parentClassObject.name.slice(1)}Selected`
			}
		}
		
		

		//event functions
		//change game speed
		function setGameSpeed(key) {
			const newSpeed = gameSpeed.map.get(key);

			if (newSpeed) {
					gameSpeed.paused = false;
			} else {
				gameSpeed.paused = true;
			}

			if (key !== gameSpeed.keys.slow) {
				gameSpeed.actions.newMultiplier(newSpeed);
				return true;
			}
			gameSpeed.actions.setGameSpeedDirect(gameSpeed.slow);
			return true;
		}

		//select button
		function selectButton(event, buttonObject) {
			const clickedElement = event.target;

			//ensure it's clickable and has sticky selection
			if (clickedElement.classList.contains(buttonMark) && buttonObject.stickySelection) {
				const previousTab = document.querySelector(`.${buttonObject.jsSelected}`);
				if (previousTab !== clickedElement && !buttonObject.mandatorySelection) {
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

			//perform functions if any
			if (clickedElement.dataset.eventKey) {
				const functionCalled = functionsKey.map.get(clickedElement.dataset.eventKey);

        if (clickedElement.dataset.parametersKey) {
          const parameters = eventParameters.map.get(clickedElement.dataset.parametersKey);
          functionCalled(...parameters);
          return true;
        }

        functionCalled();
        return true;
			}
		}

		//Utility functions
		function findGroup(element, buttonObject) {
			return buttonObject.groups.find(group => element.classList.contains(group.className));
		}

		function toggleHideTarget(element) {
			const elementTarget = document.querySelector(element.dataset.target);
			elementTarget.classList.toggle('hidden');
		}


    //EVENTS MAP
    const functionsKey = {
      key: {
        setGameSpeed: 'setGameSpeed',
        selectButton: 'selectButton',
      },

      map: new Map(),
      }

    functionsKey.map.set(setGameSpeed, functionsKey.setGameSpeed);
    functionsKey.map.set(selectButton, functionsKey.selectButton);

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
