import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './LiteraCLevel2.css';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';

import PisicaImage from '../assets/images/pisica.png'; 
import RacImage from '../assets/images/rac.png';     
import CasaImage from '../assets/images/casa.png';   

import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import BravoAudio from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import PisicaSound from '../assets/sounds/pisica.mp3';
import RacSound from '../assets/sounds/racAudio.mp3';
import CasaSound from '../assets/sounds/casa!.mp3';

import { increaseScore, getScore } from './Home'; // Import pentru gestionarea scorului

const LiteraCLevel2: React.FC<RouteComponentProps> = ({ history }) => {
  const [completedWords, setCompletedWords] = useState({
    PISICA: false,
    RAC: false,
    CASA: false,
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

  const playWordSound = (word: keyof typeof completedWords) => {
    let sound;
    switch (word) {
      case 'PISICA':
        sound = PisicaSound;
        break;
      case 'RAC':
        sound = RacSound;
        break;
      case 'CASA':
        sound = CasaSound;
        break;
      default:
        return;
    }
    const audio = new Audio(sound);
    audio.play();
  };

  const handleDrop = (event: React.DragEvent, word: keyof typeof completedWords) => {
    const letter = event.dataTransfer.getData("letter");

    if (letter === "C" && !completedWords[word]) {
      setCompletedWords((prev) => ({
        ...prev,
        [word]: true,
      }));
      playWordSound(word);
      increaseScore(); // Creșterea scorului la plasarea corectă a literei
    }
  };

  const allowDrop = (event: React.DragEvent) => {
    event.preventDefault(); // Permite plasarea
  };

  const checkCompletion = () => {
    const allCompleted = Object.values(completedWords).every((wordCompleted) => wordCompleted);
    if (allCompleted) {
      setTimeout(() => {
        const bravoAudio = new Audio(BravoAudio);
        bravoAudio.play();
      }, 1000); // Sunet de "Bravo" cu delay
    }
    setIsNextLevelDisabled(!allCompleted); // Activează butonul doar dacă toate cuvintele sunt completate
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
        <CustomToolbar title="Litera C Nivel 2" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()}  />
      </IonHeader>
      <IonContent className="literaCLevel2-container">
        {/* Linia cu literele */}
        <div className="literaCLevel2-letters-line">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className={`literaCLevel2-letter ${lettersUsed[index] ? 'used' : ''}`}
              draggable={!lettersUsed[index]} // Nu mai permite drag dacă litera a fost folosită
              onDragStart={(e) => {
                e.dataTransfer.setData("letter", "C");
                handleLetterUse(index);
              }}
            >
              C
            </div>
          ))}
        </div>

        {/* Linia cu cuvintele */}
        <div className="literaCLevel2-words-line">
          {/* Cuvântul "PISICA" */}
          <div
            className="literaCLevel2-word-container"
            onDrop={(e) => handleDrop(e, "PISICA")}
            onDragOver={allowDrop}
          >
            <span className="literaCLevel2-word">{completedWords.PISICA ? "PISICA" : "PISI_A"}</span>
            <img src={PisicaImage} alt="Pisica" className="literaCLevel2-word-image" />
          </div>

          {/* Cuvântul "RAC" */}
          <div
            className="literaCLevel2-word-container"
            onDrop={(e) => handleDrop(e, "RAC")}
            onDragOver={allowDrop}
          >
            <span className="literaCLevel2-word">{completedWords.RAC ? "RAC" : "RA_"}</span>
            <img src={RacImage} alt="Rac" className="literaCLevel2-word-image" />
          </div>

          {/* Cuvântul "CASA" */}
          <div
            className="literaCLevel2-word-container"
            onDrop={(e) => handleDrop(e, "CASA")}
            onDragOver={allowDrop}
          >
            <span className="literaCLevel2-word">{completedWords.CASA ? "CASA" : "_ASA"}</span>
            <img src={CasaImage} alt="Casa" className="literaCLevel2-word-image" />
          </div>
        </div>
      </IonContent>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => history.push('/LiteraCLevel3')} disabled={isNextLevelDisabled}>
          <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title='Litera C Level 2' aria-label='Next level' onMouseEnter={playHoverSoundAvanseaza}  />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default LiteraCLevel2;
