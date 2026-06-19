import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function UploadDocument({ fetchDocuments }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

const handleUpload = async () => {
  if (!file) {
    toast.error("Please select a PDF file");
    return;
  }

  setLoading(true);

  const formData = new FormData();
  formData.append("document", file);

  try {
    await axios.post(
  `${import.meta.env.VITE_API_URL}/api/docs/upload`,
  formData
);

    toast.success("Document uploaded successfully!");

    setFile(null);

    fetchDocuments();
  } catch (error) {
    console.error(error);
    toast.error("Upload failed!");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <h2>Upload Document</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

  <button
  onClick={handleUpload}
  disabled={loading}
  className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
>
  {loading ? "Uploading..." : "Upload PDF"}
</button>
    </div>
  );
}

export default UploadDocument;