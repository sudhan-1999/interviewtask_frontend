import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api";

export default function StatsPage() {
  const { code } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    API.get(`/links/${code}`)
      .then((res) => setDetails(res.data))
      .catch(() => setDetails(null));
  }, [code]);

  if (!details) return <h2 className="container">Code not found</h2>;

  return (
    <div className="container">
      <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
        Stats for: {code}
      </h1>

      <div className="card">
        <p><strong>URL:</strong> {details.url}</p>
        <p><strong>Clicks:</strong> {details.clicks}</p>
        <p>
          <strong>Last clicked:</strong>{" "}
          {details.last_clicked
            ? new Date(details.last_clicked).toLocaleString()
            : "-"}
        </p>
        <p>
          <strong>Created at:</strong>{" "}
          {new Date(details.created_at).toLocaleString()}
        </p>

        <Link to="/" style={{ color: "#2563eb", fontSize: "14px" }}>
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
