import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [search, setSearch] = useState("");


  const fetchLinks = async () => {
    const res = await API.get("/links");
    setLinks(res.data);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const createLink = async (e) => {
    e.preventDefault();
    try {
        console.log("code:", code);
      await API.post("/links", { url, code });
      setUrl("");
      setCode("");
      fetchLinks();
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "Error creating link");
    }
  };

  const deleteLink = async (shortCode) => {
    await API.delete(`/links/${shortCode}`);
    fetchLinks();
  };

  const copyShortUrl = (shortCode) => {
    const shortUrl = `http://localhost:3000/${shortCode}`;
    navigator.clipboard.writeText(shortUrl);
    alert("Copied: " + shortUrl);
  };

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

          <button className="btn-primary" type="submit">Create</button>
        </form>

        {errorMsg && (
          <p style={{ color: "red", marginTop: "10px" }}>{errorMsg}</p>
        )}
      </div>





      <div className="card table-wrapper">
  
  <div style={{ marginBottom: "15px", display: "flex", justifyContent: "flex-end" }}>
    <input
      type="text"
      placeholder="Search by code or URL..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #d1d5db",
        width: "250px"
      }}
    />
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
          const s = search.toLowerCase();
          return (
            link.code.toLowerCase().includes(s) ||
            link.url.toLowerCase().includes(s)
          );
        })
        .map((link) => (
          <tr key={link.code}>
            <td>
              <Link to={`/code/${link.code}`}>{link.code}</Link>
            </td>
            <td style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {link.url}
            </td>
            <td>{link.clicks}</td>
            <td>
              {link.last_clicked
                ? new Date(link.last_clicked).toLocaleString()
                : "-"}
            </td>
            <td style={{ display: "flex", gap: "6px" }}>
              <button className="btn-copy" onClick={() => copyShortUrl(link.code)}>
                Copy
              </button>
              <button className="btn-delete" onClick={() => deleteLink(link.code)}>
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
