const mainContainer = document.getElementById("mainContainer");
let selectedTextElement = null;
const focusOutOfSelectedTextElement = () => {
  if (selectedTextElement) {
    selectedTextElement.classList.remove("textContainerBoxGuide");
    selectedTextElement.setAttribute("contenteditable", false);
    window.parent.postMessage(
      // TODO: catch in react application and set the state
      { type: "ELEMENT_SELECTED", data: null },
      "*"
    );
  }
};
window.addEventListener("blur", () => {
  focusOutOfSelectedTextElement();
});
mainContainer.addEventListener("click", (e) => {
  if (e.target.id === "mainContainer") {
    focusOutOfSelectedTextElement();
  }
});
const ELEMENT_TYPE = {
  BACKGROUND: "BACKGROUND",
  TEXT: "TEXT",
};

const elementsPool = {};

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

const createTextBoxAndAddToMain = (elementId, styleData) => {
  if (!elementsPool[elementId]) {
    const textContainer = document.createElement("div");
    textContainer.setAttribute("contenteditable", false);
    textContainer.setAttribute("id", elementId);
    textContainer.classList.add("textContainerBox");

    textContainer.addEventListener("click", () => {
      selectedTextElement = textContainer;
      textContainer.classList.add("textContainerBoxGuide");
      window.parent.postMessage(
        // TODO: catch in react application and set the state
        { type: "ELEMENT_SELECTED", data: elementId },
        "*"
      );
    });

    textContainer.addEventListener("keydown", (e) => {
      window.parent.postMessage(
        // TODO: catch in react application and set the state
        {
          type: "ELEMENT_TEXT_UPDATED",
          data: { elementId, text: e.target.innerText },
        },
        "*"
      );
    });

    textContainer.addEventListener("paste", (e) => {
      e.preventDefault();

      const text = e.clipboardData.getData("text/plain");
      document.execCommand("insertText", false, text);
      window.parent.postMessage(
        // TODO: catch in react application and set the state
        {
          type: "ELEMENT_TEXT_UPDATED",
          data: { elementId, text },
        },
        "*"
      );
    });

    textContainer.addEventListener("dblclick", () => {
      textContainer.setAttribute("contenteditable", true);
      const range = document.createRange();
      const sel = window.getSelection();

      range.selectNodeContents(textContainer);
      range.collapse(false);

      sel.removeAllRanges();
      sel.addRange(range);
    });

    textContainer.addEventListener("blur", () => {
      textContainer.classList.remove("textContainerBoxGuide");
      textContainer.setAttribute("contenteditable", false);
      window.parent.postMessage(
        // TODO: catch in react application and set the state
        { type: "ELEMENT_SELECTED", data: null },
        "*"
      );
    });

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
