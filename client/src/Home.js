import React from 'react';
import './styles/Home.css';
import VideoFeed from './VideoFeed';

const Home = () => {
  return (
    <div>
      <h1>Bienvenido a Stream&Shop</h1>
      <VideoFeed />
    </div>
  );
};

export default Home;