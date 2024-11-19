import React, { FC, useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonButton, IonFab, IonFabButton, IonIcon } from '@ionic/react';

import './LiteraULevel2.css';

import { increaseScore } from './Home';
import Bravo from '../assets/sounds/BravoFinalJoc.mp3';
import UAudio from '../assets/sounds/U!.mp3';
import CustomToolbar from '../components/CustomToolbar';
import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import { arrowForwardOutline } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';

const LiteraULevel2: React.FC<RouteComponentProps> = ({ history }) => {
    const words = ["URS", "URECHE", "UMBRELA", "UNICORN"];
    const [clickedLetters, setClickedLetters] = useState<string[]>([]); 
    const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);
    const [audioPlayer] = useState<HTMLAudioElement>(new Audio(UAudio));
  
    // Handles the letter click
    const handleLetterClick = (letter: string) => {
      if (letter === 'U') {
        setClickedLetters(prevState => [...prevState, letter]);
        increaseScore();
      } else {
        setClickedLetters(prevState => [...prevState, letter]);
      }
    };
  
    const handleNextLevel = () => {
      if (audioPlayer) {
        audioPlayer.play();
      }
      setIsNextLevelDisabled(false); // Enable next level
    };
  
    return (
      <IonPage>
        <IonHeader>
          <CustomToolbar title="Litera U Level 2" titleStyle="title" onBackClick={() => history.goBack()} />
        </IonHeader>
        <IonContent className="letter-page">
          <div className="words-container">
            {words.map((word, index) => (
              <div key={index} className="word-row">
                <div className="word">
                  {word.split('').map((letter, idx) => (
                    <IonButton
                      key={idx}
                      className={`letter-button ${clickedLetters.includes(letter) ? (letter === 'U' ? 'correct' : 'incorrect') : ''}`}
                      onClick={() => handleLetterClick(letter)}
                    >
                      {letter}
                    </IonButton>
                  ))}
                </div>
                <img src={`/assets/images/${word.toLowerCase()}.jpg`} alt={word} className="word-image" />
              </div>
            ))}
          </div>
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={handleNextLevel} disabled={isNextLevelDisabled}>
              <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title="Next Level" aria-label="Next Level" />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    );
  };
  
  export default LiteraULevel2;