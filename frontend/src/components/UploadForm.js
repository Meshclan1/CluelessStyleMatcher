import React, { useState } from "react";
import { uploadImage } from "../services/api";

export default function UploadForm() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (file) {
      await uploadImage(file);
      alert("Upload successful!");
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload Item</button>
    </div>
  );
}
