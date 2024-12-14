import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonFab, IonFabButton } from '@ionic/react';
import './Litere.css';
import { arrowForward, arrowForwardOutline } from 'ionicons/icons';
import inel from '../assets/images/inel.png';
import insula from '../assets/images/insula.png';
import iepure from '../assets/images/iepure.png';
import inima from '../assets/images/inima.png';

import capsunii from '../assets/images/capsuni.png';
import gaina from '../assets/images/gaina.png';
import pisica from '../assets/images/pisica.png';
import pesti from '../assets/images/pesti.png';

import { increaseScore, useGameSettings } from './Home'
import InelAudio from '../assets/sounds/Inel.mp3';
import InsulaAudio from '../assets/sounds/Insula.mp3';
import IepureAudio from '../assets/sounds/Iepure.mp3';
import InimaAudio from '../assets/sounds/Inima.mp3';

import CapsuniiAudio from '../assets/sounds/capsuni.mp3';
import GainaAudio from '../assets/sounds/gaina.mp3';
import PisicaAudio from '../assets/sounds/pisica.mp3';
import PestiAudio from '../assets/sounds/Inel.mp3';

 
import { RouteComponentProps } from 'react-router';
import CustomToolbar from '../components/CustomToolbar';
import I from '../assets/sounds/I!.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import LitI from "../assets/sounds/RepetaDupaMine.mp3";


const LiteraI: React.FC<RouteComponentProps> = ({ history }) => {
    const images1 = [inel, insula, capsunii, gaina];
    const images2 = [iepure, inima, pisica, pesti];
    const audios = [
      InelAudio, InsulaAudio, CapsuniiAudio, GainaAudio,
      IepureAudio, InimaAudio, PisicaAudio, PestiAudio
    ];
    const words1 = ['INEL', 'INSULA', 'CAPSUNI', 'GAINA'];
    const words2 = ['IEPURE', 'INIMA', 'PISICA', 'PESTI'];
  
  
    useEffect(() => {
      const audioTimeout = setTimeout(() => {
        const audioPlayer = new Audio(LitI);
        audioPlayer.play();
        return () => {
          audioPlayer.pause();
          audioPlayer.currentTime = 0;
        };
      }, 1000);
  
      return () => clearTimeout(audioTimeout);
    }, []);
  
  
    const playAudio = (index: number) => {
      const audio = new Audio(audios[index]);
      audio.playbackRate = 0.8;
      audio.play();
    };
  
    const playHoverSound = () => {
      const audio = new Audio(I);
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
  
    const formatWordWithBoldI = (word: string) => {
      return (
        <>
          {word.split('').map((char, index) => (
            <span key={index} className={char === 'I' ? 'highlight' : ''}>
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
            title="Litera I"
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
                  <div style={{ width: '110px', height: '110px', margin: 20, cursor: 'pointer' }}>
                    <img
                      src={images1[index]}
                      style={{ width: '100%', height: '100%' }}
                      alt={`Litera I - ${words1[index]}`}
                    />
                  </div>
                  <div className="audio-label" style={{ fontSize: '0.9em' }}>
                    {formatWordWithBoldI(words1[index])}
                  </div>
                </div>
              ))}
            </div>
  
            {/* Letter display */}
            <div className="letter" onMouseEnter={playHoverSound}>
              <div className="letter-content">I</div>
            </div>
  
            {/* Second row of images */}
            <div className="round-buttons">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index + 4)}>
                  <div style={{ width: '110px', height: '110px', margin: 20, cursor: 'pointer' }}>
                    <img
                      src={images2[index]}
                      style={{ width: '100%', height: '100%' }}
                      alt={`Litera I - ${words2[index]}`}
                    />
                  </div>
                  <div className="audio-label" style={{ fontSize: '0.9em' }}>
                    {formatWordWithBoldI(words2[index])}
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Next Level Button */}
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={() => history.push('/LiteraILevel1')}>
              <IonIcon
                icon={arrowForwardOutline}
                className="black-icon big-arrow"
                title="Litera I Level 1"
                aria-label="Next level"
                onMouseEnter={playHoverSoundAvanseaza}
              />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    );
  };
  

export default LiteraI;