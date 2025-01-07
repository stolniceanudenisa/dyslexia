import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonButton, IonIcon, IonFab, IonFabButton } from '@ionic/react';
import { arrowForward } from 'ionicons/icons';
import './Litere.css';

import erou from '../assets/images/erou1.png';
import elefant from '../assets/images/elefant1.png';
import evantai from '../assets/images/evantai1.png';
import esarfa from '../assets/images/esarfa1.png';

import ardei from '../assets/images/ardei.png';
import pere from '../assets/images/pere.png';
import mere from '../assets/images/mere.png';
import banane from '../assets/images/banane.png';

import ArdeiAudio from '../assets/sounds/ardei.mp3';
import PereAudio from '../assets/sounds/pere.mp3';
import MereAudio from '../assets/sounds/mere.mp3';
import BananeAudio from '../assets/sounds/banane.mp3';

import erouAudio from '../assets/sounds/Erou.mp3';
import elefantAudio from '../assets/sounds/Elefant.mp3';
import evantaiAudio from '../assets/sounds/Evantai.mp3';
import esarfaAudio from '../assets/sounds/Esarfa.mp3';
import E from '../assets/sounds/E!.mp3';
import { increaseScore } from './Home'
import { RouteComponentProps } from 'react-router';
import { useGameSettings } from './Home';
import CustomToolbar from '../components/CustomToolbar';
import Bravo from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import { arrowForwardOutline } from 'ionicons/icons';
import LitE from "../assets/sounds/RepetaDupaMine.mp3";


type ButtonText = "A" | "E" | "*" | "★";

const LiteraE: React.FC<RouteComponentProps> = ({ history }) => {
  const images1 = [erou, elefant, ardei, mere];
  const images2 = [evantai, esarfa, pere, banane];
  const audios = [
    erouAudio,
    elefantAudio,
    ArdeiAudio,
    MereAudio,
    evantaiAudio,
    esarfaAudio,
    PereAudio,
    BananeAudio,
  ];
  const words1 = ['EROU', 'ELEFANT', 'ARDEI', 'MERE'];
  const words2 = ['EVANTAI', 'ESARFA', 'PERE', 'BANANE'];


  // useEffect(() => {
  //   const audioTimeout = setTimeout(() => {
  //     const audioPlayer = new Audio(LitE);
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
    const audio = new Audio(E);
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


  const completeLevelE = () => {
    localStorage.setItem('levelECompleted', 'true'); // Marchează nivelul E ca finalizat
    history.push('/LiteraELevel1'); // Navighează la nivelul 1 al literei E
  };
  

  const formatWordWithBoldE = (word: string) => {
    return (
      <>
        {word.split('').map((char, index) => (
          <span key={index} className={char === 'E' ? 'highlight' : ''}>
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
          title="Litera E"
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
                <div style={{ width: '98px', height: '98px', margin: 20, cursor: 'pointer' }}>
                  <img
                    src={images1[index]}
                    style={{ width: '100%', height: '100%' }}
                    alt={`Litera E - ${words1[index]}`}
                  />
                </div>
                <div className="audio-label" style={{ fontSize: '0.9em' }}>
                  {formatWordWithBoldE(words1[index])}
                </div>
              </div>
            ))}
          </div>

          {/* Letter display */}
          <div className="letter" onMouseEnter={playHoverSound}>
            <div className="letter-content">E</div>
          </div>

          {/* Second row of images */}
          <div className="round-buttons">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index + 4)}>
                <div style={{ width: '98px', height: '98px', margin: 20, cursor: 'pointer' }}>
                  <img
                    src={images2[index]}
                    style={{ width: '100%', height: '100%' }}
                    alt={`Litera E - ${words2[index]}`}
                  />
                </div>
                <div className="audio-label" style={{ fontSize: '0.9em' }}>
                  {formatWordWithBoldE(words2[index])}
                </div>
              </div>
            ))}
          </div>
        </div>


              <IonFab vertical="bottom" horizontal="start" slot="fixed" className="custom-home-fab">
        <IonFabButton className="custom-home-button" onClick={() => history.push('/map1')}>
          <span className="custom-home-emoji" title="Go to Map">🏠</span>
        </IonFabButton>
      </IonFab>



        {/* Next Level Button */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={completeLevelE}>
            <IonIcon
              icon={arrowForwardOutline}
              className="black-icon big-arrow"
              title="Litera E Level 1"
              aria-label="Next level"
              onMouseEnter={playHoverSoundAvanseaza}
            />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default LiteraE;