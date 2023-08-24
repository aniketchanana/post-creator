import { useEffect, useRef } from "react";

export const Editor = () => {
  const ref = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    window.postMessage({ name: "aniket" }, "*");
  }, []);
  return <iframe ref={ref} src="/creator.html" className="h-full w-full" />;
};
