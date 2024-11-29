import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonButton, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import { increaseScore, useGameSettings } from './Home';
import { RouteComponentProps } from 'react-router';

// Fișiere audio pentru fiecare literă și capcană
import ZAudio from '../assets/sounds/Z.mp3';
import VAudio from '../assets/sounds/Z.mp3';
import SAudio from '../assets/sounds/Z.mp3';
import LAudio from '../assets/sounds/Z.mp3';

import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';

import CustomToolbar from '../components/CustomToolbar';

type ButtonText = "Z" | "V" | "S" | "L" | "★";

const LiteraZLevel1: React.FC<RouteComponentProps> = ({ history }) => {
    const [counter, setCounter] = useState(0);
    const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);

    const totalButtons = 20; // 4x5 matrix
    const percentageOfZ = 30;  // 30% Z
    const percentageOfV = 15;  // 15% V
    const percentageOfS = 15;  // 15% S
    const percentageOfL = 20;  // 20% L
    const percentageOfTraps = 20; // 20% ★ (capcană)

    const [buttonTextList, setButtonTextList] = useState<ButtonText[]>([]);
    const [clickedButtons, setClickedButtons] = useState<number[]>([]);

    useEffect(() => {
        const generateButtonTextList = () => {
            let initialList: ButtonText[] = [];
            // Adăugăm literele în funcție de procentele stabilite
            for (let i = 0; i < totalButtons * percentageOfZ / 100; i++) initialList.push("Z");
            for (let i = 0; i < totalButtons * percentageOfV / 100; i++) initialList.push("V");
            for (let i = 0; i < totalButtons * percentageOfS / 100; i++) initialList.push("S");
            for (let i = 0; i < totalButtons * percentageOfL / 100; i++) initialList.push("L");
            for (let i = 0; i < totalButtons * percentageOfTraps / 100; i++) initialList.push("★");

            // Amestecăm lista
            initialList.sort(() => Math.random() - 0.5);
            return initialList;
        };
        setButtonTextList(generateButtonTextList());
    }, []);

    const handleButtonClick = (buttonIndex: number) => {
        if (!clickedButtons.includes(buttonIndex)) {
            setClickedButtons(prevState => [...prevState, buttonIndex]);

            const buttonType = buttonTextList[buttonIndex];
            if (buttonType === "Z") {
                setCounter(prevCounter => {
                    const newCounter = prevCounter + 1;
                    if (newCounter === totalButtons * percentageOfZ / 100) {
                        useGameSettings('Z');
                        setIsNextLevelDisabled(false); // Activăm butonul pentru nivelul următor
                    }
                    return newCounter;
                });
                increaseScore();
                playAudio(ZAudio);
            } else if (buttonType === "V") {
                playAudio(VAudio);
            } else if (buttonType === "S") {
                playAudio(SAudio);
            } else if (buttonType === "L") {
                playAudio(LAudio);
            }
        }
    };

    const playAudio = (audioSrc: string) => {
        const audio = new Audio(audioSrc);
        audio.playbackRate = 1.0;
        audio.play();
    };

    const isCorrect = (buttonText: string) => {
        if (buttonText === "Z") return "success"; // Verde pentru Z
        if (buttonText === "V" || buttonText === "S" || buttonText === "L") return "tertiary"; // Culori neutre pentru V, S, L
        return "danger"; // Roșu pentru capcană
    };

    const playHoverSound = () => {
        const audio = new Audio(ZAudio);
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
                <CustomToolbar title="Litera Z Level 1" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
            </IonHeader>
            <IonContent className="letter-page">
                <div className="container">
                    <div className="button-matrix">
                        {[...Array(4)].map((_, rowIndex) => (
                            <div key={rowIndex} className="button-row">
                                {[...Array(5)].map((_, colIndex) => {
                                    const buttonIndex = rowIndex * 5 + colIndex; // Index pentru 4x5 grid
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
                    <IonFabButton onClick={() => history.push('/LiteraZLevel2')} disabled={isNextLevelDisabled}>
                        <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title="Litera Z Level 2" aria-label="Next level" onMouseEnter={playHoverSoundAvanseaza} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default LiteraZLevel1;
