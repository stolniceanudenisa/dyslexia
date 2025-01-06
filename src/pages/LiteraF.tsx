import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './Litere.css';

import foc from '../assets/images/foc.png'
import floare from '../assets/images/floare.png'
import fluture from '../assets/images/fluture.png'
import fulg from '../assets/images/fulg.png'
import frunza from '../assets/images/frunza.png'
import fundita from '../assets/images/funda.png'
import fetita from '../assets/images/fetita.png'
import  flamingo from '../assets/images/flamingo.png'


import FloareAudio from '../assets/sounds/FloareAudio.mp3'
import FlutureAudio from '../assets/sounds/FlutureAudio.mp3'
import FocAudio from '../assets/sounds/FocAudio.mp3'
import FulgAudio from '../assets/sounds/FulgAudio.mp3'
import FrunzaAudio from '../assets/sounds/FrunzaAudio.mp3'
import FlamingoAudio from '../assets/sounds/FlamingoAudio.mp3'
import FetitaAudio from '../assets/sounds/FetitaAudio.mp3'
import FunditaAudio from '../assets/sounds/FunditaAudio.mp3'

import F from '../assets/sounds/F!.mp3'

import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';

const LiteraF: React.FC<RouteComponentProps> = ({ history }) => {
    const images1 = [floare, fluture, foc, fulg]; // Adăugăm masa la primul rând
    const images2 = [frunza, fundita, fetita, flamingo]; // Adăugăm mac la al doilea rând
    const audios = [FloareAudio, FlutureAudio, FocAudio, FulgAudio, FrunzaAudio, FunditaAudio, FetitaAudio, FlamingoAudio];
    const words1 = ['FLOARE', 'FLUTURE', 'FOC', 'FULG']; // Text pentru primul rând
    const words2 = ['FRUNZA', 'FUNDITA', 'FETITA', 'FLAMINGO']; // Text pentru al doilea rând

    const playAudio = (index: number) => {
        const audio = new Audio(audios[index]);
        audio.playbackRate = 0.8;
        audio.play();
    };

    const playHoverSound = () => {
        const audio = new Audio(F);
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

    const formatWordWithBoldF = (word: string) => {
        return (
            <>
                {word.split('').map((char, index) => (
                    <span key={index} className={char === 'F' ? 'highlight' : ''}>
            {char}
          </span>
                ))}
            </>
        );
    };

    return (
        <IonPage>
            <IonHeader>
                <CustomToolbar title="Litera F" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
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
                                    {formatWordWithBoldF(words1[index])}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Letter display */}
                    <div className="letter" onMouseEnter={playHoverSound}>
                        <div className="letter-content">F</div>
                    </div>

                    {/* Second row of images */}
                    <div className="round-buttons">
                        {[0, 1, 2, 3].map((index) => (
                            <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index + 4)}>
                                <div style={{ width: '120px', height: '120px', margin: 10, cursor: 'pointer' }}>
                                    <img src={images2[index]} style={{ width: '100%', height: '100%' }} />
                                </div>
                                <div className="audio-label" style={{ fontSize: '0.9em' }}>
                                    {formatWordWithBoldF(words2[index])}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

          <IonFab vertical="bottom" horizontal="start" slot="fixed" className="custom-home-fab">
        <IonFabButton className="custom-home-button" onClick={() => history.push('/map3')}>
          <span className="custom-home-emoji" title="Go to Map">🏠</span>
        </IonFabButton>
      </IonFab>





                {/* Next Level Button */}
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => history.push('/LiteraFLevel1')}>
                        <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title="Litera F Level 1" aria-label="Next level" onMouseEnter={playHoverSoundAvanseaza} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default LiteraF;
