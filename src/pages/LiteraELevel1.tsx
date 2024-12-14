import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonButton, IonIcon, IonFab, IonFabButton } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import './Litere.css';
import './Home.css';
import { increaseScore } from './Home';
import Bravo from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import EAudio from '../assets/sounds/E!.mp3';
import AAudio from '../assets/sounds/A!.mp3';
 
import Repeta from '../assets/sounds/alege-buline-litera-E.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { useGameSettings } from './Home';
 
import LitEL1 from "../assets/sounds/alege-buline-litera-E.mp3";



type ButtonText = "E" | "A" | "★";

const LiteraELevel1: React.FC<RouteComponentProps> = ({ history }) => {
    const [counter, setCounter] = useState(0);
    const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);
    const [clickedButtons, setClickedButtons] = useState<number[]>([]);
    const [buttonTextList, setButtonTextList] = useState<ButtonText[]>([]);

    const totalButtons = 20; // Matrice 4x5
    const percentageOfE = 30; // 30% butoane E
    const percentageOfA = 10; // 10% butoane A
    const traps = totalButtons - (totalButtons * (percentageOfE + percentageOfA) / 100); // Restul sunt capcane


    useEffect(() => {
        const audioTimeout = setTimeout(() => {
          const audioPlayer = new Audio(LitEL1);
          audioPlayer.play();
          return () => {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
          };
        }, 1000);
    
        return () => clearTimeout(audioTimeout);
      }, []);
    


    // Generare text pentru buline
    useEffect(() => {
        const generateButtonTextList = () => {
            let list: ButtonText[] = [];
            for (let i = 0; i < totalButtons; i++) {
                if (i < totalButtons * percentageOfE / 100) list.push("E");
                else if (i < totalButtons * (percentageOfE + percentageOfA) / 100) list.push("A");
                else list.push("★");
            }
            return list.sort(() => Math.random() - 0.5);
        };
        setButtonTextList(generateButtonTextList());
    }, []);

    // Gestionare click pe butoane
    const handleButtonClick = (buttonIndex: number) => {
        if (clickedButtons.includes(buttonIndex)) return;

        setClickedButtons((prev) => [...prev, buttonIndex]);
        const buttonType = buttonTextList[buttonIndex];

        if (buttonType === "E") {
            setCounter((prev) => {
                const newCounter = prev + 1;
                if (newCounter === totalButtons * percentageOfE / 100) {
                    new Audio(Bravo).play(); // Sunet Bravo
                    setIsNextLevelDisabled(false); // Activează nivelul următor
                }
                return newCounter;
            });
            increaseScore();
        } else if (buttonType === "A") {
            
        } else if (buttonType === "★") {
            // Sunet pentru capcană (dacă e disponibil)
        }
    };

    // Determinare stil buton
    const getButtonColor = (buttonText: ButtonText): string => {
        if (buttonText === "E") return "success";
        if (buttonText === "A") return "tertiary";
        return "danger";
    };

    const playHoverSound = () => {
        new Audio(EAudio).play();
    };

    const playClickAudio = () => {
        new Audio(Repeta).play();
    };

    const playHoverSoundAvanseaza = () => {
        new Audio(Avanseaza).play();
    };

    return (
        <IonPage>
            <IonHeader>
                <CustomToolbar
                    title="Litera E - Nivel 1"
                    titleStyle="title"
                    onPlayClick={playClickAudio}
                    onBackClick={() => history.goBack()}
                />
            </IonHeader>
            <IonContent className="letter-page">
                <div className="container">
                    {/* Matrice de butoane */}
                    <div className="button-matrix">
                        {[...Array(4)].map((_, rowIndex) => (
                            <div key={rowIndex} className="button-row">
                                {[...Array(5)].map((_, colIndex) => {
                                    const buttonIndex = rowIndex * 5 + colIndex;
                                    const isClicked = clickedButtons.includes(buttonIndex);
                                    return (
                                        <IonButton
                                            key={colIndex}
                                            color={isClicked ? getButtonColor(buttonTextList[buttonIndex]) : "primary"}
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
                {/* Buton Nivelul următor */}
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton
                        onClick={() => history.push('/LiteraELevel2')}
                        disabled={isNextLevelDisabled}
                    >
                        <IonIcon
                            icon={arrowForwardOutline}
                            onMouseEnter={playHoverSoundAvanseaza}
                            className="black-icon big-arrow"
                        />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};


export default LiteraELevel1;
