function Dashboard({ documents }) {
  const total = documents.length;

  const signed = documents.filter(
    (doc) => doc.status === "Signed"
  ).length;

  const pending = total - signed;

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "30px",
        flexWrap: "wrap",
      }}
    >
      {/* Total Documents */}
      <div
        style={{
          background: "#e3f2fd",
          padding: "25px",
          minWidth: "180px",
          textAlign: "center",
          border: "1px solid #ddd",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Total Documents</h3>
        <h1
  style={{
    fontSize: "40px",
    marginTop: "10px",
  }}
>
  {total}
</h1>
      </div>

      {/* Signed Documents */}
      <div
        style={{
          background: "#e8f5e9",
          padding: "25px",
          minWidth: "180px",
          textAlign: "center",
          border: "1px solid #ddd",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Signed</h3>
        <h1
  style={{
    fontSize: "40px",
    marginTop: "10px",
  }}
>
  {signed}
</h1>
      </div>

      {/* Pending Documents */}
      <div
        style={{
          background: "#fff8e1",
          padding: "25px",
          minWidth: "180px",
          textAlign: "center",
          border: "1px solid #ddd",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Pending</h3>
        <h1
  style={{
    fontSize: "40px",
    marginTop: "10px",
  }}
>
  {pending}
</h1>
      </div>
    </div>
  );
}

export default Dashboard;