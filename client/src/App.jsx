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

  const [searchTerm, setSearchTerm] = useState("");

  const [filter, setFilter] = useState("All");

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

await fetchDocuments();
    } catch (err) {
      console.error(err);
      alert("Failed to sign PDF");
    }
  };

const filteredDocuments = documents.filter((doc) => {
  const matchesSearch =
    doc.fileName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  const matchesFilter =
    filter === "All"
      ? true
      : doc.status === filter;

  return matchesSearch && matchesFilter;
});


return (
  <div className="p-6">
    <h1>Document Signature App</h1>

    <Dashboard documents={documents} />

    {/* Search Bar */}
    <input
      type="text"
      placeholder="Search documents..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
      style={{
        padding: "10px",
        width: "100%",
        marginBottom: "20px",
        borderRadius: "8px",
        border: "1px solid #ccc",
      }}
    />

    <div
  style={{
    marginBottom: "20px",
    display: "flex",
    gap: "10px",
  }}
>
  <button onClick={() => setFilter("All")}>
    All
  </button>

  <button onClick={() => setFilter("Signed")}>
    Signed
  </button>

  <button onClick={() => setFilter("Pending")}>
    Pending
  </button>
</div>

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
        documents={filteredDocuments}
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