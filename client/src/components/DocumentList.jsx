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
          className="border p-3 my-2 cursor-pointer"
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
          <br />
          {new Date(
            doc.uploadedAt
          ).toLocaleDateString()}
        </div>
      ))}
    </div>
  );
}

export default DocumentList;