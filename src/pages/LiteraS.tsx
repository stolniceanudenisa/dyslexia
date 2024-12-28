import React from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './Litere.css';
import { arrowForwardOutline } from 'ionicons/icons';

import scaun from '../assets/images/scaun.png';
import pasare from '../assets/images/pasare.png';
import masca from '../assets/images/masca.png';
import sanie from '../assets/images/sanie.png';

import caisă from '../assets/images/caisa.png';
import sfoara from '../assets/images/sfoara.png';
import sticla from '../assets/images/sticla.png';
import scoica from '../assets/images/scoica.png';

import ScaunAudio from '../assets/sounds/scaun.mp3';
import PasareAudio from '../assets/sounds/pasare.mp3';
import MascaAudio from '../assets/sounds/masca.mp3';
import SanieAudio from '../assets/sounds/sanie.mp3';

import CaisaAudio from '../assets/sounds/caisa.mp3';
import SfoaraAudio from '../assets/sounds/sfoara.mp3';
import SticlaAudio from '../assets/sounds/sticla.mp3';
import ScoicaAudio from '../assets/sounds/scoica.mp3';

import S from '../assets/sounds/S.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import Repeta from '../assets/sounds/RepetaDupaMine.mp3';

import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';

const LiteraS: React.FC<RouteComponentProps> = ({ history }) => {
    const images1 = [scaun, pasare, masca, sanie];
    const images2 = [caisă, sfoara, sticla, scoica];
    const audios = [
        ScaunAudio, PasareAudio, MascaAudio, SanieAudio,
        CaisaAudio, SfoaraAudio, SticlaAudio, ScoicaAudio
    ];
    const words1 = ['SCAUN', 'PASĂRE', 'MASCĂ', 'SANIE'];
    const words2 = ['CAISĂ', 'SFOARĂ', 'STICLĂ', 'SCOICĂ'];

    const playAudio = (index: number) => {
        const audio = new Audio(audios[index]);
        audio.playbackRate = 0.8;
        audio.play();
    };

    const playHoverSound = () => {
        const audio = new Audio(S);
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

    const formatWordWithBoldS = (word: string) => {
        return (
            <>
                {word.split('').map((char, index) => (
                    <span key={index} className={char === 'S' ? 'highlight' : ''}>
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
                    title="Litera S"
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
                                        alt={`Litera S - ${words1[index]}`}
                                    />
                                </div>
                                <div className="audio-label" style={{ fontSize: '0.9em' }}>
                                    {formatWordWithBoldS(words1[index])}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Letter display */}
                    <div className="letter" onMouseEnter={playHoverSound}>
                        <div className="letter-content">S</div>
                    </div>

                    {/* Second row of images */}
                    <div className="round-buttons">
                        {[0, 1, 2, 3].map((index) => (
                            <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index + 4)}>
                                <div style={{ width: '98px', height: '98px', margin: 20, cursor: 'pointer' }}>
                                    <img
                                        src={images2[index]}
                                        style={{ width: '100%', height: '100%' }}
                                        alt={`Litera S - ${words2[index]}`}
                                    />
                                </div>
                                <div className="audio-label" style={{ fontSize: '0.9em' }}>
                                    {formatWordWithBoldS(words2[index])}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Next Level Button */}
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => history.push('/LiteraSLevel1')}>
                        <IonIcon
                            icon={arrowForwardOutline}
                            className="black-icon big-arrow"
                            title="Litera S Level 1"
                            aria-label="Next level"
                            onMouseEnter={playHoverSoundAvanseaza}
                        />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default LiteraS;
