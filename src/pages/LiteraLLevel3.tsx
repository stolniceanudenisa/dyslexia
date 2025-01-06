import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
import './LiteraMLevel3.css';
import Repeta from '../assets/sounds/m-formare-cuvinte.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
 
import maAudio from '../assets/sounds/LA.mp3';
import meAudio from '../assets/sounds/LE.mp3';
import miAudio from '../assets/sounds/LI.mp3';
import moAudio from '../assets/sounds/LO.mp3';
import muAudio from '../assets/sounds/LU.mp3';

import mamaAudio from '../assets/sounds/LA-LA.mp3';
import momoAudio from '../assets/sounds/LO-LO.mp3';
import mumuAudio from '../assets/sounds/LU-LU.mp3';
import memeAudio from '../assets/sounds/LE-LE.mp3';
import mimiAudio from '../assets/sounds/LI-LI.mp3';

import LitML3 from "../assets/sounds/m-formare-cuvinte.mp3";




const LiteraLLevel3: React.FC<RouteComponentProps> = ({ history }) => {
 
 
 
//   useEffect(() => {
//     const audioTimeout = setTimeout(() => {
//       const audioPlayer = new Audio(LitML3);
//       audioPlayer.play();
//       return () => {
//         audioPlayer.pause();
//         audioPlayer.currentTime = 0;
//       };
//     }, 1000);

//     return () => clearTimeout(audioTimeout);
//   }, []);

 
 
  const syllables = [
    { text: 'LA', audio: maAudio },
    { text: 'LE', audio: meAudio },
    { text: 'LI', audio: miAudio },
    { text: 'LO', audio: moAudio },
    { text: 'LU', audio: muAudio },
  ];

  const words = [
    { text: 'LA-LA', audio: mamaAudio },
    { text: 'LE-LE', audio: memeAudio },  
    { text: 'LI-LI', audio: mimiAudio },  
    { text: 'LO-LO', audio: momoAudio },
    { text: 'LU-LU', audio: mumuAudio },
   
  ];

  const playAudio = (audioFile: string) => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  const playHoverSoundAvanseaza = () => {
    const audio = new Audio(Avanseaza);
    audio.play();
  };

  const playClickAudio = () => {
    const audio = new Audio(Repeta);
    audio.play();
  };

  return (
    <IonPage>
      <IonHeader>
        <CustomToolbar
          title="Litera M Nivel 3"
          titleStyle="title"
          onPlayClick={playClickAudio}
          onBackClick={() => history.goBack()}
        />
      </IonHeader>

      <IonContent className="literaMLevel3-container">
 

        {/* Syllables on the left */}
        <div className="literaMLevel3-syllables">
          <div className="syllables-column">
            {syllables.map((syllable, index) => (
              <div
                key={index}
                className="syllable-item"
                onClick={() => playAudio(syllable.audio)}
              >
                {syllable.text}
              </div>
            ))}
          </div>

          {/* Words on the right */}
          <div className="syllables-column">
            {words.map((word, index) => (
              <div
                key={index}
                className="syllable-item"
                onClick={() => playAudio(word.audio)}
              >
                {word.text}
              </div>
            ))}
          </div>
        </div>
      </IonContent>

                <IonFab vertical="bottom" horizontal="start" slot="fixed" className="custom-home-fab">
              <IonFabButton className="custom-home-button" onClick={() => history.push('/map3')}>
                <span className="custom-home-emoji" title="Go to Map">🏠</span>
              </IonFabButton>
            </IonFab>
      

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => history.push('/LiteraS')}>
          <IonIcon
            icon={arrowForwardOutline}
            className="black-icon big-arrow"
            title="Litera N"
            aria-label="Next level"
            onMouseEnter={playHoverSoundAvanseaza}
          />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default LiteraLLevel3;
