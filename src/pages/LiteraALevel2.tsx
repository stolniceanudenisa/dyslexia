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
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import { increaseScore, getScore } from './Home';
import Bravo from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import SacAudio from '../assets/sounds/sac!.mp3';



const LiteraALevel2: React.FC<RouteComponentProps> = ({ history }) => {
  const [score, setScore] = useState(getScore());
  const [completedWords, setCompletedWords] = useState({
    SAC: false,
    AC: false,
    ARC: false,
  });

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

  // Funcție pentru gestionarea plasării literei
  const handleDrop = (event: React.DragEvent, word: string) => {
    const letter = event.dataTransfer.getData("letter");

    if (letter === "A") {
      // Adăugare punctaj și actualizare starea cuvântului completat
      if (word === "SAC" && !completedWords.SAC) {
        setCompletedWords((prev) => ({ ...prev, SAC: true }));
        increaseScore();
      } else if (word === "AC" && !completedWords.AC) {
        setCompletedWords((prev) => ({ ...prev, AC: true }));
        increaseScore();
      } else if (word === "ARC" && !completedWords.ARC) {
        setCompletedWords((prev) => ({ ...prev, ARC: true }));
        increaseScore();
      }
    }
  };

  // Permite drop-ul literei
  const allowDrop = (event: React.DragEvent) => {
    event.preventDefault();
  };

  // Verificare completare cuvinte și redare sunet "Bravo"
  useEffect(() => {
    const allCompleted = Object.values(completedWords).every((wordCompleted) => wordCompleted);

    if (allCompleted) {
      setIsNextLevelDisabled(false); // Activează butonul următor
      const bravoAudio = new Audio(Bravo);
      bravoAudio.play();
    }
  }, [completedWords]);

  // Gestionarea folosirii literelor "A"
  const handleLetterUse = (index: number) => {
    const newLettersUsed = [...lettersUsed];
    newLettersUsed[index] = true;
    setLettersUsed(newLettersUsed);
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
        <IonFabButton onClick={() => history.push('/LiteraE')} disabled={isNextLevelDisabled}>
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
