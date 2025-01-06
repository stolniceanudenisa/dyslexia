import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
import './LiteraZLevel3.css';
import Repeta from '../assets/sounds/m-formare-cuvinte.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';

import zaAudio from '../assets/sounds/ZA.mp3';
import zeAudio from '../assets/sounds/ZE.mp3';
import ziAudio from '../assets/sounds/ZI.mp3';
import zoAudio from '../assets/sounds/ZO.mp3';
import zuAudio from '../assets/sounds/ZU.mp3';

import zazaAudio from '../assets/sounds/ZA-ZA.mp3';
import zezeAudio from '../assets/sounds/ZE-ZE.mp3';
import zozoAudio from '../assets/sounds/ZO-ZO.mp3';
import ziziAudio from '../assets/sounds/ZI-ZI.mp3';
 


import LitZL3 from "../assets/sounds/m-formare-cuvinte.mp3";

const LiteraZLevel3: React.FC<RouteComponentProps> = ({ history }) => {

  // useEffect(() => {
  //   const audioTimeout = setTimeout(() => {
  //     const audioPlayer = new Audio(LitZL3);
  //     audioPlayer.play();
  //     return () => {
  //       audioPlayer.pause();
  //       audioPlayer.currentTime = 0;
  //     };
  //   }, 1000);

  //   return () => clearTimeout(audioTimeout);
  // }, []);

  const syllables = [
    { text: 'ZA', audio: zaAudio },
    { text: 'ZE', audio: zeAudio },
    { text: 'ZI', audio: ziAudio },
    { text: 'ZO', audio: zoAudio },
    { text: 'ZU', audio: zuAudio },
  ];

  const words = [
    { text: 'ZA-ZA', audio: zazaAudio },
    { text: 'ZE-ZE', audio: zezeAudio },
    { text: 'ZI-ZI', audio: ziziAudio },
    { text: 'ZO-ZO', audio: zozoAudio },
    
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
          title="Litera Z Nivel 3"
          titleStyle="title"
          onPlayClick={playClickAudio}
          onBackClick={() => history.goBack()}
        />
      </IonHeader>

      <IonContent className="literaZLevel3-container">

        {/* Syllables on the left */}
        <div className="literaZLevel3-syllables">
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
        <IonFabButton onClick={() => history.push('/Final')}>
          <IonIcon
            icon={arrowForwardOutline}
            className="black-icon big-arrow"
            title="Next Level"
            aria-label="Next level"
            onMouseEnter={playHoverSoundAvanseaza}
          />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default LiteraZLevel3;
