import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonFab, IonFabButton } from '@ionic/react';
import './Litere.css';
import { arrowForwardOutline } from 'ionicons/icons';
import { increaseScore, useGameSettings } from './Home';
import { RouteComponentProps } from 'react-router';
import CustomToolbar from '../components/CustomToolbar';
import SAudio from '../assets/sounds/Inel.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import Repeta from '../assets/sounds/alege-buline-litera-S.mp3';

type ButtonText = "S" | "P" | "R" | "T" | "★";

const LiteraSLevel1: React.FC<RouteComponentProps> = ({ history }) => {
    const [counter, setCounter] = useState(0);
    const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);

    const totalButtons = 20; // 4x5 matrix
    const percentageOfS = 30; // 30% S
    const percentageOfP = 20; // 20% P
    const percentageOfR = 20; // 20% R
    const percentageOfT = 20; // 20% T
    const traps = totalButtons - (totalButtons * (percentageOfS + percentageOfP + percentageOfR + percentageOfT) / 100); // Remaining are traps

    const [buttonTextList, setButtonTextList] = useState<ButtonText[]>([]);
    const [clickedButtons, setClickedButtons] = useState<number[]>([]);

    const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        const generateButtonTextList = () => {
            let initialList: ButtonText[] = [];
            // Add percentages of S, P, R, T, and traps
            for (let i = 0; i < totalButtons; i++) {
                if (i < totalButtons * percentageOfS / 100) {
                    initialList.push("S");
                } else if (i < totalButtons * (percentageOfS + percentageOfP) / 100) {
                    initialList.push("P");
                } else if (i < totalButtons * (percentageOfS + percentageOfP + percentageOfR) / 100) {
                    initialList.push("R");
                } else if (i < totalButtons * (percentageOfS + percentageOfP + percentageOfR + percentageOfT) / 100) {
                    initialList.push("T");
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
            setClickedButtons(prevState => [...prevState, buttonIndex]);

            const buttonType = buttonTextList[buttonIndex];
            if (buttonType === "S") {
                setCounter(prevCounter => {
                    const newCounter = prevCounter + 1;
                    if (newCounter === totalButtons * percentageOfS / 100) {
                        if (audioPlayer) {
                            audioPlayer.playbackRate = 0.85;
                            audioPlayer.play();
                        }
                        useGameSettings('S');
                        setIsNextLevelDisabled(false); // Enable next level
                    }
                    return newCounter;
                });
                increaseScore();
            } else if (buttonType === "P" || buttonType === "R" || buttonType === "T") {
                if (audioPlayer) {
                    audioPlayer.playbackRate = 1.0;
                    audioPlayer.play();
                }
            } else if (buttonType === "★") {
                if (audioPlayer) {
                    audioPlayer.playbackRate = 1.0;
                    audioPlayer.play();
                }
            }
        }
    };

    const isCorrect = (buttonText: ButtonText) => {
        if (buttonText === "S") return "success"; // Correct
        if (buttonText === "P" || buttonText === "R" || buttonText === "T") return "tertiary"; // Incorrect but non-traps
        return "danger"; // Trap
    };

    const playHoverSound = () => {
        const audio = new Audio(SAudio);
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
                <CustomToolbar title="Litera S Level 1" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
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

                          <IonFab vertical="bottom" horizontal="start" slot="fixed" className="custom-home-fab">
                        <IonFabButton className="custom-home-button" onClick={() => history.push('/map3')}>
                          <span className="custom-home-emoji" title="Go to Map">🏠</span>
                        </IonFabButton>
                      </IonFab>
                

                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => history.push('/LiteraSLevel2')} disabled={isNextLevelDisabled}>
                        <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title="Litera S Level 2" aria-label="Next level" onMouseEnter={playHoverSoundAvanseaza} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default LiteraSLevel1;
