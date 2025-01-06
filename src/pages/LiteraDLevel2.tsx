import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './LiteraDLevel2.css';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';

import DinteImage from '../assets/images/dinte.png'; 
import PodImage from '../assets/images/pod.png';     
import CadouImage from '../assets/images/cadou.png';   

import Repeta from '../assets/sounds/trage-litera-D.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import BravoAudio from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import DinteSound from '../assets/sounds/dinte.mp3';
import PodSound from '../assets/sounds/pod.mp3';
import CadouSound from '../assets/sounds/cadou.mp3';

import { increaseScore, getScore } from './Home'; // Import pentru scor

const LiteraDLevel2: React.FC<RouteComponentProps> = ({ history }) => {
  const [completedWords, setCompletedWords] = useState({
    DINTE: false,
    POD: false,
    CADOU: false,
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
      case 'DINTE':
        sound = DinteSound;
        break;
      case 'POD':
        sound = PodSound;
        break;
      case 'CADOU':
        sound = CadouSound;
        break;
      default:
        return;
    }
    const audio = new Audio(sound);
    audio.play();
  };

  const handleDrop = (event: React.DragEvent, word: keyof typeof completedWords) => {
    const letter = event.dataTransfer.getData("letter");

    if (letter === "D" && !completedWords[word]) {
      setCompletedWords((prev) => ({
        ...prev,
        [word]: true,
      }));
      playWordSound(word);
      increaseScore(); // Creștere scor la plasarea literei
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
        <CustomToolbar title="Litera D Nivel 2" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
      </IonHeader>
      <IonContent className="literaDLevel2-container">
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

        <div className="literaDLevel2-words-line">
          <div
            className="literaDLevel2-word-container"
            onDrop={(e) => handleDrop(e, "DINTE")}
            onDragOver={allowDrop}
          >
            <span className="literaDLevel2-word">{completedWords.DINTE ? "DINTE" : "_INTE"}</span>
            <img src={DinteImage} alt="Dinte" className="literaDLevel2-word-image" />
          </div>

          <div
            className="literaDLevel2-word-container"
            onDrop={(e) => handleDrop(e, "POD")}
            onDragOver={allowDrop}
          >
            <span className="literaDLevel2-word">{completedWords.POD ? "POD" : "PO_"}</span>
            <img src={PodImage} alt="Pod" className="literaDLevel2-word-image" />
          </div>

          <div
            className="literaDLevel2-word-container"
            onDrop={(e) => handleDrop(e, "CADOU")}
            onDragOver={allowDrop}
          >
            <span className="literaDLevel2-word">{completedWords.CADOU ? "CADOU" : "CA_OU"}</span>
            <img src={CadouImage} alt="Cadou" className="literaDLevel2-word-image" />
          </div>
        </div>
      </IonContent>


                <IonFab vertical="bottom" horizontal="start" slot="fixed" className="custom-home-fab">
              <IonFabButton className="custom-home-button" onClick={() => history.push('/map2')}>
                <span className="custom-home-emoji" title="Go to Map">🏠</span>
              </IonFabButton>
            </IonFab>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => history.push('/LiteraDLevel3')} disabled={isNextLevelDisabled}>
          <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title="Litera D Level 2" aria-label="Next level" onMouseEnter={playHoverSoundAvanseaza} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default LiteraDLevel2;
