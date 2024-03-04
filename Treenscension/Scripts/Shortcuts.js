function shortcutCaller (eventType, setBubbles, elementID) {
  //find element
  const eventTarget = document.getElementById(elementID);

  //ensure element exists
  if (eventTarget) {
    
    //input event
    const event = new Event(eventType, {bubbles: setBubbles});
    eventTarget.dispatchEvent(event);
    return true;
  }

  console.log(`event target not found (${elementID})`);
}

//shortcuts map
let shortcutsMap = new Map();
loadShortcutsMap();

//set keys to events with parameters on need 
function setShortcuts() {
  const setterCondenseSoul = document.getElementById('shortcutSetterCondenseSoul');
  const setterTreenscension = document.getElementById('shortcutSetterTreenscension');
  const setterExpandUniverse = document.getElementById('shortcutSetterExpandUniverse');
  const setterCompressUniverse = document.getElementById('shortcutSetterCompressUniverse');
  const setterChallenge1 = document.getElementById('shortcutSetterChallenge1');
  const setterChallenge2 = document.getElementById('shortcutSetterChallenge2');
  const setterChallenge3 = document.getElementById('shortcutSetterChallenge3');
  const setterChallenge4 = document.getElementById('shortcutSetterChallenge4');
  const setterChallenge5 = document.getElementById('shortcutSetterChallenge5');
  const setterChallenge6 = document.getElementById('shortcutSetterChallenge6');
  const setterChallenge7 = document.getElementById('shortcutSetterChallenge7');
  const setterChallenge8 = document.getElementById('shortcutSetterChallenge8');
  const setterChallenge9 = document.getElementById('shortcutSetterChallenge9');
  const setterChallenge10 = document.getElementById('shortcutSetterChallenge10');

  shortcutsMap.set(setterCondenseSoul.dataset.default, 
    [setterCondenseSoul.dataset.shortcutIdentifier, ['click', true, 'condenseSoulButton']]);
  shortcutsMap.set(setterTreenscension.dataset.default, 
    [setterTreenscension.dataset.shortcutIdentifier, ['click', true, 'treenscensionButton']]);
  shortcutsMap.set(setterExpandUniverse.dataset.default, 
    [setterExpandUniverse.dataset.shortcutIdentifier, ['click', true, 'expandUniverseButton']]);
  shortcutsMap.set(setterCompressUniverse.dataset.default, 
    [setterCompressUniverse.dataset.shortcutIdentifier, ['click', true, 'compressUniverseButton']]);
  shortcutsMap.set(setterChallenge1.dataset.default, 
    [setterChallenge1.dataset.shortcutIdentifier, ['click', true, '']]);
  shortcutsMap.set(setterChallenge2.dataset.default, 
    [setterChallenge2.dataset.shortcutIdentifier, ['click', true, '']]);
  shortcutsMap.set(setterChallenge3.dataset.default, 
    [setterChallenge3.dataset.shortcutIdentifier, ['click', true, '']]);
  shortcutsMap.set(setterChallenge4.dataset.default, 
    [setterChallenge4.dataset.shortcutIdentifier, ['click', true, '']]);
  shortcutsMap.set(setterChallenge5.dataset.default, 
    [setterChallenge5.dataset.shortcutIdentifier, ['click', true, '']]);
  shortcutsMap.set(setterChallenge6.dataset.default, 
    [setterChallenge6.dataset.shortcutIdentifier, ['click', true, '']]);
  shortcutsMap.set(setterChallenge7.dataset.default, 
    [setterChallenge7.dataset.shortcutIdentifier, ['click', true, '']]);
  shortcutsMap.set(setterChallenge8.dataset.default, 
    [setterChallenge8.dataset.shortcutIdentifier, ['click', true, '']]);
  shortcutsMap.set(setterChallenge9.dataset.default, 
    [setterChallenge9.dataset.shortcutIdentifier, ['click', true, '']]);
  shortcutsMap.set(setterChallenge10.dataset.default, 
    [setterChallenge10.dataset.shortcutIdentifier, ['click', true, '']]);
}


document.addEventListener('keydown', function(event) {
  //ensure key has shortcut
  const shortcutArray = shortcutsMap.get(event.key);
  if (!shortcutArray)  {
    return;
  }

  //ensure not typing or locked for some reason
  const activeElement = document.activeElement;
  const shortcutLocked = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.classList.contains(markers.shortcutsLock);  
  
  if (!shortcutLocked) {
    
    //call shortcut event
    shortcutCaller(...shortcutArray[1]);
  }
});

//load shortcuts map function
function loadShortcutsMap() {
  try {
    const savedShortcuts = localStorage.getItem(keysJSON.shortcutsMap);

    //load shortcuts
    if (savedShortcuts) {
      //load map
      shortcutsMap = JSONToMap(savedShortcuts);
      
      //set buttons to their correct key
      const shortcutButtons = document.querySelectorAll(`.${markers.shortcutButton}`);
      shortcutButtons.forEach((element) => {
        const buttonKey = element.innerHTML.toLowerCase();
        const valueKey = element.dataset.shortcutIdentifier;

        //check if shortcut was reassigned
        const foundKey = findMapValue(valueKey, buttonKey);

        if (foundKey) {

          //reassign element's HTML
          element.innerHTML = foundKey.toUpperCase();
        }

        function findMapValue(valueKey, buttonKey) {
          for (const [key, value] of shortcutsMap.entries()) {
            if (value[0] === valueKey && buttonKey !== key) {
              return key;
            }
          }
          return null;
        }
      });

      return true;
    } 

    //set shortcuts
    setShortcuts();

  } catch (error) {
    console.error('Error loading saved shortcuts', error);
  }
}