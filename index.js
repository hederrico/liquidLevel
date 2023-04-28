var liquidMeter = document.getElementById('liquidLevelMeter');
var liquidMeterHandler = document.getElementById('liquidMeterHandler');


liquidMeterHandler.addEventListener('dragstart', (e) => {
    e.dataTransfer.setDragImage(document.createElement("div"), 0, 0);
});

liquidMeterHandler.addEventListener('drag', (e) => {
    if (e.pageY < 1) {
        return false;
    }
    
    dragAttVariables(e);
});

liquidMeterHandler.addEventListener('dragend', (e => {
    dragAttVariables(e);
}));

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const dragAttVariables = (e) => {
    let posX = e.target.offsetLeft + e.offsetX;

    posX = clamp(posX, -(e.target.offsetWidth/2), liquidMeter.offsetWidth - e.target.offsetWidth/2);

    liquidMeter.style.setProperty('--progressWidth', `${posX + e.target.offsetWidth/2}px`);
    e.target.style.left = `${posX}px`;
}