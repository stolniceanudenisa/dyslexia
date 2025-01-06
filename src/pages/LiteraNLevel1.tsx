import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonButton, IonIcon, IonFab, IonFabButton } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import './Litere.css';
import './Home.css';
import { increaseScore } from './Home';
import Bravo from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import EAudio from '../assets/sounds/E!.mp3';
import AAudio from '../assets/sounds/A!.mp3';

import Repeta from '../assets/sounds/alege-buline-litera-N.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { useGameSettings } from './Home';



type ButtonText = "N" | "M" | "★";

const LiteraNLevel1: React.FC<RouteComponentProps> = ({ history }) => {
    const [counter, setCounter] = useState(0);
    const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);

    const totalButtons = 20; // Larger matrix (4x5)
    const percentageOfE = 30; // 30% E
    const percentageOfA = 10; // 10% A
    const traps = totalButtons - (totalButtons * (percentageOfE + percentageOfA) / 100); // Remaining are traps

    const [buttonTextList, setButtonTextList] = useState<ButtonText[]>([]);
    const [clickedButtons, setClickedButtons] = useState<number[]>([]);

    const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        const generateButtonTextList = () => {
            let initialList: ButtonText[] = [];
            // Add percentages of E, A, and traps
            for (let i = 0; i < totalButtons; i++) {
                if (i < totalButtons * percentageOfE / 100) {
                    initialList.push("N");
                } else if (i < totalButtons * (percentageOfE + percentageOfA) / 100) {
                    initialList.push("M");
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

            // Determine the behavior based on the button type
            const buttonType = buttonTextList[buttonIndex];
            if (buttonType === "N") {
                setCounter(prevCounter => {
                    const newCounter = prevCounter + 1;
                    if (newCounter === totalButtons * percentageOfE / 100) {
                        if (audioPlayer) {
                            audioPlayer.src = Bravo;
                            audioPlayer.playbackRate = 0.85;
                            audioPlayer.play();
                        }
                        useGameSettings('N');
                        setIsNextLevelDisabled(false); // Enable next level
                    }
                    return newCounter;
                });
                increaseScore();
            } else if (buttonType === "M") {
                if (audioPlayer) {
                    audioPlayer.src = AAudio;
                    audioPlayer.playbackRate = 1.0;
                    audioPlayer.play();
                }
            } else if (buttonType === "★") {
                if (audioPlayer) {
                    // audioPlayer.src = TrapAudio;
                    audioPlayer.playbackRate = 1.0;
                    audioPlayer.play();
                }
            }
        }
    };

    const isCorrect = (buttonText: String) => {
        if (buttonText === "N") return "success";
        if (buttonText === "M") return "tertiary";
        return "danger"; // Trap
    };

    const playHoverSound = () => {
        const audio = new Audio(EAudio);
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
                <CustomToolbar title="Litera N Level 2" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
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
                    <IonFabButton onClick={() => history.push('/LiteraNLevel2')} disabled={isNextLevelDisabled}>
                        <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title="Litera N Level 2" aria-label="Next level" onMouseEnter={playHoverSoundAvanseaza} />
                    </IonFabButton>
                </IonFab>


            </IonContent>
        </IonPage>
    );
};

export default LiteraNLevel1;