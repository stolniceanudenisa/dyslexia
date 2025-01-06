import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './Litere.css';
import taur from '../assets/images/taur.png';
import pat from '../assets/images/pat.png';
import carte from '../assets/images/carte.png';
import tort from '../assets/images/tort.png';
import castel from '../assets/images/castel.png';
import trompeta from '../assets/images/trompeta.png';
import timp from '../assets/images/timp.png';
import cort from '../assets/images/cort.png';

import TaurAudio from '../assets/sounds/taur.mp3';
import PatAudio from '../assets/sounds/pat.mp3';
import CarteAudio from '../assets/sounds/carte.mp3';
import TortAudio from '../assets/sounds/tort!.mp3';
import CastelAudio from '../assets/sounds/castel.mp4';
import TrompetaAudio from '../assets/sounds/trompetă.mp4';
import TimpAudio from '../assets/sounds/timp.mp3';
import CortAudio from '../assets/sounds/cort.mp4';


import T from '../assets/sounds/T .mp3';

import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';

const LiteraT: React.FC<RouteComponentProps> = ({ history }) => {
    const images1 = [taur, pat, carte, tort]; // Adăugăm masa la primul rând
    const images2 = [castel, timp, trompeta, cort]; // Adăugăm mac la al doilea rând
    const audios = [TaurAudio, PatAudio, CarteAudio, TortAudio, CastelAudio,TimpAudio , TrompetaAudio, CortAudio];
    const words1 = ['TAUR', 'PAT', 'CARTE', 'TORT']; // Text pentru primul rând
    const words2 = ['CASTEL', 'TIMP', 'TROMPETA', 'CORT']; // Text pentru al doilea rând

    const playAudio = (index: number) => {
        const audio = new Audio(audios[index]);
        audio.playbackRate = 0.8;
        audio.play();
    };

    const playHoverSound = () => {
        const audio = new Audio(T);
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

    const formatWordWithBoldB = (word: string) => {
        return (
            <>
                {word.split('').map((char, index) => (
                    <span key={index} className={char === 'T' ? 'highlight' : ''}>
            {char}
          </span>
                ))}
            </>
        );
    };

    return (
        <IonPage>
            <IonHeader>
                <CustomToolbar title="Litera T" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
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
                                    {formatWordWithBoldB(words1[index])}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Letter display */}
                    <div className="letter" onMouseEnter={playHoverSound}>
                        <div className="letter-content">T</div>
                    </div>

                    {/* Second row of images */}
                    <div className="round-buttons">
                        {[0, 1, 2, 3].map((index) => (
                            <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index + 4)}>
                                <div style={{ width: '120px', height: '120px', margin: 10, cursor: 'pointer' }}>
                                    <img src={images2[index]} style={{ width: '100%', height: '100%' }} />
                                </div>
                                <div className="audio-label" style={{ fontSize: '0.9em' }}>
                                    {formatWordWithBoldB(words2[index])}
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
                    <IonFabButton onClick={() => history.push('/LiteraTLevel1')}>
                        <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title="Litera T Level 1" aria-label="Next level" onMouseEnter={playHoverSoundAvanseaza} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default LiteraT;
