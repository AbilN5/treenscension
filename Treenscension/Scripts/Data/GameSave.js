//gameSave object - this should be very simple, and get populated later
const loadGameSave = () => {
  try {
    const gameSaveObject = JSON.parse(getSaveString()); 

    //save exists
    if (gameSaveObject) {
      this.gameSave = gameSaveObject;
      return true;
    }

    //save doesn't exist
    this.gameSave = {}
    return true;

  } 
  //error loading game save
  catch (error) {
    console.error('Error loading game save:', error);
    window.alert( `Error loading game save! Refresh game and try again. Export your save and import if not working.`);

    return false;
  }
}

//used for exporting
function getSaveString() {
  return localStorage.getItem(keysJSON.gameSave);
}

//used for importing
function saveGameSaveString(string) {
  localStorage.setItem(keysJSON.gameSave, string);
}

//save game
function saveGame() {
  const saveString = JSON.stringify(gameSave);
  saveGameSaveString(saveString);
}
