import { FC } from "react";
import { GenericObject } from "../types";
import { ColorInput } from "../inputTypes/ColorInput";
import { STYLE_PROPERTY } from "../constant";

export const initialTextControlsValue = {
  [STYLE_PROPERTY.value]: "Enter your text here",
  [STYLE_PROPERTY.color]: "#ff00ff",
  [STYLE_PROPERTY.fontSize]: `32px`,
};

export const TextControls: FC<{
  updateTextElementStyles: (
    selectedTextElement: string,
    updatedStyles: GenericObject
  ) => void;
  selectedTextElement: string | null;
  addNewTextElement: () => void;
  selectedTextStyles: GenericObject;
}> = ({
  addNewTextElement,
  selectedTextElement,
  selectedTextStyles,
  updateTextElementStyles,
}) => {
  return (
    <div>
      {selectedTextElement && (
        <div className="flex" key={selectedTextElement}>
          <ColorInput
            heading="Text color"
            optionKey={selectedTextElement}
            value={selectedTextStyles?.color}
            setOption={(_, optionValue) => {
              updateTextElementStyles(selectedTextElement, {
                color: optionValue,
              });
            }}
          />
        </div>
      )}
      <button
        onClick={addNewTextElement}
        className="px-2 bg-gray-200 rounded text-gray-700 mt-2"
      >
        Add text
      </button>
    </div>
  );
};
