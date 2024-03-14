import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BackendBaseUrl = 'http://backend-url';

function UserInterface() {
  const [content, setContent] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredContent = content.filter(item =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2>Categories</h2>
        <ul style={styles.navigationList} >
          <li><Link to="/creator?category=sports" style={{textDecoration: 'none', color: 'black'}}>MUSIC</Link></li>
          <li><Link to="/creator?category=education" style={{textDecoration: 'none', color: 'black'}}>VIDEOS</Link></li>
          <li><Link to="/creator?category=music" style={{textDecoration: 'none', color: 'black'}}>PODCASTS</Link></li>
          <li><Link to="/creator?category=kpop" style={{textDecoration: 'none', color: 'black'}}>IMAGES</Link></li>
          <li><Link to="/creator?category=movies" style={{textDecoration: 'none', color: 'black'}}>DOCUMENTS</Link></li>
        </ul>
      </div>
      <div style={styles.content}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          style={styles.searchBar}
        />
        {filteredContent.map((item) => (
          <div key={item.id} style={styles.contentItem}>
            <p>{item.text}</p>
            <button onClick={() => handleLike(item.id)}>Like ({item.likes})</button>
            <button onClick={() => handleDislike(item.id)}>Dislike ({item.dislikes})</button>
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment"
              style={styles.commentInput}
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
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
  },
  sidebar: {
    flex: '0 0 20%',
    backgroundColor: '#f0f0f0',
    padding: '10px',
  },
  content: {
    flex: '1',
    padding: '20px',
  },
  searchBar: {
    width: '100%',
    marginBottom: '20px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  contentItem: {
    marginBottom: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  commentInput: {
    marginBottom: '10px',
    marginRight: '10px',
  },
  navigationList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
};

export default UserInterface;
