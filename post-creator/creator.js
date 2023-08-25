const main = document.getElementById("mainContainer");

// used for initiating id for element
const ELEMENT_TYPE = {
  BACKGROUND: "BACKGROUND",
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

const createBgAndApplyStyles = (styleData) => {
  let bgDiv = elementsPool[ELEMENT_TYPE.BACKGROUND];
  if (!bgDiv) {
    bgDiv = createNewDiv(ELEMENT_TYPE.BACKGROUND);
    elementsPool[ELEMENT_TYPE.BACKGROUND] = bgDiv;
  }
  bgDiv.setAttribute("style", createStyleStr(styleData));

  main.appendChild(bgDiv);
};

/**
 * on message from react app
 */
window.addEventListener("message", ({ data: { data: elementsInfo } }) => {
  Object.entries(elementsInfo).forEach(([elementType, styleData]) => {
    if (elementType === ELEMENT_TYPE.BACKGROUND) {
      createBgAndApplyStyles(styleData);
    }
  });
});
