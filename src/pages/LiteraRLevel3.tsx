import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
import './LiteraRLevel3.css';
import Repeta from '../assets/sounds/m-formare-cuvinte.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';

import raAudio from '../assets/sounds/RA.mp3';
import reAudio from '../assets/sounds/RE.mp3';
import riAudio from '../assets/sounds/RI.mp3';
import roAudio from '../assets/sounds/RO.mp3';
import ruAudio from '../assets/sounds/RU.mp3';

import raraAudio from '../assets/sounds/RE-RE.mp3';
import roroAudio from '../assets/sounds/RI-RI.mp3';
import ruruAudio from '../assets/sounds/RO-RO.mp3';

import LitRL3 from "../assets/sounds/m-formare-cuvinte.mp3";

const LiteraRLevel3: React.FC<RouteComponentProps> = ({ history }) => {

  useEffect(() => {
    const audioTimeout = setTimeout(() => {
      const audioPlayer = new Audio(LitRL3);
      audioPlayer.play();
      return () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      };
    }, 1000);

    return () => clearTimeout(audioTimeout);
  }, []);

  const syllables = [
    { text: 'RA', audio: raAudio },
    { text: 'RE', audio: reAudio },
    { text: 'RI', audio: riAudio },
    { text: 'RO', audio: roAudio },
    { text: 'RU', audio: ruAudio },
  ];

  const words = [
    { text: 'RE-RE', audio: raraAudio },
    { text: 'RI-RI', audio: roroAudio },
    { text: 'RO-RO', audio: ruruAudio },
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
          title="Litera R Nivel 3"
          titleStyle="title"
          onPlayClick={playClickAudio}
          onBackClick={() => history.goBack()}
        />
      </IonHeader>

      <IonContent className="literaRLevel3-container">

        {/* Syllables on the left */}
        <div className="literaRLevel3-syllables">
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
        <IonFabButton className="custom-home-button" onClick={() => history.push('/map2')}>
          <span className="custom-home-emoji" title="Go to Map">🏠</span>
        </IonFabButton>
      </IonFab>



      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => history.push('/LiteraB')}>
          <IonIcon
            icon={arrowForwardOutline}
            className="black-icon big-arrow"
            title="Litera S"
            aria-label="Next level"
            onMouseEnter={playHoverSoundAvanseaza}
          />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default LiteraRLevel3;
