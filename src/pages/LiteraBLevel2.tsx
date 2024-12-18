import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './LiteraBLevel2.css';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';

import broascăImg from '../assets/images/broasca.png';
import cubImg from '../assets/images/cub.png';
import zebrăImg from '../assets/images/zebra.png';

import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import { increaseScore, getScore } from './Home';

const LiteraBLevel2: React.FC<RouteComponentProps> = ({ history }) => {
    const [score, setScore] = useState(getScore());

    const [completedWords, setCompletedWords] = useState({
        BROASCĂ: false,
        CUB: false,
        ZEBRĂ: false,
    });

    const [lettersUsed, setLettersUsed] = useState([false, false, false]); // 3 litere "B"
    const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);

    const playClickAudio = () => {
        const audio = new Audio(Repeta);
        audio.play();
    };

    const playHoverSoundAvanseaza = () => {
        const audio = new Audio(Avanseaza);
        audio.play();
    };

    const handleDrop = (event: React.DragEvent, word: string) => {
        const letter = event.dataTransfer.getData("letter");
        console.log(`Dropped letter: ${letter}, Target word: ${word}`);

        if (letter === "B") {
            if (word === "BROASCA" && !completedWords.BROASCĂ) {
                setCompletedWords((prev) => ({ ...prev, BROASCĂ: true }));
            } else if (word === "CUB" && !completedWords.CUB) {
                setCompletedWords((prev) => ({ ...prev, CUB: true }));
            } else if (word === "ZEBRA" && !completedWords.ZEBRĂ) {
                setCompletedWords((prev) => ({ ...prev, ZEBRĂ: true }));
            }
        }
    };

    const allowDrop = (event: React.DragEvent) => {
        event.preventDefault(); // Permite plasarea
    };

    useEffect(() => {
        const allCompleted = Object.values(completedWords).every((wordCompleted) => wordCompleted);
        setIsNextLevelDisabled(!allCompleted);
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
                    {lettersUsed.map((used, index) => (
                        <div
                            key={index}
                            className={`literaBLevel2-letter ${used ? 'used' : ''}`}
                            draggable={!used}
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
                    {/* BROASCĂ */}
                    <div
                        className="literaBLevel2-word-container"
                        onDrop={(e) => handleDrop(e, "BROASCA")}
                        onDragOver={allowDrop}
                    >
                        <span className="literaBLevel2-word">
                            {completedWords.BROASCĂ ? "BROASCA" : "_ROASCA"}
                        </span>
                        <img src={broascăImg} alt="Broască" className="literaBLevel2-word-image" />
                    </div>

                    {/* CUB */}
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

                    {/* ZEBRĂ */}
                    <div
                        className="literaBLevel2-word-container"
                        onDrop={(e) => handleDrop(e, "ZEBRA")}
                        onDragOver={allowDrop}
                    >
                        <span className="literaBLevel2-word">
                            {completedWords.ZEBRĂ ? "ZEBRA" : "ZE_RA"}
                        </span>
                        <img src={zebrăImg} alt="Zebră" className="literaBLevel2-word-image" />
                    </div>
                </div>
            </IonContent>

            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton
                    onClick={() => history.push('/literaT')}
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
