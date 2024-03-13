import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function userContent() {
  const [file, setFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [deleteStatus, setDeleteStatus] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadedFileName(response.data.fileName);
      setUploadStatus('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Failed to upload file.');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/files/${uploadedFileName}`);
      setUploadedFileName('');
      setDeleteStatus('File deleted successfully!');
    } catch (error) {
      console.error('Error deleting file:', error);
      setDeleteStatus('Failed to delete file.');
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <Link to="./userContent">
      <button onClick={handleUpload}>Upload</button>
      </Link>
      <p>{uploadStatus}</p>
      {uploadedFileName && (
        <div>
          <h2>Uploaded File</h2>
          <p>{uploadedFileName}</p>
          <Link to="./userContent">
          <button onClick={handleDelete}>Delete</button>
      </Link>
          <p>{deleteStatus}</p>
        </div>
      )}
    </div>
  );
}

export default userContent;
