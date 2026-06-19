import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
  const [signing, setSigning] = useState(false);

  // Remove trailing slash automatically
  const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");

  console.log("API URL =", API_URL);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/docs`
      );

      setDocuments(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch documents");
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const signPdf = async () => {
    const confirmSign = window.confirm(
      "Do you want to sign this document?"
    );

    if (!confirmSign) return;

    try {
      if (!selectedPdf) {
        toast.error("Please select a PDF");
        return;
      }

      if (!signature) {
        toast.error("Please save a signature first");
        return;
      }

      setSigning(true);

      const res = await axios.post(
        `${API_URL}/api/sign-pdf`,
        {
          pdfUrl: selectedPdf,
          signature,
        }
      );

      toast.success("PDF signed successfully!");

      window.open(
        res.data.downloadUrl,
        "_blank"
      );

      await fetchDocuments();
    } catch (err) {
      console.error(err);
      toast.error("Failed to sign PDF");
    } finally {
      setSigning(false);
    }
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.fileName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "All"
        ? true
        : doc.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1400px",
        margin: "0 auto",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "25px",
          fontSize: "40px",
          fontWeight: "bold",
          color: "#1e293b",
        }}
      >
        📄 Document Signature App
      </h1>

      <Dashboard documents={documents} />

      <input
        type="text"
        placeholder="🔍 Search documents..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        style={{
          padding: "12px",
          width: "100%",
          marginBottom: "20px",
          borderRadius: "10px",
          border: "1px solid #d1d5db",
          fontSize: "16px",
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
          gridTemplateColumns: "400px 1fr",
          gap: "25px",
          marginTop: "25px",
          alignItems: "start",
        }}
      >
        <DocumentList
          documents={filteredDocuments}
          setSelectedPdf={setSelectedPdf}
        />

        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <PdfViewer file={selectedPdf} />
        </div>
      </div>

      <div
        style={{
          marginTop: "30px",
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <SignaturePad
          setSignature={setSignature}
        />
      </div>

      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <button
          onClick={signPdf}
          disabled={signing}
          style={{
            background: signing
              ? "#94a3b8"
              : "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 30px",
            borderRadius: "8px",
            cursor: signing
              ? "not-allowed"
              : "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {signing
            ? "Signing..."
            : "✍️ Sign PDF"}
        </button>
      </div>

      <footer
        style={{
          textAlign: "center",
          marginTop: "40px",
          color: "#64748b",
          fontSize: "14px",
        }}
      >
        Developed by Prakyath J Rai
      </footer>
    </div>
  );
}

export default App;