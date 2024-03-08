//manual save
function manualSaveClick(event) {
  //save button's html
  const button = event.target;
  const buttonHTML = button.innerHTML;
  
  //save game
  button.innerHTML = 'saving...';
  button.classList.add('invisible');
  saveGame();

  //update button status after completion
  button.innerHTML = 'Saved!';

  //reset button to normal
  setTimeout(() => {
    button.innerHTML = buttonHTML;
    button.classList.remove('invisible');
  }, 1000);
}

//save text

function importSaveText(event) {
  //get input field
  const button = event.target;
  const inputField = document.getElementById(button.dataset.inputID);

  //get save string
  const saveString = inputField.value;

  //ensure field is not empty and import save
  if (saveString) {
    localStorage.setItem(keysJSON.gameSave, saveString);
    return true; //succesful import
  }

  //display message saying field is empty and make buttons not clickable
  const twinButton = document.getElementById(button.dataset.twinButtonID);

  button.classList.add('invisible');
  twinButton.classList.add('invisible');
  inputField.classList.add('invisible');

  inputField.value = "You can't import an empty text for a save!"

  //make buttons and input field clickable again after some time
  setTimeout(() => {
    inputField.value = '';

    button.classList.remove('invisible');
    twinButton.classList.remove('invisible');
    inputField.classList.remove('invisible');
  }, 2000);

  return false; //import didn't happen
}

function exportSaveText(event) {
  //get input field
  const button = event.target;
  const inputField = document.getElementById(button.dataset.inputID);

  //get save string
  const saveString = getSaveString();

  //input it on input field
  inputField.value = saveString;
}


//save file

function importSaveFile() {
  //create element for input
  const inputElement = document.createElement('input');
  inputElement.type = 'file';
  inputElement.accept = '.txt'; //accepts only text

  //add event listener for change
  inputElement.addEventListener('change', readFile);

  //trigger input
  const clickEvent = new Event('click');
  inputElement.dispatchEvent(clickEvent);

  //read file function
  function readFile() {
    const selectedFile = inputElement.files[0];

    //ensure a file was selected
    if (selectedFile) {
      //read the file
      const fileReader = new FileReader();

      //define proccess after read
      fileReader.onload = function(readEvent) {
        //save game
        const saveString = readEvent.target.result;
        saveGameSaveString(saveString);

        //load save
        loadGame();
      }

      //trigger reading
      fileReader.readAsText(selectedFile);
    }

    inputElement.remove();
  }
}

function exportSaveFile() {
  //save game to export it
  saveGame();

  //get save string
  const saveString = localStorage.getItem(keysJSON.gameSave); 

  //create a file to download
  const saveFile = new Blob([saveString], { type: 'text/plain'});

  //create link
  const downloadLink = document.createElement('a');

  //build text link
  const currentDate = new Date();
  const dateDay = currentDate.getDate().toString().padStart(2, '0');
  const dateMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const dateYear = currentDate.getFullYear();
  const dateString =  `${dateDay}-${dateMonth}-${dateYear}`;
  const fileName = `treenscension-${dateString}.txt`;

  //set download attribute
  downloadLink.download = fileName;

  //set URL for blob and set a reference to it for donwloadLink
  downloadLink.href = window.URL.createObjectURL(saveFile);

  //make link hidden before appending it for it not to affect page layout
  downloadLink.classList.add('hidden');

  //append it, click it, and remove it
  document.body.appendChild(downloadLink);

  const clickEvent = new Event('click');
  downloadLink.dispatchEvent(clickEvent);

  //revoke link URL
  window.URL.revokeObjectURL(downloadLink.href);

  document.body.removeChild(downloadLink);
}