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
  const [contentType, setContentType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    if (uploadedFileName) {
      axios.get(`/api/files/${uploadedFileName}`)
        .then(response => {
          const { content, contentType, title, description, timestamp } = response.data;
          setFileContent(content);
          setContentType(contentType);
          setTitle(title);
          setDescription(description);
          setTimestamp(timestamp);
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
      formData.append('contentType', contentType);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('timestamp', timestamp);

      const response = await axios.post('http://localhost:3000/upload', formData, {
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
      await axios.delete(`http://localhost:3000/delete/${uploadedFileName}`);
      setUploadedFileName('');
      setDeleteStatus('File deleted successfully!');
      setFileContent('');
      setContentType('');
      setTitle('');
      setDescription('');
      setTimestamp('');
    } catch (error) {
      console.error('Error deleting file:', error);
      setDeleteStatus('Failed to delete file.');
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };
  const fetchFileContent = async (fileName) => {
    try {
      const response = await axios.get(`http://localhost:3000/retrieve/${fileName}`);
      const { content, contentType, title, description, timestamp } = response.data;
      setFileContent(content);
      setContentType(contentType);
      setTitle(title);
      setDescription(description);
      setTimestamp(timestamp);
    } catch (error) {
      console.error('Error fetching file content:', error);
    }
  };
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/update/${uploadedFileName}`, {
        content: fileContent,
        contentType,
        title,
        description,
        timestamp
      });
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
    <div style={styles.container}>
      <h1>File Upload</h1>
      <input type="file" onChange={handleFileChange} style={styles.input} />
      <select value={contentType} onChange={(e) => setContentType(e.target.value)} style={styles.input}>
        <option value="">Select Content Type</option>
        <option value="music">Music</option>
        <option value="podcast">Podcast</option>
        <option value="video">Video</option>
        <option value="image">Image</option>
        <option value="document">Document</option>
      </select>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={styles.input} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={styles.input} />
      {contentType === 'music' || contentType === 'video' ? (
        <input type="text" placeholder="Timestamp" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} style={styles.input} />
      ) : null}
      <button onClick={handleUpload} style={styles.button}>Upload</button>
      <p>{uploadStatus}</p>
      {uploadedFileName && (
        <div>
          <h2>Uploaded File</h2>
          <p>{uploadedFileName}</p>
          {editMode ? (
            <>
              <textarea value={fileContent} onChange={handleContentChange} style={styles.input} />
              <button onClick={handleSave} style={styles.button}>Save</button>
              <button onClick={handleCancelEdit} style={styles.button}>Cancel</button>
            </>
          ) : (
            <>
              <p>{fileContent}</p>
              <button onClick={handleEdit} style={styles.button}>Edit</button>
              <button onClick={handleDelete} style={styles.button}>Delete</button>
              <p>{deleteStatus}</p>
            </>
          )}
          <Link to="/interface"><button style={styles.button}>Post</button></Link>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    margin: 'auto',
    width: '50%',
    padding: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
    marginRight: '10px',
  },
};

export default Creator;
