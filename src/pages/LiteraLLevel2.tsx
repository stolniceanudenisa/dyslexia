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
import BravoAudio from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import LeuSound from '../assets/sounds/leu.mp3';
import LacatSound from '../assets/sounds/lacat.mp3';
import LumanareSound from '../assets/sounds/lumanare.mp3';



const LiteraLLevel2: React.FC<RouteComponentProps> = ({ history }) => {
    const [completedWords, setCompletedWords] = useState({
        LEU: false,
        LACAT: false,
        LUMANARE: false,
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
            case 'LEU':
                sound = LeuSound;
                break;
            case 'LACAT':
                sound = LacatSound;
                break;
            case 'LUMANARE':
                sound = LumanareSound;
                break;
            default:
                return;
        }
        const audio = new Audio(sound);
        audio.play();
    };

    const handleDrop = (event: React.DragEvent, word: keyof typeof completedWords) => {
        const letter = event.dataTransfer.getData("letter");

        if (letter === "L" && !completedWords[word]) {
            setCompletedWords((prev) => ({
                ...prev,
                [word]: true,
            }));
            playWordSound(word);
            increaseScore(); // Creștere scor la plasarea corectă a literei
        }
    };

    const allowDrop = (event: React.DragEvent) => {
        event.preventDefault(); // Permite plasarea
    };

    const checkCompletion = () => {
        const allCompleted = Object.values(completedWords).every((wordCompleted) => wordCompleted);
        if (allCompleted) {
            setTimeout(() => {
                const bravoAudio = new Audio(BravoAudio);
                bravoAudio.play();
            }, 1000); // Sunet "Bravo" cu delay de 1 secundă
        }
        setIsNextLevelDisabled(!allCompleted); // Activează butonul doar dacă toate cuvintele sunt completate
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
                <CustomToolbar title="Litera L Nivel 2" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
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
                    <div
                        className="literaLLevel2-word-container"
                        onDrop={(e) => handleDrop(e, "LEU")}
                        onDragOver={allowDrop}
                    >
                        <span className="literaLLevel2-word">{completedWords.LEU ? "LEU" : "_EU"}</span>
                        <img src={leuImg} alt="Leu" className="literaLLevel2-word-image" />
                    </div>

                    <div
                        className="literaLLevel2-word-container"
                        onDrop={(e) => handleDrop(e, "LACAT")}
                        onDragOver={allowDrop}
                    >
                        <span className="literaLLevel2-word">{completedWords.LACAT ? "LACAT" : "_ACAT"}</span>
                        <img src={lacatImg} alt="Lacat" className="literaLLevel2-word-image" />
                    </div>

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
                <IonFabButton onClick={() => history.push('/literaLLevel3')} disabled={isNextLevelDisabled}>
                    <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title='Next level' aria-label='Next level' onMouseEnter={playHoverSoundAvanseaza} />
                </IonFabButton>
            </IonFab>
        </IonPage>
    );
};

export default LiteraLLevel2;
