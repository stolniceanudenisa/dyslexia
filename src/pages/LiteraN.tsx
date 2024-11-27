import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './Litere.css';

import banana from '../assets/images/banana.png';
import paine from '../assets/images/paine.png';
import inger from '../assets/images/inger.png';
import ananas from '../assets/images/ananas.png';
import noapte from '../assets/images/noapte.png';
import nisip from '../assets/images/nisip.png';
import bunic from '../assets/images/bunic.png';
import nor from '../assets/images/nor.png';

import BananaAudio from '../assets/sounds/Banana.mp3';
import PaineAudio from '../assets/sounds/Paine.mp3';
import IngerAudio from '../assets/sounds/Inger.mp3';
import AnanasAudio from '../assets/sounds/Ananas.mp3';
import NoapteAudio from '../assets/sounds/Noapte.mp3';
import NisipAudio from '../assets/sounds/Nisip.mp3';
import BunicAudio from '../assets/sounds/Bunic.mp3';
import NorAudio from '../assets/sounds/Nor.mp3';


import N from '../assets/sounds/N.mp3';

import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';

const LiteraN: React.FC<RouteComponentProps> = ({ history }) => {
    const images1 = [nor, bunic, banana , paine]; // Adăugăm masa la primul rând
    const images2 = [inger, ananas, noapte, nisip]; // Adăugăm mac la al doilea rând
    const audios = [NorAudio, BunicAudio, BananaAudio,PaineAudio, IngerAudio, AnanasAudio, NoapteAudio, NisipAudio];
    const words1 = ['NOR', 'BUNIC', 'BANANA', 'PAINE']; // Text pentru primul rând
    const words2 = ['INGER', 'ANANAS', 'NOAPTE', 'NISIP']; // Text pentru al doilea rând

    const playAudio = (index: number) => {
        const audio = new Audio(audios[index]);
        audio.playbackRate = 0.8;
        audio.play();
    };

    const playHoverSound = () => {
        const audio = new Audio(N);
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
                    <span key={index} className={char === 'N' ? 'highlight' : ''}>
            {char}
          </span>
                ))}
            </>
        );
    };

    return (
        <IonPage>
            <IonHeader>
                <CustomToolbar title="Litera N" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
            </IonHeader>

            <IonContent className="letter-page" scrollY={false}>
                <div className="container">
                    {/* First row of images */}
                    <div className="round-buttons">
                        {[0, 1, 2, 3].map((index) => (
                            <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index)}>
                                <div style={{ width: '150px', height: '120px', margin: 20, cursor: 'pointer' }}>
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
                        <div className="letter-content">N</div>
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
                    <IonFabButton onClick={() => history.push('/LiteraNLevel1')}>
                        <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title="Litera N Level 1" aria-label="Next level" onMouseEnter={playHoverSoundAvanseaza} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default LiteraN;
