import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonFab, IonFabButton } from '@ionic/react';
import './Litere.css';
import { arrowForward, arrowForwardOutline } from 'ionicons/icons';
import oaie from '../assets/images/oaie.png';
import oala from '../assets/images/oala.png';
import ou from '../assets/images/ou.png';
import oglinda from '../assets/images/oglinda.png';


import cartof from '../assets/images/cartof.png';
import fasole from '../assets/images/fasole.png';
import morcov from '../assets/images/morcov.png';
import autobuz from '../assets/images/autobuz.png';


import { increaseScore, useGameSettings } from './Home'
import { RouteComponentProps } from 'react-router';
import Bravo from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import CustomToolbar from '../components/CustomToolbar';
import O from '../assets/sounds/O!.mp3';
import oaieAudio from '../assets/sounds/Oaie.mp3';
import oalaAudio from '../assets/sounds/Oala.mp3';
import ouAudio from '../assets/sounds/ou.mp3';
import omidaAudio from '../assets/sounds/Omida.mp3';
import oglindaAudio from '../assets/sounds/Oglinda.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import LitO from "../assets/sounds/RepetaDupaMine.mp3";

import cartofAudio from '../assets/sounds/cartof.mp3';
import fasoleAudio from '../assets/sounds/fasole .mp3';
import morcovAudio from '../assets/sounds/Morcov.mp3';
import autobuzAudio from '../assets/sounds/autobuz.mp3';

const LiteraO: React.FC<RouteComponentProps> = ({ history }) => {
    const images1 = [oglinda, oaie, cartof, fasole];
    const images2 = [ou, oala, morcov, autobuz];
    const audios = [
      oglindaAudio, oaieAudio, cartofAudio, fasoleAudio,
      ouAudio, oalaAudio, morcovAudio, autobuzAudio
    ];
    const words1 = ['OGLINDA', 'OAIE', 'CARTOF', 'FASOLE'];
    const words2 = ['OU', 'OALA', 'MORCOV', 'AUTOBUZ'];
  
    // useEffect(() => {
    //   const audioTimeout = setTimeout(() => {
    //     const audioPlayer = new Audio(LitO);
    //     audioPlayer.play();
    //     return () => {
    //       audioPlayer.pause();
    //       audioPlayer.currentTime = 0;
    //     };
    //   }, 1000);
  
    //   return () => clearTimeout(audioTimeout);
    // }, []);
  

    const playAudio = (index: number) => {
      const audio = new Audio(audios[index]);
      audio.playbackRate = 0.8;
      audio.play();
    };
  
    const playHoverSound = () => {
      const audio = new Audio(O);
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
  
    const formatWordWithBoldO = (word: string) => {
      return (
        <>
          {word.split('').map((char, index) => (
            <span key={index} className={char === 'O' ? 'highlight' : ''}>
              {char}
            </span>
          ))}
        </>
      );
    };
  
    return (
      <IonPage>
        <IonHeader>
          <CustomToolbar
            title="Litera O"
            titleStyle="title"
            onPlayClick={playClickAudio}
            onBackClick={() => history.goBack()}
          />
        </IonHeader>
  
        <IonContent className="letter-page" scrollY={false}>
          <div className="container">
            {/* First row of images */}
            <div className="round-buttons">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index)}>
                  <div style={{ width: '90px', height: '90px', margin: 20, cursor: 'pointer' }}>
                    <img
                      src={images1[index]}
                      style={{ width: '140%', height: '120%' }}
                      alt={`Litera O - ${words1[index]}`}
                    />
                  </div>
                  <div className="audio-label" style={{ fontSize: '0.9em' }}>
                    {formatWordWithBoldO(words1[index])}
                  </div>
                </div>
              ))}
            </div>
  
            {/* Letter display */}
            <div className="letter" onMouseEnter={playHoverSound}>
              <div className="letter-content">O</div>
            </div>
  
            {/* Second row of images */}
            <div className="round-buttons">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index + 4)}>
                  <div style={{ width: '90px', height: '90px', margin: 20, cursor: 'pointer' }}>
                    <img
                      src={images2[index]}
                      style={{ width: '140%', height: '120%' }}
                      alt={`Litera O - ${words2[index]}`}
                    />
                  </div>
                  <div className="audio-label" style={{ fontSize: '0.9em' }}>
                    {formatWordWithBoldO(words2[index])}
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Next Level Button */}
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={() => history.push('/LiteraOLevel1')}>
              <IonIcon
                icon={arrowForwardOutline}
                className="black-icon big-arrow"
                title="Litera O Level 1"
                aria-label="Next level"
                onMouseEnter={playHoverSoundAvanseaza}
              />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    );
  };

export default LiteraO;