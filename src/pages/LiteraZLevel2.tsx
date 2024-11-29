import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './LiteraZLevel2.css';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';

// Import imagini pentru cuvinte
import muzeuImg from '../assets/images/muzeu.png';
import buzeImg from '../assets/images/buze.png';  // Noua imagine pentru "BUZE"
import varzaImg from '../assets/images/varza.png';

import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import { increaseScore, getScore } from './Home';

const LiteraZLevel2: React.FC<RouteComponentProps> = ({ history }) => {

  const [score, setScore] = useState(getScore());

  const [completedWords, setCompletedWords] = useState({
    MUZEU: false,
    BUZE: false,
    VARZA: false,
  });

  // Starea pentru literele "Z" din linia de sus
  const [lettersUsed, setLettersUsed] = useState([false, false, false]);

  const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);

  const playClickAudio = () => {
    const audio = new Audio(Repeta);
    audio.play();
  };

  const playHoverSoundAvanseaza = () => {
    const audio = new Audio(Avanseaza);
    audio.play();
  };

  // Handler pentru drop-ul unei litere în cuvânt
  const handleDrop = (event: React.DragEvent, word: string) => {
    const letter = event.dataTransfer.getData("letter");

    if (letter === "Z") {
      if (word === "MUZEU" && !completedWords.MUZEU) {
        setCompletedWords((prev) => ({ ...prev, MUZEU: true }));
      } else if (word === "BUZE" && !completedWords.BUZE) {
        setCompletedWords((prev) => ({ ...prev, BUZE: true }));
      } else if (word === "VARZA" && !completedWords.VARZA) {
        setCompletedWords((prev) => ({ ...prev, VARZA: true }));
      }
    }
  };

  const allowDrop = (event: React.DragEvent) => {
    event.preventDefault(); // Permite plasarea
  };

  const checkCompletion = () => {
    const allCompleted = Object.values(completedWords).every((wordCompleted) => wordCompleted);
    setIsNextLevelDisabled(!allCompleted);
  };

  useEffect(() => {
    checkCompletion();
  }, [completedWords]);

  const handleLetterUse = (index: number) => {
    const newLettersUsed = [...lettersUsed];
    newLettersUsed[index] = true;
    setLettersUsed(newLettersUsed);
  };

  return (
    <IonPage>
      <IonHeader>
        <CustomToolbar title="Litera Z Nivel 2" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
      </IonHeader>
      <IonContent className="literaZLevel2-container">
        {/* Linia cu literele */}
        <div className="literaZLevel2-letters-line">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className={`literaZLevel2-letter ${lettersUsed[index] ? 'used' : ''}`}
              draggable={!lettersUsed[index]} // Nu mai permite drag dacă litera a fost folosită
              onDragStart={(e) => {
                e.dataTransfer.setData("letter", "Z");
                handleLetterUse(index);
              }}
            >
              Z
            </div>
          ))}
        </div>

        {/* Linia cu cuvintele */}
        <div className="literaZLevel2-words-line">
          {/* Cuvântul "MUZEU" */}
          <div
            className="literaZLevel2-word-container"
            onDrop={(e) => handleDrop(e, "MUZEU")}
            onDragOver={allowDrop}
          >
            <span className="literaZLevel2-word">{completedWords.MUZEU ? "MUZEU" : "MU_EU"}</span>
            <img src={muzeuImg} alt="Muzeu" className="literaZLevel2-word-image" />
          </div>

          {/* Cuvântul "BUZE" */}
          <div
            className="literaZLevel2-word-container"
            onDrop={(e) => handleDrop(e, "BUZE")}
            onDragOver={allowDrop}
          >
            <span className="literaZLevel2-word">{completedWords.BUZE ? "BUZE" : "BU_E"}</span>
            <img src={buzeImg} alt="Buze" className="literaZLevel2-word-image" />
          </div>

          {/* Cuvântul "VARZĂ" */}
          <div
            className="literaZLevel2-word-container"
            onDrop={(e) => handleDrop(e, "VARZA")}
            onDragOver={allowDrop}
          >
            <span className="literaZLevel2-word">{completedWords.VARZA ? "VARZĂ" : "VAR_Ă"}</span>
            <img src={varzaImg} alt="Varză" className="literaZLevel2-word-image" />
          </div>
        </div>
      </IonContent>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => history.push('/maps')} disabled={isNextLevelDisabled}>
          <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title='Next level' aria-label='Next level' onMouseEnter={playHoverSoundAvanseaza} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default LiteraZLevel2;
