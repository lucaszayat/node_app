import React, { useEffect, useState } from 'react';
import './styles/VideoFeed.css';
import Video from './Video';

const VideoFeed = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch('http://localhost:5000/api/videos');
      const data = await response.json();
      setVideos(data);
    };
    fetchVideos();
  }, []);

  return (
    <div>
      {videos.map(video => (
        <Video key={video._id} video={video} />
      ))}
    </div>
  );
};

export default VideoFeed;