import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonFab, IonFabButton } from '@ionic/react';
import './Litere.css';
import { arrowForward, arrowForwardOutline } from 'ionicons/icons';
import oaie from '../assets/images/oaie.png';
import oala from '../assets/images/oala.png';
import omida from '../assets/images/ou.png';
import oglinda from '../assets/images/oglinda.png';


import { increaseScore, useGameSettings } from './Home'
import { RouteComponentProps } from 'react-router';
import Bravo from '../assets/sounds/BravoFinalJoc.mp3';
import CustomToolbar from '../components/CustomToolbar';
import O from '../assets/sounds/O!.mp3';
import oaieAudio from '../assets/sounds/Oaie.mp3';
import oalaAudio from '../assets/sounds/Oala.mp3';
import omidaAudio from '../assets/sounds/Omida.mp3';
import oglindaAudio from '../assets/sounds/Oglinda.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import Repeta from '../assets/sounds/RepetaDupaMine.mp3';



const LiteraO: React.FC<RouteComponentProps> = ({ history }) => {
    const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

    const images1 = [oglinda, oaie];
    const images2 = [omida, oala];
    const audios = [oglindaAudio, oaieAudio, omidaAudio, oalaAudio];
    const words1 = ['OGLINDA', 'OAIE'];
    const words2 = ['OU', 'OALA'];

    const playAudio = (index: number) => {
        if (audioPlayer) {
            audioPlayer.src = audios[index];
            audioPlayer.playbackRate = 0.8;
            audioPlayer.play();
        }
    };

    const playHoverSound = () => {
        const audio = new Audio(O);
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
                <CustomToolbar title="Litera O" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
            </IonHeader>
            <IonContent className="letter-page" scrollY={false}>
                <div className="container">
                    {/* First row of images */}
                    <div className="round-buttons">
                        {[0, 1].map((index) => (
                            <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index)}>
                                <div style={{ width: '150px', height: '150px', margin: 20, cursor: 'pointer' }}>
                                    <img
                                        src={images1[index]}  // Now using PNG images
                                        style={{ width: '100%', height: '100%' }}
                                        alt={`Litera O - ${words1[index]}`}
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
                        <div className="letter-content">O</div>
                    </div>

                    {/* Second row of images */}
                    <div className="round-buttons">
                        {[0, 1].map((index) => (
                            <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index + 2)}>
                                <div style={{ width: '150px', height: '150px', margin: 20, cursor: 'pointer' }}>
                                    <img
                                        src={images2[index]}  // Now using PNG images
                                        style={{ width: '100%', height: '100%' }}
                                        alt={`Litera O - ${words2[index]}`}
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
                    <IonFabButton onClick={() => history.push('/LiteraOLevel1')}>
                        <IonIcon
                            icon={arrowForwardOutline}
                            className="black-icon big-arrow"
                            title="Litera O Level 1"
                            aria-label="Next level"
                            onMouseEnter={playHoverSoundAvanseaza}
                        />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default LiteraO;