import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './LiteraBLevel2.css';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';

import broascăImg from '../assets/images/broasca.png';
import cubImg from '../assets/images/cub.png';
import zebrăImg from '../assets/images/zebra.png';

import Repeta from '../assets/sounds/trage-litera-B.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import { increaseScore, getScore } from './Home';
import BravoAudio from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import BroascaSound from '../assets/sounds/broască.mp3';
import CubSound from '../assets/sounds/cub.mp3';
import ZebraSound from '../assets/sounds/zebră.mp3';



const LiteraBLevel2: React.FC<RouteComponentProps> = ({ history }) => {
    const [completedWords, setCompletedWords] = useState({
        BROASCĂ: false,
        CUB: false,
        ZEBRĂ: false,
    });

    const [lettersUsed, setLettersUsed] = useState([false, false, false]);
    const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);

    const playClickAudio = () => {
        const audio = new Audio(Repeta);
        audio.play();
    };

    const playHoverSoundAvanseaza = () => {
        const audio = new Audio(Avanseaza);
        audio.play();
    };

    const playWordSound = (word: keyof typeof completedWords) => {
        let sound;
        switch (word) {
            case 'BROASCĂ':
                sound = BroascaSound;
                break;
            case 'CUB':
                sound = CubSound;
                break;
            case 'ZEBRĂ':
                sound = ZebraSound;
                break;
            default:
                return;
        }
        const audio = new Audio(sound);
        audio.play();
    };

    const handleDrop = (event: React.DragEvent, word: keyof typeof completedWords) => {
        const letter = event.dataTransfer.getData("letter");

        if (letter === "B" && !completedWords[word]) {
            setCompletedWords((prev) => ({
                ...prev,
                [word]: true,
            }));
            playWordSound(word);
            increaseScore(); // Creștere scor la plasarea corectă a literei
        }
    };

    const allowDrop = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const checkCompletion = () => {
        const allCompleted = Object.values(completedWords).every((wordCompleted) => wordCompleted);
        if (allCompleted) {
            setTimeout(() => {
                const bravoAudio = new Audio(BravoAudio);
                bravoAudio.play();
            }, 1000); // Sunet "Bravo" cu delay de 1 secundă
        }
        setIsNextLevelDisabled(!allCompleted);
    };

    useEffect(() => {
        checkCompletion();
    }, [completedWords]);

    const handleLetterUse = (index: number) => {
        const newLettersUsed = [...lettersUsed];
        newLettersUsed[index] = true;
        setLettersUsed(newLettersUsed);
    };

    return (
        <IonPage>
            <IonHeader>
                <CustomToolbar
                    title="Litera B Nivel 2"
                    titleStyle="title"
                    onPlayClick={playClickAudio}
                    onBackClick={() => history.goBack()}
                />
            </IonHeader>
            <IonContent className="literaBLevel2-container">
                {/* Linia cu literele */}
                <div className="literaBLevel2-letters-line">
                    {[...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className={`literaBLevel2-letter ${lettersUsed[index] ? 'used' : ''}`}
                            draggable={!lettersUsed[index]}
                            onDragStart={(e) => {
                                e.dataTransfer.setData("letter", "B");
                                handleLetterUse(index);
                            }}
                        >
                            B
                        </div>
                    ))}
                </div>

                {/* Linia cu cuvintele */}
                <div className="literaBLevel2-words-line">
                    <div
                        className="literaBLevel2-word-container"
                        onDrop={(e) => handleDrop(e, "BROASCĂ")}
                        onDragOver={allowDrop}
                    >
                        <span className="literaBLevel2-word">
                            {completedWords.BROASCĂ ? "BROASCA" : "_ROASCA"}
                        </span>
                        <img src={broascăImg} alt="Broască" className="literaBLevel2-word-image" />
                    </div>

                    <div
                        className="literaBLevel2-word-container"
                        onDrop={(e) => handleDrop(e, "CUB")}
                        onDragOver={allowDrop}
                    >
                        <span className="literaBLevel2-word">
                            {completedWords.CUB ? "CUB" : "CU_"}
                        </span>
                        <img src={cubImg} alt="Cub" className="literaBLevel2-word-image" />
                    </div>

                    <div
                        className="literaBLevel2-word-container"
                        onDrop={(e) => handleDrop(e, "ZEBRĂ")}
                        onDragOver={allowDrop}
                    >
                        <span className="literaBLevel2-word">
                            {completedWords.ZEBRĂ ? "ZEBRA" : "ZE_RA"}
                        </span>
                        <img src={zebrăImg} alt="Zebră" className="literaBLevel2-word-image" />
                    </div>
                </div>
            </IonContent>




                      <IonFab vertical="bottom" horizontal="start" slot="fixed" className="custom-home-fab">
                    <IonFabButton className="custom-home-button" onClick={() => history.push('/map2')}>
                      <span className="custom-home-emoji" title="Go to Map">🏠</span>
                    </IonFabButton>
                  </IonFab>

            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton
                    onClick={() => history.push('/literaBLevel3')}
                    disabled={isNextLevelDisabled}
                >
                    <IonIcon
                        icon={arrowForwardOutline}
                        className="black-icon big-arrow"
                        title="Next level"
                        aria-label="Next level"
                        onMouseEnter={playHoverSoundAvanseaza}
                    />
                </IonFabButton>
            </IonFab>
        </IonPage>
    );
};

export default LiteraBLevel2;
