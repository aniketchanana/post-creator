import { FC, useEffect, useRef } from "react";
import { GenericObject } from "./types";

export const Editor: FC<{ elementsData: GenericObject }> = ({
  elementsData,
}) => {
  const ref = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    ref.current?.contentWindow?.postMessage({
      type: "UPDATE_CREATIVE",
      data: elementsData,
    });
  }, [elementsData]);
  return <iframe ref={ref} src="/creator.html" className="h-full w-full" />;
};
