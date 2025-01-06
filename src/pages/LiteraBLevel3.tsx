import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
import './LiteraBLevel3.css';
import Repeta from '../assets/sounds/m-formare-cuvinte.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';

import baAudio from '../assets/sounds/baAudio.mp3';
import beAudio from '../assets/sounds/beAudio.mp3';
import biAudio from '../assets/sounds/biAudio.mp3';
import boAudio from '../assets/sounds/boAudio.mp3';
import buAudio from '../assets/sounds/buAudio.mp3';

import babaAudio from '../assets/sounds/babaAudio.mp3';
import bebeAudio from '../assets/sounds/bebeAudio.mp3';
import bibiAudio from '../assets/sounds/bibiAudio.mp3';
import boboAudio from '../assets/sounds/boboAudio.mp3';
import bubuAudio from '../assets/sounds/bubuAudio.mp3';

import LitML3 from "../assets/sounds/m-formare-cuvinte.mp3";




const LiteraBLevel3: React.FC<RouteComponentProps> = ({ history }) => {



    // useEffect(() => {
    //     const audioTimeout = setTimeout(() => {
    //         const audioPlayer = new Audio(LitML3);
    //         audioPlayer.play();
    //         return () => {
    //             audioPlayer.pause();
    //             audioPlayer.currentTime = 0;
    //         };
    //     }, 1000);

    //     return () => clearTimeout(audioTimeout);
    // }, []);



    const syllables = [
        { text: 'BA', audio: baAudio },
        { text: 'BE', audio: beAudio },
        { text: 'BI', audio: biAudio },
        { text: 'BO', audio: boAudio },
        { text: 'BU', audio: buAudio },
    ];

    const words = [
        { text: 'BA-BA', audio: babaAudio },
        { text: 'BE-BE', audio: bebeAudio },
        { text: 'BI-BI', audio: bibiAudio},
        { text: 'BO-BO', audio: boboAudio },
        { text: 'BU-BU', audio: bubuAudio },

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
                    title="Litera B Nivel 3"
                    titleStyle="title"
                    onPlayClick={playClickAudio}
                    onBackClick={() => history.goBack()}
                />
            </IonHeader>

            <IonContent className="literaBLevel3-container">


                {/* Syllables on the left */}
                <div className="literaBLevel3-syllables">
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



                      <IonFab vertical="bottom" horizontal="start" slot="fixed" className="custom-home-fab">
                    <IonFabButton className="custom-home-button" onClick={() => history.push('/map2')}>
                      <span className="custom-home-emoji" title="Go to Map">🏠</span>
                    </IonFabButton>
                  </IonFab>

            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton onClick={() => history.push('/LiteraT')}>
                    <IonIcon
                        icon={arrowForwardOutline}
                        className="black-icon big-arrow"
                        title="Litera T"
                        aria-label="Next level"
                        onMouseEnter={playHoverSoundAvanseaza}
                    />
                </IonFabButton>
            </IonFab>
        </IonPage>
    );
};

export default LiteraBLevel3;
