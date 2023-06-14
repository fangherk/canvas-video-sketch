import { useRef, useState } from "react";
import useMeasure from "react-use-measure";

import "./App.css";

const Demo = () => {
  const [drawing, setDrawing] = useState();
  const [initialCoordinates, setInitialCoordinates] = useState();
  const canvasRef = useRef();

  const [ref, bounds] = useMeasure();

  const canvasDraw = (event) => {
    setDrawing(true);
    setInitialCoordinates([event.clientX, event.clientY]);
  };

  const doneDrawing = (event) => {
    setDrawing(false);
    const boundingRect = event.target.getBoundingClientRect();
    const width = Math.abs(event.clientX - initialCoordinates[0]);
    const height = Math.abs(event.clientY - initialCoordinates[1]);
    const initialX = initialCoordinates[0] - boundingRect.left;
    const initialY = initialCoordinates[1] - boundingRect.top;
    drawRectangle(canvasRef, initialX, initialY, width, height, "red");
  };

  function drawRectangle(canvasRef, x, y, width, height, color) {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = color;
      console.log(`X: ${x}, Y: ${y}, Color: ${color}`);
      ctx.fillRect(x, y, width, height);
    }
  }

  return (
    <div
      style={{
        position: "relative",
        border: "1px solid red",
      }}
      ref={ref}
    >
      <video>
        <source controls autoPlay="" muted src="flower.mp4" type="video/mp4"></source>
      </video>

      {/* Key part to render the canvas properly by setting its attributes */}
      {bounds.width && bounds.height && (
        <canvas
          width={bounds.width}
          height={bounds.height}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
          }}
          ref={canvasRef}
          onMouseDown={canvasDraw}
          onMouseUp={doneDrawing}
        ></canvas>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Demo />
      </header>
    </div>
  );
}

export default App;
