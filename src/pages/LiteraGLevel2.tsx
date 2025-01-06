import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './LiteraGLevel2.css';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';

import gaina from '../assets/images/gaina.png';
import girafa from '../assets/images/Girafa.png';
import geanta from '../assets/images/geanta.png';

import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import { increaseScore, getScore } from './Home';

const LiteraGLevel2: React.FC<RouteComponentProps> = ({ history }) => {

    const [score, setScore] = useState(getScore());

    const [completedWords, setCompletedWords] = useState({
        GAINA: false,
        GIRAFA: false,
        GEANTA: false,
    });

    // Starea pentru literele "O" din linia de sus
    const [lettersUsed, setLettersUsed] = useState([false, false, false, false]);

    const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);

    const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

    const playClickAudio = () => {
        const audio = new Audio(Repeta);
        audio.play();
    };

    const playHoverSoundAvanseaza = () => {
        const audio = new Audio(Avanseaza);
        audio.play();
    };

    // Handler pentru drop-ul unei litere in cuvânt
    const handleDrop = (event: React.DragEvent, word: string) => {
        const letter = event.dataTransfer.getData("letter");

        if (letter === "G") {
            // Verificăm fiecare cuvânt
            if (word === "GAINA" && !completedWords.GAINA) {
                setCompletedWords((prev) => ({ ...prev, GAINA: true }));
            } else if (word === "GIRAFA" && !completedWords.GIRAFA) {
                setCompletedWords((prev) => ({ ...prev, GIRAFA: true }));
            } else if (word === "GEANTA" && !completedWords.GEANTA) {
                setCompletedWords((prev) => ({ ...prev, GEANTA: true }));
            }
        }
    };

    // Permite drop-ul unei litere
    const allowDrop = (event: React.DragEvent) => {
        event.preventDefault(); // Permite plasarea
    };

    // Verifică dacă toate cuvintele sunt completate
    const checkCompletion = () => {
        const allCompleted =
            Object.values(completedWords).every((wordCompleted) => wordCompleted);
        setIsNextLevelDisabled(!allCompleted); // Activează butonul doar dacă toate cuvintele sunt completate
    };

    // Folosim `useEffect` pentru a verifica starea la fiecare schimbare
    useEffect(() => {
        checkCompletion();
    }, [completedWords]);

    // Handler pentru schimbarea stării când un "O" este folosit
    const handleLetterUse = (index: number) => {
        const newLettersUsed = [...lettersUsed];
        newLettersUsed[index] = true;
        setLettersUsed(newLettersUsed);
    };

    return (
        <IonPage>
            <IonHeader>
                <CustomToolbar title="Litera G Nivel 2" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()}  />
            </IonHeader>
            <IonContent className="literaGLevel2-container">
                {/* Linia cu literele */}
                <div className="literaGLevel2-letters-line">
                    {[...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className={`literaGLevel2-letter ${lettersUsed[index] ? 'used' : ''}`}
                            draggable={!lettersUsed[index]} // Nu mai permite drag dacă litera a fost folosită
                            onDragStart={(e) => {
                                e.dataTransfer.setData("letter", "G");
                                handleLetterUse(index);
                            }}
                        >
                            G
                        </div>
                    ))}
                </div>

                {/* Linia cu cuvintele */}
                <div className="literaGLevel2-words-line">
                    {/* Cuvântul "OAIE" */}
                    <div
                        className="literaGLevel2-word-container"
                        onDrop={(e) => handleDrop(e, "GAINA")}
                        onDragOver={allowDrop}
                    >
                        <span className="literaGLevel2-word">{completedWords.GAINA ? "GAINA" : "_AINA"}</span>
                        <img src={gaina} alt="Gaina" className="literaGLevel2-word-image" />
                    </div>

                    {/* Cuvântul "OU" */}
                    <div
                        className="literaGLevel2-word-container"
                        onDrop={(e) => handleDrop(e, "GIRAFA")}
                        onDragOver={allowDrop}
                    >
                        <span className="literaGLevel2-word">{completedWords.GIRAFA ? "GIRAFA" : "_IRAFA"}</span>
                        <img src={girafa} alt="Girafa" className="literaGLevel2-word-image" />
                    </div>

                    {/* Cuvântul "OGLINDA" */}
                    <div
                        className="literaGLevel2-word-container"
                        onDrop={(e) => handleDrop(e, "GEANTA")}
                        onDragOver={allowDrop}
                    >
                        <span className="literaGLevel3-word">{completedWords.GEANTA ? "GEANTA" : "_EANTA"}</span>
                        <img src={geanta} alt="Geanta" className="literaGLevel2-word-image" />
                    </div>


                </div>
            </IonContent>

            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton onClick={() => history.push('/literaGLevel3')} disabled={isNextLevelDisabled}>
                    <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title='Next level' aria-label='Next level' onMouseEnter={playHoverSoundAvanseaza}  />
                </IonFabButton>
            </IonFab>
        </IonPage>
    );
};

export default LiteraGLevel2;
