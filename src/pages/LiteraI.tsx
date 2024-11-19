import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonFab, IonFabButton } from '@ionic/react';
import './Litere.css';
import { arrowForward, arrowForwardOutline } from 'ionicons/icons';
import inel from '../assets/images/inel.png';
import insula from '../assets/images/insula.png';
import iepure from '../assets/images/iepure.png';
import inima from '../assets/images/inima.png';

import { increaseScore, useGameSettings } from './Home'
import InelAudio from '../assets/sounds/Inel.mp3';
import InsulaAudio from '../assets/sounds/Insula.mp3';
import IepureAudio from '../assets/sounds/Iepure.mp3';
import InimaAudio from '../assets/sounds/Inima.mp3';
 
import { RouteComponentProps } from 'react-router';
import CustomToolbar from '../components/CustomToolbar';
import I from '../assets/sounds/I!.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import Repeta from '../assets/sounds/RepetaDupaMine.mp3';



const LiteraI: React.FC<RouteComponentProps> = ({ history }) => {
    const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

    const images1 = [inel, insula];
    const images2 = [iepure, inima];
    const audios = [InelAudio, InsulaAudio, IepureAudio, InimaAudio];
    const words1 = ['INEL', 'INSULA'];
    const words2 = ['IEPURE', 'INIMA'];

    const playAudio = (index: number) => {
        if (audioPlayer) {
            audioPlayer.src = audios[index];
            audioPlayer.playbackRate = 0.8;
            audioPlayer.play();
        }
    };

    const playHoverSound = () => {
        const audio = new Audio(I);
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

    return (
        <IonPage>
            <IonHeader>
                <CustomToolbar title="Litera I" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
            </IonHeader>
            <IonContent className="letter-page" scrollY={false}>
                <div className="container">
                    {/* First row of images */}
                    <div className="round-buttons">
                        {[0, 1].map((index) => (
                            <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index)}>
                                <div style={{ width: '150px', height: '150px', margin: 20, cursor: 'pointer' }}>
                                    <img
                                        src={images1[index]}  // Updated to use PNG images
                                        style={{ width: '100%', height: '100%' }}
                                        alt={`Litera I - ${words1[index]}`}
                                    />
                                </div>
                                <div className="audio-label" style={{ fontSize: '0.9em' }}>
                                    <strong className="first-letter">{words1[index].charAt(0)}</strong>
                                    {words1[index].substring(1)}
                                </div>
                            </div>
                        ))}
                        <audio ref={(audio) => setAudioPlayer(audio)} />
                    </div>

                    {/* Letter display */}
                    <div className="letter" onMouseEnter={playHoverSound}>
                        <div className="letter-content">I</div>
                    </div>

                    {/* Second row of images */}
                    <div className="round-buttons">
                        {[0, 1].map((index) => (
                            <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index + 2)}>
                                <div style={{ width: '150px', height: '150px', margin: 20, cursor: 'pointer' }}>
                                    <img
                                        src={images2[index]}  // Updated to use PNG images
                                        style={{ width: '100%', height: '100%' }}
                                        alt={`Litera I - ${words2[index]}`}
                                    />
                                </div>
                                <div className="audio-label" style={{ fontSize: '0.9em' }}>
                                    <strong className="first-letter">{words2[index].charAt(0)}</strong>
                                    {words2[index].substring(1)}
                                </div>
                            </div>
                        ))}
                        <audio ref={(audio) => setAudioPlayer(audio)} />
                    </div>
                </div>

                {/* Next Level Button */}
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => history.push('/LiteraILevel1')}>
                        <IonIcon
                            icon={arrowForwardOutline}
                            className="black-icon big-arrow"
                            title="Litera I Level 1"
                            aria-label="Next level"
                            onMouseEnter={playHoverSoundAvanseaza}
                        />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default LiteraI;