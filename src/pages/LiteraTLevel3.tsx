import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
import './LiteraTLevel3.css';
import Repeta from '../assets/sounds/m-formare-cuvinte.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';

import taAudio from '../assets/sounds/taAudio.mp3';
import teAudio from '../assets/sounds/teAudio.mp3';
import tiAudio from '../assets/sounds/tiAudio.mp3';
import toAudio from '../assets/sounds/toAudio.mp3';
import tuAudio from '../assets/sounds/tuAudio.mp3';

import tataAudio from '../assets/sounds/tataAudio.mp3';
import teteAudio from '../assets/sounds/teteAudio.mp3';
import titiAudio from '../assets/sounds/titiAudio.mp3';
import totoAudio from '../assets/sounds/totoAudio.mp3';
import tutuAudio from '../assets/sounds/tutuAudio.mp3';

import LitML3 from "../assets/sounds/m-formare-cuvinte.mp3";




const LiteraTLevel3: React.FC<RouteComponentProps> = ({ history }) => {



    useEffect(() => {
        const audioTimeout = setTimeout(() => {
            const audioPlayer = new Audio(LitML3);
            audioPlayer.play();
            return () => {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
            };
        }, 1000);

        return () => clearTimeout(audioTimeout);
    }, []);



    const syllables = [
        { text: 'TA', audio: taAudio },
        { text: 'TE', audio: teAudio },
        { text: 'TI', audio: tiAudio },
        { text: 'TO', audio: toAudio },
        { text: 'TU', audio: tuAudio},
    ];

    const words = [
        { text: 'TA-TA', audio: tataAudio },
        { text: 'TE-TE', audio: teteAudio },
        { text: 'TI-TI', audio: titiAudio },
        { text: 'TO-TO', audio: totoAudio },
        { text: 'TU-TU', audio: tutuAudio },

    ];

    const playAudio = (audioFile: string) => {
        const audio = new Audio(audioFile);
        audio.play();
    };

    const playHoverSoundAvanseaza = () => {
        const audio = new Audio(Avanseaza);
        audio.play();
    };

    const playClickAudio = () => {
        const audio = new Audio(Repeta);
        audio.play();
    };

    return (
        <IonPage>
            <IonHeader>
                <CustomToolbar
                    title="Litera T Nivel 3"
                    titleStyle="title"
                    onPlayClick={playClickAudio}
                    onBackClick={() => history.goBack()}
                />
            </IonHeader>

            <IonContent className="literaTLevel3-container">


                {/* Syllables on the left */}
                <div className="literaTLevel3-syllables">
                    <div className="syllables-column">
                        {syllables.map((syllable, index) => (
                            <div
                                key={index}
                                className="syllable-item"
                                onClick={() => playAudio(syllable.audio)}
                            >
                                {syllable.text}
                            </div>
                        ))}
                    </div>

                    {/* Words on the right */}
                    <div className="syllables-column">
                        {words.map((word, index) => (
                            <div
                                key={index}
                                className="syllable-item"
                                onClick={() => playAudio(word.audio)}
                            >
                                {word.text}
                            </div>
                        ))}
                    </div>
                </div>
            </IonContent>

            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton onClick={() => history.push('/LiteraC')}>
                    <IonIcon
                        icon={arrowForwardOutline}
                        className="black-icon big-arrow"
                        title="Litera C"
                        aria-label="Next level"
                        onMouseEnter={playHoverSoundAvanseaza}
                    />
                </IonFabButton>
            </IonFab>
        </IonPage>
    );
};

export default LiteraTLevel3;
