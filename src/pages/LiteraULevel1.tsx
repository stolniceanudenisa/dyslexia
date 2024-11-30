import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonButton, IonFab, IonFabButton, IonIcon, IonToolbar } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import { increaseScore, useGameSettings } from './Home';
import { RouteComponentProps } from 'react-router';
// import Bravo from '../assets/sounds/FelicitariFinalJoc.mp3';
import U from '../assets/sounds/U!.mp3';
import Repeta from '../assets/sounds/alege-buline-litera-U.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import CustomToolbar from '../components/CustomToolbar';
import Bravo from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
type ButtonText = "U" | "★" | "I" | "O";

const LiteraULevel1: React.FC<RouteComponentProps> = ({ history }) => {
    const [counter, setCounter] = useState(0);
    const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);

    const totalButtons = 20; // 4x5 matrix
    const percentageOfU = 30; // 30% U
    const percentageOfI = 10; // 10% I
    const percentageOfO = 10; // 10% O
    const traps = totalButtons - (totalButtons * (percentageOfU + percentageOfI + percentageOfO) / 100); // Remaining are traps

    const [buttonTextList, setButtonTextList] = useState<ButtonText[]>([]);
    const [clickedButtons, setClickedButtons] = useState<number[]>([]);
    const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        const generateButtonTextList = () => {
            let initialList: ButtonText[] = [];
            // Add percentages of U, I, O, and traps
            for (let i = 0; i < totalButtons; i++) {
                if (i < totalButtons * percentageOfU / 100) {
                    initialList.push("U");
                } else if (i < totalButtons * (percentageOfU + percentageOfI) / 100) {
                    initialList.push("I");
                } else if (i < totalButtons * (percentageOfU + percentageOfI + percentageOfO) / 100) {
                    initialList.push("O");
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
            if (buttonType === "U") {
                setCounter(prevCounter => {
                    const newCounter = prevCounter + 1;
                    if (newCounter === totalButtons * percentageOfU / 100) {
                        // Redare sunet "Bravo" la completarea literei "U"
                        const bravoAudio = new Audio(Bravo);
                        bravoAudio.play();
    
                        // Activare săgeată pentru nivelul următor
                        setIsNextLevelDisabled(false);
                    }
                    return newCounter;
                });
                // Creștere scor
                increaseScore();
            }
        }
    };
    

    const isCorrect = (buttonText: string) => {
        if (buttonText === "U") return "success";
        return "danger"; // Trap
    };

    const playHoverSound = () => {
        const audio = new Audio(U);
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
                <CustomToolbar title="Litera U Level 1" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
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
            <IonFabButton onClick={() => history.push('/LiteraULevel2')}>
              <IonIcon
                icon={arrowForwardOutline}
                className="black-icon big-arrow"
                title="Litera U Level 2"
                aria-label="Next level"
                onMouseEnter={playHoverSoundAvanseaza}
              />
            </IonFabButton>
          </IonFab>
            </IonContent>
        </IonPage>
    );
};


export default LiteraULevel1;
