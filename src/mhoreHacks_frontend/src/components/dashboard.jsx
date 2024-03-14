// Dashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard({ creatorId }) {
  const [creatorProfile, setCreatorProfile] = useState(null);
  const [creatorContent, setCreatorContent] = useState([]);
  const [viewershipStats, setViewershipStats] = useState(null);

  useEffect(() => {
    fetchCreatorProfile();
    fetchCreatorContent();
    fetchViewershipStats();
  }, []);

  const fetchCreatorProfile = async () => {
    try {
      const response = await axios.get(`/api/creator/${creatorId}/profile`);
      setCreatorProfile(response.data);
    } catch (error) {
      console.error('Error fetching creator profile:', error);
    }
  };

  const fetchCreatorContent = async () => {
    try {
      const response = await axios.get(`/api/creator/${creatorId}/content`);
      setCreatorContent(response.data);
    } catch (error) {
      console.error('Error fetching creator content:', error);
    }
  };

  const fetchViewershipStats = async () => {
    try {
      const response = await axios.get(`/api/creator/${creatorId}/viewership`);
      setViewershipStats(response.data);
    } catch (error) {
      console.error('Error fetching viewership stats:', error);
    }
  };

  return (
    <div>
      <h1>Creator Dashboard</h1>
      {creatorProfile && (
        <div>
          <h2>Profile</h2>
          <p>Name: {creatorProfile.name}</p>
          <p>Email: {creatorProfile.email}</p>
        </div>
      )}

      <h2>Content Posted</h2>
      <ul>
        {creatorContent.map(content => (
          <li key={content.id}>
            {content.title}
          </li>
        ))}
      </ul>

      {viewershipStats && (
        <div>
          <h2>Viewership Statistics</h2>
          <p>Total Views: {viewershipStats.totalViews}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
