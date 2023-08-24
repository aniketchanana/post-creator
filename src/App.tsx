import { useState } from "react";
import {
  ELEMENT_TYPE,
  POST_HEIGHT,
  POST_WIDTH,
  STYLE_PROPERTY,
} from "./constant";
import { Editor } from "./Editor";
import { BGControls, initialBgControlsValue } from "./BGControls";
import { GenericObject } from "./types";
import { cloneDeep } from "lodash";

export default function App() {
  const [elementsData, setElementsData] = useState<GenericObject>({});
  const [isEditorActive, setIsEditorActive] = useState(false);
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

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        style={{
          height: `${POST_HEIGHT}px`,
          width: `${POST_WIDTH}px`,
        }}
        className="border border-solid border-black box-content flex items-center justify-center"
      >
        {isEditorActive ? (
          <Editor elementsData={elementsData} />
        ) : (
          <input type="file" name="postCreator" onChange={handleFileUpload} />
        )}
      </div>
      {isEditorActive && <BGControls updateCreativeStyles={updateBgStyles} />}
    </div>
  );
}
