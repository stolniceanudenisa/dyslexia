import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './Litere.css';
import dinozaur from '../assets/images/dinozaur.png';
import pod from '../assets/images/pod.png';
import desert from '../assets/images/desert.png';
import cadou from '../assets/images/cadou.png';
import padure from '../assets/images/padure.png';
import drum from '../assets/images/drum.png';
import dinte from '../assets/images/dinte.png';
import doi from '../assets/images/doi.png';

import DinozaurAudio from '../assets/sounds/dinozaur.mp3';
import PodAudio from '../assets/sounds/pod.mp3';
import DesertAudio from '../assets/sounds/desert.mp3';
import CadouAudio from '../assets/sounds/cadou.mp3';
import PadureAudio from '../assets/sounds/cadou.mp3';
import DrumAudio from '../assets/sounds/drum.mp3';
import DinteAudio from '../assets/sounds/dinte.mp3';
import DoiAudio from '../assets/sounds/doi.mp3';


import D from '../assets/sounds/D!.mp3';

import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';


const LiteraD: React.FC<RouteComponentProps> = ({ history }) => {
    const images1 = [dinozaur, desert, cadou, dinte]; // Adăugăm masa la primul rând
    const images2 = [pod, padure, drum, doi]; // Adăugăm mac la al doilea rând
    const audios = [DinozaurAudio, DesertAudio, CadouAudio, DinteAudio, PodAudio, PadureAudio, DrumAudio, DoiAudio];
    const words1 = ['DINOZAUR', 'DESERT', 'CADOU', 'DINTE']; // Text pentru primul rând
    const words2 = ['POD', 'PADURE', 'DRUM', 'DOI']; // Text pentru al doilea rând
  
    const playAudio = (index: number) => {
      const audio = new Audio(audios[index]);
      audio.playbackRate = 0.8;
      audio.play();
    };
  
    const playHoverSound = () => {
      const audio = new Audio(D);
      audio.play();
    };
  
    const playClickAudio = () => {
      const audio = new Audio(Repeta);
      audio.play();
    };
  
    const playHoverSoundAvanseaza = () => {
      const audio = new Audio(Avanseaza);
      audio.play();
    };
  
    const formatWordWithBoldA = (word: string) => {
      return (
        <>
          {word.split('').map((char, index) => (
            <span key={index} className={char === 'D' ? 'highlight' : ''}>
              {char}
            </span>
          ))}
        </>
      );
    };
  
    return (
      <IonPage>
        <IonHeader>
          <CustomToolbar title="Litera D" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
        </IonHeader>
  
        <IonContent className="letter-page" scrollY={false}>
          <div className="container">
            {/* First row of images */}
            <div className="round-buttons">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index)}>
                  <div style={{ width: '120px', height: '120px', margin: 10, cursor: 'pointer' }}>
                    <img src={images1[index]} style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div className="audio-label" style={{ fontSize: '0.9em' }}>
                    {formatWordWithBoldA(words1[index])}
                  </div>
                </div>
              ))}
            </div>
  
            {/* Letter display */}
            <div className="letter" onMouseEnter={playHoverSound}>
              <div className="letter-content">D</div>
            </div>
  
            {/* Second row of images */}
            <div className="round-buttons">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index + 4)}>
                  <div style={{ width: '120px', height: '120px', margin: 10, cursor: 'pointer' }}>
                    <img src={images2[index]} style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div className="audio-label" style={{ fontSize: '0.9em' }}>
                    {formatWordWithBoldA(words2[index])}
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Next Level Button */}
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={() => history.push('/LiteraDLevel1')}>
              <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title="Litera D Level 1" aria-label="Next level" onMouseEnter={playHoverSoundAvanseaza} />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    );
  };
  
  export default LiteraD;