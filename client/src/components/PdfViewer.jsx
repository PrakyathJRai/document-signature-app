import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc =
  `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PdfViewer({ file }) {
  const [numPages, setNumPages] = useState(null);

  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <h2>PDF Preview</h2>

      {file ? (
        <Document
          file={file}
          onLoadSuccess={({ numPages }) =>
            setNumPages(numPages)
          }
          onLoadError={(error) =>
            console.error("PDF Error:", error)
          }
        >
          {Array.from(
            { length: numPages || 0 },
            (_, index) => (
              <Page
                key={index}
                pageNumber={index + 1}
              />
            )
          )}
        </Document>
      ) : (
        <p>Select a document</p>
      )}
    </div>
  );
}

export default PdfViewer;