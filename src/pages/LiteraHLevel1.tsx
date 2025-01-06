import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonButton, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import { increaseScore, useGameSettings } from './Home';
import { RouteComponentProps } from 'react-router';

import H from '../assets/sounds/H!.mp3';
import F from '../assets/sounds/F!.mp3';
import G from '../assets/sounds/G!.mp3';
import Repeta from '../assets/sounds/alege-buline-litera-H.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import CustomToolbar from '../components/CustomToolbar';

type ButtonText = "H" | "F" | "G" | "★";

const LiteraHLevel1: React.FC<RouteComponentProps> = ({ history }) => {
    const [counter, setCounter] = useState(0);
    const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);

    const totalButtons = 20; // 4x5 matrix
    const percentageOfH = 30; // 30% H
    const percentageOfF = 10; // 10% F
    const percentageOfG = 10; // 10% G
    const traps = totalButtons - (totalButtons * (percentageOfH + percentageOfF + percentageOfG) / 100); // Remaining are traps

    const [buttonTextList, setButtonTextList] = useState<ButtonText[]>([]);
    const [clickedButtons, setClickedButtons] = useState<number[]>([]);

    useEffect(() => {
        const generateButtonTextList = () => {
            let initialList: ButtonText[] = [];
            // Add percentages of H, F, G, and traps
            for (let i = 0; i < totalButtons; i++) {
                if (i < totalButtons * percentageOfH / 100) {
                    initialList.push("H");
                } else if (i < totalButtons * (percentageOfH + percentageOfF) / 100) {
                    initialList.push("F");
                } else if (i < totalButtons * (percentageOfH + percentageOfF + percentageOfG) / 100) {
                    initialList.push("G");
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
        // Check if this button has already been clicked
        if (!clickedButtons.includes(buttonIndex)) {
            setClickedButtons(prevState => [...prevState, buttonIndex]);

            const buttonType = buttonTextList[buttonIndex];
            if (buttonType === "H") {
                setCounter(prevCounter => {
                    const newCounter = prevCounter + 1;
                    if (newCounter === totalButtons * percentageOfH / 100) {
                        useGameSettings('H');
                        setIsNextLevelDisabled(false); // Enable next level
                    }
                    return newCounter;
                });
                increaseScore();
                // const audio = new Audio(H);
                // audio.playbackRate = 1.0;
                // audio.play();
            } else if (buttonType === "F") {
                // const audio = new Audio(F);
                // audio.playbackRate = 1.0;
                // audio.play();
            } else if (buttonType === "G") {
                // const audio = new Audio(G);
                // audio.playbackRate = 1.0;
                // audio.play();
            } else if (buttonType === "★") {
                // Handle trap sound
                // const audio = new Audio(G); // You can set a trap sound here
                // audio.playbackRate = 1.0;
                // audio.play();
            }
        }
    };

    const isCorrect = (buttonText: string) => {
        if (buttonText === "H") return "success";
        if (buttonText === "F") return "tertiary";
        if (buttonText === "G") return "tertiary";
        return "danger"; // Trap
    };

    const playHoverSound = () => {
        const audio = new Audio(H);
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
                <CustomToolbar title="Litera H Level 1" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
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
                    <IonFabButton onClick={() => history.push('/LiteraHLevel2')} disabled={isNextLevelDisabled}>
                        <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title="Litera H Level 2" aria-label="Next level" onMouseEnter={playHoverSoundAvanseaza} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default LiteraHLevel1;
