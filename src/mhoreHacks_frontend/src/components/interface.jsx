import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BackendBaseUrl = 'http://backend-url'; 

function UserInterface() {
  const [content, setContent] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get(`${BackendBaseUrl}/content`);
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const handleLike = async (contentId) => {
    try {
      await axios.post(`${BackendBaseUrl}/like`, { contentId });
      fetchContent();
    } catch (error) {
      console.error('Error liking content:', error);
    }
  };

  const handleDislike = async (contentId) => {
    try {
      await axios.post(`${BackendBaseUrl}/dislike`, { contentId });
      fetchContent();
    } catch (error) {
      console.error('Error disliking content:', error);
    }
  };

  const handleComment = async (contentId) => {
    try {
      await axios.post(`${BackendBaseUrl}/comment`, { contentId, comment: commentText });
      setCommentText('');
      fetchContent();
    } catch (error) {
      console.error('Error commenting on content:', error);
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

export default UserInterface;
