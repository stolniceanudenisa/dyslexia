import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './Litere.css';
import lac from '../assets/images/lac.png';
import lacat from '../assets/images/lacat.png';
import lacrimioara from '../assets/images/lacrimioara.png';
import lalea from '../assets/images/lalea.png';
import lamaie from '../assets/images/lamaie.png';
import leu from '../assets/images/leu.png';
import libelula from '../assets/images/libelula.png';
import lumanare from '../assets/images/lumanare.png';

import LacAudio from '../assets/sounds/lac.mp3';
import LacatAudio from '../assets/sounds/lacat.mp3';
import LacrimioaraAudio from '../assets/sounds/lacrimioara.mp3';
import LaleaAudio from '../assets/sounds/lalea.mp3';
import LamaieAudio from '../assets/sounds/lamaie.mp3';
import LeuAudio from '../assets/sounds/leu.mp3';
import LibelulaAudio from '../assets/sounds/libelula.mp3';
import LumanareAudio from '../assets/sounds/lumanare.mp3';


import L from '../assets/sounds/L.mp3';

import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';

const LiteraL: React.FC<RouteComponentProps> = ({ history }) => {
    const images1 = [lac, lacat, lacrimioara, libelula];  
    const images2 = [lamaie, leu, lalea, lumanare];  
    const audios = [LacAudio, LacatAudio, LacrimioaraAudio, LibelulaAudio, LamaieAudio, LeuAudio, LaleaAudio, LumanareAudio];  
    const words1 = ['LAC', 'LACAT', 'LACRIMIOARA', 'LIBELULA'];  
    const words2 = ['LAMAIE', 'LEU', 'LALEA', 'LUMANARE'];  

    const playAudio = (index: number) => {
        const audio = new Audio(audios[index]);
        audio.playbackRate = 0.8;
        audio.play();
    };

    const playHoverSound = () => {
        const audio = new Audio(L);
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

    const formatWordWithBoldL = (word: string) => {
        return (
            <>
                {word.split('').map((char, index) => (
                    <span key={index} className={char === 'L' ? 'highlight' : ''}>
                        {char}
                    </span>
                ))}
            </>
        );
    };

    return (
        <IonPage>
            <IonHeader>
                <CustomToolbar title="Litera L" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
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
                                    {formatWordWithBoldL(words1[index])}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Letter display */}
                    <div className="letter" onMouseEnter={playHoverSound}>
                        <div className="letter-content">L</div>
                    </div>

                    {/* Second row of images */}
                    <div className="round-buttons">
                        {[0, 1, 2, 3].map((index) => (
                            <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index + 4)}>
                                <div style={{ width: '120px', height: '120px', margin: 10, cursor: 'pointer' }}>
                                    <img src={images2[index]} style={{ width: '100%', height: '100%' }} />
                                </div>
                                <div className="audio-label" style={{ fontSize: '0.9em' }}>
                                    {formatWordWithBoldL(words2[index])}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Next Level Button */}
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => history.push('/LiteraLLevel1')}>
                        <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title="Litera L Level 1" aria-label="Next level" onMouseEnter={playHoverSoundAvanseaza} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default LiteraL;
