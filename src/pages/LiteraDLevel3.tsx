import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
import './LiteraDLevel3.css';
import Repeta from '../assets/sounds/m-formare-cuvinte.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
 
import caAudio from '../assets/sounds/DA.mp3';
import ceAudio from '../assets/sounds/DE.mp3';
import ciAudio from '../assets/sounds/DI.mp3';
import coAudio from '../assets/sounds/DO.mp3';
import cuAudio from '../assets/sounds/DU.mp3';

import dadaAudio from '../assets/sounds/DA-DA.mp3';
import didiAudio from '../assets/sounds/DI-DI.mp3';
import duduAudio from '../assets/sounds/DU-DU.mp3';

import LitML3 from "../assets/sounds/m-formare-cuvinte.mp3";




const LiteraDLevel3: React.FC<RouteComponentProps> = ({ history }) => {
 
 
 
  useEffect(() => {
    const audioTimeout = setTimeout(() => {
      const audioPlayer = new Audio(LitML3);
      audioPlayer.play();
      return () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      };
    }, 1000);

    return () => clearTimeout(audioTimeout);
  }, []);

 
 
  const syllables = [
    { text: 'DA', audio: caAudio },
    { text: 'DE', audio: ceAudio },
    { text: 'DI', audio: ciAudio },
    { text: 'DO', audio: coAudio },
    { text: 'DU', audio: cuAudio },
  ];

  const words = [
    { text: 'DA-DA', audio: dadaAudio },
    { text: 'DI-DI', audio: didiAudio },
    { text: 'DU-DU', audio: duduAudio },
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
          title="Litera D Nivel 3"
          titleStyle="title"
          onPlayClick={playClickAudio}
          onBackClick={() => history.goBack()}
        />
      </IonHeader>

      <IonContent className="literaDLevel3-container">
 

        {/* Syllables on the left */}
        <div className="literaDLevel3-syllables">
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
        <IonFabButton onClick={() => history.push('/LiteraF')}>
          <IonIcon
            icon={arrowForwardOutline}
            className="black-icon big-arrow"
            title="Litera F"
            aria-label="Next level"
            onMouseEnter={playHoverSoundAvanseaza}
          />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default LiteraDLevel3;
