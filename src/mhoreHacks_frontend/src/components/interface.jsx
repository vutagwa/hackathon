import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BackendBaseUrl = 'http://backend-url'; 

function UserInterface() {
  const BackendBaseUrl = 'http://backend-url'; 

function UserInterface() {
  const [content, setContent] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchContent();
  }, [searchQuery]);

  const fetchContent = async () => {
    try {
      const response = await axios.get(`${BackendBaseUrl}/content?query=${searchQuery}`);
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };


  return (
    <div>
      <h1>Content by Creators</h1>
      {content.map((item) => (
        <div key={item.id}>
          <p>{item.text}</p>
          <button onClick={() => handleLike(item.id)}>Like ({item.likes})</button>
          <button onClick={() => handleDislike(item.id)}>Dislike ({item.dislikes})</button>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment"
          />
          <button onClick={() => handleComment(item.id)}>Comment</button>
          <ul>
            {item.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
}

export default UserInterface;
