import { FC, useState } from "react";
import { MultiSelect } from "../inputTypes/MultiSelect";
import { GenericObject } from "../types";
import { ColorInput } from "../inputTypes/ColorInput";
import { STYLE_PROPERTY, STYLE_VALUE } from "../constant";

export const initialBgControlsValue = {
  [STYLE_PROPERTY.backgroundSize]: STYLE_VALUE.COVER,
  [STYLE_PROPERTY.backgroundRepeat]: STYLE_VALUE.repeatY,
  [STYLE_PROPERTY.backgroundColor]: "#ffffff",
  [STYLE_PROPERTY.backgroundPosition]: STYLE_VALUE.center,
  [STYLE_PROPERTY.width]: "100%",
  [STYLE_PROPERTY.height]: "100%",
  [STYLE_PROPERTY.position]: STYLE_VALUE.positionRelative,
};
export const BGControls: FC<{
  updateCreativeStyles: (styleObj: any) => void;
}> = ({ updateCreativeStyles }) => {
  const [styleObj, setStyleObj] = useState(initialBgControlsValue);

  const updateStyleObj = (key: string, value: string) => {
    const updatedStyles: GenericObject = {
      ...styleObj,
    };
    updatedStyles[key] = value;
    setStyleObj(updatedStyles);
    updateCreativeStyles(updatedStyles);
  };

  return (
    <div className="gap-4 flex items-start">
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
        options={[
          STYLE_VALUE.top,
          STYLE_VALUE.center,
          STYLE_VALUE.bottom,
          STYLE_VALUE.right,
          STYLE_VALUE.left,
        ]}
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
