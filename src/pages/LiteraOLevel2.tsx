import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './LiteraOLevel2.css';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';

import oaieImg from '../assets/images/oaie.png'; 
import ouImg from '../assets/images/ou.png';     
import oglindaImg from '../assets/images/oglinda.png';    

import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import { increaseScore, getScore } from './Home';
import Bravo from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import LitOL2 from "../assets/sounds/trage-litera-O.mp3";

import OaieAudio from '../assets/sounds/Oaie.mp3';
import OuAudio from '../assets/sounds/ou.mp3';
import OglindaAudio from '../assets/sounds/Oglinda.mp3';


const LiteraOLevel2: React.FC<RouteComponentProps> = ({ history }) => {

  const [score, setScore] = useState(getScore());

  const [completedWords, setCompletedWords] = useState({
    OAIE: false,
    OU: false,
    OGLINDA: false,
  });

  const [lettersUsed, setLettersUsed] = useState([false, false, false, false]);
  const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);
 const [draggingLetter, setDraggingLetter] = useState<number | null>(null);



  useEffect(() => {
    const audioTimeout = setTimeout(() => {
      const audioPlayer = new Audio(LitOL2);
      audioPlayer.play();
      return () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      };
    }, 1000);

    return () => clearTimeout(audioTimeout);
  }, []);


  const playClickAudio = () => {
    const audio = new Audio(Repeta);
    audio.play();
  };

  const playHoverSoundAvanseaza = () => {
    const audio = new Audio(Avanseaza);
    audio.play();
  };

// Function to play the word sound after successful placement
const playWordSound = (word: string) => {
  let audio = null;
  switch (word) {
    case "OAIE":
      audio = new Audio(OaieAudio);
      break;
    case "OU":
      audio = new Audio(OuAudio);
      break;
    case "OGLINDA":
      audio = new Audio(OglindaAudio);
      break;
    default:
      return;
  }
  audio.play();
};


 
  // Handler pentru drop-ul unei litere in cuvânt
  const handleDrop = (event: React.DragEvent, word: string) => {
    const letter = event.dataTransfer.getData("letter");

    if (letter === "O") {
      // Verificăm fiecare cuvânt
      if (word === "OAIE" && !completedWords.OAIE) {
        setCompletedWords((prev) => ({ ...prev, OAIE: true }));
        playWordSound("OAIE");
        increaseScore();  // Increase score when a word is completed
      } else if (word === "OU" && !completedWords.OU) {
        setCompletedWords((prev) => ({ ...prev, OU: true }));
        playWordSound("OU");
        increaseScore();  // Increase score when a word is completed
      } else if (word === "OGLINDA" && !completedWords.OGLINDA) {
        setCompletedWords((prev) => ({ ...prev, OGLINDA: true }));
        playWordSound("OGLINDA");
        increaseScore();  // Increase score when a word is completed
      }
      setLettersUsed((prev) => prev.map((used, idx) => idx === draggingLetter ? true : used));
    }
    setDraggingLetter(null);  // Reset dragging state after drop
  };

  // Permite drop-ul unei litere
  const allowDrop = (event: React.DragEvent) => {
    event.preventDefault(); // Permite plasarea
  };

  const handleDragEnd = () => {
    if (draggingLetter !== null) {
      const newLettersUsed = [...lettersUsed];
      newLettersUsed[draggingLetter] = false;  // Mark the letter as unused again
      setLettersUsed(newLettersUsed);
    }
    setDraggingLetter(null);  // Reset dragging state
  };


  // Verifică dacă toate cuvintele sunt completate
  const checkCompletion = () => {
    const allCompleted =
      Object.values(completedWords).every((wordCompleted) => wordCompleted);
    setIsNextLevelDisabled(!allCompleted); // Activează butonul doar dacă toate cuvintele sunt completate
  };

 

  // Folosim `useEffect` pentru a verifica starea la fiecare schimbare
  useEffect(() => {
    checkCompletion();

    // Play Bravo sound when all words are completed
    const allCompleted = Object.values(completedWords).every((wordCompleted) => wordCompleted);
    if (allCompleted) {
      const bravoAudio = new Audio(Bravo);
      setTimeout(() => {
        const bravoAudio = new Audio(Bravo);
        bravoAudio.play();
      }, 1000);
    }
  }, [completedWords]);







  // Handler pentru schimbarea stării când un "O" este folosit
  const handleLetterUse = (index: number) => {
    const newLettersUsed = [...lettersUsed];
    newLettersUsed[index] = true;
    setLettersUsed(newLettersUsed);
    setDraggingLetter(index);  // Set the current letter being dragged
  };

  return (
    <IonPage>
      <IonHeader>
        <CustomToolbar title="Litera O Nivel 2" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()}  />
      </IonHeader>
      <IonContent className="literaOLevel2-container">
        {/* Linia cu literele */}
        <div className="literaOLevel2-letters-line">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className={`literaOLevel2-letter ${lettersUsed[index] ? 'used' : ''}`}
              draggable={!lettersUsed[index]} // Nu mai permite drag dacă litera a fost folosită
              onDragStart={(e) => {
                e.dataTransfer.setData("letter", "O");
                handleLetterUse(index);
              }}
            >
              O
            </div>
          ))}
        </div>

        {/* Linia cu cuvintele */}
        <div className="literaOLevel2-words-line">
          {/* Cuvântul "OAIE" */}
          <div
            className="literaOLevel2-word-container"
            onDrop={(e) => handleDrop(e, "OAIE")}
            onDragOver={allowDrop}
          >
            <span className="literaOLevel2-word">{completedWords.OAIE ? "OAIE" : "_AIE"}</span>
            <img src={oaieImg} alt="Oaie" className="literaOLevel2-word-image" />
          </div>

          {/* Cuvântul "OU" */}
          <div
            className="literaOLevel2-word-container"
            onDrop={(e) => handleDrop(e, "OU")}
            onDragOver={allowDrop}
          >
            <span className="literaOLevel2-word">{completedWords.OU ? "OU" : "_U"}</span>
            <img src={ouImg} alt="Ou" className="literaOLevel2-word-image" />
          </div>

          {/* Cuvântul "OGLINDA" */}
          <div
            className="literaOLevel2-word-container"
            onDrop={(e) => handleDrop(e, "OGLINDA")}
            onDragOver={allowDrop}
          >
            <span className="literaOLevel2-word">{completedWords.OGLINDA ? "OGLINDA" : "_GLINDA"}</span>
            <img src={oglindaImg} alt="Oglinda" className="literaOLevel2-word-image" />
          </div>
        </div>
      </IonContent>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => history.push('/literaU')} disabled={isNextLevelDisabled}>
          <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title='Next level' aria-label='Next level' onMouseEnter={playHoverSoundAvanseaza}  />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default LiteraOLevel2;
