import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonButton, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { useHistory } from 'react-router-dom';
import { volumeHighOutline, arrowBack } from 'ionicons/icons';
import { increaseScore } from './Home';
import './Map3.css';   
import Harta3Intro from "../assets/sounds/harta3-intro.mp3";
import Inapoi from "../assets/sounds/inapoi-la-harti.mp3";
 

const Map3: React.FC<RouteComponentProps> = ({ history }) => {
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);


  // useEffect(() => {
  //   const audioTimeout = setTimeout(() => {
  //     const audioPlayer = new Audio(Harta3Intro);
  //     audioPlayer.play();
  //     return () => {
  //       audioPlayer.pause();
  //       audioPlayer.currentTime = 0;
  //     };
  //   }, 1000);

  //   return () => clearTimeout(audioTimeout);
  // }, []);


  
  const playNarrationSound = () => {
    const audio = new Audio(Harta3Intro);
    audio.play();
  };


  const playBackSound = () => {
    const audio = new Audio(Inapoi);
    audio.play();
  };


  return (
    <IonPage>
  
      <IonContent class='background3' scrollY={false}>
        

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
{/*           
  <IonButton onClick={() => history.push('/literaF')} className="f">F</IonButton>
  <IonButton onClick={() => history.push('/literaG')} className="g">G</IonButton>
  <IonButton onClick={() => history.push('/literaH')} className="h">H</IonButton>
  <IonButton onClick={() => history.push('/literaJ')} className="j">J</IonButton>
  <IonButton onClick={() => history.push('/literaL')} className="l">L</IonButton>
  <IonButton onClick={() => history.push('/literaS')} className="s">S</IonButton>
  <IonButton onClick={() => history.push('/literaV')} className="v">V</IonButton>
  <IonButton onClick={() => history.push('/literaZ')} className="z">Z</IonButton>

 */}

   {/* Litera F (Unlocked) */}
   <IonButton onClick={() => history.push('/literaF')} className="f unlocked">
            F
          </IonButton>

          {/* Celelalte litere sunt disabled */}
          <IonButton disabled className="g locked">
            G
          </IonButton>
          <IonButton disabled className="h locked">
            H
          </IonButton>
          <IonButton disabled className="j locked">
            J
          </IonButton>
          <IonButton disabled className="l locked">
            L
          </IonButton>
          <IonButton disabled className="s locked">
            S
          </IonButton>
          <IonButton disabled className="v locked">
            V
          </IonButton>

          {/* Litera Z (Unlocked) */}
          <IonButton onClick={() => history.push('/literaZ')} className="z unlocked">
            Z
          </IonButton>

</div>




      </IonContent>


    </IonPage>
  );
};

export default Map3;

 