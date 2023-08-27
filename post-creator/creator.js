const mainContainer = document.getElementById("mainContainer");
let selectedTextElement = null;

const postMessageTextBoxSelected = (textBoxId) => {
  window.parent.postMessage(
    { type: "TEXT_ELEMENT_SELECTED", data: textBoxId },
    "*"
  );
};
const postMessageTextUpdated = (elementId, text) => {
  window.parent.postMessage(
    {
      type: "TEXT_ELEMENT_UPDATED",
      data: { elementId, text },
    },
    "*"
  );
};
const postMessageTextDeleted = (elementId) => {
  window.parent.postMessage(
    { type: "TEXT_ELEMENT_DELETED", data: elementId },
    "*"
  );
};
const focusOutOfSelectedTextElement = () => {
  if (selectedTextElement) {
    selectedTextElement.classList.remove("textContainerBoxGuide");
    selectedTextElement.setAttribute("contenteditable", false);
    postMessageTextBoxSelected(null);
    selectedTextElement = null;
  }
};
// window.addEventListener("blur", () => {
//   focusOutOfSelectedTextElement();
// });
mainContainer.addEventListener("click", (e) => {
  if (e.target.id === "mainContainer") {
    focusOutOfSelectedTextElement();
  }
});

window.addEventListener("keydown", (e) => {
  if (
    selectedTextElement &&
    (e.metaKey || e.ctrlKey) &&
    (e.key === "Delete" || e.key === "Backspace")
  ) {
    e.preventDefault();
    postMessageTextBoxSelected(null);
    // postMessageTextDeleted(selectedTextElement); // TODO: Fix the error of dom exception
    mainContainer.removeChild(selectedTextElement);
    selectedTextElement = null;
  }
});

const ELEMENT_TYPE = {
  BACKGROUND: "BACKGROUND",
  TEXT: "TEXT",
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

const getCursorPosition = (e) => {
  const box = mainContainer.getBoundingClientRect();

  return { clientX: e.pageX - box.x, clientY: e.pageY - box.y };
};

const createTextBoxAndAddToMain = (elementId, styleData) => {
  const textContainer = document.createElement("div");
  textContainer.setAttribute("contenteditable", false);
  textContainer.setAttribute("id", elementId);
  textContainer.classList.add("textContainerBox");

  textContainer.addEventListener("click", () => {
    if (selectedTextElement) {
      selectedTextElement.classList.remove("textContainerBoxGuide");
      selectedTextElement = null;
    }
    selectedTextElement = textContainer;
    textContainer.classList.add("textContainerBoxGuide");
    postMessageTextBoxSelected(elementId);
  });

  textContainer.addEventListener("keyup", (e) => {
    postMessageTextUpdated(elementId, e.target.innerText);
  });

  textContainer.addEventListener("paste", (e) => {
    e.preventDefault();

    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
    postMessageTextUpdated(elementId, text);
  });

  textContainer.addEventListener("dblclick", () => {
    textContainer.setAttribute("contenteditable", true);
  });

  textContainer.addEventListener("blur", () => {
    textContainer.classList.remove("textContainerBoxGuide");
    textContainer.setAttribute("contenteditable", false);
    postMessageTextBoxSelected(null);
    selectedTextElement = null;
  });

  const handleMovement = (e) => {
    const { clientX, clientY } = getCursorPosition(e);
    textContainer.style.top = `${clientY}px`;
    textContainer.style.left = `${clientX}px`;
  };

  textContainer.addEventListener("mousedown", () => {
    textContainer.click();

    window.addEventListener("mousemove", handleMovement);
  });

  textContainer.addEventListener("mouseup", () => {
    window.parent.postMessage(
      {
        type: "TEXT_UPDATE_POSITION",
        data: {
          elementId: elementId,
          points: {
            top: textContainer.style.top,
            left: textContainer.style.left,
          },
        },
      },
      "*"
    );
    window.removeEventListener("mousemove", handleMovement);
  });

  const { value = "" } = styleData;
  textContainer.innerText = value;

  delete styleData.value;
  textContainer.setAttribute("style", createStyleStr(styleData));
  mainContainer.appendChild(textContainer);
};

const updateTextBox = (elementId, styleData) => {
  const textBoxContainer = document.getElementById(elementId);
  textBoxContainer.setAttribute("style", createStyleStr(styleData));
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
        if (document.getElementById(elementType)) {
          updateTextBox(elementType, styleData);
        } else {
          createTextBoxAndAddToMain(elementType, styleData);
        }
      }
    });
  }
});
