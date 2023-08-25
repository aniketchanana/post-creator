import { FC } from "react";
import { GenericObject } from "../types";

export const initialTextControlsValue = {
  value: "Enter your text here",
};

export const TextControls: FC<{
  uploadTextElementStyles: (
    selectedTextElement: string,
    updatedStyles: GenericObject
  ) => void;
  selectedTextElement: string | null;
  addNewTextElement: () => void;
}> = ({ addNewTextElement }) => {
  return (
    <div>
      <button onClick={addNewTextElement}>Add text</button>
    </div>
  );
};
