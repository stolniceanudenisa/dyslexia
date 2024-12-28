import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './LiteraRLevel2.css';  {/* Asigură-te că ai fișierul CSS corect */}
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';

import caracatitaImg from '../assets/images/caracatita.png';  {/* Imagine pentru cuvântul CARACATITA */}
import dinozaurImg from '../assets/images/dinozaur.png';    {/* Imagine pentru cuvântul DINOZAUR */}
import rataImg from '../assets/images/rata.png';  {/* Imagine pentru cuvântul RATA */}

import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import { increaseScore, getScore } from './Home';

const LiteraRLevel2: React.FC<RouteComponentProps> = ({ history }) => {

  const [score, setScore] = useState(getScore());

  const [completedWords, setCompletedWords] = useState({
    CARACATITA: false,
    DINOZAUR: false,
    RATA: false,
  });

  // Starea pentru literele "R" din linia de sus
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

    if (letter === "R") {
      // Verificăm fiecare cuvânt
      if (word === "CARACATITA" && !completedWords.CARACATITA) {
        setCompletedWords((prev) => ({ ...prev, CARACATITA: true }));
      } else if (word === "DINOZAUR" && !completedWords.DINOZAUR) {
        setCompletedWords((prev) => ({ ...prev, DINOZAUR: true }));
      } else if (word === "RATA" && !completedWords.RATA) {
        setCompletedWords((prev) => ({ ...prev, RATA: true }));
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

  // Handler pentru schimbarea stării când un "R" este folosit
  const handleLetterUse = (index: number) => {
    const newLettersUsed = [...lettersUsed];
    newLettersUsed[index] = true;
    setLettersUsed(newLettersUsed);
  };

  return (
    <IonPage>
      <IonHeader>
        <CustomToolbar title="Litera R Nivel 2" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()}  />
      </IonHeader>
      <IonContent className="literaRLevel2-container">
        {/* Linia cu literele */}
        <div className="literaRLevel2-letters-line">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className={`literaRLevel2-letter ${lettersUsed[index] ? 'used' : ''}`}
              draggable={!lettersUsed[index]} // Nu mai permite drag dacă litera a fost folosită
              onDragStart={(e) => {
                e.dataTransfer.setData("letter", "R");
                handleLetterUse(index);
              }}
            >
              R
            </div>
          ))}
        </div>

        {/* Linia cu cuvintele */}
        <div className="literaRLevel2-words-line">
          {/* Cuvântul "CARACATITA" */}
          <div
            className="literaRLevel2-word-container"
            onDrop={(e) => handleDrop(e, "CARACATITA")}
            onDragOver={allowDrop}
          >
            <span className="literaRLevel2-word">{completedWords.CARACATITA ? "CARACATITA" : "CA_ACATITA"}</span>
            <img src={caracatitaImg} alt="Caracatita" className="literaRLevel2-word-image" />
          </div>

          {/* Cuvântul "DINOZAUR" */}
          <div
            className="literaRLevel2-word-container"
            onDrop={(e) => handleDrop(e, "DINOZAUR")}
            onDragOver={allowDrop}
          >
            <span className="literaRLevel2-word">{completedWords.DINOZAUR ? "DINOZAUR" : "DINOZAU_"}</span>
            <img src={dinozaurImg} alt="Dinozaur" className="literaRLevel2-word-image" />
          </div>

          {/* Cuvântul "RATA" */}
          <div
            className="literaRLevel2-word-container"
            onDrop={(e) => handleDrop(e, "RATA")}
            onDragOver={allowDrop}
          >
            <span className="literaRLevel2-word">{completedWords.RATA ? "RATA" : "_ATA"}</span>
            <img src={rataImg} alt="Rata" className="literaRLevel2-word-image" />
          </div>
        </div>
      </IonContent>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => history.push('/literaRLevel3')} disabled={isNextLevelDisabled}>
          <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title='Next level' aria-label='Next level' onMouseEnter={playHoverSoundAvanseaza}  />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default LiteraRLevel2;
