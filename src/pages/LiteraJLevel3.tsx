import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
import './LiteraJLevel3.css';

import Repeta from '../assets/sounds/m-formare-cuvinte.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';

import jaAudio from '../assets/sounds/JA.mp3';
import jeAudio from '../assets/sounds/JE.mp3';
import jiAudio from '../assets/sounds/JI.mp3';
import joAudio from '../assets/sounds/JO.mp3';
import juAudio from '../assets/sounds/JU.mp3';

import jajaAudio from '../assets/sounds/JA-JA.mp3';
import jojoAudio from '../assets/sounds/JO-JO.mp3';
import jujuAudio from '../assets/sounds/JU-JU.mp3';

import LitJL3 from "../assets/sounds/m-formare-cuvinte.mp3";

const LiteraJLevel3: React.FC<RouteComponentProps> = ({ history }) => {


//   useEffect(() => {
//     const audioTimeout = setTimeout(() => {
//       const audioPlayer = new Audio(LitJL3);
//       audioPlayer.play();
//       return () => {
//         audioPlayer.pause();
//         audioPlayer.currentTime = 0;
//       };
//     }, 1000);

//     return () => clearTimeout(audioTimeout);
//   }, []);

  const syllables = [
    { text: 'JA', audio: jaAudio },
    { text: 'JE', audio: jeAudio },
    { text: 'JI', audio: jiAudio },
    { text: 'JO', audio: joAudio },
    { text: 'JU', audio: juAudio },
  ];

  const words = [
    { text: 'JA-JA', audio: jajaAudio },
    { text: 'JO-JO', audio: jojoAudio },
    { text: 'JU-JU', audio: jujuAudio },
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
              title="Litera J Nivel 3"
              titleStyle="title"
              onPlayClick={playClickAudio}
              onBackClick={() => history.goBack()}
          />
        </IonHeader>

        <IonContent className="literaJLevel3-container">
          {/* Syllables on the left */}
          <div className="literaJLevel3-syllables">
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
          <IonFabButton onClick={() => history.push('/LiteraL')}>
            <IonIcon
                icon={arrowForwardOutline}
                className="black-icon big-arrow"
                title="Litera K"
                aria-label="Next level"
                onMouseEnter={playHoverSoundAvanseaza}
            />
          </IonFabButton>
        </IonFab>
      </IonPage>
  );
};

export default LiteraJLevel3;
