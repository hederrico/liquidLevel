// Liquid % bar
var liquidMeter = document.getElementById('liquidLevelBar');
// Liquid % bar handler
var liquidMeterHandler = document.getElementById('liquidMeterHandler');
// Liquid element
var liquidLevel = document.getElementById('liquidLevel');
// Tank capacity text
var tankLevel = document.getElementById('tankLevel');

liquidMeterHandler.addEventListener('dragstart', (e) => {
    //Removes the default image when drag starts
    e.dataTransfer.setDragImage(document.createElement("div"), 0, 0);
});

liquidMeterHandler.addEventListener('drag', (e) => {
    //Avoids the handler going 0% when mouse goes outside the webpage
    if (e.pageY < 1) return false;
    
    //Updates all variables
    dragUptVariables(e);
});

liquidMeterHandler.addEventListener('dragend', (e => {
    //Updates all variables
    dragUptVariables(e);
}));


window.addEventListener('resize', (e) => {
    verifyHandlerPosition();
})

//clamp numbers
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

//Update all variables related to % bar drag
const dragUptVariables = (e) => {
    //posX receives the location on the x-axis where the handler should be positioned

    //First parameter represents the position on the x-axis where the handler currently is, plus the distance of the mouse from the handler on the x-axis
    //Second parameter represents the lower bound for the position of the handler on the x-axis
    //Second parameter represents the upper bound for the position of the handler on the x-axis
    let posX = clamp(e.target.offsetLeft + e.offsetX, -(e.target.offsetWidth/2), liquidMeter.offsetWidth - e.target.offsetWidth/2);
    
    // Updates the handler position on the x-axis
    e.target.style.left = `${posX}px`;

    // Updates the --progressWidth CSS variable and accordingly updates the liquid level bar color up to the new percentage
    liquidMeter.style.setProperty('--progressWidth', `${posX + e.target.offsetWidth/2}px`);

    //Updates the handler position based on the new percentage
    liquidMeter.dataset.currentValue = (posX / liquidMeter.offsetWidth);

    // Calculates the percentage according to the handler's new position on the x-axis
    var percentage = (posX + e.target.offsetWidth/2) / liquidMeter.offsetWidth * 100;

    //Updates the --liquidLevel CSS variable and accordingly updates the tank liquid height
    liquidLevel.style.setProperty('--liquidLevel', `${percentage}%`);
    //Updates the --waterColor CSS variable and accordingly updates the tank liquid color
    liquidLevel.style.setProperty('--waterColor', waterColorCalc(percentage));
    
    setTimeout(() => {
        //Updates the tank liquid percentage text
        // If percentage is 0 or 100, shows only the integer part, else, shows 2 decimal places
        tankLevel.innerHTML = `${([0, 100].includes(percentage) ? parseInt(percentage) : percentage.toFixed(2))}%`;
    }, 400);
}

// Verifies and update the handler position based on current %, (used when screen resizes)
const verifyHandlerPosition = () => {
    //Max possible value is the current liquid bar width
    var maxValue = liquidMeter.offsetWidth;
    //The current percentage value is stored in an HTML attribute of the liquid bar element
    var currentValue = liquidMeter.dataset.currentValue;
    //New Value will be the current liquid bar width multiplied by the current percentage value
    var newValue = (maxValue * currentValue);

    //Updates the --progressWidth CSS variable and accordingly updates the liquid level bar color up to the new percentage
    liquidMeter.style.setProperty('--progressWidth', `${newValue + liquidMeterHandler.offsetWidth/2}px`);

    //Updates the handler position based on the new percentage
    liquidMeterHandler.style.setProperty('left', `${newValue}px`);
}

//Returns the color of the liquid in the tank according to the thresholds
const waterColorCalc = (percentage) => {
    if (percentage <= 25) {
        return 'var(--alertWaterColor)';
    } else if(percentage <= 50) {
        return 'var(--warningWaterColor)';
    } else if(percentage <= 75) {
        return 'var(--normalWaterColor)';
    } else {
        return 'var(--coolWaterColor)';
    }
}