import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './LiteraILevel2.css';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';

import inelImg from '../assets/images/inel.png';
import cartiImg from '../assets/images/carti.png';
import miereImg from '../assets/images/miere.png';
import diamantImg from '../assets/images/diamant.png';
import baiatImg from '../assets/images/baiat.png';

import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import Bravo from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import { increaseScore, useGameSettings } from './Home'

const LiteraILevel2: React.FC<RouteComponentProps> = ({ history }) => {
  const [completedWords, setCompletedWords] = useState({
    INEL: false,
    CARTI: false,
    MIERE: false,
    DIAMANT: false,
    BAIAT: false,
  });

  const [lettersUsed, setLettersUsed] = useState([false, false, false, false, false, false]); // "I" letters
  const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);
  const [coins, setCoins] = useState(0); // Track coins

  const playClickAudio = () => {
    const audio = new Audio(Repeta);
    audio.play();
  };

  const playHoverSoundAvanseaza = () => {
    const audio = new Audio(Avanseaza);
    audio.play();
  };

  const handleDrop = (event: React.DragEvent, word: keyof typeof completedWords) => {
    const letter = event.dataTransfer.getData('letter');
    if (letter === 'I') {
      // Check if the word is already completed, if not, complete it and add coins
      if (!completedWords[word]) {
        setCompletedWords((prev) => ({
          ...prev,
          [word]: true,
        }));
        // Award a coin for completing the word
        setCoins((prevCoins) => prevCoins + 1); // Increase local coin count
  
        // Call increaseScore() if it's meant to update a global state or score
        increaseScore();
      }
    }
  };

  const allowDrop = (event: React.DragEvent) => {
    event.preventDefault(); // Allow the drop
  };

  const checkCompletion = () => {
    const allCompleted = Object.values(completedWords).every((wordCompleted) => wordCompleted);
    setIsNextLevelDisabled(!allCompleted); // Enable the next level button if all words are completed
    if (allCompleted) {
      const bravoAudio = new Audio(Bravo);
      bravoAudio.play(); // Play Bravo sound when all words are completed
    }
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
          title="Litera I Nivel 2 - Serpisor"
          titleStyle="title"
          onPlayClick={playClickAudio}
          onBackClick={() => history.goBack()}
        />
      </IonHeader>
      <IonContent className="literaILevel2-container">
        <div className="literaILevel2-content">
          {/* Left Side - Serpent */}
          <div className="literaILevel2-serpent">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className={`literaILevel2-letter ${lettersUsed[index] ? 'used' : ''}`}
                draggable={!lettersUsed[index]} // Make it draggable only if unused
                onDragStart={(e) => {
                  e.dataTransfer.setData('letter', 'I');
                  handleLetterUse(index);
                }}
              >
                I
              </div>
            ))}
          </div>

          {/* Right Side - Words with blanks */}
          <div className="literaILevel2-words">
            {/* INEL */}
            <div className="literaILevel2-word-container" onDrop={(e) => handleDrop(e, 'INEL')} onDragOver={allowDrop}>
              <span className="literaILevel2-word">{completedWords.INEL ? 'INEL' : '_NEL'}</span>
              <img src={inelImg} alt="Inel" className="literaILevel2-word-image" />
            </div>

            {/* CARTI */}
            <div className="literaILevel2-word-container" onDrop={(e) => handleDrop(e, 'CARTI')} onDragOver={allowDrop}>
              <span className="literaILevel2-word">{completedWords.CARTI ? 'CARTI' : 'CART_'}</span>
              <img src={cartiImg} alt="Carti" className="literaILevel2-word-image" />
            </div>

            {/* MIERE */}
            <div className="literaILevel2-word-container" onDrop={(e) => handleDrop(e, 'MIERE')} onDragOver={allowDrop}>
              <span className="literaILevel2-word">{completedWords.MIERE ? 'MIERE' : 'M_ERE'}</span>
              <img src={miereImg} alt="Miere" className="literaILevel2-word-image" />
            </div>

            {/* DIAMANT */}
            <div className="literaILevel2-word-container" onDrop={(e) => handleDrop(e, 'DIAMANT')} onDragOver={allowDrop}>
              <span className="literaILevel2-word">{completedWords.DIAMANT ? 'DIAMANT' : 'D_AMANT'}</span>
              <img src={diamantImg} alt="Diamant" className="literaILevel2-word-image" />
            </div>

            {/* BAIAT */}
            <div className="literaILevel2-word-container" onDrop={(e) => handleDrop(e, 'BAIAT')} onDragOver={allowDrop}>
              <span className="literaILevel2-word">{completedWords.BAIAT ? 'BAIAT' : 'BA_AT'}</span>
              <img src={baiatImg} alt="Baiat" className="literaILevel2-word-image" />
            </div>
          </div>
        </div>
      </IonContent>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => history.push('/literaO')} disabled={isNextLevelDisabled}>
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


export default LiteraILevel2;
