import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Creator() {
  const [file, setFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [deleteStatus, setDeleteStatus] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    
    if (uploadedFileName) {
      axios.get(`/api/files/${uploadedFileName}`)
        .then(response => {
          setFileContent(response.data.content);
        })
        .catch(error => {
          console.error('Error fetching file content:', error);
        });
    }
  }, [uploadedFileName]);

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
      setFileContent('');
    } catch (error) {
      console.error('Error deleting file:', error);
      setDeleteStatus('Failed to delete file.');
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/files/${uploadedFileName}`, { content: fileContent });
      setEditMode(false);
    } catch (error) {
      console.error('Error saving file content:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleContentChange = (event) => {
    setFileContent(event.target.value);
  };

  return (
    <div>
      <h1>File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{uploadStatus}</p>
      {uploadedFileName && (
        <div>
          <h2>Uploaded File</h2>
          <p>{uploadedFileName}</p>
          {editMode ? (
            <>
              <textarea value={fileContent} onChange={handleContentChange} />
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              <p>{fileContent}</p>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
              <p>{deleteStatus}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Creator;
