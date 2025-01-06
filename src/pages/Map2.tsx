import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonButton, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { useHistory } from 'react-router-dom';
import { volumeHighOutline, arrowBack } from 'ionicons/icons';
import { increaseScore } from './Home';
import './Map2.css';   
import Harta2Intro from "../assets/sounds/harta2-intro.mp3";
import Inapoi from "../assets/sounds/inapoi-la-harti.mp3";
 

const Map2: React.FC<RouteComponentProps> = ({ history }) => {
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);


  // useEffect(() => {
  //   const audioTimeout = setTimeout(() => {
  //     const audioPlayer = new Audio(Harta2Intro);
  //     audioPlayer.play();
  //     return () => {
  //       audioPlayer.pause();
  //       audioPlayer.currentTime = 0;
  //     };
  //   }, 1000);

  //   return () => clearTimeout(audioTimeout);
  // }, []);

  
  const playNarrationSound = () => {
    const audio = new Audio(Harta2Intro);
    audio.play();
  };
  const playBackSound = () => {
    const audio = new Audio(Inapoi);
    audio.play();
  };


  return (
    <IonPage>

      <IonContent class='background2' scrollY={false}>
        

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
        <IonButton onClick={() => history.push('/literaM')} className="m">M</IonButton>
       <IonButton onClick={() => history.push('/literaN')} className="n">N</IonButton>
      <IonButton onClick={() => history.push('/literaP')} className="p">P</IonButton>
      <IonButton onClick={() => history.push('/literaR')} className="r">R</IonButton>
      <IonButton onClick={() => history.push('/literaT')} className="t">T</IonButton>
      <IonButton onClick={() => history.push('/literaB')} className="b">B</IonButton>
      <IonButton onClick={() => history.push('/literaC')} className="c">C</IonButton>
      <IonButton onClick={() => history.push('/literaD')} className="d">D</IonButton>
        </div>
      </IonContent>
    
    </IonPage>
  );
};

export default Map2;


//<IonContent>
//<div className="container">
  //{/* Button grid for consonants */}
  //{[MImage, NImage, PImage, RImage, BImage, TImage, CImage, DImage].map((image, index) => (
  //  <IonButton key={index} onClick={() => playAudio([MAudio, NAudio, PAudio, RAudio, BAudio, TAudio, CAudio, DAudio][index])}>
    //  <img src={image} alt={`Letter ${String.fromCharCode(65 + index)}`} />
   // </IonButton>
 // ))}
//</div>

//<IonFab vertical="bottom" horizontal="end" slot="fixed">
 // <IonFabButton onClick={() => history.push('/Map3')}>
 //   <IonIcon icon={arrowForward} />
//  </IonFabButton>
//</IonFab>
//</IonContent>