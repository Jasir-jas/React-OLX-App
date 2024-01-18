import React from 'react';
import { ScaleLoader } from 'react-spinners';
import './Loading.css'

const Loading = () => {
  return (
    <div className="loading-container">
      <ScaleLoader size={50} color="#123abc" />
    </div>
  );
};

export default Loading;
