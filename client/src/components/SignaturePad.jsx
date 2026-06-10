import { useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

function SignaturePad({ setSignature }) {
  const canvasRef = useRef();

  const saveSignature = async () => {
    const image = await canvasRef.current.exportImage("png");

    setSignature(image);

    console.log(image);
    alert("Signature Saved");
  };

  const clearSignature = () => {
    canvasRef.current.clearCanvas();
    setSignature(null);
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow mt-5">
      <h2>Draw Signature</h2>

      <ReactSketchCanvas
        ref={canvasRef}
        width="500px"
        height="200px"
        strokeWidth={4}
        strokeColor="black"
        style={{
          border: "1px solid #ccc",
        }}
      />

      <div style={{ marginTop: "10px" }}>
        <button onClick={saveSignature}>
          Save Signature
        </button>

        <button
          onClick={clearSignature}
          style={{ marginLeft: "10px" }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default SignaturePad;