import React from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './Litere.css';
import { arrowForwardOutline } from 'ionicons/icons';

import papagal from '../assets/images/papagal.png';
import palarie from '../assets/images/palarie.png';
import vulpe from '../assets/images/vulpe.png';
import sapun from '../assets/images/sapun.png';

import panda from '../assets/images/panda.png';
import prajitura from '../assets/images/prajitura.png';
import laptop from '../assets/images/laptop.png';
import trompeta from '../assets/images/trompeta.png';

import PapagalAudio from '../assets/sounds/Papagal.mp3';
import PalarieAudio from '../assets/sounds/Palarie.mp3';
import VulpeAudio from '../assets/sounds/Vulpe.mp3';
import SapunAudio from '../assets/sounds/Sapun.mp3';

import PandaAudio from '../assets/sounds/Panda.mp3';
import PrajituraAudio from '../assets/sounds/Prajitura.mp3';
import LaptopAudio from '../assets/sounds/Prajitura.mp3';
import TrompetaAudio from '../assets/sounds/Trompeta.mp3';

import P from '../assets/sounds/P.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import Repeta from '../assets/sounds/RepetaDupaMine.mp3';

import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';

const LiteraP: React.FC<RouteComponentProps> = ({ history }) => {
    const images1 = [papagal, palarie, vulpe, trompeta]; // Vulpe moved to first row
    const images2 = [panda, prajitura, laptop, sapun]; // Prajitura moved to second row
    const audios = [
        PapagalAudio, PalarieAudio, VulpeAudio, TrompetaAudio, // Updated order
        PandaAudio, PrajituraAudio, LaptopAudio, SapunAudio
    ];
    const words1 = ['PAPAGAL', 'PALARIE', 'VULPE', 'TROMPETA']; // Updated order
    const words2 = ['PANDA', 'PRAJITURA', 'LAPTOP', 'SAPUN']; // Updated order

    const playAudio = (index: number) => {
        const audio = new Audio(audios[index]);
        audio.playbackRate = 0.8;
        audio.play();
    };

    const playHoverSound = () => {
        const audio = new Audio(P);
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

    const formatWordWithBoldP = (word: string) => {
        return (
            <>
                {word.split('').map((char, index) => (
                    <span key={index} className={char === 'P' ? 'highlight' : ''}>
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
                    title="Litera P"
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
                                        alt={`Litera P - ${words1[index]}`}
                                    />
                                </div>
                                <div className="audio-label" style={{ fontSize: '0.9em' }}>
                                    {formatWordWithBoldP(words1[index])}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Letter display */}
                    <div className="letter" onMouseEnter={playHoverSound}>
                        <div className="letter-content">P</div>
                    </div>

                    {/* Second row of images */}
                    <div className="round-buttons">
                        {[0, 1, 2, 3].map((index) => (
                            <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index + 4)}>
                                <div style={{ width: '98px', height: '98px', margin: 20, cursor: 'pointer' }}>
                                    <img
                                        src={images2[index]}
                                        style={{ width: '100%', height: '100%' }}
                                        alt={`Litera P - ${words2[index]}`}
                                    />
                                </div>
                                <div className="audio-label" style={{ fontSize: '0.9em' }}>
                                    {formatWordWithBoldP(words2[index])}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Next Level Button */}
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => history.push('/LiteraPLevel1')}>
                        <IonIcon
                            icon={arrowForwardOutline}
                            className="black-icon big-arrow"
                            title="Litera P Level 1"
                            aria-label="Next level"
                            onMouseEnter={playHoverSoundAvanseaza}
                        />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default LiteraP;
