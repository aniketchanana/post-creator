import { useEffect, useRef, useState } from "react";
import {
  ELEMENT_TYPE,
  POST_HEIGHT,
  POST_WIDTH,
  STYLE_PROPERTY,
} from "./constant";
import { BGControls, initialBgControlsValue } from "./controls/BGControls";
import { GenericObject } from "./types";
import { cloneDeep } from "lodash";
import {
  TextControls,
  initialTextControlsValue,
} from "./controls/TextControls";
import { getElementId, getElementNumber } from "./utils";

export default function App() {
  const [elementsData, setElementsData] = useState<GenericObject>({});
  const [isEditorActive, setIsEditorActive] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const ref = useRef<HTMLIFrameElement>(null);

  console.log(elementsData);

  const addNewElement = (object: GenericObject) => {
    setElementsData((elementsData) => ({
      ...elementsData,
      ...object,
    }));
  };

  const updateElement = (elementKey: string, updatedStyles: GenericObject) => {
    setElementsData((elementsData) => {
      const updatedElementsData = cloneDeep(elementsData);
      updatedElementsData[elementKey] = {
        ...updatedElementsData[elementKey],
        ...updatedStyles,
      };
      return updatedElementsData;
    });
  };

  const deleteElement = (elementId: string) => {
    setElementsData((elementsData) => {
      const updatedElementsData = cloneDeep(elementsData);
      delete updatedElementsData[elementId];
      console.log(updatedElementsData);
      return updatedElementsData;
    });
  };

  // initial starting point for creative
  const handleFileUpload = (e: any) => {
    const [file] = e.target.files;
    if (file) {
      const src = URL.createObjectURL(file);
      addNewElement({
        [ELEMENT_TYPE.BACKGROUND]: {
          ...initialBgControlsValue,
          [STYLE_PROPERTY.backgroundImage]: `url(${src})`,
        },
      });
      setIsEditorActive(true);
    }
  };

  const addNewTextElement = () => {
    const elementNumber = getElementNumber(elementsData, ELEMENT_TYPE.TEXT);
    const textElementId = getElementId(ELEMENT_TYPE.TEXT, elementNumber);
    addNewElement({
      [textElementId]: {
        ...initialTextControlsValue,
      },
    });
  };

  const updateTextElementStyles = (
    selectedTextElement: string,
    updatedStyles: GenericObject
  ) => {
    updateElement(selectedTextElement, updatedStyles);
  };

  const updateBg = (updatedStyles: GenericObject) => {
    updateElement(ELEMENT_TYPE.BACKGROUND, updatedStyles);
  };

  const handleMessageFromIframe = (e: any) => {
    const {
      data: { type, data },
    } = e;
    if (type === "TEXT_ELEMENT_SELECTED") {
      setSelectedElement(data);
    } else if (type === "TEXT_ELEMENT_UPDATED") {
      const { text, elementId } = data;
      updateElement(elementId, { value: text });
    } else if (type === "TEXT_ELEMENT_DELETED") {
      deleteElement(data);
    } else if (type === "TEXT_UPDATE_POSITION") {
      const { elementId, points } = data;
      updateElement(elementId, points);
    }
  };

  useEffect(() => {
    ref.current?.contentWindow?.postMessage({
      type: "UPDATE_CREATIVE",
      data: elementsData,
    });
  }, [elementsData, ref.current?.contentWindow]);

  useEffect(() => {
    window.addEventListener("message", handleMessageFromIframe);
    () => window.removeEventListener("message", handleMessageFromIframe);
  }, []);

  return (
    <div className="w-full h-full flex items-start justify-center mt-[60px]">
      <div
        style={{
          height: `${POST_HEIGHT}px`,
          width: `${POST_WIDTH}px`,
        }}
        className="border border-solid border-black box-content flex items-center justify-center"
      >
        <div className={`${isEditorActive ? "block w-full h-full" : "hidden"}`}>
          <iframe
            ref={ref}
            src="/post-creator/creator.html"
            className="h-full w-full"
          />
        </div>
        <div className={`${isEditorActive ? "hidden" : "block"}`}>
          <input type="file" name="postCreator" onChange={handleFileUpload} />
        </div>
      </div>

      {isEditorActive && (
        <div className="flex flex-col ml-2 gap-4">
          <BGControls updateCreativeStyles={updateBg} />
          <TextControls
            updateTextElementStyles={updateTextElementStyles}
            selectedTextElement={selectedElement}
            addNewTextElement={addNewTextElement}
            selectedTextStyles={
              selectedElement && elementsData[selectedElement]
            }
          />
        </div>
      )}
    </div>
  );
}
