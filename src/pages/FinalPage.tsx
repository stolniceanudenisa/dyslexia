import React, { useEffect } from 'react';
import './FinalPage.css';

import finalImage from '../assets/images/final2.jpg';
import LitML3 from "../assets/sounds/final-joc.mp3";
const FinalPage: React.FC = () => {


    useEffect(() => {
        const audioTimeout = setTimeout(() => {
          const audioPlayer = new Audio(LitML3);
          audioPlayer.play();
          return () => {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
          };
        }, 1000);
    
        return () => clearTimeout(audioTimeout);
      }, []);


  return (
    <div
      className="final-container"
      style={{ backgroundImage: `url(${finalImage})` }}
    >
      <div className="final-message-box">
        <h1>BRAVO!</h1>
      </div>
    </div>
  );
};





export default FinalPage;
