import { debounce } from "lodash";
import { FC } from "react";

export const ColorInput: FC<{
  heading: string;
  value: string;
  optionKey: string;
  setOption: (key: string, optionValue: string) => void;
}> = ({ heading, setOption, value, optionKey }) => {
  const debouncedUpdateColor = debounce((e: any) => {
    setOption(optionKey, e.target.value);
  }, 300);

  return (
    <div className="border border-solid border-black p-2">
      <h5 className="mb-2">{heading}</h5>
      <input
        type="color"
        defaultValue={value}
        onChange={debouncedUpdateColor}
      />
    </div>
  );
};
