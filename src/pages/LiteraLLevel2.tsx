import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './LiteraLLevel2.css';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';

import leuImg from '../assets/images/leu.png';
import lacatImg from '../assets/images/lacat.png';
import lumanareImg from '../assets/images/lumanare.png';

import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import { increaseScore, getScore } from './Home';

const LiteraLLevel2: React.FC<RouteComponentProps> = ({ history }) => {

    const [score, setScore] = useState(getScore());

    const [completedWords, setCompletedWords] = useState({
        LEU: false,
        LACAT: false,
        LUMANARE: false,
    });

    // Starea pentru literele "L" din linia de sus
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

        if (letter === "L") {
            // Verificăm fiecare cuvânt
            if (word === "LEU" && !completedWords.LEU) {
                setCompletedWords((prev) => ({ ...prev, LEU: true }));
            } else if (word === "LACAT" && !completedWords.LACAT) {
                setCompletedWords((prev) => ({ ...prev, LACAT: true }));
            } else if (word === "LUMANARE" && !completedWords.LUMANARE) {
                setCompletedWords((prev) => ({ ...prev, LUMANARE: true }));
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

    // Handler pentru schimbarea stării când un "L" este folosit
    const handleLetterUse = (index: number) => {
        const newLettersUsed = [...lettersUsed];
        newLettersUsed[index] = true;
        setLettersUsed(newLettersUsed);
    };

    return (
        <IonPage>
            <IonHeader>
                <CustomToolbar title="Litera L Nivel 2" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()}  />
            </IonHeader>
            <IonContent className="literaLLevel2-container">
                {/* Linia cu literele */}
                <div className="literaLLevel2-letters-line">
                    {[...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className={`literaLLevel2-letter ${lettersUsed[index] ? 'used' : ''}`}
                            draggable={!lettersUsed[index]} // Nu mai permite drag dacă litera a fost folosită
                            onDragStart={(e) => {
                                e.dataTransfer.setData("letter", "L");
                                handleLetterUse(index);
                            }}
                        >
                            L
                        </div>
                    ))}
                </div>

                {/* Linia cu cuvintele */}
                <div className="literaLLevel2-words-line">
                    {/* Cuvântul "LEU" */}
                    <div
                        className="literaLLevel2-word-container"
                        onDrop={(e) => handleDrop(e, "LEU")}
                        onDragOver={allowDrop}
                    >
                        <span className="literaLLevel2-word">{completedWords.LEU ? "LEU" : "_EU"}</span>
                        <img src={leuImg} alt="Leu" className="literaLLevel2-word-image" />
                    </div>

                    {/* Cuvântul "LACAT" */}
                    <div
                        className="literaLLevel2-word-container"
                        onDrop={(e) => handleDrop(e, "LACAT")}
                        onDragOver={allowDrop}
                    >
                        <span className="literaLLevel2-word">{completedWords.LACAT ? "LACAT" : "_ACAT"}</span>
                        <img src={lacatImg} alt="Lacat" className="literaLLevel2-word-image" />
                    </div>

                    {/* Cuvântul "LUMANARE" */}
                    <div
                        className="literaLLevel2-word-container"
                        onDrop={(e) => handleDrop(e, "LUMANARE")}
                        onDragOver={allowDrop}
                    >
                        <span className="literaLLevel2-word">{completedWords.LUMANARE ? "LUMANARE" : "_UMANARE"}</span>
                        <img src={lumanareImg} alt="Lumanare" className="literaLLevel2-word-image" />
                    </div>


                </div>
            </IonContent>

            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton onClick={() => history.push('/literaV')} disabled={isNextLevelDisabled}>
                    <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title='Next level' aria-label='Next level' onMouseEnter={playHoverSoundAvanseaza}  />
                </IonFabButton>
            </IonFab>
        </IonPage>
    );
};

export default LiteraLLevel2;
