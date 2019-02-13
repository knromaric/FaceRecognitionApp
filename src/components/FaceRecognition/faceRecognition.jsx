import React from "react";
import './faceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="Center ma">
      <div className='absolute mt2'>
        <img id="input-image" width='500px' height='auto' src={imageUrl} alt="target" />
        <div className="bounding-box" style={{top:box.topRow, right: box.rightCol, bottom: box.bottomRow, left:box.leftCol}}></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
