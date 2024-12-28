import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
import './LiteraPLevel3.css';
import Repeta from '../assets/sounds/m-formare-cuvinte.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';

import paAudio from '../assets/sounds/PA.mp3';
import peAudio from '../assets/sounds/PE.mp3';
import piAudio from '../assets/sounds/PI.mp3';
import poAudio from '../assets/sounds/PO.mp3';
import puAudio from '../assets/sounds/PU.mp3';

import papaAudio from '../assets/sounds/PA-PA.mp3';
import popoAudio from '../assets/sounds/PE-PE.mp3';
import pupuAudio from '../assets/sounds/PI-PI.mp3';

import LitPL3 from "../assets/sounds/m-formare-cuvinte.mp3";

const LiteraPLevel3: React.FC<RouteComponentProps> = ({ history }) => {

  useEffect(() => {
    const audioTimeout = setTimeout(() => {
      const audioPlayer = new Audio(LitPL3);
      audioPlayer.play();
      return () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      };
    }, 1000);

    return () => clearTimeout(audioTimeout);
  }, []);

  const syllables = [
    { text: 'PA', audio: paAudio },
    { text: 'PE', audio: peAudio },
    { text: 'PI', audio: piAudio },
    { text: 'PO', audio: poAudio },
    { text: 'PU', audio: puAudio },
  ];

  const words = [
    { text: 'PA-PA', audio: papaAudio },
    { text: 'PE-PE', audio: popoAudio },
    { text: 'PI-PI', audio: pupuAudio },
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
          title="Litera P Nivel 3"
          titleStyle="title"
          onPlayClick={playClickAudio}
          onBackClick={() => history.goBack()}
        />
      </IonHeader>

      <IonContent className="literaPLevel3-container">

        {/* Syllables on the left */}
        <div className="literaPLevel3-syllables">
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
        <IonFabButton onClick={() => history.push('/LiteraR')}>
          <IonIcon
            icon={arrowForwardOutline}
            className="black-icon big-arrow"
            title="Litera R"
            aria-label="Next level"
            onMouseEnter={playHoverSoundAvanseaza}
          />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default LiteraPLevel3;
