import { config } from "./mapConfig.js";
function createZone(config) {
    const zone = document.createElement("span");
    zone.classList.add("zone");
    zone.innerText = config.title;
    const description = createDescription(config);
    zone.setAttribute('style', `height:${config.size.height}%; width: ${config.size.width}%; left: ${config.offset.x}%; top: ${config.offset.y}%`);
    zone.addEventListener("click", event => {
        show(description);
        event.stopPropagation();
    });
    background.appendChild(zone);
}

function createDescription(config) {
    const description = document.createElement("span");
    description.classList.add("description");
    description.classList.add("hidden");
    description.innerText = config.description;
    background.appendChild(description);
    return description;
}

function show(element) {
    hideAllUnfocusedDescription(element);
    element.classList.add("shown");
    element.classList.remove("hidden");
}

function hide(element) {
    element.classList.add("hidden");
    element.classList.remove("shown");
}

const findAllShownDescription = () => Array.from(document.querySelectorAll(".description.shown"));

const isEmptyOrUndefined = (it) => it == undefined || it.length == 0;

function hideAllUnfocusedForEveryClick() {
    document.addEventListener("click", event => hideAllUnfocusedDescription(event.target));
}

function hideAllUnfocusedDescription(element) {
    const shownDescription = findAllShownDescription();
    if (isEmptyOrUndefined(shownDescription)) {
        return;
    }
    if (!shownDescription.some(it => it.contains(element))) {
        shownDescription.forEach(it => hide(it));
    }
}

var background;

function setBackgroundSize() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    const aspectRatio = 16 / 9;
    if (width / aspectRatio < height) {
        background.setAttribute('style', `height:${(width / aspectRatio).toFixed(2)}px; width: 100vw;`);
    }
    else {
        background.setAttribute('style', `height: 100vh; width:${(height * aspectRatio).toFixed(2)}px;`);
    }
}

function createBackground() {
    background = document.createElement("span");
    background.classList.add("background");
    document.body.appendChild(background);
}

function loadMapConfig() {
    config.forEach(it => createZone(it));
}

function setup() {
    createBackground();
    window.addEventListener('load', setBackgroundSize);
    window.addEventListener('resize', setBackgroundSize);
    loadMapConfig();
    hideAllUnfocusedForEveryClick();
}
setup();
