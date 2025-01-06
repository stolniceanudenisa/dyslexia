import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
import './LiteraLLevel3.css';
import Repeta from '../assets/sounds/m-formare-cuvinte.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';

import laAudio from '../assets/sounds/LA.mp3';
import leAudio from '../assets/sounds/LE.mp3';
import liAudio from '../assets/sounds/LI.mp3';
import loAudio from '../assets/sounds/LO.mp3';
import luAudio from '../assets/sounds/LU.mp3';

import lalaAudio from '../assets/sounds/LA-LA.mp3';
import leleAudio from '../assets/sounds/LE-LE.mp3';
import liliAudio from '../assets/sounds/LI-LI.mp3';
import loloAudio from '../assets/sounds/LO-LO.mp3';
import luluAudio from '../assets/sounds/LU-LU.mp3';

import LitLL3 from "../assets/sounds/m-formare-cuvinte.mp3";




const LiteraLLevel3: React.FC<RouteComponentProps> = ({ history }) => {



    useEffect(() => {
        const audioTimeout = setTimeout(() => {
            const audioPlayer = new Audio(LitLL3);
            audioPlayer.play();
            return () => {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
            };
        }, 1000);

        return () => clearTimeout(audioTimeout);
    }, []);



    const syllables = [
        { text: 'LA', audio: laAudio },
        { text: 'LE', audio: leAudio },
        { text: 'LI', audio: liAudio },
        { text: 'LO', audio: loAudio },
        { text: 'LU', audio: luAudio },
    ];

    const words = [
        { text: 'LA-LA', audio: lalaAudio },
        { text: 'LE-LE', audio: leleAudio },
        { text: 'LI-LI', audio: liliAudio },
        { text: 'LO-LO', audio: loloAudio },
        { text: 'LU-LU', audio: luluAudio },

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
                    title="Litera L Nivel 3"
                    titleStyle="title"
                    onPlayClick={playClickAudio}
                    onBackClick={() => history.goBack()}
                />
            </IonHeader>

            <IonContent className="literaLLevel3-container">


                {/* Syllables on the left */}
                <div className="literaLLevel3-syllables">
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
                <IonFabButton onClick={() => history.push('/LiteraM')}>
                    <IonIcon
                        icon={arrowForwardOutline}
                        className="black-icon big-arrow"
                        title="Litera M"
                        aria-label="Next level"
                        onMouseEnter={playHoverSoundAvanseaza}
                    />
                </IonFabButton>
            </IonFab>
        </IonPage>
    );
};

export default LiteraLLevel3;
