import { debounce } from "lodash";
import { useCallback } from "react";

export const useDebounce = () => {
  return useCallback(debounce, []);
};
