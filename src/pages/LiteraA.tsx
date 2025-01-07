import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './Litere.css';
import apa from '../assets/images/apa.png';
import avion from '../assets/images/avion.png';
import albina from '../assets/images/albina.png';
import arici from '../assets/images/arici.png';
import casa from '../assets/images/casa.png';
import sac from '../assets/images/sac.png';
import masa from '../assets/images/masa.png';
import mac from '../assets/images/mac.png';

import ApaAudio from '../assets/sounds/apa!.mp3';
import AriciAudio from '../assets/sounds/Arici.mp3';
import AvionAudio from '../assets/sounds/Avion.mp3';
import AlbinaAudio from '../assets/sounds/albina!.mp3';
import CasaAudio from '../assets/sounds/casa!.mp3';
import SacAudio from '../assets/sounds/sac!.mp3';
import MacAudio from '../assets/sounds/mac!.mp3';
import MasaAudio from '../assets/sounds/masa!.mp3';


import A from '../assets/sounds/A!.mp3';

import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline, home } from 'ionicons/icons';
import LitA from "../assets/sounds/RepetaDupaMine.mp3";

const LiteraA: React.FC<RouteComponentProps> = ({ history }) => {
  const images1 = [apa, avion, casa, masa]; // Adăugăm masa la primul rând
  const images2 = [albina, arici, sac, mac]; // Adăugăm mac la al doilea rând
  const audios = [ApaAudio, AvionAudio, CasaAudio, MasaAudio, AlbinaAudio, AriciAudio, SacAudio, MacAudio];
  const words1 = ['APA', 'AVION', 'CASA', 'MASA']; // Text pentru primul rând
  const words2 = ['ALBINA', 'ARICI', 'SAC', 'MAC']; // Text pentru al doilea rând



  useEffect(() => {
    const audioTimeout = setTimeout(() => {
      const audioPlayer = new Audio(LitA);
      audioPlayer.play();
      return () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      };
    }, 1000);

    return () => clearTimeout(audioTimeout);
  }, []);


  const completeLevelA = () => {
    localStorage.setItem('levelACompleted', 'true'); // Marchează nivelul A ca finalizat
    history.push('/LiteraALevel1'); // Navighează la nivelul 1 al literei A
  };


  const playAudio = (index: number) => {
    const audio = new Audio(audios[index]);
    audio.playbackRate = 0.8;
    audio.play();
  };

  const playHoverSound = () => {
    const audio = new Audio(A);
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
          <span key={index} className={char === 'A' ? 'highlight' : ''}>
            {char}
          </span>
        ))}
      </>
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <CustomToolbar title="Litera A" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
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
            <div className="letter-content">A</div>
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
         <IonFabButton className="custom-home-button" onClick={() => history.push('/map1')}>
           <span className="custom-home-emoji" title="Go to Map">🏠</span>
         </IonFabButton>
       </IonFab>



        {/* Next Level Button */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={completeLevelA}>
            <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title="Litera A Level 1" aria-label="Next level" onMouseEnter={playHoverSoundAvanseaza} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default LiteraA;
