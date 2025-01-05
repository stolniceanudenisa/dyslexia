import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
import './LiteraCLevel3.css';
import Repeta from '../assets/sounds/m-formare-cuvinte.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
 
import caAudio from '../assets/sounds/CA.mp3';
import ceAudio from '../assets/sounds/CE.mp3';
import ciAudio from '../assets/sounds/CI.mp3';
import coAudio from '../assets/sounds/CO.mp3';
import cuAudio from '../assets/sounds/CU.mp3';

import ceceAudio from '../assets/sounds/CE-CE.mp3';
import ciciAudio from '../assets/sounds/CI-CI.mp3';
import cocoAudio from '../assets/sounds/CO-CO.mp3';
import cucuAudio from '../assets/sounds/CU-CU.mp3';
import LitML3 from "../assets/sounds/m-formare-cuvinte.mp3";




const LiteraCLevel3: React.FC<RouteComponentProps> = ({ history }) => {
 
 
 
  // useEffect(() => {
  //   const audioTimeout = setTimeout(() => {
  //     const audioPlayer = new Audio(LitML3);
  //     audioPlayer.play();
  //     return () => {
  //       audioPlayer.pause();
  //       audioPlayer.currentTime = 0;
  //     };
  //   }, 1000);

  //   return () => clearTimeout(audioTimeout);
  // }, []);

 
 
  const syllables = [
    { text: 'CA', audio: caAudio },
    { text: 'CE', audio: ceAudio },
    { text: 'CI', audio: ciAudio },
    { text: 'CO', audio: coAudio },
    { text: 'CU', audio: cuAudio },
  ];

  const words = [
    { text: 'CO-CO', audio: cocoAudio },
    { text: 'CE-CE', audio: ceceAudio },
    { text: 'CI-CI', audio: ciciAudio },
    { text: 'CU-CU', audio: cucuAudio },
   
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
          title="Litera C Nivel 3"
          titleStyle="title"
          onPlayClick={playClickAudio}
          onBackClick={() => history.goBack()}
        />
      </IonHeader>

      <IonContent className="literaCLevel3-container">
 

        {/* Syllables on the left */}
        <div className="literaCLevel3-syllables">
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

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => history.push('/LiteraD')}>
          <IonIcon
            icon={arrowForwardOutline}
            className="black-icon big-arrow"
            title="Litera D"
            aria-label="Next level"
            onMouseEnter={playHoverSoundAvanseaza}
          />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default LiteraCLevel3;
