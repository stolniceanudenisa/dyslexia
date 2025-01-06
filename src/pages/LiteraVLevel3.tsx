import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
import './LiteraVLevel3.css';
import Repeta from '../assets/sounds/m-formare-cuvinte.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';

import vaAudio from '../assets/sounds/VA.mp3';
import veAudio from '../assets/sounds/VE.mp3';
import viAudio from '../assets/sounds/VI.mp3';
import voAudio from '../assets/sounds/VO.mp3';
import vuAudio from '../assets/sounds/VU.mp3';

import vavaAudio from '../assets/sounds/VA-VA.mp3';
import veveAudio from '../assets/sounds/VE-VE.mp3';
import viviAudio from '../assets/sounds/VI-VI.mp3';
import vovoAudio from '../assets/sounds/VO-VO.mp3';
import vuvuAudio from '../assets/sounds/VU-VU.mp3';

import LitVL3 from "../assets/sounds/m-formare-cuvinte.mp3";




const LiteraVLevel3: React.FC<RouteComponentProps> = ({ history }) => {



    useEffect(() => {
        const audioTimeout = setTimeout(() => {
            const audioPlayer = new Audio(LitVL3);
            audioPlayer.play();
            return () => {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
            };
        }, 1000);

        return () => clearTimeout(audioTimeout);
    }, []);



    const syllables = [
        { text: 'VA', audio: vaAudio },
        { text: 'VE', audio: veAudio },
        { text: 'VI', audio: viAudio },
        { text: 'VO', audio: voAudio },
        { text: 'VU', audio: vuAudio },
    ];

    const words = [
        { text: 'VA-VA', audio: vavaAudio },
        { text: 'VE-VE', audio: veveAudio },
        { text: 'VI-VI', audio: viviAudio },
        { text: 'VO-VO', audio: vovoAudio },
        { text: 'VU-VU', audio: vuvuAudio },

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
                    title="Litera V Nivel 3"
                    titleStyle="title"
                    onPlayClick={playClickAudio}
                    onBackClick={() => history.goBack()}
                />
            </IonHeader>

            <IonContent className="literaVLevel3-container">


                {/* Syllables on the left */}
                <div className="literaVLevel3-syllables">
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
                <IonFabButton onClick={() => history.push('/LiteraZ')}>
                    <IonIcon
                        icon={arrowForwardOutline}
                        className="black-icon big-arrow"
                        title="Litera Z"
                        aria-label="Next level"
                        onMouseEnter={playHoverSoundAvanseaza}
                    />
                </IonFabButton>
            </IonFab>
        </IonPage>
    );
};

export default LiteraVLevel3;
