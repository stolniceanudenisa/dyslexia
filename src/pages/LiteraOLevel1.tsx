import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonButton, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import { increaseScore, useGameSettings } from './Home';
import { RouteComponentProps } from 'react-router';
import Bravo from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import O from '../assets/sounds/O!.mp3';
import E from '../assets/sounds/E!.mp3';
import I from '../assets/sounds/I!.mp3';
import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import CustomToolbar from '../components/CustomToolbar';

type ButtonText = "O" | "E" | "I" | "★";

const LiteraOLevel1: React.FC<RouteComponentProps> = ({ history }) => {
    const [counter, setCounter] = useState(0);
    const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);

    const totalButtons = 20; // 4x5 matrix
    const percentageOfO = 30; // 30% O
    const percentageOfE = 10; // 10% E
    const percentageOfI = 10; // 10% I
    const traps = totalButtons - (totalButtons * (percentageOfO + percentageOfE + percentageOfI) / 100); // Remaining are traps

    const [buttonTextList, setButtonTextList] = useState<ButtonText[]>([]);
    const [clickedButtons, setClickedButtons] = useState<number[]>([]);
    const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        const generateButtonTextList = () => {
            let initialList: ButtonText[] = [];
            // Add percentages of O, E, I, and traps
            for (let i = 0; i < totalButtons; i++) {
                if (i < totalButtons * percentageOfO / 100) {
                    initialList.push("O");
                } else if (i < totalButtons * (percentageOfO + percentageOfE) / 100) {
                    initialList.push("E");
                } else if (i < totalButtons * (percentageOfO + percentageOfE + percentageOfI) / 100) {
                    initialList.push("I");
                } else {
                    initialList.push("★");
                }
            }
            // Shuffle the list
            initialList.sort(() => Math.random() - 0.5);
            return initialList;
        };
        setButtonTextList(generateButtonTextList());
    }, []);

    const handleButtonClick = (buttonIndex: number) => {
        if (!clickedButtons.includes(buttonIndex)) {
            setClickedButtons(prev => [...prev, buttonIndex]);
    
            const buttonType = buttonTextList[buttonIndex];
            if (buttonType === "O") {
                setCounter(prevCounter => {
                    const newCounter = prevCounter + 1;
                    if (newCounter === totalButtons * percentageOfO / 100) {
                        // Redare sunet "Bravo" la completarea literei "O"
                        const bravoAudio = new Audio(Bravo);
                        bravoAudio.play();
    
                        // Activare săgeată pentru nivelul următor
                        setIsNextLevelDisabled(false);
                    }
                    return newCounter;
                });
                // Creștere scor
                increaseScore();
    
                // // Redare sunet pentru litera "O"
                // const oAudio = new Audio(O);
                // oAudio.play();
            } else if (buttonType === "E") {
                // const eAudio = new Audio(E);
                // eAudio.play();
            } else if (buttonType === "I") {
                // const iAudio = new Audio(I);
                // iAudio.play();
            }
        }
    };

    const isCorrect = (buttonText: string) => {
        if (buttonText === "O") return "success";
        if (buttonText === "E") return "tertiary";
        if (buttonText === "I") return "tertiary";
        return "danger"; // Trap
    };

    const playHoverSound = () => {
        const audio = new Audio(Avanseaza);
        audio.play();
    };

    const playClickAudio = () => {
        const audio = new Audio(Repeta);
        audio.play();
    };

    const playHoverSoundAvanseaza = () => {
        const audio = new Audio(Avanseaza);
        audio.play();
    };

    return (
        <IonPage>
            <IonHeader>
                <CustomToolbar title="Litera O Level 1" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
            </IonHeader>
            <IonContent className="letter-page">
                <div className="container">
                    <div className="button-matrix">
                        {[...Array(4)].map((_, rowIndex) => (
                            <div key={rowIndex} className="button-row">
                                {[...Array(5)].map((_, colIndex) => {
                                    const buttonIndex = rowIndex * 5 + colIndex; // Index for 4x5 grid
                                    const isClicked = clickedButtons.includes(buttonIndex);
                                    return (
                                        <IonButton
                                            key={colIndex}
                                            color={isClicked ? isCorrect(buttonTextList[buttonIndex]) : 'primary'}
                                            shape="round"
                                            onClick={() => handleButtonClick(buttonIndex)}
                                            className="custom-button"
                                        >
                                            {buttonTextList[buttonIndex]}
                                        </IonButton>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => history.push('/LiteraOLevel2')} disabled={isNextLevelDisabled}>
                        <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title="Litera O Level 2" aria-label="Next level" onMouseEnter={playHoverSoundAvanseaza} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};


export default LiteraOLevel1;
