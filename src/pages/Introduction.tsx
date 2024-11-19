import React from 'react';
import { useHistory } from 'react-router-dom';
import './Introduction.css'; 
import b1final from '../assets/images/b1final.jpg';
import SaInceapaAventura from "../assets/sounds/sa-inceapa-aventura.mp3";
import NarrationAudio from "../assets/sounds/narare-intro.mp3";
import { volumeHighOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

const Introduction: React.FC = () => {
  const history = useHistory();

  const handleButtonClick = () => {
    // history.push('/home');
    history.push('/maps');
  };

  const playHoverSound = () => {
    const audio = new Audio(SaInceapaAventura);
    audio.play();
};

const playNarrationSound = () => {
  const audio = new Audio(NarrationAudio);  
  audio.play();  
};

  return (
    <div className="screen">
      <img src= {b1final} alt="start" className="background-image" />
 
      <div className="overlay" ></div>

    <h1 className="title-intro">Misiunea ALFABET</h1>
    {/* <button className="sound-button" onClick={playNarrationSound}>
      🔊 
    </button> */}

    {/* Sound Button */}
    <button className="sound-button" onClick={playNarrationSound}>
      <IonIcon icon={volumeHighOutline} className="sound-icon" />
    </button>


      <button className="overlay-button" onMouseEnter={playHoverSound} onClick={handleButtonClick}>ÎNCEPE</button>
    </div>
  );
};

 

export default Introduction;
