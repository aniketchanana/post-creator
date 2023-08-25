import { useState } from "react";
import {
  ELEMENT_TYPE,
  POST_HEIGHT,
  POST_WIDTH,
  STYLE_PROPERTY,
} from "./constant";
import { Editor } from "./Editor";
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
  const [selectedTextElement, setSelectedTextElement] = useState<string | null>(
    null
  );

  // initial starting point for creative
  const handleFileUpload = (e: any) => {
    const [file] = e.target.files;
    if (file) {
      const src = URL.createObjectURL(file);
      setElementsData({
        [ELEMENT_TYPE.BACKGROUND]: {
          ...initialBgControlsValue,
          [STYLE_PROPERTY.backgroundImage]: `url(${src})`,
        },
      });
      setIsEditorActive(true);
    }
  };

  const updateBgStyles = (updatedStyles: GenericObject) => {
    const updatedElementsData = cloneDeep(elementsData);
    updatedElementsData[ELEMENT_TYPE.BACKGROUND] = {
      ...updatedElementsData[ELEMENT_TYPE.BACKGROUND],
      ...updatedStyles,
    };

    setElementsData(updatedElementsData);
  };

  const addNewTextElement = () => {
    const elementNumber = getElementNumber(elementsData, ELEMENT_TYPE.TEXT);
    const textElementId = getElementId(ELEMENT_TYPE.TEXT, elementNumber);
    setElementsData({
      [textElementId]: {
        ...initialTextControlsValue,
      },
    });
    setSelectedTextElement(textElementId);
  };

  const updateTextElementStyles = (
    selectedTextElement: string,
    updatedStyles: GenericObject
  ) => {
    console.log(selectedTextElement, updatedStyles);
  };

  // const addText = () => {};

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
          <Editor elementsData={elementsData} />
        </div>
        <div className={`${isEditorActive ? "hidden" : "block"}`}>
          <input type="file" name="postCreator" onChange={handleFileUpload} />
        </div>
      </div>

      {isEditorActive && (
        <div className="flex flex-col">
          <BGControls updateCreativeStyles={updateBgStyles} />
          <TextControls
            selectedTextElement={selectedTextElement}
            uploadTextElementStyles={updateTextElementStyles}
            addNewTextElement={addNewTextElement}
          />
        </div>
      )}
    </div>
  );
}
