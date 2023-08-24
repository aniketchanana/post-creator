import { useState } from "react";
import { POST_HEIGHT, POST_WIDTH } from "./constant";
import { Editor } from "./Editor";
import { BGControls } from "./BGControls";

export default function App() {
  const [imageSrc, setImageSrc] = useState("");
  const handleFileUpload = (e: any) => {
    const [file] = e.target.files;
    if (file) {
      const src = URL.createObjectURL(file);
      setImageSrc(src);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        style={{
          height: `${POST_HEIGHT}px`,
          width: `${POST_WIDTH}px`,
        }}
        className="border border-solid border-black box-content flex items-center justify-center"
      >
        {imageSrc ? (
          <Editor bgImageUrl={imageSrc} />
        ) : (
          <input type="file" name="postCreator" onChange={handleFileUpload} />
        )}
      </div>
      {!!imageSrc && <BGControls />}
    </div>
  );
}
