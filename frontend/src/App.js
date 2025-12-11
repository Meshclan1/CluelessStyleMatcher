import { useState } from "react";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [scenario, setScenario] = useState("");
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  // 👉 Upload to S3 (Pre-Signed URL flow recommended)
  async function handleUpload() {
    if (!selectedFile) {
      setUploadMessage("Please select an image first.");
      return;
    }

    setUploadMessage("Generating upload URL...");

    try {
      const presignRes = await fetch(
        `${import.meta.env.VITE_API_URL}/presign-upload`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: selectedFile.name }),
        }
      );

      const { uploadUrl } = await presignRes.json();

      // Upload directly to S3
      await fetch(uploadUrl, {
        method: "PUT",
        body: selectedFile,
      });

      setUploadMessage(
        "Image uploaded successfully! Metadata will appear shortly."
      );
    } catch (err) {
      console.error(err);
      setUploadMessage("Upload failed – please try again.");
    }
  }

  // 👉 Request an outfit recommendation
  async function getRecommendation() {
    if (!scenario.trim()) {
      return alert("Please enter a scenario");
    }

    setLoading(true);
    setRecommendation(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario }),
      });

      const data = await res.json();
      setRecommendation(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching recommendation.");
    }

    setLoading(false);
  }

  return (
    <div className="container">
      <h1>CluelessStyleMatcher</h1>
      <p className="subtitle">
        AI-powered outfit suggestions based on your real wardrobe
      </p>

      {/* Upload Section */}
      <section className="card">
        <h2>Upload Wardrobe Item</h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <button onClick={handleUpload}>Upload</button>
        <p className="status">{uploadMessage}</p>
      </section>

      {/* Recommendation Section */}
      <section className="card">
        <h2>Get an Outfit Recommendation</h2>
        <input
          type="text"
          placeholder="e.g., birthday dinner, winter commute"
          value={scenario}
          onChange={(e) => setScenario(e.target.value)}
        />
        <button onClick={getRecommendation}>Recommend</button>

        {loading && <p>Generating your perfect outfit…</p>}

        {recommendation && (
          <div className="recommendation-box">
            <h3>Recommended Outfit</h3>
            <p>
              <strong>Summary:</strong> {recommendation.summary}
            </p>

            <h4>Selected Items</h4>
            <ul>
              {recommendation.items?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h4>Styling Notes</h4>
            <p>{recommendation.notes}</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
