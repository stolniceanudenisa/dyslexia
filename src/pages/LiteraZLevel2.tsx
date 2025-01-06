import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './LiteraZLevel2.css';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
 
import muzeuImg from '../assets/images/muzeu.png';
import buzeImg from '../assets/images/buze.png';   
import varzaImg from '../assets/images/varza.png';

import Repeta from '../assets/sounds/trage-litera-Z.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import { increaseScore, getScore } from './Home';
import BravoAudio from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import MuzeuSound from '../assets/sounds/muzeu.mp3';
import BuzeSound from '../assets/sounds/buze.mp3';
import VarzaSound from '../assets/sounds/varza.mp3';



const LiteraZLevel2: React.FC<RouteComponentProps> = ({ history }) => {
  const [completedWords, setCompletedWords] = useState({
    MUZEU: false,
    BUZE: false,
    VARZA: false,
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
      case 'MUZEU':
        sound = MuzeuSound;
        break;
      case 'BUZE':
        sound = BuzeSound;
        break;
      case 'VARZA':
        sound = VarzaSound;
        break;
      default:
        return;
    }
    const audio = new Audio(sound);
    audio.play();
  };

  const handleDrop = (event: React.DragEvent, word: keyof typeof completedWords) => {
    const letter = event.dataTransfer.getData("letter");

    if (letter === "Z" && !completedWords[word]) {
      setCompletedWords((prev) => ({
        ...prev,
        [word]: true,
      }));
      playWordSound(word);
      increaseScore(); // Creștere scor la plasarea corectă a literei
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
      }, 1000); // Sunet "Bravo" cu delay de 1 secundă
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
          <div
            className="literaZLevel2-word-container"
            onDrop={(e) => handleDrop(e, "MUZEU")}
            onDragOver={allowDrop}
          >
            <span className="literaZLevel2-word">{completedWords.MUZEU ? "MUZEU" : "MU_EU"}</span>
            <img src={muzeuImg} alt="Muzeu" className="literaZLevel2-word-image" />
          </div>

          <div
            className="literaZLevel2-word-container"
            onDrop={(e) => handleDrop(e, "BUZE")}
            onDragOver={allowDrop}
          >
            <span className="literaZLevel2-word">{completedWords.BUZE ? "BUZE" : "BU_E"}</span>
            <img src={buzeImg} alt="Buze" className="literaZLevel2-word-image" />
          </div>

          <div
            className="literaZLevel2-word-container"
            onDrop={(e) => handleDrop(e, "VARZA")}
            onDragOver={allowDrop}
          >
            <span className="literaZLevel2-word">{completedWords.VARZA ? "VARZA" : "VAR_A"}</span>
            <img src={varzaImg} alt="Varza" className="literaZLevel2-word-image" />
          </div>
        </div>
      </IonContent>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => history.push('LiteraZLevel3')} disabled={isNextLevelDisabled}>
          <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title='Next level' aria-label='Next level' onMouseEnter={playHoverSoundAvanseaza} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};
export default LiteraZLevel2;
