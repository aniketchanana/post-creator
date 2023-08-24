import { FC, useState } from "react";
import { MultiSelect } from "./inputTypes/MultiSelect";
import { GenericObject } from "./types";
import { ColorInput } from "./inputTypes/ColorInput";

const STYLE_PROPERTY = {
  backgroundSize: "background-size",
  backgroundRepeat: "background-repeat",
  backgroundColor: "background-color",
  backgroundPosition: "background-position",
};
const STYLE_VALUE = {
  COVER: "cover",
  CONTAIN: "contain",

  noRepeat: "no-repeat",
  repeatX: "repeat-x",
  repeatY: "repeat-y",

  center: "center",
  top: "top",
  bottom: "bottom",
};
export const BGControls: FC<{
  updateCreativeStyles: (styleObj: any) => void;
}> = ({ updateCreativeStyles }) => {
  const [styleObj, setStyleObj] = useState({
    [STYLE_PROPERTY.backgroundSize]: STYLE_VALUE.CONTAIN,
    [STYLE_PROPERTY.backgroundRepeat]: STYLE_VALUE.repeatY,
    [STYLE_PROPERTY.backgroundColor]: "#ffffff",
    [STYLE_PROPERTY.backgroundPosition]: STYLE_VALUE.center,
  });

  const updateStyleObj = (key: string, value: string) => {
    const updatedStyles: GenericObject = {
      ...styleObj,
    };
    updatedStyles[key] = value;
    setStyleObj(updatedStyles);
    updateCreativeStyles(updatedStyles);
  };

  return (
    <div className="h-full ml-2 mt-[120px] gap-4 flex flex-col">
      <MultiSelect
        heading="Background size"
        options={[STYLE_VALUE.CONTAIN, STYLE_VALUE.COVER]}
        optionKey={STYLE_PROPERTY.backgroundSize}
        value={styleObj[STYLE_PROPERTY.backgroundSize]}
        setOption={updateStyleObj}
      />
      <MultiSelect
        heading="Background repeat"
        options={[
          STYLE_VALUE.noRepeat,
          STYLE_VALUE.repeatX,
          STYLE_VALUE.repeatY,
        ]}
        optionKey={STYLE_PROPERTY.backgroundRepeat}
        value={styleObj[STYLE_PROPERTY.backgroundRepeat]}
        setOption={updateStyleObj}
      />

      <MultiSelect
        heading="Background position"
        options={[STYLE_VALUE.top, STYLE_VALUE.center, STYLE_VALUE.bottom]}
        optionKey={STYLE_PROPERTY.backgroundPosition}
        value={styleObj[STYLE_PROPERTY.backgroundPosition]}
        setOption={updateStyleObj}
      />
      <ColorInput
        heading="Background color"
        setOption={updateStyleObj}
        optionKey={STYLE_PROPERTY.backgroundColor}
        value={styleObj[STYLE_PROPERTY.backgroundColor]}
      />
    </div>
  );
};
