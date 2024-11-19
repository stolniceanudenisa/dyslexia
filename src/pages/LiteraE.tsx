import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonButton, IonIcon, IonFab, IonFabButton } from '@ionic/react';
import { arrowForward } from 'ionicons/icons';
import './Litere.css';
import erou from '../assets/images/erou.svg';
import elefant from '../assets/images/elefant.svg';
import evantai from '../assets/images/evantai.svg';
import esarfa from '../assets/images/esarfa.svg';
import erouAudio from '../assets/sounds/Erou.mp3';
import elefantAudio from '../assets/sounds/Elefant.mp3';
import evantaiAudio from '../assets/sounds/Evantai.mp3';
import esarfaAudio from '../assets/sounds/Esarfa.mp3';
import E from '../assets/sounds/E!.mp3';
import { increaseScore } from './Home'
import { RouteComponentProps } from 'react-router';
import { useGameSettings } from './Home';
import CustomToolbar from '../components/CustomToolbar';
import Bravo from '../assets/sounds/BravoFinalJoc.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import { arrowForwardOutline } from 'ionicons/icons';



type ButtonText = "A" | "E" | "*" | "★";

const LiteraE: React.FC<RouteComponentProps> = ({ history }) => {
    const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

    const images1 = [erou, elefant];
    const images2 = [evantai, esarfa];
    const audios = [erouAudio, elefantAudio, evantaiAudio, esarfaAudio];
    const words1 = ['EROU', 'ELEFANT'];
    const words2 = ['EVANTAI', 'ESARFA'];

    const playAudio = (index: number) => {
        if (audioPlayer) {
            audioPlayer.src = audios[index];
            audioPlayer.playbackRate = 0.8;
            audioPlayer.play();
        }
    };

    const playHoverSound = () => {
        const audio = new Audio(E);
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
                <CustomToolbar title="Litera E" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
            </IonHeader>
            <IonContent className="letter-page" scrollY={false}>
                <div className="container">
                    {/* First row of images */}
                    <div className="round-buttons">
                        {[0, 1].map((index) => (
                            <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index)}>
                                <div style={{ width: '150px', height: '150px', margin: 20, cursor: 'pointer' }}>
                                    <img
                                        src={images1[index]}
                                        style={{ width: '100%', height: '100%' }}
                                        alt={`Litera E - ${words1[index]}`}
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
                        <div className="letter-content">E</div>
                    </div>

                    {/* Second row of images */}
                    <div className="round-buttons">
                        {[0, 1].map((index) => (
                            <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index + 2)}>
                                <div style={{ width: '150px', height: '150px', margin: 20, cursor: 'pointer' }}>
                                    <img
                                        src={images2[index]}
                                        style={{ width: '100%', height: '100%' }}
                                        alt={`Litera E - ${words2[index]}`}
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
                    <IonFabButton onClick={() => history.push('/LiteraELevel1')}>
                        <IonIcon
                            icon={arrowForwardOutline}
                            className="black-icon big-arrow"
                            title="Litera E Level 1"
                            aria-label="Next level"
                            onMouseEnter={playHoverSoundAvanseaza}
                        />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};


export default LiteraE;