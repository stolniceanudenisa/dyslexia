// MapSelection.tsx
import React, { useEffect } from 'react';
import { IonContent, IonPage, IonButton, IonImg, IonIcon  } from '@ionic/react';
import { volumeHigh } from 'ionicons/icons'; 
import map1Image from '../assets/images/harta1-padure.jpg';
import map2Image from '../assets/images/harta2-subacvatic.jpg';
import map3Image from '../assets/images/harta3-pestera.jpg';
import Bineaivenit from '../assets/sounds/bine-ai-venit-intro-maps.mp3';
import SoundButtonClick1 from "../assets/sounds/prima-harta-padurea.mp3"; 
import SoundButtonClick2 from "../assets/sounds/a-doua-harta-subacvatic.mp3"; 
import SoundButtonClick3 from "../assets/sounds/a-treia-harta-pestera-piratilor.mp3"; 


import { useHistory } from 'react-router-dom';
import './MapSelection.css';

const MapSelection: React.FC = () => {
  const history = useHistory();
  const progress = localStorage.getItem("progress") || "1"; // Default to first map unlocked
  

  useEffect(() => {
    const audioTimeout = setTimeout(() => {
      const audioPlayer = new Audio(Bineaivenit);
      audioPlayer.play();
      return () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      };
    }, 1000);

    return () => clearTimeout(audioTimeout);
  }, []);




  const playSound1 = () => {
    const audio = new Audio(SoundButtonClick1);
    audio.play();
  };


  const playSound2 = () => {
    const audio = new Audio(SoundButtonClick2);
    audio.play();
  };



  const playSound3 = () => {
    const audio = new Audio(SoundButtonClick3);
    audio.play();
  };


  
  return (
    <IonPage>
      <IonContent>
        
      <div className="sound-buttons-row">
  <div className="sound-button-container1">
    <IonButton className="sound-button1" onClick={playSound1}>
      🔊
    </IonButton>
  </div>

  <div className="sound-button-container2">
    <IonButton className="sound-button2" onClick={playSound2}>
      🔊
    </IonButton>
  </div>

  <div className="sound-button-container3">
    <IonButton className="sound-button3" onClick={playSound3}>
      🔊
    </IonButton>
  </div>
</div>


        {/* Map Selection */}
        {/* disabled={progress < "2"} */}
        {/* disabled={progress < "3"} */}
        <div className="map-container" > 
          {/* Map 1: Always enabled */}
          <IonButton onClick={() => history.push('/map1')} disabled={false} className="map-button">
            <IonImg src={map1Image} alt="Map 1" className="map-image" />
          </IonButton>

          {/* Map 2: Disabled if progress < 2 */}
          <IonButton onClick={() => history.push('/map2')} disabled={false} className="map-button">
            <IonImg src={map2Image} alt="Map 2" className="map-image" />
            {progress < "2" && <div className="locked-overlay" />}  
          </IonButton>

          {/* Map 3: Disabled if progress < 3 */}
          <IonButton onClick={() => history.push('/map3')}  disabled={false} className="map-button">
            <IonImg src={map3Image} alt="Map 3" className="map-image" />
            {progress < "3" && <div className="locked-overlay" />}   
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MapSelection;
