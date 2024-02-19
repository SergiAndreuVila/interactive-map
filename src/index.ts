function createZone() {
  const zone = document.createElement("span");
  zone.classList.add("zone");
  zone.innerText = "i am a zone";
  const description = createDescription();
  zone.addEventListener("click", event => {
    show(description);
    console.log("showing");
    event.stopPropagation();
  });
  document.body.appendChild(zone);
}

function createDescription() {
  const description = document.createElement("span");
  description.classList.add("description");
  description.classList.add("hidden");
  description.innerText = "i am a description";
  document.body.appendChild(description);

  return description;
}

function show(element: Element) {
  element.classList.add("shown");
  element.classList.remove("hidden");
}

function hide(element: Element) {
  element.classList.add("hidden");
  element.classList.remove("shown");
}

const findAllShownDescription = () => Array.from(document.querySelectorAll(".description.shown"));

const isEmptyOrUndefined = (it: any[]) => it == undefined || it.length == 0;

function hideAllUnfocusedDescription() {
  document.addEventListener("click", event => {
    const shownDescription = findAllShownDescription();
    if (isEmptyOrUndefined(shownDescription)) {
      return;
    }
    if (!shownDescription.some(it => it.contains(event.target as Node))) {
      shownDescription.forEach(it => hide(it));
      console.log("hiding");
    }
  });
}

function setup() {
  hideAllUnfocusedDescription();
}

createZone();
setup();