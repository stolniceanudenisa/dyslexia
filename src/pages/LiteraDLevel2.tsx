import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './LiteraCLevel2.css';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
import DinteImage from '../assets/images/dinte.png'; 
import PodImage from '../assets/images/pod.png';     
import CadouImage from '../assets/images/cadou.png';   
import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import { increaseScore, getScore } from './Home';

const LiteraDLevel2: React.FC<RouteComponentProps> = ({ history }) => {

    
const [score, setScore] = useState(getScore());

  const [completedWords, setCompletedWords] = useState({
    DINTE: false,
    POD: false,
    CADOU: false,
  });

  // Starea pentru literele "D" din linia de sus
  const [lettersUsed, setLettersUsed] = useState([false, false, false]);

  const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);

  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

 

const playClickAudio = () => {
    const audio = new Audio(Repeta);
    audio.play();
};

const playHoverSoundAvanseaza = () => {
    const audio = new Audio(Avanseaza);
    audio.play();
};


  // Handler pentru drop-ul unei litere in cuvânt
  const handleDrop = (event: React.DragEvent, word: string) => {
    const letter = event.dataTransfer.getData("letter");

    if (letter === "D") {
      // Verificăm fiecare cuvânt
      if (word === "DINTE" && !completedWords.DINTE) {
        setCompletedWords((prev) => ({ ...prev, DINTE: true }));
      } else if (word === "POD" && !completedWords.POD) {
        setCompletedWords((prev) => ({ ...prev, POD: true }));
      } else if (word === "CADOU" && !completedWords.CADOU) {
        setCompletedWords((prev) => ({ ...prev, CADOU: true }));
      }
    }
  };

  // Permite drop-ul unei litere
  const allowDrop = (event: React.DragEvent) => {
    event.preventDefault(); // Permite plasarea
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
  }, [completedWords]);

  // Handler pentru schimbarea stării când un "D" este folosit
  const handleLetterUse = (index: number) => {
    const newLettersUsed = [...lettersUsed];
    newLettersUsed[index] = true;
    setLettersUsed(newLettersUsed);
  };

  return (
    <IonPage>
      <IonHeader>
        <CustomToolbar title="Litera D Nivel 2" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()}  />
      </IonHeader>
      <IonContent className="literaDLevel2-container">
        {/* Linia cu literele */}
        <div className="literaDLevel2-letters-line">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className={`literaDLevel2-letter ${lettersUsed[index] ? 'used' : ''}`}
              draggable={!lettersUsed[index]} // Nu mai permite drag dacă litera a fost folosită
              onDragStart={(e) => {
                e.dataTransfer.setData("letter", "D");
                handleLetterUse(index);
              }}
            >
              D
            </div>
          ))}
        </div>

        {/* Linia cu cuvintele */}
        <div className="literaDLevel2-words-line">
          {/* Cuvântul "PISICA" */}
          <div
            className="literaDLevel2-word-container"
            onDrop={(e) => handleDrop(e, "DINTE")}
            onDragOver={allowDrop}
          >
            <span className="literaDLevel2-word">{completedWords.DINTE ? "DINTE" : "_INTE"}</span>
            <img src={DinteImage} alt="Pisica" className="literaDLevel2-word-image" />
          </div>

          {/* Cuvântul "RAC" */}
          <div
            className="literaDLevel2-word-container"
            onDrop={(e) => handleDrop(e, "POD")}
            onDragOver={allowDrop}
          >
            <span className="literaDLevel2-word">{completedWords.POD ? "POD" : "PO_"}</span>
            <img src={PodImage} alt="Rac" className="literaDLevel2-word-image" />
          </div>

          {/* Cuvântul "CASA" */}
          <div
            className="literaDLevel2-word-container"
            onDrop={(e) => handleDrop(e, "CADOU")}
            onDragOver={allowDrop}
          >
            <span className="literaDLevel2-word">{completedWords.CADOU ? "CADOU" : "CA_OU"}</span>
            <img src={CadouImage} alt="Casa" className="literaDLevel2-word-image" />
          </div>
        </div>
      </IonContent>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => history.push('/LiteraDLevel3')} disabled={isNextLevelDisabled}>
          <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title='Litera D Level 2' aria-label='Next level' onMouseEnter={playHoverSoundAvanseaza}  />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default LiteraDLevel2;
