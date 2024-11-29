import React, { useEffect } from 'react';
import { IonContent, IonPage, IonButton } from '@ionic/react';
import { IonIcon } from '@ionic/react';
import { volumeHighOutline, arrowBack } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Map1.css';   
import Harta1Intro from "../assets/sounds/harta1-intro.mp3";
import Inapoi from "../assets/sounds/inapoi-la-harti.mp3";


const Map1: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const audioTimeout = setTimeout(() => {
      const audioPlayer = new Audio(Harta1Intro);
      audioPlayer.play();
      return () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      };
    }, 1000);

    return () => clearTimeout(audioTimeout);
  }, []);


  const playNarrationSound = () => {
    const audio = new Audio(Harta1Intro);
    audio.play();
  };

 
   const playBackSound = () => {
    const audio = new Audio(Inapoi);
    audio.play();
  };

  return (
    <IonPage  > 
      <IonContent class='background1' scrollY={false}>
        

       {/* Back Button */}
      <button 
            className="back-button" 
          onClick={() => {
            playBackSound(); // Play the back sound
            history.push('/maps'); // Navigate to the maps page
          }}
        >
          <IonIcon icon={arrowBack} className="back-icon" />
        </button>


       
        <button className="sound-button" onClick={playNarrationSound}>
          <IonIcon icon={volumeHighOutline} className="sound-icon" />
        </button>

        <div className="button-container">
          <IonButton onClick={() => history.push('/literaA')} className="a">A</IonButton>
          <IonButton onClick={() => history.push('/literaE')} className="e">E</IonButton>
          <IonButton onClick={() => history.push('/literaI')} className="i">I</IonButton>
          <IonButton onClick={() => history.push('/literaO')} className="o">O</IonButton>
          <IonButton onClick={() => history.push('/literaU')} className="u">U</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Map1;
