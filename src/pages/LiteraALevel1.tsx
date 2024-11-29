import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonButton, IonIcon, IonFab, IonFabButton } from '@ionic/react';
import './Litere.css';
import './Home.css';
import apa from '../assets/images/apa.svg';
import arici from '../assets/images/arici.svg';
import avion from '../assets/images/avion.svg';
import albina from '../assets/images/albina.svg';
//import apaAudio from '../assets/Apa.mp3';
import { increaseScore } from './Home'
import Bravo from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import ApaAudio from '../assets/sounds/Apa2.mp3';
import AriciAudio from '../assets/sounds/Arici.mp3';
import AvionAudio from '../assets/sounds/Avion.mp3';
import AlbinaAudio from '../assets/sounds/Albina.mp3';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForward } from 'ionicons/icons';
import { useGameSettings } from './Home';
import A from '../assets/sounds/A!.mp3';
import Repeta from '../assets/sounds/alege-buline-litera-A.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import { arrowForwardOutline } from 'ionicons/icons';

type ButtonText = "A" | "*" | "★";

const LiteraALevel1: React.FC<RouteComponentProps> = ({ history }) => {
    const [counter, setCounter] = useState(0);
    const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);
    const totalButtons = 15;
    const percentageOfA = 20;

    const [buttonTextList, setButtonTextList] = useState<ButtonText[]>([]);
    const [clickedButtons, setClickedButtons] = useState<number[]>([]);

    useEffect(() => {
        const generateButtonTextList = () => {
            let initialList: ButtonText[] = [];
            // Add 20% A and 80% other symbols
            for (let i = 0; i < totalButtons; i++) {
                if (i < totalButtons * percentageOfA / 100) {
                    initialList.push("A");
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
        // Avoid clicking the same button twice
        if (!clickedButtons.includes(buttonIndex)) {
            setClickedButtons(prevState => [...prevState, buttonIndex]);

            // If clicked button is "A", increase counter
            if (buttonTextList[buttonIndex] === "A") {
                setCounter(prevCounter => {
                    const newCounter = prevCounter + 1;
                    // Check if all "A"s are found
                    if (newCounter === totalButtons * percentageOfA / 100) {
                        playBravoSound(); // Play "Bravo" sound
                        useGameSettings('A'); // Record the progress
                        setIsNextLevelDisabled(false); // Enable the next level
                    }
                    return newCounter;
                });
            }
        }
    };

    const playBravoSound = () => {
        const audio = new Audio(Bravo);
        audio.play();
    };

    const isCorrect = (buttonText: string) => buttonText === "A" ? "success" : "danger";

    const playHoverSound = () => {
        const audio = new Audio(A);
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
                <CustomToolbar title="Litera A" titleStyle='title' onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
            </IonHeader>
            <IonContent className="letter-page">
                <div className="container">
                    <div className="button-matrix">
                        {[...Array(3)].map((_, rowIndex) => (
                            <div key={rowIndex} className="button-row">
                                {[...Array(5)].map((_, colIndex) => {
                                    const buttonIndex = rowIndex * 5 + colIndex; // Correct index for 3x5 grid
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
                    <IonFabButton onClick={() => history.push('/LiteraALevel2')} disabled={isNextLevelDisabled}>
                        <IonIcon
                            icon={arrowForwardOutline}
                            className="black-icon big-arrow"
                            title="Litera A Level 1"
                            aria-label="Next level"
                            onMouseEnter={playHoverSoundAvanseaza}
                        />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default LiteraALevel1;