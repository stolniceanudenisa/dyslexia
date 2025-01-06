import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
import './LiteraFLevel3.css';
import Repeta from '../assets/sounds/m-formare-cuvinte.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';

import faAudio from '../assets/sounds/Fa.mp3';
import feAudio from '../assets/sounds/Fe.mp3';
import fiAudio from '../assets/sounds/Fi.mp3';
import foAudio from '../assets/sounds/Fo.mp3';
import fuAudio from '../assets/sounds/Fu.mp3';

import fafaAudio from '../assets/sounds/FA-FA.mp3';
import fofoAudio from '../assets/sounds/FO-FO.mp3';
import fufuAudio from '../assets/sounds/FU-FU.mp3';

import LitFL3 from "../assets/sounds/m-formare-cuvinte.mp3";


const LiteraFLevel3: React.FC<RouteComponentProps> = ({ history }) => {



    useEffect(() => {
        const audioTimeout = setTimeout(() => {
            const audioPlayer = new Audio(LitFL3);
            audioPlayer.play();
            return () => {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
            };
        }, 1000);

        return () => clearTimeout(audioTimeout);
    }, []);



    const syllables = [
        { text: 'FA', audio: faAudio },
        { text: 'FE', audio: feAudio },
        { text: 'FI', audio: fiAudio },
        { text: 'FO', audio: foAudio },
        { text: 'FU', audio: fuAudio },
    ];

    const words = [
        { text: 'FA-FA', audio: fafaAudio },
        { text: 'FO-FO', audio: fofoAudio },
        { text: 'FU-FU', audio: fufuAudio },
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
                    title="Litera F Nivel 3"
                    titleStyle="title"
                    onPlayClick={playClickAudio}
                    onBackClick={() => history.goBack()}
                />
            </IonHeader>

            <IonContent className="literaFLevel3-container">


                {/* Syllables on the left */}
                <div className="literaFLevel3-syllables">
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
                <IonFabButton onClick={() => history.push('/LiteraG')}>
                    <IonIcon
                        icon={arrowForwardOutline}
                        className="black-icon big-arrow"
                        title="Litera G"
                        aria-label="Next level"
                        onMouseEnter={playHoverSoundAvanseaza}
                    />
                </IonFabButton>
            </IonFab>
        </IonPage>
    );
};

export default LiteraFLevel3;
