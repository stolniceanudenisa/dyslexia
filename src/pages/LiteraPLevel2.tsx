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

import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';

const LiteraPLevel2: React.FC<RouteComponentProps> = ({ history }) => {
  const [completedWords, setCompletedWords] = useState({
    PADURE: false,
    CUPĂ: false,
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

  const handleDrop = (event: React.DragEvent, word: string) => {
    const letter = event.dataTransfer.getData('letter');
    if (letter === 'P') {
      setCompletedWords((prev) => ({
        ...prev,
        [word]: true,
      }));
    }
  };

  const allowDrop = (event: React.DragEvent) => {
    event.preventDefault(); // Allow the drop
  };

  const checkCompletion = () => {
    const allCompleted = Object.values(completedWords).every((wordCompleted) => wordCompleted);
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
          {/* Left Side - Serpent */}
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

          {/* Right Side - Words with blanks */}
          <div className="literaPLevel2-words">
            {/* PĂDURE */}
            <div className="literaPLevel2-word-container" onDrop={(e) => handleDrop(e, 'PADURE')} onDragOver={allowDrop}>
              <span className="literaPLevel2-word">{completedWords.PADURE ? 'PĂDURE' : '_ĂDURE'}</span>
              <img src={padureImg} alt="Pădure" className="literaPLevel2-word-image" />
            </div>

            {/* PALAT */}
            <div className="literaPLevel2-word-container" onDrop={(e) => handleDrop(e, 'CUPĂ')} onDragOver={allowDrop}>
              <span className="literaPLevel2-word">{completedWords.CUPĂ ? 'CUPĂ' : 'CU_Ă'}</span>
              <img src={cupaImg} alt="CUPĂ" className="literaPLevel2-word-image" />
            </div>

            {/* PĂPĂDIE */}
            <div className="literaPLevel2-word-container" onDrop={(e) => handleDrop(e, 'CAPRIOARA')} onDragOver={allowDrop}>
              <span className="literaPLevel2-word">{completedWords.CAPRIOARA ? 'CĂPRIOARĂ' : 'CĂ_RIOARĂ'}</span>
              <img src={caprioaraImg} alt="CĂPRIOARĂ" className="literaPLevel2-word-image" />
            </div>

            {/* PIRAT */}
            <div className="literaPLevel2-word-container" onDrop={(e) => handleDrop(e, 'PIRAT')} onDragOver={allowDrop}>
              <span className="literaPLevel2-word">{completedWords.PIRAT ? 'PIRAT' : '_IRAT'}</span>
              <img src={piratImg} alt="Pirat" className="literaPLevel2-word-image" />
            </div>

            {/* PORTOCALĂ */}
            <div className="literaPLevel2-word-container" onDrop={(e) => handleDrop(e, 'LAPTE')} onDragOver={allowDrop}>
              <span className="literaPLevel2-word">{completedWords.LAPTE ? 'LAPTE' : 'LA_TE'}</span>
              <img src={lapteImg} alt="Portocală" className="literaPLevel2-word-image" />
            </div>
          </div>
        </div>
      </IonContent>

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
