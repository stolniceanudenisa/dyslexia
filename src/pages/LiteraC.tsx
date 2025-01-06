import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './Litere.css';
import ciocan from '../assets/images/ciocan.png';
import biscuite from '../assets/images/biscuite.png';
import casa from '../assets/images/casa.png';
import caine from '../assets/images/caine.png';
import pisica from '../assets/images/pisica.png';
import vaca from '../assets/images/vaca.png';
import rac from '../assets/images/rac.png';
import cerc from '../assets/images/cerc.png';

import CiocanAudio from '../assets/sounds/ciocanAudio.mp3';
import BiscuiteAudio from '../assets/sounds/biscuite.mp3';
import CasaAudio from '../assets/sounds/casa!.mp3';
import CaineAudio from '../assets/sounds/caineAudio.mp3';
import PisicaAudio from '../assets/sounds/pisica.mp3';
import VacaAudio from '../assets/sounds/vaca.mp3';
import RacAudio from '../assets/sounds/racAudio.mp3';
import CercAudio from '../assets/sounds/cercAudio.mp3';


import C from '../assets/sounds/C!.mp3';

import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';


const LiteraC: React.FC<RouteComponentProps> = ({ history }) => {
    const images1 = [caine, pisica, ciocan, biscuite]; // Adăugăm masa la primul rând
    const images2 = [casa, vaca, rac, cerc]; // Adăugăm mac la al doilea rând
    const audios = [CaineAudio, PisicaAudio, CiocanAudio, BiscuiteAudio, CasaAudio, VacaAudio, RacAudio, CercAudio];
    const words1 = ['CAINE', 'PISICA', 'CIOCAN', 'BISCUITE']; // Text pentru primul rând
    const words2 = ['CASA', 'VACA', 'RAC', 'CERC']; // Text pentru al doilea rând
  
    const playAudio = (index: number) => {
      const audio = new Audio(audios[index]);
      audio.playbackRate = 0.8;
      audio.play();
    };
  
    const playHoverSound = () => {
      const audio = new Audio(C);
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
            <span key={index} className={char === 'C' ? 'highlight' : ''}>
              {char}
            </span>
          ))}
        </>
      );
    };
  
    return (
      <IonPage>
        <IonHeader>
          <CustomToolbar title="Litera C" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
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
              <div className="letter-content">C</div>
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
  

          <IonFab vertical="bottom" horizontal="start" slot="fixed" className="custom-home-fab">
        <IonFabButton className="custom-home-button" onClick={() => history.push('/map2')}>
          <span className="custom-home-emoji" title="Go to Map">🏠</span>
        </IonFabButton>
      </IonFab>

          {/* Next Level Button */}
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={() => history.push('/LiteraCLevel1')}>
              <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title="Litera C Level 1" aria-label="Next level" onMouseEnter={playHoverSoundAvanseaza} />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    );
  };
  
  export default LiteraC;