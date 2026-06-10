import { useState } from "react";
import axios from "axios";

function UploadDocument({ fetchDocuments }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("document", file);

    try {
      await axios.post(
        "http://localhost:5000/api/docs/upload",
        formData
      );

      alert("Document uploaded successfully");

      setFile(null);

      fetchDocuments();
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <h2>Upload Document</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <button onClick={handleUpload}>
        Upload PDF
      </button>
    </div>
  );
}

export default UploadDocument;