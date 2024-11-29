import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './LiteraJLevel2.css';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
import jocImg from '../assets/images/joc.png';
import garajImg from '../assets/images/garaj.png';
import plajaImg from '../assets/images/plaja.png';
import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import { increaseScore, getScore } from './Home';

const LiteraJLevel2: React.FC<RouteComponentProps> = ({ history }) => {
  const [score, setScore] = useState(getScore());

  const [completedWords, setCompletedWords] = useState({
    JOC: false,
    GARAJ: false,
    PLAJA: false,
  });

  // Starea pentru literele "J" din linia de sus
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

    if (letter === "J") {
      // Verificăm fiecare cuvânt
      if (word === "JOC" && !completedWords.JOC) {
        setCompletedWords((prev) => ({ ...prev, JOC: true }));
      } else if (word === "GARAJ" && !completedWords.GARAJ) {
        setCompletedWords((prev) => ({ ...prev, GARAJ: true }));
      } else if (word === "PLAJA" && !completedWords.PLAJA) {
        setCompletedWords((prev) => ({ ...prev, PLAJA: true }));
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

  // Handler pentru schimbarea stării când un "J" este folosit
  const handleLetterUse = (index: number) => {
    const newLettersUsed = [...lettersUsed];
    newLettersUsed[index] = true;
    setLettersUsed(newLettersUsed);
  };

  return (
      <IonPage>
        <IonHeader>
          <CustomToolbar title="Litera J Nivel 2" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()}  />
        </IonHeader>
        <IonContent className="literaJLevel2-container">
          {/* Linia cu literele */}
          <div className="literaJLevel2-letters-line">
            {[...Array(3)].map((_, index) => (
                <div
                    key={index}
                    className={`literaJLevel2-letter ${lettersUsed[index] ? 'used' : ''}`}
                    draggable={!lettersUsed[index]} // Nu mai permite drag dacă litera a fost folosită
                    onDragStart={(e) => {
                      e.dataTransfer.setData("letter", "J");
                      handleLetterUse(index);
                    }}
                >
                  J
                </div>
            ))}
          </div>

          {/* Linia cu cuvintele */}
          <div className="literaJLevel2-words-line">
            {/* Cuvântul "JOC" */}
            <div
                className="literaJLevel2-word-container"
                onDrop={(e) => handleDrop(e, "JOC")}
                onDragOver={allowDrop}
            >
              <span className="literaJLevel2-word">{completedWords.JOC ? "JOC" : "_OC"}</span>
              <img src={jocImg} alt="joc" className="literaJLevel2-word-image" />
            </div>

            {/* Cuvântul "GARAJ" */}
            <div
                className="literaJLevel2-word-container"
                onDrop={(e) => handleDrop(e, "GARAJ")}
                onDragOver={allowDrop}
            >
              <span className="literaJLevel2-word">{completedWords.GARAJ ? "GARAJ" : "GARA_"}</span>
              <img src={garajImg} alt="garaj" className="literaJLevel2-word-image" />
            </div>

            {/* Cuvântul "PLAJA" */}
            <div
                className="literaJLevel2-word-container"
                onDrop={(e) => handleDrop(e, "PLAJA")}
                onDragOver={allowDrop}
            >
              <span className="literaJLevel2-word">{completedWords.PLAJA ? "PLAJA" : "PLA_A"}</span>
              <img src={plajaImg} alt="plaja" className="literaJLevel2-word-image" />
            </div>
          </div>
        </IonContent>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/LiteraL')} disabled={isNextLevelDisabled}>
            <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title='Litera J Level 2' aria-label='Next level' onMouseEnter={playHoverSoundAvanseaza}  />
          </IonFabButton>
        </IonFab>
      </IonPage>
  );
};

export default LiteraJLevel2;