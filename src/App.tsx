import { ReactNode, useEffect, useRef, useState } from "react";
import { GravityScrollArea } from "../lib";
import { RadixAutoScroll } from "./Radix";

type Shape = "rectangle" | "circle" | "ellipse";

const randomShape = (): Shape => {
  const shapes: Shape[] = ["rectangle", "circle", "ellipse"];
  return shapes[Math.floor(Math.random() * shapes.length)];
};

const randomSize = () => {
  return {
    width: Math.floor(Math.random() * 200) + 50, // Width between 50 and 250
    height: Math.floor(Math.random() * 200) + 50, // Height between 50 and 250
  };
};

const RandomShape: React.FC<{
  shape: Shape;
  size: { width: number; height: number };
}> = ({ shape, size }) => {
  const style = {
    width: `${size.width}px`,
    height: `${size.height}px`,
    backgroundColor: "blue",
    borderRadius:
      shape === "circle" ? "50%" : shape === "ellipse" ? "50% / 25%" : "0%",
  };

  return <div style={style} />;
};

function App() {
  const [content, setContent] = useState<(string | ReactNode)[]>([]);
  const [generating, setGenerating] = useState(false);
  const continueGenerating = useRef(false);

  useEffect(() => {
    continueGenerating.current = generating;
    if (generating) {
      const intervalId = setInterval(async () => {
        if (continueGenerating.current) {
          const randomString = Math.random().toString(36).substring(7);
          setContent((s) => {
            if (typeof s.at(-1) === "string") {
              return s.slice(0, -1).concat(`${s.at(-1)} ${randomString}`);
            }
            return [...s, randomString];
          });
        } else {
          clearInterval(intervalId);
        }
      }, 30);

      return () => clearInterval(intervalId);
    }
  }, [generating]);
  const addNewLine = () => {
    setContent((s) => [...s, `\n`]);
  };

  const toggleGeneration = () => {
    setGenerating((s) => !s);
  };

  const addDynamicContent = () => {
    setContent((s) => [
      ...s,
      <RandomShape shape={randomShape()} size={randomSize()} />,
    ]);
  };

  const [scrollThreshold, setScrollThreshold] = useState<string>("100px");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          justifyContent: "flex-start",
        }}
      >
        <button onClick={toggleGeneration}>
          {generating ? "Stop generate tokens" : "Generate tokens"}
        </button>
        <button disabled={!generating} onClick={addNewLine}>
          Add new line
        </button>
        <button disabled={!generating} onClick={addDynamicContent}>
          Add dynamic content
        </button>
        <button onClick={() => setContent([])}>Clear</button>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <span>scrollThreshold:</span>
        <input
          value={scrollThreshold}
          onChange={(e) => setScrollThreshold(e.target.value)}
        />
      </div>
      {/* <RadixAutoScroll
        scrollThreshold={scrollThreshold}
        autoScrollEnabled={generating}
      >
        {content}
      </RadixAutoScroll> */}
      <GravityScrollArea
        style={{
          width: 600,
          height: 300,
          border: "1px solid #000",
          whiteSpace: "pre-wrap",
        }}
        autoScrollEnabled={generating}
        scrollThreshold={scrollThreshold}
      >
        {content}
      </GravityScrollArea>
      <div style={{ display: "flex", gap: 10 }}>
        <div>
          autoScrollEnabled:
          <span style={{ color: generating ? "green" : "red" }}>
            {generating ? "true" : "false"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
