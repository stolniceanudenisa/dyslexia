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

import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';

const LiteraVLevel2: React.FC<RouteComponentProps> = ({ history }) => {
    const [completedWords, setCompletedWords] = useState({
        VESTA: false,
        VEVERITA: false,
        VIOARA: false,
        VULCAN: false,
        VACA: false,
    });

    const [lettersUsed, setLettersUsed] = useState([false, false, false, false, false, false]); // "V" letters
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
        const letter = event.dataTransfer.getData('letter');
        if (letter === 'V') {
            setCompletedWords((prev) => ({
                ...prev,
                [word]: true,
            }));
        }
    };

    const allowDrop = (event: React.DragEvent) => {
        event.preventDefault(); // Allow the drop
    };

    const checkCompletion = () => {
        const allCompleted = Object.values(completedWords).every((wordCompleted) => wordCompleted);
        setIsNextLevelDisabled(!allCompleted); // Enable the next level button if all words are completed
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
                    title="Litera V Nivel 2 - Serpisor"
                    titleStyle="title"
                    onPlayClick={playClickAudio}
                    onBackClick={() => history.goBack()}
                />
            </IonHeader>
            <IonContent className="literaVLevel2-container">
                <div className="literaVLevel2-content">
                    {/* Left Side - Serpent */}
                    <div className="literaVLevel2-serpent">
                        {[...Array(5)].map((_, index) => (
                            <div
                                key={index}
                                className={`literaVLevel2-letter ${lettersUsed[index] ? 'used' : ''}`}
                                draggable={!lettersUsed[index]} // Make it draggable only if unused
                                onDragStart={(e) => {
                                    e.dataTransfer.setData('letter', 'V');
                                    handleLetterUse(index);
                                }}
                            >
                                V
                            </div>
                        ))}
                    </div>

                    {/* Right Side - Words with blanks */}
                    <div className="literaVLevel2-words">
                        {/* VESTA */}
                        <div className="literaVLevel2-word-container" onDrop={(e) => handleDrop(e, 'VESTA')} onDragOver={allowDrop}>
                            <span className="literaVLevel2-word">{completedWords.VESTA ? 'VESTA' : '_ESTA'}</span>
                            <img src={vestaImg} alt="Vesta" className="literaVLevel2-word-image" />
                        </div>

                        {/* VEVERITA */}
                        <div className="literaVLevel2-word-container" onDrop={(e) => handleDrop(e, 'VEVERITA')} onDragOver={allowDrop}>
                            <span className="literaVLevel2-word">{completedWords.VEVERITA ? 'VEVERITA' : '_EVERITA'}</span>
                            <img src={veveritaImg} alt="Veverita" className="literaVLevel2-word-image" />
                        </div>

                        {/* VIOARA */}
                        <div className="literaVLevel2-word-container" onDrop={(e) => handleDrop(e, 'VIOARA')} onDragOver={allowDrop}>
                            <span className="literaVLevel2-word">{completedWords.VIOARA ? 'VIOARA' : '_IOARA'}</span>
                            <img src={vioaraImg} alt="Vioara" className="literaVLevel2-word-image" />
                        </div>

                        {/* VULCAN */}
                        <div className="literaVLevel2-word-container" onDrop={(e) => handleDrop(e, 'VULCAN')} onDragOver={allowDrop}>
                            <span className="literaVLevel2-word">{completedWords.VULCAN ? 'VULCAN' : '_ULCAN'}</span>
                            <img src={vulcanImg} alt="Vulcan" className="literaVLevel2-word-image" />
                        </div>

                        {/* VACA */}
                        <div className="literaVLevel2-word-container" onDrop={(e) => handleDrop(e, 'VACA')} onDragOver={allowDrop}>
                            <span className="literaVLevel2-word">{completedWords.VACA ? 'VACA' : '_ACA'}</span>
                            <img src={vacaImg} alt="Vaca" className="literaVLevel2-word-image" />
                        </div>
                    </div>
                </div>
            </IonContent>

            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton onClick={() => history.push('/literaZ')} disabled={isNextLevelDisabled}>
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
