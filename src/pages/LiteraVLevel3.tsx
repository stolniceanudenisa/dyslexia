import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
import './LiteraMLevel3.css';
import Repeta from '../assets/sounds/m-formare-cuvinte.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
 
import vaAudio from '../assets/sounds/vaAudio.mp3';
import veAudio from '../assets/sounds/veAudio.mp3';
import viAudio from '../assets/sounds/viAudio.mp3';
import voAudio from '../assets/sounds/voAudio.mp3';
import vuAudio from '../assets/sounds/vuAudio.mp3';

import vavaAudio from '../assets/sounds/VA-VA.mp3';
import veveAudio from '../assets/sounds/VE-VE.mp3';
import viviAudio from '../assets/sounds/VI-VI.mp3';

import LitML3 from "../assets/sounds/m-formare-cuvinte.mp3";




const LiteraVLevel3: React.FC<RouteComponentProps> = ({ history }) => {
 
 
 
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
    { text: 'VA', audio: vaAudio },
    { text: 'VE', audio: veAudio },
    { text: 'VI', audio: viAudio },
    { text: 'VO', audio: voAudio },
    { text: 'VU', audio: vuAudio },
  ];

  const words = [
    { text: 'VA-VA', audio: vavaAudio },
    { text: 'VE-VE', audio: veveAudio },  
    { text: 'VI-VI', audio: viviAudio },  
   
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
        <IonFabButton onClick={() => history.push('/LiteraZ')}>
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

export default LiteraVLevel3;
