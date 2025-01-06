import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './LiteraVLevel2.css';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';

import vestaImg from '../assets/images/vesta.png';
import veveritaImg from '../assets/images/veverita.png';
import vioaraImg from '../assets/images/vioara.png';
import vulcanImg from '../assets/images/vulcan.png';
import vacaImg from '../assets/images/vaca.png';

import Repeta from '../assets/sounds/trage-litera-V.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import BravoAudio from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import VestaSound from '../assets/sounds/vesta.mp3';
import VeveritaSound from '../assets/sounds/veverita.mp3';
import VioaraSound from '../assets/sounds/vioara.mp3';
import VulcanSound from '../assets/sounds/vulcan.mp3';
import VacaSound from '../assets/sounds/vaca.mp3';
import { increaseScore, getScore } from './Home';



const LiteraVLevel2: React.FC<RouteComponentProps> = ({ history }) => {
    const [completedWords, setCompletedWords] = useState({
        VESTA: false,
        VEVERITA: false,
        VIOARA: false,
        VULCAN: false,
        VACA: false,
    });

    const [lettersUsed, setLettersUsed] = useState([false, false, false, false, false]);
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
            case 'VESTA':
                sound = VestaSound;
                break;
            case 'VEVERITA':
                sound = VeveritaSound;
                break;
            case 'VIOARA':
                sound = VioaraSound;
                break;
            case 'VULCAN':
                sound = VulcanSound;
                break;
            case 'VACA':
                sound = VacaSound;
                break;
            default:
                return;
        }
        const audio = new Audio(sound);
        audio.play();
    };

    const handleDrop = (event: React.DragEvent, word: keyof typeof completedWords) => {
        const letter = event.dataTransfer.getData('letter');
        if (letter === 'V' && !completedWords[word]) {
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
                    title="Litera V Nivel 2 - Șerpișor"
                    titleStyle="title"
                    onPlayClick={playClickAudio}
                    onBackClick={() => history.goBack()}
                />
            </IonHeader>
            <IonContent className="literaVLevel2-container">
                <div className="literaVLevel2-content">
                    {/* Linia cu literele */}
                    <div className="literaVLevel2-serpent">
                        {[...Array(5)].map((_, index) => (
                            <div
                                key={index}
                                className={`literaVLevel2-letter ${lettersUsed[index] ? 'used' : ''}`}
                                draggable={!lettersUsed[index]} // Permite drag doar dacă litera nu a fost folosită
                                onDragStart={(e) => {
                                    e.dataTransfer.setData('letter', 'V');
                                    handleLetterUse(index);
                                }}
                            >
                                V
                            </div>
                        ))}
                    </div>

                    {/* Linia cu cuvintele */}
                    <div className="literaVLevel2-words">
                        <div className="literaVLevel2-word-container" onDrop={(e) => handleDrop(e, 'VESTA')} onDragOver={allowDrop}>
                            <span className="literaVLevel2-word">{completedWords.VESTA ? 'VESTA' : '_ESTA'}</span>
                            <img src={vestaImg} alt="Vesta" className="literaVLevel2-word-image" />
                        </div>

                        <div className="literaVLevel2-word-container" onDrop={(e) => handleDrop(e, 'VEVERITA')} onDragOver={allowDrop}>
                            <span className="literaVLevel2-word">{completedWords.VEVERITA ? 'VEVERITA' : '_EVERITA'}</span>
                            <img src={veveritaImg} alt="Veverita" className="literaVLevel2-word-image" />
                        </div>

                        <div className="literaVLevel2-word-container" onDrop={(e) => handleDrop(e, 'VIOARA')} onDragOver={allowDrop}>
                            <span className="literaVLevel2-word">{completedWords.VIOARA ? 'VIOARA' : '_IOARA'}</span>
                            <img src={vioaraImg} alt="Vioara" className="literaVLevel2-word-image" />
                        </div>

                        <div className="literaVLevel2-word-container" onDrop={(e) => handleDrop(e, 'VULCAN')} onDragOver={allowDrop}>
                            <span className="literaVLevel2-word">{completedWords.VULCAN ? 'VULCAN' : '_ULCAN'}</span>
                            <img src={vulcanImg} alt="Vulcan" className="literaVLevel2-word-image" />
                        </div>

                        <div className="literaVLevel2-word-container" onDrop={(e) => handleDrop(e, 'VACA')} onDragOver={allowDrop}>
                            <span className="literaVLevel2-word">{completedWords.VACA ? 'VACA' : '_ACA'}</span>
                            <img src={vacaImg} alt="Vaca" className="literaVLevel2-word-image" />
                        </div>
                    </div>
                </div>
            </IonContent>

            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton onClick={() => history.push('/literaVLevel3')} disabled={isNextLevelDisabled}>
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

export default LiteraVLevel2;
