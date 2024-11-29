import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonFab, IonFabButton } from '@ionic/react';
import './Litere.css';
import { arrowForward, arrowForwardOutline } from 'ionicons/icons';
import inel from '../assets/images/inel.svg';
import insula from '../assets/images/insula.svg';
import iepure from '../assets/images/iepure.svg';
import inima from '../assets/images/inima.svg';
import { increaseScore, useGameSettings } from './Home'
import InelAudio from '../assets/sounds/Inel.mp3';
import InsulaAudio from '../assets/sounds/Insula.mp3';
import IepureAudio from '../assets/sounds/Iepure.mp3';
import InimaAudio from '../assets/sounds/Inima.mp3';
import Bravo from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import { RouteComponentProps } from 'react-router';
import CustomToolbar from '../components/CustomToolbar';
import I from '../assets/sounds/I!.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import Repeta from '../assets/sounds/RepetaDupaMine.mp3';

type ButtonText = "A" | "E" | "I" | "★"; // Updated to include "E"

const LiteraILevel1: React.FC<{ history: any }> = ({ history }) => {
    const [counter, setCounter] = useState(0);
    const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);

    const totalButtons = 20;
    const percentageOfI = 30;
    const percentageOfA = 10;
    const percentageOfE = 10;

    const [buttonTextList, setButtonTextList] = useState<ButtonText[]>([]);
    const [clickedButtons, setClickedButtons] = useState<number[]>([]);

    useEffect(() => {
        const generateButtonTextList = () => {
            let initialList: ButtonText[] = [];
            for (let i = 0; i < totalButtons; i++) {
                if (i < totalButtons * percentageOfI / 100) {
                    initialList.push("I");
                } else if (i < totalButtons * (percentageOfI + percentageOfA) / 100) {
                    initialList.push("A");
                } else if (i < totalButtons * (percentageOfI + percentageOfA + percentageOfE) / 100) {
                    initialList.push("E");
                } else {
                    initialList.push("★");
                }
            }
            initialList.sort(() => Math.random() - 0.5);
            return initialList;
        };
        setButtonTextList(generateButtonTextList());
    }, []);

    const handleButtonClick = (buttonIndex: number) => {
        if (!clickedButtons.includes(buttonIndex)) {
            setClickedButtons(prev => [...prev, buttonIndex]);

            const buttonType = buttonTextList[buttonIndex];
            if (buttonType === "I") {
                setCounter(prevCounter => {
                    const newCounter = prevCounter + 1;
                    if (newCounter === totalButtons * percentageOfI / 100) {
                        const bravoAudio = new Audio(Bravo);
                        bravoAudio.play();
                        setIsNextLevelDisabled(false); // Enable next level button
                    }
                    return newCounter;
                });
                increaseScore();
            }
        }
    };

    const isCorrect = (buttonText: string) => {
        if (buttonText === "I") return "success";
        if (buttonText === "A" || buttonText === "E") return "tertiary";
        return "danger";
    };

    const playHoverSoundAvanseaza = () => {
        const audio = new Audio(Avanseaza);
        audio.play();
    };

    const playClickAudio = () => {
        const audio = new Audio(Repeta);
        audio.play();
    };

    return (
        <IonPage>
            <IonHeader>
                <CustomToolbar
                    title="Litera I Level 1"
                    onPlayClick={playClickAudio}
                    onBackClick={() => history.goBack()}
                />
            </IonHeader>
            <IonContent className="letter-page">
                <div className="container">
                    <div className="button-matrix">
                        {[...Array(4)].map((_, rowIndex) => (
                            <div key={rowIndex} className="button-row">
                                {[...Array(5)].map((_, colIndex) => {
                                    const buttonIndex = rowIndex * 5 + colIndex;
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
                    <IonFabButton
                        onClick={() => history.push('/LiteraILevel2')}
                        disabled={isNextLevelDisabled}
                    >
                        <IonIcon
                            icon={arrowForwardOutline}
                            className="black-icon big-arrow"
                            title="Litera I Level 2"
                            onMouseEnter={isNextLevelDisabled ? undefined : playHoverSoundAvanseaza}
                        />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default LiteraILevel1;