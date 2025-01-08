
import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
import './LiteraMLevel3.css';

import Repeta from '../assets/sounds/m-formare-cuvinte.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';

import haAudio from '../assets/sounds/HA.mp3';
import heAudio from '../assets/sounds/HE.mp3';
import hiAudio from '../assets/sounds/HI.mp3';
import hoAudio from '../assets/sounds/HO.mp3';
import huAudio from '../assets/sounds/HU.mp3';

import hahaAudio from '../assets/sounds/HA-HA.mp3';
import hohoAudio from '../assets/sounds/HO-HO.mp3';
import huhuAudio from '../assets/sounds/HU-HU.mp3';

import LitHL3 from "../assets/sounds/m-formare-cuvinte.mp3";

const LiteraHLevel3: React.FC<RouteComponentProps> = ({ history }) => {
//   useEffect(() => {
//     const audioTimeout = setTimeout(() => {
//       const audioPlayer = new Audio(LitHL3);
//       audioPlayer.play();
//       return () => {
//         audioPlayer.pause();
//         audioPlayer.currentTime = 0;
//       };
//     }, 1000);

//     return () => clearTimeout(audioTimeout);
//   }, []);

  const syllables = [
    { text: 'HA', audio: haAudio },
    { text: 'HE', audio: heAudio },
    { text: 'HI', audio: hiAudio },
    { text: 'HO', audio: hoAudio },
    { text: 'HU', audio: huAudio },
  ];

  const words = [
    { text: 'HA-HA', audio: hahaAudio },
    { text: 'HO-HO', audio: hohoAudio },
    { text: 'HU-HU', audio: huhuAudio },
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
              title="Litera H Nivel 3"
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
          <IonFabButton onClick={() => history.push('/LiteraJ')}>
            <IonIcon
                icon={arrowForwardOutline}
                className="black-icon big-arrow"
                title="Litera I"
                aria-label="Next level"
                onMouseEnter={playHoverSoundAvanseaza}
            />
          </IonFabButton>
        </IonFab>
      </IonPage>
  );
};

export default LiteraHLevel3;
