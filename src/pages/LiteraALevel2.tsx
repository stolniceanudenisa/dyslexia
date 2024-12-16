import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './LiteraALevel2.css';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
import sacImg from '../assets/images/sac.png'; 
import acImg from '../assets/images/ac.png';     
import arcImg from '../assets/images/arc.png';   
import Repeta from '../assets/sounds/trage-litera-A.mp3';
import LitAL2 from "../assets/sounds/trage-litera-A.mp3";
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import { increaseScore, getScore } from './Home';
import Bravo from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import SacAudio from '../assets/sounds/sac!.mp3';
import AcAudio from '../assets/sounds/ac.mp3';   
import ArcAudio from '../assets/sounds/arc.mp3';  


const LiteraALevel2: React.FC<RouteComponentProps> = ({ history }) => {
  const [score, setScore] = useState(getScore());
  const [completedWords, setCompletedWords] = useState({
    SAC: false,
    AC: false,
    ARC: false,
  });

  const [lettersUsed, setLettersUsed] = useState([false, false, false]);
  const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);
  const [draggingLetter, setDraggingLetter] = useState<number | null>(null);



  useEffect(() => {
    const audioTimeout = setTimeout(() => {
      const audioPlayer = new Audio(LitAL2);
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
    case "SAC":
      audio = new Audio(SacAudio);
      break;
    case "AC":
      audio = new Audio(AcAudio);
      break;
    case "ARC":
      audio = new Audio(ArcAudio);
      break;
    default:
      return;
  }
  audio.play();
};


  // Funcție pentru gestionarea plasării literei
  const handleDrop = (event: React.DragEvent, word: string) => {
    const letter = event.dataTransfer.getData("letter");

    if (letter === "A") {
      if (word === "SAC" && !completedWords.SAC) {
        setCompletedWords((prev) => ({ ...prev, SAC: true }));
        playWordSound("SAC");
        increaseScore();
      } else if (word === "AC" && !completedWords.AC) {
        setCompletedWords((prev) => ({ ...prev, AC: true }));
        playWordSound("AC");
        increaseScore();
      } else if (word === "ARC" && !completedWords.ARC) {
        setCompletedWords((prev) => ({ ...prev, ARC: true }));
        playWordSound("ARC");
        increaseScore();
      }
      setLettersUsed((prev) => prev.map((used, idx) => idx === draggingLetter ? true : used));
    }
    setDraggingLetter(null);  // Reset dragging state after drop
  };

  // Permite drop-ul literei
  const allowDrop = (event: React.DragEvent) => {
    event.preventDefault();
  };

  // Reset the letter to the original position if dropped incorrectly
  const handleDragEnd = () => {
    if (draggingLetter !== null) {
      const newLettersUsed = [...lettersUsed];
      newLettersUsed[draggingLetter] = false;  // Mark the letter as unused again
      setLettersUsed(newLettersUsed);
    }
    setDraggingLetter(null);  // Reset dragging state
  };

  // // Verificare completare cuvinte și redare sunet "Bravo"
  // useEffect(() => {
  //   const allCompleted = Object.values(completedWords).every((wordCompleted) => wordCompleted);

  //   if (allCompleted) {
  //     setIsNextLevelDisabled(false);
  //   localStorage.setItem('level2Completed', 'true');
  //   console.log('Level 2 completed!');  // Confirm this is being called

  //     setTimeout(() => {
  //       const bravoAudio = new Audio(Bravo);
  //       bravoAudio.play();
  //     }, 1000);
  //   }
  // }, [completedWords]);


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







  // Gestionarea folosirii literelor "A"
  const handleLetterUse = (index: number) => {
    const newLettersUsed = [...lettersUsed];
    newLettersUsed[index] = true;
    setLettersUsed(newLettersUsed);
    setDraggingLetter(index);  // Set the current letter being dragged
  };

  return (
    <IonPage>
      <IonHeader>
        <CustomToolbar
          title="Litera A Nivel 2"
          titleStyle="title"
          onPlayClick={playClickAudio}
          onBackClick={() => history.goBack()}
        />
      </IonHeader>
      <IonContent className="literaALevel2-container">
        {/* Linia cu literele */}
        <div className="literaALevel2-letters-line">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className={`literaALevel2-letter ${lettersUsed[index] ? 'used' : ''}`}
              draggable={!lettersUsed[index]} // Nu mai permite drag dacă litera a fost folosită
              onDragStart={(e) => {
                e.dataTransfer.setData("letter", "A");
                handleLetterUse(index);
              }}
              onDragEnd={handleDragEnd}  // Handle drag end to reset if needed
            >
              A
            </div>
          ))}
        </div>

        {/* Linia cu cuvintele */}
        <div className="literaALevel2-words-line">
          {/* Cuvântul "SAC" */}
          <div
            className="literaALevel2-word-container"
            onDrop={(e) => handleDrop(e, "SAC")}
            onDragOver={allowDrop}
          >
            <span className="literaALevel2-word">{completedWords.SAC ? "SAC" : "S_C"}</span>
            <img src={sacImg} alt="Sac" className="literaALevel2-word-image" />
          </div>

          {/* Cuvântul "AC" */}
          <div
            className="literaALevel2-word-container"
            onDrop={(e) => handleDrop(e, "AC")}
            onDragOver={allowDrop}
          >
            <span className="literaALevel2-word">{completedWords.AC ? "AC" : "_C"}</span>
            <img src={acImg} alt="Ac" className="literaALevel2-word-image" />
          </div>

          {/* Cuvântul "ARC" */}
          <div
            className="literaALevel2-word-container"
            onDrop={(e) => handleDrop(e, "ARC")}
            onDragOver={allowDrop}
          >
            <span className="literaALevel2-word">{completedWords.ARC ? "ARC" : "_RC"}</span>
            <img src={arcImg} alt="Arc" className="literaALevel2-word-image" />
          </div>
        </div>
      </IonContent>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => history.push('/literaE')} disabled={isNextLevelDisabled}>
          <IonIcon
            icon={arrowForwardOutline}
            className="black-icon big-arrow"
            title="Litera A Level 2"
            aria-label="Next level"
            onMouseEnter={playHoverSoundAvanseaza}
          />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default LiteraALevel2;
