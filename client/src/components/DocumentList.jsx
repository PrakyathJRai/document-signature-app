import { toast } from "react-toastify";

function DocumentList({
  documents,
  setSelectedPdf,
}) {
  const deleteDocument = async (
    e,
    documentId
  ) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/docs/${documentId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      toast.success(data.message);

      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete document");
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Uploaded Documents
      </h2>

      {documents.length === 0 ? (
        <p className="text-gray-500">
          No documents uploaded yet.
        </p>
      ) : (
        documents.map((doc) => (
          <div
            key={doc._id}
            className="border border-gray-200 p-4 my-3 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() =>
              setSelectedPdf(
                `http://localhost:5000/${doc.filePath.replace(
                  /\\/g,
                  "/"
                )}`
              )
            }
          >
            <h3 className="font-semibold text-lg text-gray-800">
              {doc.fileName}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Uploaded:{" "}
              {new Date(
                doc.uploadedAt
              ).toLocaleDateString()}
            </p>

            <p className="mt-3">
              Status:
              <span
                className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
                  doc.status === "Signed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {doc.status}
              </span>
            </p>

            <div className="flex flex-wrap gap-3 mt-4">
              {/* Download Original */}
              <a
                href={`http://localhost:5000/${doc.filePath.replace(
                  /\\/g,
                  "/"
                )}`}
                download
                onClick={(e) =>
                  e.stopPropagation()
                }
              >
                <button className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition">
                  Download Original
                </button>
              </a>

              {/* Download Signed */}
              {doc.signedPdfPath && (
                <a
                  href={`http://localhost:5000/${doc.signedPdfPath}`}
                  download
                  onClick={(e) =>
                    e.stopPropagation()
                  }
                >
                  <button className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition">
                    Download Signed
                  </button>
                </a>
              )}

              {/* Delete */}
              <button
                onClick={(e) =>
                  deleteDocument(
                    e,
                    doc._id
                  )
                }
                className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default DocumentList;