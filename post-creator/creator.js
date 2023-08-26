const mainContainer = document.getElementById("mainContainer");

const ELEMENT_TYPE = {
  BACKGROUND: "BACKGROUND",
  TEXT: "TEXT",
};

const elementsPool = {};

const createNewDiv = (elementId) => {
  const divElement = document.createElement("div");
  divElement.setAttribute("id", elementId);
  return divElement;
};

const createStyleStr = (styleObject) => {
  let styleStr = "";
  Object.entries(styleObject).forEach(([styleType, styleValue]) => {
    styleStr += `${styleType}: ${styleValue};`;
  });
  return styleStr;
};

const applyStylesToBg = (styleData) => {
  mainContainer.setAttribute("style", createStyleStr(styleData));
};

const getAlignmentGuideBox = (elementId) => {
  const guideBox = document.createElement("div");
  guideBox.setAttribute("id", `guide##${elementId}`);
  guideBox.setAttribute("class", "guide");
  // const overlayClickHandler = document.createElement("div");
  // overlayClickHandler.setAttribute("class", "overlayClickHandler");
  // overlayClickHandler.setAttribute("id", `guideOverlay##${elementId}`);
  return guideBox;
};

const createTextBoxAndAddToMain = (elementId, styleData) => {
  if (!elementsPool[elementId]) {
    // const alignmentGuideBox = getAlignmentGuideBox(elementId);

    const textContainer = document.createElement("div");
    textContainer.setAttribute("contenteditable", false);
    textContainer.setAttribute("id", elementId);
    textContainer.setAttribute("class", "guide");

    // alignmentGuideBox.appendChild(textContainer);
    mainContainer.appendChild(textContainer);
    window.parent.postMessage({ type: "ELEMENT_CREATED" }, "*");

    elementsPool[elementId] = textContainer;
  }

  const textBox = elementsPool[elementId];
  const { value = "" } = styleData;
  textBox.innerText = value;

  delete styleData.value;
  textBox.setAttribute("style", createStyleStr(styleData));
};

/**
 * on message from react app
 */
window.addEventListener("message", ({ data: { type, data } }) => {
  if (type === "UPDATE_CREATIVE") {
    /**
     * data -> format
     * {
     *  [ELEMENT_TYPE]: {
     *  ...
     * }
     * }
     */
    Object.entries(data).forEach(([elementType, styleData]) => {
      if (elementType === ELEMENT_TYPE.BACKGROUND) {
        applyStylesToBg(styleData);
      } else if (elementType.startsWith(ELEMENT_TYPE.TEXT)) {
        createTextBoxAndAddToMain(elementType, styleData);
      }
    });
  }
});
