//tooltips object
const tooltips = {
  /*
  template: {
    parentID: 'template',
    current: 2,
    section1: {
      requirement: function() {
        return true;
      },
      content: [
        //requirement
        'Game on:',
        //content
        'The game is always on',
      ],
    },

    section2: {
      requirement: function() {
        return true;
      },
      content: [
        'User exists:',
        'User always exist',
      ]
    }
  }
  */
  
  pauseButton: {
    parentID: 'pauseButton',
    current: 2,
    section1: {
      requirement: function() {
        return true;
      },
      content: [
        //requirement
        ``,
        //content
        `<b>Pause</b><br>
          0x Game Speed`,
      ],
    },
  },

  playButton: {
    parentID: 'playButton',
    current: 2,
    section1: {
      requirement: function() {
        return true;
      },
      content: [
        //requirement
        ``,
        //content
        `<b>Normal</b><br>
        ${gameSpeed.gameStates.play}x Game Speed`,
      ],
    },
  },

  playFasterButton: {
    parentID: 'playFasterButton',
    current: 2,
    section1: {
      requirement: function() {
        return true;
      },
      content: [
        //requirement
        ``,
        //content
        `<b>Faster</b><br>
        ${gameSpeed.gameStates.playFaster}x Game Speed`,
      ],
    },
  },

  playEvenFasterButton: {
    parentID: 'playEvenFasterButton',
    current: 2,
    section1: {
      requirement: function() {
        return true;
      },
      content: [
        //requirement
        ``,
        //content
        `<b>Even Faster</b><br>
        ${gameSpeed.gameStates.playEvenFaster}x Game Speed`,
      ],
    },
  },

  playFastestButton: {
    parentID: 'playFastestButton',
    current: 2,
    section1: {
      requirement: function() {
        return true;
      },
      content: [
        //requirement
        ``,
        //content
        `<b>Fastest</b><br>
        ${roundToSignificantFigures(gameSpeed.gameStates.playFastest, 4)}x Game Speed`,
      ],
    },
  },

  slowButton: {
    parentID: 'slowButton',
    current: 2,
    section1: {
      requirement: function() {
        return true;
      },
      content: [
        //requirement
        ``,
        //content
        `<b>Slow</b><br>
          ${gameSpeed.gameStates.slow}x Game Speed<br>
          (no multiplier)`,
      ],
    },
  },
}

const tooltipParts = {
  arrowCSS: 'tooltipsArrow',
}

//tooltips array (to update)
const toUpdateTooltips = [];

for (const entry in tooltips) {
  if (tooltips[entry][`section${tooltips[entry].current}`] && tooltips[entry][`section${tooltips[entry].current}`].requirement) {
    toUpdateTooltips.push(entry);
  }
};

//update tooltips
function updateTooltips() {


  for (let index = toUpdateTooltips.length - 1; index >= 0; index--) {
    const entry = toUpdateTooltips[index];
    const tooltipObject = tooltips[entry];
    const sectionEntry = `section${tooltipObject.current}`;

    //check for next section to check for display
    if (tooltipObject[sectionEntry]) {
      //check for requirement to update UI
      if (tooltipObject[sectionEntry].requirement())  {

        //update current section and display
        tooltipObject.current++;
        updateTooltipUI(entry);

      }
    } 

    //filter out from updateTooltips, as there are no more requirements to check
    else {
      toUpdateTooltips.splice(index, 1);
    }
  }
}

//update tooltips on UI
function updateTooltipUI(entry) {
  
  //retrieve tooltip element
  const tooltipObject = tooltips[entry];
  const tooltipElement = document.getElementById(tooltipObject.ID);
  
  let tooltipHTML = '';

  //build new HTML
  for (let section = 1; tooltipObject[`section${section}`]; section++) {
    const currentSection = tooltipObject[`section${section}`];

    const requirementString = section > tooltipObject.current ?
     replaceToQuestion(currentSection.content[0]) :
     addBold(currentSection.content[0]);
    
    const contentString = section >= tooltipObject.current ? 
     replaceToQuestion(currentSection.content[1]) :
     currentSection.content[1];

     tooltipHTML += `<p>${requirementString} ${contentString}</p>`;
  }
  tooltipHTML += `<div class=${tooltipParts.arrowCSS} data-popper-arrow></div>`

  //update tooltip element
  tooltipElement.innerHTML = tooltipHTML;
}

//initialize tooltips
function initializeTooltips() {
  const tooltipsArray = Object.keys(tooltips);

  const showEvents = ['mouseover', 'focus'];
  const hideEvents = ['mouseleave', 'blur'];

  //iterate through all tooltips
  tooltipsArray.forEach((entry) => {
  const tooltipObject = tooltips[entry];

  //get element to show tooltip
  const parent = document.getElementById(tooltipObject.parentID);

  //create tooltip
  const tooltip = document.createElement('div');
  tooltip.id = `${tooltipObject.parentID}Tooltip`;
  tooltip.classList.add('tooltip');

  //make parent and button semantically related
  relateToTooltip(parent, tooltip);
  
  //define properties for tooltip object (id and popper)
  Object.defineProperty(tooltipObject, 'ID', {value: tooltip.id, writable: false});
  Object.defineProperty(tooltipObject, 'popper', {
    value: Popper.createPopper(parent, tooltip, {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
      strategy: 'fixed',
    }),
  });

  //add event listeners to show/hide tooltips
  showEvents.forEach((event) => {
    parent.addEventListener(event, () => showTooltip(tooltip, tooltipObject.popper));
  })

  hideEvents.forEach((event) => {
    parent.addEventListener(event, () => hideTooltip(tooltip, tooltipObject.popper));
  })

  //update tooltip
  updateTooltipUI(entry);
  })
}

//connect parent and tooltip semantically
function relateToTooltip(parent, tooltip) {
  parent.setAttribute('aria-describedby', tooltip.id);
  tooltip.setAttribute('role', 'tooltip');
  parent.appendChild(tooltip);
} 

//show/hide tooltips
function showTooltip(tooltipElement, popperInstance) {
  //show element
  tooltipElement.setAttribute('data-show', '');

  //enable 'positioning calibration'
  popperInstance.setOptions((options) => ({
    ...options, 
    modifiers: [
      ...options.modifiers,
      {name: 'eventListeners', enabled: true},
    ],
  }));

  //update position
  popperInstance.update();
}

function hideTooltip(tooltipElement, popperInstance) {
  //show element
  tooltipElement.removeAttribute('data-show');

  //disable 'positioning calibration'
  popperInstance.setOptions((options) => ({
    ...options, 
    modifiers: [
      ...options.modifiers,
      {name: 'eventListeners', enabled: false},
    ],
  }));

  //update position
  popperInstance.update();
}