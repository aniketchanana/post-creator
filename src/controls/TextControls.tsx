import { FC } from "react";
import { GenericObject } from "../types";
import { ColorInput } from "../inputTypes/ColorInput";
import { STYLE_PROPERTY } from "../constant";
import { MultiSelect } from "../inputTypes/MultiSelect";

export const initialTextControlsValue = {
  [STYLE_PROPERTY.value]: "Enter your text here",
  [STYLE_PROPERTY.color]: "#ff00ff",
  [STYLE_PROPERTY.fontSize]: 32,
  [STYLE_PROPERTY.positionTop]: "10px",
  [STYLE_PROPERTY.fontFamily]: "Poppins",
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
  console.log(selectedTextStyles);
  return (
    <div>
      {selectedTextElement && (
        <div className="flex gap-2 items-center" key={selectedTextElement}>
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
          <input
            className="border border-black"
            value={selectedTextStyles[STYLE_PROPERTY.fontSize] || 0}
            type="number"
            onChange={(e) => {
              updateTextElementStyles(selectedTextElement, {
                [STYLE_PROPERTY.fontSize]: e.target.value
                  ? Number(e.target.value)
                  : Number(0),
              });
            }}
          />
          <MultiSelect
            heading="Font family"
            options={[
              "Homemade apple",
              "Monsieur La Doulaise",
              "Orbitron",
              "Poppins",
              "Qwigley",
              "rubik",
              "Slackey",
            ]}
            optionKey={STYLE_PROPERTY.fontFamily}
            value={selectedTextStyles[STYLE_PROPERTY.fontFamily] || "Poppins"}
            setOption={(key, value) => {
              updateTextElementStyles(selectedTextElement, {
                [key]: value,
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
