import { ELEMENT_TYPE, SELECTOR_SEPARATOR } from "./constant";
import { GenericObject } from "./types";

export const getElementId = (elementType: string, elementNumber: number) => {
  return `${elementType}${SELECTOR_SEPARATOR}${elementNumber}`;
};

export const getElementNumber = (
  elementsData: GenericObject,
  elementType: ELEMENT_TYPE
) => {
  return (
    Object.keys(elementsData).filter((elementKey) =>
      elementKey.startsWith(elementType)
    ).length + 1
  );
};
