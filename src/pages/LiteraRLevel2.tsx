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


import CaracatitaSound from '../assets/sounds/caracatita.mp3';
import DinozaurSound from '../assets/sounds/dinozaur.mp3';
import RataSound from '../assets/sounds/rata.mp3';
import BravoAudio from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';


const LiteraRLevel2: React.FC<RouteComponentProps> = ({ history }) => {
  const [score, setScore] = useState(getScore()); // Inițializarea scorului
  const [completedWords, setCompletedWords] = useState({
    CARACATITA: false,
    DINOZAUR: false,
    RATA: false,
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

  const playWordSound = (word: string) => {
    let audioSrc = null;
    switch (word) {
      case 'CARACATITA':
        audioSrc = CaracatitaSound;
        break;
      case 'DINOZAUR':
        audioSrc = DinozaurSound;
        break;
      case 'RATA':
        audioSrc = RataSound;
        break;
      default:
        return;
    }
    const audio = new Audio(audioSrc);
    audio.play();
  };

  const handleDrop = (event: React.DragEvent, word: keyof typeof completedWords) => {
    const letter = event.dataTransfer.getData('letter');
    if (letter === 'R' && !completedWords[word]) {
      setCompletedWords((prev) => ({ ...prev, [word]: true }));
      playWordSound(word);
      increaseScore(); // Creșterea scorului când se completează un cuvânt
      setScore(getScore()); // Actualizare vizuală a scorului
    }
  };

  const allowDrop = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const checkCompletion = () => {
    const allCompleted = Object.values(completedWords).every((wordCompleted) => wordCompleted);
    setIsNextLevelDisabled(!allCompleted);
  };

  useEffect(() => {
    checkCompletion();

    const allCompleted = Object.values(completedWords).every((wordCompleted) => wordCompleted);
    if (allCompleted) {
      setTimeout(() => {
        const bravoAudio = new Audio(BravoAudio);
        bravoAudio.play();
      }, 1000);
    }
  }, [completedWords]);

  const handleLetterUse = (index: number) => {
    const newLettersUsed = [...lettersUsed];
    newLettersUsed[index] = true;
    setLettersUsed(newLettersUsed);
  };

  return (
    <IonPage>
      <IonHeader>
        <CustomToolbar
          title="Litera R Nivel 2"
          titleStyle="title"
          onPlayClick={playClickAudio}
          onBackClick={() => history.goBack()}
        />
      </IonHeader>
      <IonContent className="literaRLevel2-container">
        <div className="literaRLevel2-content">
           
          <div className="literaRLevel2-letters-line">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className={`literaRLevel2-letter ${lettersUsed[index] ? 'used' : ''}`}
                draggable={!lettersUsed[index]}
                onDragStart={(e) => {
                  e.dataTransfer.setData('letter', 'R');
                  handleLetterUse(index);
                }}
              >
                R
              </div>
            ))}
          </div>

          <div className="literaRLevel2-words-line">
            {/* CARACATITA */}
            <div
              className="literaRLevel2-word-container"
              onDrop={(e) => handleDrop(e, 'CARACATITA')}
              onDragOver={allowDrop}
            >
              <span className="literaRLevel2-word">
                {completedWords.CARACATITA ? 'CARACATITA' : 'CA_ACATITA'}
              </span>
              <img src={caracatitaImg} alt="Caracatiță" className="literaRLevel2-word-image" />
            </div>

            {/* DINOZAUR */}
            <div
              className="literaRLevel2-word-container"
              onDrop={(e) => handleDrop(e, 'DINOZAUR')}
              onDragOver={allowDrop}
            >
              <span className="literaRLevel2-word">
                {completedWords.DINOZAUR ? 'DINOZAUR' : 'DINOZAU_'}
              </span>
              <img src={dinozaurImg} alt="Dinozaur" className="literaRLevel2-word-image" />
            </div>

            {/* RATA */}
            <div
              className="literaRLevel2-word-container"
              onDrop={(e) => handleDrop(e, 'RATA')}
              onDragOver={allowDrop}
            >
              <span className="literaRLevel2-word">{completedWords.RATA ? 'RATA' : '_ATA'}</span>
              <img src={rataImg} alt="Rață" className="literaRLevel2-word-image" />
            </div>
          </div>
        </div>
      </IonContent>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => history.push('/literaRLevel3')} disabled={isNextLevelDisabled}>
          <IonIcon
            icon={arrowForwardOutline}
            className="black-icon big-arrow"
            title="Next level"
            aria-label="Next level"
            onMouseEnter={playHoverSoundAvanseaza}
          />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};


export default LiteraRLevel2;
