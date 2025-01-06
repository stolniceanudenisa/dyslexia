import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
import './LiteraGLevel3.css';
import Repeta from '../assets/sounds/m-formare-cuvinte.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';

import gaAudio from '../assets/sounds/Ga.mp3';
import geAudio from '../assets/sounds/Ge.mp3';
import giAudio from '../assets/sounds/Gi.mp3';
import goAudio from '../assets/sounds/Go.mp3';
import guAudio from '../assets/sounds/Gu.mp3';

import gagaAudio from '../assets/sounds/GA-GA.mp3';
import gogoAudio from '../assets/sounds/GO-GO.mp3';
import guguAudio from '../assets/sounds/GU-GU.mp3';

import LitGL3 from "../assets/sounds/m-formare-cuvinte.mp3";


const LiteraGLevel3: React.FC<RouteComponentProps> = ({ history }) => {



    // useEffect(() => {
    //     const audioTimeout = setTimeout(() => {
    //         const audioPlayer = new Audio(LitGL3);
    //         audioPlayer.play();
    //         return () => {
    //             audioPlayer.pause();
    //             audioPlayer.currentTime = 0;
    //         };
    //     }, 1000);

    //     return () => clearTimeout(audioTimeout);
    // }, []);



    const syllables = [
        { text: 'GA', audio: gaAudio },
        { text: 'GE', audio: geAudio },
        { text: 'GI', audio: giAudio },
        { text: 'GO', audio: goAudio },
        { text: 'GU', audio: guAudio },
    ];

    const words = [
        { text: 'GA-GA', audio: gagaAudio },
        { text: 'GO-GO', audio: gogoAudio },
        { text: 'GU-GU', audio: guguAudio },
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
                    title="Litera G Nivel 3"
                    titleStyle="title"
                    onPlayClick={playClickAudio}
                    onBackClick={() => history.goBack()}
                />
            </IonHeader>

            <IonContent className="literaGLevel3-container">


                {/* Syllables on the left */}
                <div className="literaGLevel3-syllables">
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
                <IonFabButton onClick={() => history.push('/LiteraO')}>
                    <IonIcon
                        icon={arrowForwardOutline}
                        className="black-icon big-arrow"
                        title="Litera O"
                        aria-label="Next level"
                        onMouseEnter={playHoverSoundAvanseaza}
                    />
                </IonFabButton>
            </IonFab>
        </IonPage>
    );
};

export default LiteraGLevel3;
