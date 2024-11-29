import React from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './Litere.css';
import { arrowForwardOutline } from 'ionicons/icons';

import cirese from '../assets/images/cirese.png';
import rochie from '../assets/images/rochie.png';
import robot from '../assets/images/robot.png';
import soare from '../assets/images/soare.png';

import ramura from '../assets/images/ramura.png';
import soarece from '../assets/images/soarece.png';
import tort from '../assets/images/tort.png';
import zar from '../assets/images/zar.png';

import CireseAudio from '../assets/sounds/Cireșe.mp3';
import RochieAudio from '../assets/sounds/Rochie.mp3';
import RobotAudio from '../assets/sounds/Robot.mp3';
import SoareAudio from '../assets/sounds/Soare.mp3';

import RamuraAudio from '../assets/sounds/Ramură.mp3';
import SoareceAudioFile from '../assets/sounds/Șoarece.mp3';
import TortAudio from '../assets/sounds/Zar.mp3';
import ZarAudio from '../assets/sounds/Zar.mp3';

import R from '../assets/sounds/R.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import Repeta from '../assets/sounds/RepetaDupaMine.mp3';

import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';

const LiteraR: React.FC<RouteComponentProps> = ({ history }) => {
    const images1 = [cirese, rochie, robot, soare];
    const images2 = [ramura, soarece, tort, zar];
    const audios = [
        CireseAudio, RochieAudio, RobotAudio, SoareAudio,
        RamuraAudio, SoareceAudioFile, TortAudio, ZarAudio
    ];
    const words1 = ['CIREȘE', 'ROCHIE', 'ROBOT', 'SOARE'];
    const words2 = ['RAMURĂ', 'ȘOARECE', 'TORT', 'ZAR'];

    const playAudio = (index: number) => {
        const audio = new Audio(audios[index]);
        audio.playbackRate = 0.8;
        audio.play();
    };

    const playHoverSound = () => {
        const audio = new Audio(R);
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

    const formatWordWithBoldR = (word: string) => {
        return (
            <>
                {word.split('').map((char, index) => (
                    <span key={index} className={char === 'R' ? 'highlight' : ''}>
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
                    title="Litera R"
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
                                        alt={`Litera R - ${words1[index]}`}
                                    />
                                </div>
                                <div className="audio-label" style={{ fontSize: '0.9em' }}>
                                    {formatWordWithBoldR(words1[index])}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Letter display */}
                    <div className="letter" onMouseEnter={playHoverSound}>
                        <div className="letter-content">R</div>
                    </div>

                    {/* Second row of images */}
                    <div className="round-buttons">
                        {[0, 1, 2, 3].map((index) => (
                            <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index + 4)}>
                                <div style={{ width: '98px', height: '98px', margin: 20, cursor: 'pointer' }}>
                                    <img
                                        src={images2[index]}
                                        style={{ width: '100%', height: '100%' }}
                                        alt={`Litera R - ${words2[index]}`}
                                    />
                                </div>
                                <div className="audio-label" style={{ fontSize: '0.9em' }}>
                                    {formatWordWithBoldR(words2[index])}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Next Level Button */}
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => history.push('/LiteraRLevel1')}>
                        <IonIcon
                            icon={arrowForwardOutline}
                            className="black-icon big-arrow"
                            title="Litera R Level 1"
                            aria-label="Next level"
                            onMouseEnter={playHoverSoundAvanseaza}
                        />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default LiteraR;
