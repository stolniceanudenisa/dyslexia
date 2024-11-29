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
import M from '../assets/sounds/M.mp3';
import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import { arrowForwardOutline } from 'ionicons/icons';

type ButtonText = "M" | "*" | "★";

const LiteraMLevel1: React.FC<RouteComponentProps> = ({ history }) => {
    const [counter, setCounter] = useState(0);
    const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);

    const totalButtons = 15;
    const percentageOfA = 20;

    const [buttonTextList, setButtonTextList] = useState<ButtonText[]>([]);
    const [clickedButtons, setClickedButtons] = useState<number[]>([]);


    useEffect(() => {
        const generateButtonTextList = () => {
            let initialList: ButtonText[] = [];
            // add 20% A and 80% *
            for (let i = 0; i < totalButtons; i++) {
                if (i < totalButtons * percentageOfA / 100) {
                    initialList.push("M");
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

            // Check if the clicked button is "A" and update the counter
            if (buttonTextList[buttonIndex] === "M") {
                setCounter(prevCounter => {
                    const newCounter = prevCounter + 1;
                    // Check if the new counter matches the required count for A's
                    if (newCounter === totalButtons * percentageOfA / 100) {
                        if (audioPlayer) {
                            audioPlayer.src = Bravo;
                            audioPlayer.playbackRate = 0.85;
                            audioPlayer.play();
                        }
                        useGameSettings('A');
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
        if (buttonText === "M") {
            return "success";
        }
        return "danger";
    }


    const playHoverSound = () => {
        const audio = new Audio(M);
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
                <CustomToolbar title="Litera M" titleStyle='title' onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
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

                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => history.push('/LiteraMLevel2')} disabled={isNextLevelDisabled}>
                        <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title='Litera M Level 1' aria-label='Next level' onMouseEnter={playHoverSoundAvanseaza} />
                    </IonFabButton>
                </IonFab>



            </IonContent>
        </IonPage>
    );
};


export default LiteraMLevel1;