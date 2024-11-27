import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './LiteraALevel2.css';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
import magarImg from '../assets/images/magar.png';
import numarImg from '../assets/images/numar.png';
import melcImg from '../assets/images/melc.png';
import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import { increaseScore, getScore } from './Home';
const LiteraMLevel2: React.FC<RouteComponentProps> = ({ history }) => {


    const [score, setScore] = useState(getScore());

    const [completedWords, setCompletedWords] = useState({
        MAGAR: false,
        NUMAR: false,
        MELC: false,
    });

    // Starea pentru literele "A" din linia de sus
    const [lettersUsed, setLettersUsed] = useState([false, false, false]);

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

        if (letter === "M") {
            // Verificăm fiecare cuvânt
            if (word === "MAGAR" && !completedWords.MAGAR) {
                setCompletedWords((prev) => ({ ...prev, MELODIE: true }));
            } else if (word === "NUMAR" && !completedWords.NUMAR) {
                setCompletedWords((prev) => ({ ...prev, NUMAR: true }));
            } else if (word === "MELC" && !completedWords.MELC) {
                setCompletedWords((prev) => ({ ...prev, MELC: true }));
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

    // Handler pentru schimbarea stării când un "A" este folosit
    const handleLetterUse = (index: number) => {
        const newLettersUsed = [...lettersUsed];
        newLettersUsed[index] = true;
        setLettersUsed(newLettersUsed);
    };

    return (
        <IonPage>
            <IonHeader>
                <CustomToolbar title="Litera M Nivel 2" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()}  />
            </IonHeader>
            <IonContent className="literaALevel2-container">
                {/* Linia cu literele */}
                <div className="literaALevel2-letters-line">
                    {[...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className={`literaALevel2-letter ${lettersUsed[index] ? 'used' : ''}`}
                            draggable={!lettersUsed[index]} // Nu mai permite drag dacă litera a fost folosită
                            onDragStart={(e) => {
                                e.dataTransfer.setData("letter", "M");
                                handleLetterUse(index);
                            }}
                        >
                            M
                        </div>
                    ))}
                </div>

                {/* Linia cu cuvintele */}
                <div className="literaALevel2-words-line">
                    {/* Cuvântul "SAC" */}
                    <div
                        className="literaALevel2-word-container"
                        onDrop={(e) => handleDrop(e, "MAGAR")}
                        onDragOver={allowDrop}
                    >
                        <span className="literaALevel2-word">{completedWords.MAGAR ? "MAGAR" : "_AGAR"}</span>
                        <img src={magarImg} alt="Magar" className="literaALevel2-word-image" />
                    </div>

                    {/* Cuvântul "AC" */}
                    <div
                        className="literaALevel2-word-container"
                        onDrop={(e) => handleDrop(e, "MELC")}
                        onDragOver={allowDrop}
                    >
                        <span className="literaALevel2-word">{completedWords.MELC ? "MELC" : "_ELC"}</span>
                        <img src={melcImg} alt="Melc" className="literaALevel2-word-image" />
                    </div>

                    {/* Cuvântul "ARC" */}
                    <div
                        className="literaALevel2-word-container"
                        onDrop={(e) => handleDrop(e, "NUMAR")}
                        onDragOver={allowDrop}
                    >
                        <span className="literaALevel2-word">{completedWords.NUMAR ? "NUMAR" : "NU_AR"}</span>
                        <img src={numarImg} alt="Numar" className="literaALevel2-word-image" />
                    </div>
                </div>
            </IonContent>

            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton onClick={() => history.push('/LiteraN')} disabled={isNextLevelDisabled}>
                    <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title='Litera M Level 2' aria-label='Next level' onMouseEnter={playHoverSoundAvanseaza}  />
                </IonFabButton>
            </IonFab>
        </IonPage>
    );
};

export default LiteraMLevel2;
