import React, { FC, useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonButton, IonFab, IonFabButton, IonIcon } from '@ionic/react';

import './LiteraELevel2.css';

import { increaseScore } from './Home';
import Bravo from '../assets/sounds/BravoFinalJoc.mp3';
import EAudio from '../assets/sounds/E!.mp3';
import CustomToolbar from '../components/CustomToolbar';
import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import { arrowForwardOutline } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';

const LiteraELevel2: React.FC<RouteComponentProps> = ({ history }) => {
    const words = ["EROU", "ELEFANT", "EVANTAI"];
    const [clickedLetters, setClickedLetters] = useState<string[]>([]); // Store unique IDs for clicked letters
    const [audioPlayer] = useState<HTMLAudioElement>(new Audio());
    const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);


//  DE IMPLEMENTAT CRESTERE  BANUTI!!!!!!!!!



 


    useEffect(() => {
        // Get all the unique "E" letter positions across all words
        const allELetters = words
            .join('') // Combine all words into a single string
            .split('') // Split into individual characters
            .map((letter, index) => (letter === 'E' ? index : -1)) // Get indexes of all 'E' letters
            .filter(index => index !== -1); // Remove any non-'E' indexes

        // Check how many 'E' letters have been clicked
        const clickedELetters = clickedLetters.filter((id) => id.startsWith('E'));

        // Enable the "Next Level" button if all 'E' letters are clicked
        if (clickedELetters.length === allELetters.length) {
            setIsNextLevelDisabled(false);
            const audio = new Audio(Bravo); // Play Bravo sound when all 'E' letters are clicked
            audio.play();
        }
    }, [clickedLetters, words]);

    const handleLetterClick = (letter: string, uniqueId: string) => {
        // Prevent multiple clicks on the same button
        if (clickedLetters.includes(uniqueId)) return;

        setClickedLetters((prev) => [...prev, uniqueId]);

        if (letter === "E") {
            audioPlayer.src = EAudio;
            audioPlayer.play();
        } else {
            // Add error sound handling if necessary
            audioPlayer.play();
        }
    };

    const getLetterColor = (letter: string, uniqueId: string) => {
        // Determine color based on click status and correctness
        if (!clickedLetters.includes(uniqueId)) return "primary"; // Default button color
        return letter === "E" ? "success" : "danger";
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
                <CustomToolbar
                    title="Litera E Level 2"
                    titleStyle="title"
                    onPlayClick={playClickAudio}
                    onBackClick={() => history.goBack()} // Back button functionality
                />
            </IonHeader>
            <IonContent className="letter-page">
                <div className="centered-words-container">
                    {words.map((word, wordIndex) => (
                        <div key={wordIndex} className="word-row">
                            {word.split("").map((letter, letterIndex) => {
                                // Create a unique ID for each letter button
                                const uniqueId = `E-${wordIndex}-${letterIndex}`;
                                return (
                                    <IonButton
                                        key={uniqueId}
                                        color={getLetterColor(letter, uniqueId)}
                                        onClick={() => handleLetterClick(letter, uniqueId)}
                                        className="letter-button"
                                    >
                                        {letter}
                                    </IonButton>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => history.push('/LiteraI')} disabled={isNextLevelDisabled}>
                        <IonIcon
                            icon={arrowForwardOutline}
                            className="black-icon big-arrow"
                            title="Next Level"
                            aria-label="Next level"
                            onMouseEnter={playHoverSoundAvanseaza}
                        />
                    </IonFabButton>
                </IonFab>

            </IonContent>
        </IonPage>
    );
};

export default LiteraELevel2;
