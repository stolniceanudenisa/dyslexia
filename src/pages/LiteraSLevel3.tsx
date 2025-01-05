import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
import './LiteraSLevel3.css';
import Repeta from '../assets/sounds/m-formare-cuvinte.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';

import saAudio from '../assets/sounds/SA.mp3';
import seAudio from '../assets/sounds/SE.mp3';
import siAudio from '../assets/sounds/SI.mp3';
import soAudio from '../assets/sounds/SO.mp3';
import suAudio from '../assets/sounds/SU.mp3';

import sasaAudio from '../assets/sounds/SA-SA.mp3';
import seseAudio from '../assets/sounds/SE-SE.mp3';
import susuAudio from '../assets/sounds/SU-SU.mp3';
import sisiAudio from '../assets/sounds/SI-SI.mp3';
import sosoAudio from '../assets/sounds/SO-SO.mp3';


import LitSL3 from "../assets/sounds/m-formare-cuvinte.mp3";

const LiteraSLevel3: React.FC<RouteComponentProps> = ({ history }) => {

  useEffect(() => {
    const audioTimeout = setTimeout(() => {
      const audioPlayer = new Audio(LitSL3);
      audioPlayer.play();
      return () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      };
    }, 1000);

    return () => clearTimeout(audioTimeout);
  }, []);

  const syllables = [
    { text: 'SA', audio: saAudio },
    { text: 'SE', audio: seAudio },
    { text: 'SI', audio: siAudio },
    { text: 'SO', audio: soAudio },
    { text: 'SU', audio: suAudio },
  ];

  const words = [
    { text: 'SA-SA', audio: sasaAudio },
    { text: 'SE-SE', audio: seseAudio },
    { text: 'SI-SI', audio: sisiAudio },
    { text: 'SO-SO', audio: sosoAudio },
    { text: 'SU-SU', audio: susuAudio },
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
          title="Litera S Nivel 3"
          titleStyle="title"
          onPlayClick={playClickAudio}
          onBackClick={() => history.goBack()}
        />
      </IonHeader>

      <IonContent className="literaSLevel3-container">

        {/* Syllables on the left */}
        <div className="literaSLevel3-syllables">
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
        <IonFabButton onClick={() => history.push('/LiteraT')}>
          <IonIcon
            icon={arrowForwardOutline}
            className="black-icon big-arrow"
            title="Litera T"
            aria-label="Next level"
            onMouseEnter={playHoverSoundAvanseaza}
          />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default LiteraSLevel3;
