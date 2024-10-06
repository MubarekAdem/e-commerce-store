import React, { useState } from "react";
import axios from "axios";

const BulkUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("files", file); // Ensure this key matches what is read in the API

    try {
      const response = await axios.post("/api/bulk-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(response.data.message); // Show success message from the API
    } catch (error) {
      alert("Error uploading file.");
      console.error(
        "Error details:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default BulkUpload;
