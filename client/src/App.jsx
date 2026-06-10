import { useEffect, useState } from "react";
import axios from "axios";

import UploadDocument from "./components/UploadDocument";
import DocumentList from "./components/DocumentList";
import PdfViewer from "./components/PdfViewer";

function App() {
  const [documents, setDocuments] =
    useState([]);

  const [selectedPdf, setSelectedPdf] =
    useState(null);

const fetchDocuments = async () => {
  const res = await axios.get(
    "http://localhost:5000/api/docs"
  );

  console.log("Documents:", res.data);

  setDocuments(res.data);
};

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="p-6">
      <h1>Document Signature App</h1>

      <UploadDocument
        fetchDocuments={fetchDocuments}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 2fr",
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
    </div>
  );
}

export default App;
