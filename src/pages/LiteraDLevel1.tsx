import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonButton, IonIcon, IonFab, IonFabButton } from '@ionic/react';
import './Litere.css';
import './Home.css';
import { increaseScore } from './Home'
import CustomToolbar from '../components/CustomToolbar';
import Bravo from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import { RouteComponentProps } from 'react-router';
import { useGameSettings } from './Home';
import D from '../assets/sounds/D!.mp3';
import Repeta from '../assets/sounds/alege-buline-litera-D.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import { arrowForwardOutline } from 'ionicons/icons';

type ButtonText = "D" | "*" | "★" | "C";

const LiteraDLevel1: React.FC<RouteComponentProps> = ({ history }) => {
    const [counter, setCounter] = useState(0);
    const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);

    const totalButtons = 20; // Larger matrix (4x5)
    const percentageOfD = 60; // 30% E
    const percentageOfC = 10; // 10% A
    const traps = totalButtons - (totalButtons * (percentageOfD + percentageOfC) / 100); // Remaining are traps


    const [buttonTextList, setButtonTextList] = useState<ButtonText[]>([]);
    const [clickedButtons, setClickedButtons] = useState<number[]>([]);

   
    useEffect(() => {
        const generateButtonTextList = () => {
            let initialList: ButtonText[] = [];
            // add 20% A and 80% *
            for (let i = 0; i < totalButtons; i++) {
                if (i < totalButtons * percentageOfD / 100) {
                    initialList.push("D");
                } else if (i < totalButtons * (percentageOfD + percentageOfC) / 100) {
                    initialList.push("C");
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
        // Check if this button has already been clicked
        if (!clickedButtons.includes(buttonIndex)) {
            // Update clicked buttons
            setClickedButtons(prevState => [...prevState, buttonIndex]);

            // Check if the clicked button is "C" and update the counter
            if (buttonTextList[buttonIndex] === "D") {
                setCounter(prevCounter => {
                    const newCounter = prevCounter + 1;
                    // Check if the new counter matches the required count for A's
                    if (newCounter === totalButtons * percentageOfC / 100) {
                        if (audioPlayer) {
                            audioPlayer.src = Bravo;
                            audioPlayer.playbackRate = 0.85;
                            audioPlayer.play();
                        }
                        useGameSettings('D');
                        setIsNextLevelDisabled(false);  // Enable next level
                    }
                    return newCounter;
                });
                increaseScore();
            }
        }
    };

 
 
    const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

     

    const isCorrect = (buttonText: String) => {
        if (buttonText === "D") {
            return "success";
        }
        return "danger";
    }


    const playHoverSound = () => {
        const audio = new Audio(D);
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
                <CustomToolbar title="Litera D" titleStyle='title' onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
            </IonHeader>
            <IonContent class='letter-page'>
                <div className="container">
                    <div className="button-matrix">
                        {[...Array(3)].map((_, rowIndex) => (
                            <div key={rowIndex} className="button-row">
                                {[...Array(5)].map((_, colIndex) => {
                                    const buttonIndex = rowIndex * 5 + colIndex;  // Correct index calculation for 3x5 grid
                                    const isClicked = clickedButtons.includes(buttonIndex);
                                    return (
                                        <IonButton
                                            key={colIndex}
                                            color={isClicked ? isCorrect(buttonTextList[buttonIndex]) : 'primary'}
                                            shape='round'
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
                    <IonFabButton onClick={() => history.push('/LiteraDLevel2')} disabled={isNextLevelDisabled}>
                        <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title='Litera D Level 1' aria-label='Next level' onMouseEnter={playHoverSoundAvanseaza} />
                    </IonFabButton>
                </IonFab>

           

            </IonContent>
        </IonPage>
    );
};


export default LiteraDLevel1;