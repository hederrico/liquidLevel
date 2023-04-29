var liquidMeter = document.getElementById('liquidLevelBar');
var liquidMeterHandler = document.getElementById('liquidMeterHandler');
var liquidLevel = document.getElementById('liquidLevel');

liquidMeterHandler.addEventListener('dragstart', (e) => {
    e.dataTransfer.setDragImage(document.createElement("div"), 0, 0);
});

liquidMeterHandler.addEventListener('drag', (e) => {
    if (e.pageY < 1) return false;
    
    dragAttVariables(e);
});

liquidMeterHandler.addEventListener('dragend', (e => {
    dragAttVariables(e);
}));

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const dragAttVariables = (e) => {
    let posX = e.target.offsetLeft + e.offsetX;
    
    posX = clamp(posX, -(e.target.offsetWidth/2), liquidMeter.offsetWidth - e.target.offsetWidth/2);
    
    e.target.style.left = `${posX}px`;
    liquidMeter.style.setProperty('--progressWidth', `${posX + e.target.offsetWidth/2}px`);
    liquidMeter.dataset.currentValue = (posX / liquidMeter.offsetWidth);

    liquidLevel.style.setProperty('--liquidLevel', `${(posX + e.target.offsetWidth/2) / liquidMeter.offsetWidth * 100}%`);
}

const verifyHandlerPosition = () => {
    var maxValue = liquidMeter.offsetWidth;
    var currentValue = liquidMeter.dataset.currentValue;
    var newValue = (maxValue * currentValue);

    liquidMeter.style.setProperty('--progressWidth', `${newValue + liquidMeterHandler.offsetWidth/2}px`);
    liquidMeterHandler.style.setProperty('left', `${newValue}px`);
}

window.addEventListener('resize', (e) => {
    verifyHandlerPosition();
})