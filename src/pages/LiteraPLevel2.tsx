import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './LiteraPLevel2.css';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';

import padureImg from '../assets/images/padure.png';
import cupaImg from '../assets/images/cupa.png';
import caprioaraImg from '../assets/images/caprioara.png';
import piratImg from '../assets/images/pirat.png';
import lapteImg from '../assets/images/lapte.png';

import Repeta from '../assets/sounds/trage-litera-P.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import PadureSound from '../assets/sounds/padure.mp3';
import CupaSound from '../assets/sounds/Cupa.mp3';
import CaprioaraSound from '../assets/sounds/Caprioara.mp3';
import PiratSound from '../assets/sounds/Pirat.mp3';
import LapteSound from '../assets/sounds/Lapte.mp3';
import BravoAudio from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import { increaseScore } from './Home';

const LiteraPLevel2: React.FC<RouteComponentProps> = ({ history }) => {
  const [completedWords, setCompletedWords] = useState({
    PADURE: false,
    CUPA: false,
    CAPRIOARA: false,
    PIRAT: false,
    LAPTE: false,
  });

  const [lettersUsed, setLettersUsed] = useState([false, false, false, false, false]); // "P" letters
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
      case 'PADURE':
        sound = PadureSound;
        break;
      case 'CUPA':
        sound = CupaSound;
        break;
      case 'CAPRIOARA':
        sound = CaprioaraSound;
        break;
      case 'PIRAT':
        sound = PiratSound;
        break;
      case 'LAPTE':
        sound = LapteSound;
        break;
      default:
        return;
    }
    const audio = new Audio(sound);
    audio.play();
  };

  const handleDrop = (event: React.DragEvent, word: keyof typeof completedWords) => {
    const letter = event.dataTransfer.getData('letter');
    if (letter === 'P' && !completedWords[word]) {
      setCompletedWords((prev) => ({
        ...prev,
        [word]: true,
      }));
      playWordSound(word);
      increaseScore(); // Creșterea scorului la completarea unui cuvânt
    }
  };

  const allowDrop = (event: React.DragEvent) => {
    event.preventDefault(); // Allow the drop
  };

  const checkCompletion = () => {
    const allCompleted = Object.values(completedWords).every((wordCompleted) => wordCompleted);
    if (allCompleted) {
      setTimeout(() => {
        const bravoAudio = new Audio(BravoAudio);
        bravoAudio.play();
      }, 1000);
    }
    setIsNextLevelDisabled(!allCompleted); // Enable the next level button if all words are completed
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
        <CustomToolbar
          title="Litera P Nivel 2 - Serpisor"
          titleStyle="title"
          onPlayClick={playClickAudio}
          onBackClick={() => history.goBack()}
        />
      </IonHeader>
      <IonContent className="literaPLevel2-container">
        <div className="literaPLevel2-content">
          <div className="literaPLevel2-serpent">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className={`literaPLevel2-letter ${lettersUsed[index] ? 'used' : ''}`}
                draggable={!lettersUsed[index]} // Make it draggable only if unused
                onDragStart={(e) => {
                  e.dataTransfer.setData('letter', 'P');
                  handleLetterUse(index);
                }}
              >
                P
              </div>
            ))}
          </div>

          <div className="literaPLevel2-words">
            <div className="literaPLevel2-word-container" onDrop={(e) => handleDrop(e, 'PADURE')} onDragOver={allowDrop}>
              <span className="literaPLevel2-word">{completedWords.PADURE ? 'PADURE' : '_ADURE'}</span>
              <img src={padureImg} alt="Pădure" className="literaPLevel2-word-image" />
            </div>

            <div className="literaPLevel2-word-container" onDrop={(e) => handleDrop(e, 'CUPA')} onDragOver={allowDrop}>
              <span className="literaPLevel2-word">{completedWords.CUPA ? 'CUPA' : 'CU_A'}</span>
              <img src={cupaImg} alt="CUPĂ" className="literaPLevel2-word-image" />
            </div>

            <div className="literaPLevel2-word-container" onDrop={(e) => handleDrop(e, 'CAPRIOARA')} onDragOver={allowDrop}>
              <span className="literaPLevel2-word">{completedWords.CAPRIOARA ? 'CAPRIOARA' : 'CA_RIOARA'}</span>
              <img src={caprioaraImg} alt="Căprioară" className="literaPLevel2-word-image" />
            </div>

            <div className="literaPLevel2-word-container" onDrop={(e) => handleDrop(e, 'PIRAT')} onDragOver={allowDrop}>
              <span className="literaPLevel2-word">{completedWords.PIRAT ? 'PIRAT' : '_IRAT'}</span>
              <img src={piratImg} alt="Pirat" className="literaPLevel2-word-image" />
            </div>

            <div className="literaPLevel2-word-container" onDrop={(e) => handleDrop(e, 'LAPTE')} onDragOver={allowDrop}>
              <span className="literaPLevel2-word">{completedWords.LAPTE ? 'LAPTE' : 'LA_TE'}</span>
              <img src={lapteImg} alt="Lapte" className="literaPLevel2-word-image" />
            </div>
          </div>
        </div>
      </IonContent>


                <IonFab vertical="bottom" horizontal="start" slot="fixed" className="custom-home-fab">
              <IonFabButton className="custom-home-button" onClick={() => history.push('/map2')}>
                <span className="custom-home-emoji" title="Go to Map">🏠</span>
              </IonFabButton>
            </IonFab>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => history.push('/literaPLevel3')} disabled={isNextLevelDisabled}>
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


export default LiteraPLevel2;
