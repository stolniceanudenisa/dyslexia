import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonButton, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import { increaseScore, useGameSettings } from './Home';
import { RouteComponentProps } from 'react-router';

import B from '../assets/sounds/B.mp3';
import E from '../assets/sounds/E!.mp3';
import I from '../assets/sounds/I!.mp3';
import Repeta from '../assets/sounds/alege-buline-litera-B.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import CustomToolbar from '../components/CustomToolbar';

type ButtonText = "B" | "P" | "R" | "★";

const LiteraBLevel1: React.FC<RouteComponentProps> = ({ history }) => {
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
                    initialList.push("B");
                } else if (i < totalButtons * (percentageOfO + percentageOfE) / 100) {
                    initialList.push("P");
                } else if (i < totalButtons * (percentageOfO + percentageOfE + percentageOfI) / 100) {
                    initialList.push("R");
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
            if (buttonType === "B") {
                setCounter(prevCounter => {
                    const newCounter = prevCounter + 1;
                    if (newCounter === totalButtons * percentageOfO / 100) {
                        if (audioPlayer) {
                            // audioPlayer.src = Bravo;
                            audioPlayer.playbackRate = 0.85;
                            audioPlayer.play();
                        }
                        useGameSettings('B');
                        setIsNextLevelDisabled(false); // Enable next level
                    }
                    return newCounter;
                });
                increaseScore();
                if (audioPlayer) {
                    audioPlayer.src = B;
                    audioPlayer.playbackRate = 1.0;
                    audioPlayer.play();
                }
            } else if (buttonType === "P") {
                if (audioPlayer) {
                    audioPlayer.src = E;
                    audioPlayer.playbackRate = 1.0;
                    audioPlayer.play();
                }
            } else if (buttonType === "R") {
                if (audioPlayer) {
                    audioPlayer.src = I;
                    audioPlayer.playbackRate = 1.0;
                    audioPlayer.play();
                }
            } else if (buttonType === "★") {
                if (audioPlayer) {
                    // Handle trap sound
                    audioPlayer.playbackRate = 1.0;
                    audioPlayer.play();
                }
            }
        }
    };

    const isCorrect = (buttonText: string) => {
        if (buttonText === "B") return "success";
        if (buttonText === "P") return "tertiary";
        if (buttonText === "R") return "tertiary";
        return "danger"; // Trap
    };

    const playHoverSound = () => {
        const audio = new Audio(B);
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
                <CustomToolbar title="Litera B Level 1" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
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


          <IonFab vertical="bottom" horizontal="start" slot="fixed" className="custom-home-fab">
        <IonFabButton className="custom-home-button" onClick={() => history.push('/map2')}>
          <span className="custom-home-emoji" title="Go to Map">🏠</span>
        </IonFabButton>
      </IonFab>





                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => history.push('/LiteraBLevel2')} disabled={isNextLevelDisabled}>
                        <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title="Litera B Level 2" aria-label="Next level" onMouseEnter={playHoverSoundAvanseaza} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};


export default LiteraBLevel1;
