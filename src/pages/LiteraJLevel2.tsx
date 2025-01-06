import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './LiteraJLevel2.css';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
import jocImg from '../assets/images/joc.png';
import garajImg from '../assets/images/garaj.png';
import plajaImg from '../assets/images/plaja.png';
import Repeta from '../assets/sounds/trage-litera-J.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import { increaseScore, getScore } from './Home';
import BravoAudio from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import JocSound from '../assets/sounds/joc!.mp3';
import GarajSound from '../assets/sounds/garaj!.mp3';
import PlajaSound from '../assets/sounds/plaja!.mp3';
 

const LiteraJLevel2: React.FC<RouteComponentProps> = ({ history }) => {
  const [completedWords, setCompletedWords] = useState({
    JOC: false,
    GARAJ: false,
    PLAJA: false,
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
      case 'JOC':
        sound = JocSound;
        break;
      case 'GARAJ':
        sound = GarajSound;
        break;
      case 'PLAJA':
        sound = PlajaSound;
        break;
      default:
        return;
    }
    const audio = new Audio(sound);
    audio.play();
  };

  const handleDrop = (event: React.DragEvent, word: keyof typeof completedWords) => {
    const letter = event.dataTransfer.getData("letter");

    if (letter === "J" && !completedWords[word]) {
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
        <CustomToolbar title="Litera J Nivel 2" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
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
          <div
            className="literaJLevel2-word-container"
            onDrop={(e) => handleDrop(e, "JOC")}
            onDragOver={allowDrop}
          >
            <span className="literaJLevel2-word">{completedWords.JOC ? "JOC" : "_OC"}</span>
            <img src={jocImg} alt="joc" className="literaJLevel2-word-image" />
          </div>

          <div
            className="literaJLevel2-word-container"
            onDrop={(e) => handleDrop(e, "GARAJ")}
            onDragOver={allowDrop}
          >
            <span className="literaJLevel2-word">{completedWords.GARAJ ? "GARAJ" : "GARA_"}</span>
            <img src={garajImg} alt="garaj" className="literaJLevel2-word-image" />
          </div>

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


          <IonFab vertical="bottom" horizontal="start" slot="fixed" className="custom-home-fab">
        <IonFabButton className="custom-home-button" onClick={() => history.push('/map3')}>
          <span className="custom-home-emoji" title="Go to Map">🏠</span>
        </IonFabButton>
      </IonFab>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => history.push('/LiteraJLevel3')} disabled={isNextLevelDisabled}>
          <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title="Litera J Level 2" aria-label="Next level" onMouseEnter={playHoverSoundAvanseaza} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default LiteraJLevel2;