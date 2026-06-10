import { useEffect, useState } from "react";
import axios from "axios";

import UploadDocument from "./components/UploadDocument";
import DocumentList from "./components/DocumentList";
import PdfViewer from "./components/PdfViewer";
import SignaturePad from "./components/SignaturePad";
import Dashboard from "./components/Dashboard";

function App() {
  const [documents, setDocuments] = useState([]);

  const [selectedPdf, setSelectedPdf] = useState(null);

  const [signature, setSignature] = useState(null);

  const fetchDocuments = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/docs"
    );

    setDocuments(res.data);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Day 5 - Sign PDF
  const signPdf = async () => {
    try {
      if (!selectedPdf) {
        alert("Please select a PDF");
        return;
      }

      if (!signature) {
        alert("Please save a signature first");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/sign-pdf",
        {
          pdfUrl: selectedPdf,
          signature,
        }
      );

      window.open(
        res.data.downloadUrl,
        "_blank"
      );
    } catch (err) {
      console.error(err);
      alert("Failed to sign PDF");
    }
  };
return (
  <div className="p-6">
    <h1>Document Signature App</h1>

    {/* Day 6 Dashboard */}
    <Dashboard documents={documents} />

    <UploadDocument
      fetchDocuments={fetchDocuments}
    />

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      <DocumentList
        documents={documents}
        setSelectedPdf={setSelectedPdf}
      />

      <PdfViewer file={selectedPdf} />
    </div>

    <div style={{ marginTop: "30px" }}>
      <SignaturePad
        setSignature={setSignature}
      />
    </div>

    <div style={{ marginTop: "20px" }}>
      <button onClick={signPdf}>
        Sign PDF
      </button>
    </div>
  </div>
);
}

export default App;