import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
import './SilabeZiCuZi.css';

import mamaAudio from '../assets/sounds/MA-MA.mp3';
import tataAudio from '../assets/sounds/tataAudio.mp3';
import mereAudio from '../assets/sounds/ME-RE.mp3';
import pereAudio from '../assets/sounds/PE-RE.mp3';
import afineAudio from '../assets/sounds/A-FI-NE.mp3';

import bananeAudio from '../assets/sounds/BA-NA-NE.mp3';
import ananasAudio from '../assets/sounds/A-NA-NAS.mp3';
import inelAudio from '../assets/sounds/I-NEL.mp3';
import carteAudio from '../assets/sounds/CAR-TE.mp3';

import ardeiAudio from '../assets/sounds/AR-DEI.mp3';
import morcovAudio from '../assets/sounds/MOR-COV.mp3';
import iarnaAudio from '../assets/sounds/IAR-NA.mp3';
import flutureAudio from '../assets/sounds/FLU-TU-RE.mp3';
import balonAudio from '../assets/sounds/BA-LON.mp3';

import apaAudio from '../assets/sounds/A-PA.mp3';
import LitML3 from "../assets/sounds/silabe-complexe.mp3";

import mamaImg from '../assets/images/mama2.png';
import tataImg from '../assets/images/tata.png';
import mereImg from '../assets/images/mere.png';
import pereImg from '../assets/images/pere.png';
import afineImg from '../assets/images/afine.png';
import bananeImg from '../assets/images/banane.png';
import ananasImg from '../assets/images/ananas.png';
import inelImg from '../assets/images/inel.png';
import carteImg from '../assets/images/carte.png';
import ardeiImg from '../assets/images/ardei.png';
import morcovImg from '../assets/images/morcov.png';
import iarnaImg from '../assets/images/iarna.png';
import floareImg from '../assets/images/floare.png';
import flutureImg from '../assets/images/fluture.png';
import balonImg from '../assets/images/balon.png';
import apaImg from '../assets/images/apa.png';


const cuvinteSilabe = [
  [
    { text: "MA-MA", audio: mamaAudio, img: mamaImg },
    { text: "TA-TA", audio: tataAudio, img: tataImg },
    { text: "A-PA", audio: apaAudio, img: apaImg },
    { text: "ME-RE", audio: mereAudio, img: mereImg },
    { text: "PE-RE", audio: pereAudio, img: pereImg },
   
  ],
  [
    { text: "A-FI-NE", audio: afineAudio, img: afineImg },
    { text: "BA-NA-NE", audio: bananeAudio, img: bananeImg },
    { text: "A-NA-NAS", audio: ananasAudio, img: ananasImg },
    { text: "I-NEL", audio: inelAudio, img: inelImg },
    { text: "CAR-TE", audio: carteAudio, img: carteImg },
   
  ],
  [
    { text: "AR-DEI", audio: ardeiAudio, img: ardeiImg },
    { text: "MOR-COV", audio: morcovAudio, img: morcovImg },
    { text: "IAR-NA", audio: iarnaAudio, img: iarnaImg },
    { text: "FLU-TU-RE", audio: flutureAudio, img: flutureImg },
    { text: "BA-LON", audio: balonAudio, img: balonImg },
  
    
  ],
   
];

const SilabeZiCuZi: React.FC<RouteComponentProps> = ({ history }) => {
  const playAudio = (audioFile: string) => {
    const audio = new Audio(audioFile);  // Corect: redă fișierul primit ca parametru
    audio.play();
  };
  


  useEffect(() => {
    const audioTimeout = setTimeout(() => {
      const audioPlayer = new Audio(LitML3);
      audioPlayer.play();
      return () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      };
    }, 1000);

    return () => clearTimeout(audioTimeout);
  }, []);


  return (
    <IonPage>
      <IonHeader>
        <CustomToolbar title="Silabe Zi cu Zi" onBackClick={() => history.goBack()} />
      </IonHeader>
      <IonContent className="silabe-container">
        
        <div className="words-grid">
          {cuvinteSilabe.map((coloana, colIndex) => (
            <div key={colIndex} className="words-column">
              {coloana.map((cuvant, index) => (
                <div
                  key={index}
                  className="word-item"
                  onClick={() => playAudio(cuvant.audio)}
                >
                  <span>{cuvant.text}</span>
                  <img
                    src={cuvant.img}
                    alt={cuvant.text}
                    className="word-image"
                    style={{ width: '54px', height: '54px', marginLeft: '10px' }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Buton HOME */}
        <IonFab vertical="bottom" horizontal="start" slot="fixed" className="custom-home-fab">
          <IonFabButton className="custom-home-button" onClick={() => history.push('/map3')}>
            <span className="custom-home-emoji" title="Go to Map">🏠</span>
          </IonFabButton>
        </IonFab>

        {/* Next Level Button */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/final')}>
            <IonIcon
              icon={arrowForwardOutline}
              className="black-icon big-arrow"
              title="Next Level"
              aria-label="Next level"
            />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default SilabeZiCuZi;
