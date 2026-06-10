function DocumentList({
  documents,
  setSelectedPdf,
}) {
  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <h2>Uploaded Documents</h2>

      {documents.map((doc) => (
        <div
          key={doc._id}
          className="border p-3 my-2 cursor-pointer rounded"
          onClick={() =>
            setSelectedPdf(
              `http://localhost:5000/${doc.filePath.replace(
                /\\/g,
                "/"
              )}`
            )
          }
        >
          <strong>{doc.fileName}</strong>

          <p>
            {new Date(
              doc.uploadedAt
            ).toLocaleDateString()}
          </p>

          <p>
            Status:
            <span
              style={{
                backgroundColor:
                  doc.status === "Signed"
                    ? "#d4edda"
                    : "#fff3cd",
                color:
                  doc.status === "Signed"
                    ? "#155724"
                    : "#856404",
                padding: "4px 10px",
                borderRadius: "20px",
                marginLeft: "8px",
                fontWeight: "bold",
              }}
            >
              {doc.status}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default DocumentList;