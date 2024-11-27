import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonFab, IonFabButton } from '@ionic/react';
import './Litere.css';
import { arrowForward, arrowForwardOutline } from 'ionicons/icons';

import urs from '../assets/images/urs.png';
import usa from '../assets/images/usa.png';
import unicorn from '../assets/images/unicorn.png';
import umbrela from '../assets/images/umbrela.png';

import unt from '../assets/images/unt.png';
import fluture from '../assets/images/fluture.png';
import ou from '../assets/images/ou.png';
import suc from '../assets/images/suc.png';

import { increaseScore, useGameSettings } from './Home'
import { RouteComponentProps } from 'react-router';
import Bravo from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import CustomToolbar from '../components/CustomToolbar';
import U from '../assets/sounds/U!.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';


import untAudio from '../assets/sounds/Urs.mp3';
import flutureAudio from '../assets/sounds/Urs.mp3';
import ouAudio from '../assets/sounds/Urs.mp3';
import sucAudio from '../assets/sounds/Urs.mp3';

import ursAudio from '../assets/sounds/Urs.mp3'
import usaAudio from '../assets/sounds/Usa.mp3'
import unicornAudio from '../assets/sounds/Unicorn.mp3'
import umbrelaAudio from '../assets/sounds/Umbrela.mp3'
import Repeta from '../assets/sounds/RepetaDupaMine.mp3';

const LiteraU: React.FC<RouteComponentProps> = ({ history }) => {
    const images1 = [urs, usa, unt, fluture];
    const images2 = [umbrela, unicorn, ou, suc];
    const audios = [
      ursAudio, usaAudio, untAudio, flutureAudio,
      umbrelaAudio, unicornAudio, ouAudio, sucAudio
    ];
    const words1 = ['URS', 'USA', 'UNT', 'FLUTURE'];
    const words2 = ['UMBRELA', 'UNICORN', 'OU', 'SUC'];
  
    const playAudio = (index: number) => {
      const audio = new Audio(audios[index]);
      audio.playbackRate = 0.8;
      audio.play();
    };
  
    const playHoverSound = () => {
      const audio = new Audio(U);
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
  
    const formatWordWithBoldU = (word: string) => {
      return (
        <>
          {word.split('').map((char, index) => (
            <span key={index} className={char === 'U' ? 'highlight' : ''}>
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
            title="Litera U"
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
                  <div style={{ width: '80px', height: '80px', margin: 20, cursor: 'pointer' }}>
                    <img
                      src={images1[index]}
                      style={{ width: '100%', height: '100%' }}
                      alt={`Litera U - ${words1[index]}`}
                    />
                  </div>
                  <div className="audio-label" style={{ fontSize: '0.9em' }}>
                    {formatWordWithBoldU(words1[index])}
                  </div>
                </div>
              ))}
            </div>
  
            {/* Letter display */}
            <div className="letter" onMouseEnter={playHoverSound}>
              <div className="letter-content">U</div>
            </div>
  
            {/* Second row of images */}
            <div className="round-buttons">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index + 4)}>
                  <div style={{ width: '100px', height: '100px', margin: 20, cursor: 'pointer' }}>
                    <img
                      src={images2[index]}
                      style={{ width: '100%', height: '100%' }}
                      alt={`Litera U - ${words2[index]}`}
                    />
                  </div>
                  <div className="audio-label" style={{ fontSize: '0.9em' }}>
                    {formatWordWithBoldU(words2[index])}
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Next Level Button */}
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={() => history.push('/LiteraULevel1')}>
              <IonIcon
                icon={arrowForwardOutline}
                className="black-icon big-arrow"
                title="Litera U Level 1"
                aria-label="Next level"
                onMouseEnter={playHoverSoundAvanseaza}
              />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    );
  };

export default LiteraU;