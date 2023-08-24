import { FC } from "react";

export const MultiSelect: FC<{
  heading: string;
  options: string[];
  value: string;
  setOption: (key: string, optionValue: string) => void;
  optionKey: string;
}> = ({ heading, options, setOption, value, optionKey }) => {
  return (
    <div className="border border-solid border-black p-2">
      <h5 className="mb-2">{heading}</h5>
      <select
        value={value}
        onChange={(e: any) => setOption(optionKey, e.target.value)}
        className="border border-solid border-black"
      >
        {options.map((opValue) => (
          <option value={opValue} key={opValue}>
            {opValue}
          </option>
        ))}
      </select>
    </div>
  );
};
