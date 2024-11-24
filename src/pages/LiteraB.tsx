import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './Litere.css';
import bol from '../assets/images/bol.png';
import balon from '../assets/images/balon.png';
import cub from '../assets/images/cub.png';
import broasca from '../assets/images/broasca.png';
import banana from '../assets/images/banana.png';
import sabie from '../assets/images/sabie.png';
import bec from '../assets/images/bec.png';
import zebra from '../assets/images/zebra.png';

import BolAudio from '../assets/sounds/bol.mp3';
import BalonAudio from '../assets/sounds/balon.mp3';
import CubAudio from '../assets/sounds/cub.mp3';
import BroascaAudio from '../assets/sounds/broască.mp3';
import BananaAudio from '../assets/sounds/banană.mp3';
import SabieAudio from '../assets/sounds/sabie.mp3';
import BecAudio from '../assets/sounds/bec.mp3';
import ZebraAudio from '../assets/sounds/zebră.mp3';


import B from '../assets/sounds/B.mp3';

import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';

const LiteraB: React.FC<RouteComponentProps> = ({ history }) => {
    const images1 = [bol, balon, cub, broasca]; // Adăugăm masa la primul rând
    const images2 = [banana, sabie, bec, zebra]; // Adăugăm mac la al doilea rând
    const audios = [BolAudio, BalonAudio, CubAudio, BroascaAudio, BananaAudio, SabieAudio, BecAudio, ZebraAudio];
    const words1 = ['BOL', 'BALON', 'CUB', 'BROASCA']; // Text pentru primul rând
    const words2 = ['BANANA', 'SABIE', 'BEC', 'ZEBRA']; // Text pentru al doilea rând

    const playAudio = (index: number) => {
        const audio = new Audio(audios[index]);
        audio.playbackRate = 0.8;
        audio.play();
    };

    const playHoverSound = () => {
        const audio = new Audio(B);
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
                    <span key={index} className={char === 'B' ? 'highlight' : ''}>
            {char}
          </span>
                ))}
            </>
        );
    };

    return (
        <IonPage>
            <IonHeader>
                <CustomToolbar title="Litera B" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
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
                        <div className="letter-content">B</div>
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

                {/* Next Level Button */}
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => history.push('/LiteraBLevel1')}>
                        <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title="Litera B Level 1" aria-label="Next level" onMouseEnter={playHoverSoundAvanseaza} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default LiteraB;
