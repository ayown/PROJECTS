import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the custom CSS file

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage({ text: res.data.message, type: 'success' });
    } catch (err) {
      setMessage({ text: 'File upload failed', type: 'error' });
    }
  };

  return (
    <div id="root">
      <div className="upload-card">
        <h1>File Sharing App</h1>
        <form onSubmit={handleSubmit}>
          <div className="file-input">
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
            />
            <label htmlFor="file">Choose File</label>
          </div>
          <button type="submit" className="upload-button">Upload</button>
        </form>
        {message && (
          <p className={`message ${message.type}`}>{message.text}</p>
        )}
      </div>
      <p className="footer-text">Drag and drop files or click to upload.</p>
    </div>
  );
}

export default App;