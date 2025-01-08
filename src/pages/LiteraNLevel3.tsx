import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
import './LiteraMLevel3.css';
import Repeta from '../assets/sounds/m-formare-cuvinte.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';

import naAudio from '../assets/sounds/NA.mp3';
import neAudio from '../assets/sounds/NE.mp3';
import niAudio from '../assets/sounds/NI.mp3';
import noAudio from '../assets/sounds/NO.mp3';
import nuAudio from '../assets/sounds/NU.mp3';

import nanaAudio from '../assets/sounds/NA-NA.mp3';
import ninaAudio from '../assets/sounds/NI-NA.mp3';
import ninoAudio from '../assets/sounds/NI-NO.mp3';
import nanuAudio from '../assets/sounds/NA-NU.mp3';
import neneAudio from '../assets/sounds/NE-NE.mp3';

import LitML3 from "../assets/sounds/m-formare-cuvinte.mp3";




const LiteraNLevel3: React.FC<RouteComponentProps> = ({ history }) => {



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
        { text: 'NA', audio: naAudio },
        { text: 'NE', audio: neAudio },
        { text: 'NI', audio: niAudio },
        { text: 'NO', audio: noAudio },
        { text: 'NU', audio: nuAudio },
    ];

    const words = [
        { text: 'NA-NA', audio: nanaAudio },
        { text: 'NI-NA', audio: ninaAudio },
        { text: 'NI-NO', audio: ninoAudio },
        { text: 'NA-NU', audio: nanuAudio },
        { text: 'NE-NE', audio: neneAudio },

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
                    title="Litera N Nivel 3"
                    titleStyle="title"
                    onPlayClick={playClickAudio}
                    onBackClick={() => history.goBack()}
                />
            </IonHeader>

            <IonContent className="literaMLevel3-container">


                {/* Syllables on the left */}
                <div className="literaMLevel3-syllables">
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
                <IonFabButton onClick={() => history.push('/LiteraP')}>
                    <IonIcon
                        icon={arrowForwardOutline}
                        className="black-icon big-arrow"
                        title="Litera N"
                        aria-label="Next level"
                        onMouseEnter={playHoverSoundAvanseaza}
                    />
                </IonFabButton>
            </IonFab>
        </IonPage>
    );
};

export default LiteraNLevel3;
