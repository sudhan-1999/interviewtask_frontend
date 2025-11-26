import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const [filterCode, setFilterCode] = useState("");
  const [filterUrl, setFilterUrl] = useState("");

  const fetchLinks = async () => {
    setLoading(true); // START LOADING

    const res = await API.get("/links");
    setLinks(res.data);

    setLoading(false); // DONE
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const createLink = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsCreating(true); // START LOADING

    try {
      await API.post("/links", { url, code });
      setUrl("");
      setCode("");
      fetchLinks(); // reload data
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "Error creating link");
    }

    setIsCreating(false); // DONE
  };

  const deleteLink = async (shortCode) => {
    await API.delete(`/links/${shortCode}`);
    fetchLinks();
  };

  const copyShortUrl = (shortCode) => {
    const shortUrl = `https://interviewtask-backend.onrender.com/${shortCode}`;
    navigator.clipboard.writeText(shortUrl);
    alert("Copied: " + shortUrl);
  };
  if (loading) {
    return (
      <div className="container">
        <h1>TinyLink — Dashboard</h1>
        <div className="card" style={{ textAlign: "center", padding: "30px" }}>
          <p style={{ fontSize: "18px" }}>Loading links...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <h1>TinyLink — Dashboard</h1>

      <div className="card">
        <form onSubmit={createLink} className="form-row">
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Custom code (6–8 chars)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            minLength={6}
            maxLength={8}
            pattern="[A-Za-z0-9]{6,8}"
          />

          <button className="btn-primary" type="submit" disabled={isCreating}>
            {isCreating ? "Creating..." : "Create"}
          </button>
        </form>

        {errorMsg && (
          <p style={{ color: "red", marginTop: "10px" }}>{errorMsg}</p>
        )}
      </div>

      <div className="card table-wrapper">
        <div
          style={{
            marginBottom: "15px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <select
            value={filterCode}
            onChange={(e) => setFilterCode(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
            }}
          >
            <option value="">Filter by Code</option>
            {links.map((link) => (
              <option key={link.code} value={link.code}>
                {link.code}
              </option>
            ))}
          </select>

          <select
            value={filterUrl}
            onChange={(e) => setFilterUrl(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
            }}
          >
            <option value="">Filter by URL</option>
            {links.map((link) => (
              <option key={link._id} value={link.url}>
                {link.url}
              </option>
            ))}
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>URL</th>
              <th>Clicks</th>
              <th>Last Clicked</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {links
              .filter((link) => {
                if (filterCode && link.code !== filterCode) return false;
                if (filterUrl && link.url !== filterUrl) return false;
                return true;
              })
              .map((link) => (
                <tr key={link.code}>
                  <td>
                    <Link to={`/code/${link.code}`}>{link.code}</Link>
                  </td>
                  <td
                    style={{
                      maxWidth: "300px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {link.url}
                  </td>
                  <td>{link.clicks}</td>
                  <td>
                    {link.last_clicked
                      ? new Date(link.last_clicked).toLocaleString()
                      : "-"}
                  </td>
                  <td style={{ display: "flex", gap: "6px" }}>
                    <button
                      className="btn-copy"
                      onClick={() => copyShortUrl(link.code)}
                    >
                      Copy
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => deleteLink(link.code)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
