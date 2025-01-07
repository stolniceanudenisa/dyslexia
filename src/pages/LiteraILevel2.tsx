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
import LitIL2 from "../assets/sounds/trage-litera-I.mp3";
import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import Bravo from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import { increaseScore, useGameSettings } from './Home'

import inelAudio from '../assets/sounds/Inel.mp3';
import cartiAudio from '../assets/sounds/carti.mp3';
import miereAudio from '../assets/sounds/miere.mp3';
import diamantAudio from '../assets/sounds/diamant.mp3';
import baiatAudio from '../assets/sounds/baiat.mp3';


const LiteraILevel2: React.FC<RouteComponentProps> = ({ history }) => {
  const [completedWords, setCompletedWords] = useState({
    INEL: false,
    CARTI: false,
    MIERE: false,
    DIAMANT: false,
    BAIAT: false,
  });

  const [lettersUsed, setLettersUsed] = useState([false, false, false, false, false]); // "I" letters
  const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);

  useEffect(() => {
    const audioTimeout = setTimeout(() => {
      const audioPlayer = new Audio(LitIL2);
      audioPlayer.play();
      return () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      };
    }, 1000);

    return () => clearTimeout(audioTimeout);
  }, []);

  const wordAudioMap = {
    INEL: inelAudio,
    CARTI: cartiAudio,
    MIERE: miereAudio,
    DIAMANT: diamantAudio,
    BAIAT: baiatAudio,
  };

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
      if (!completedWords[word]) {
        setCompletedWords((prev) => ({
          ...prev,
          [word]: true,
        }));

        // Play the specific audio for the word with a 1-second delay
        setTimeout(() => {
          const audio = new Audio(wordAudioMap[word]);
          audio.play();
        }, 300);

        // Update score
        increaseScore();
      }
    }
  };

  const allowDrop = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const checkCompletion = () => {
    const allCompleted = Object.values(completedWords).every((wordCompleted) => wordCompleted);
    setIsNextLevelDisabled(!allCompleted);

    if (allCompleted) {
      setTimeout(() => {
        const bravoAudio = new Audio(Bravo);
        bravoAudio.play();
      }, 1300); // Delay the "Bravo" sound by 1 second
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

  const handleLetterReset = (index: number) => {
    const newLettersUsed = [...lettersUsed];
    newLettersUsed[index] = false;
    setLettersUsed(newLettersUsed);
  };


  const completeLevelI2 = () => {
    localStorage.setItem('levelI2Completed', 'true');  
    localStorage.setItem('literaOUnlocked', 'true');  
    history.push('/literaO');  
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
                onDragEnd={(e) => {
                  if (
                    !completedWords.INEL &&
                    !completedWords.CARTI &&
                    !completedWords.MIERE &&
                    !completedWords.DIAMANT &&
                    !completedWords.BAIAT
                  ) {
                    handleLetterReset(index); // Reset the letter if not dropped in a valid place
                  }
                }}
              >
                I
              </div>
            ))}
          </div>

          {/* Right Side - Words with blanks */}
          <div className="literaILevel2-words">
            {Object.keys(completedWords).map((word) => (
              <div
                key={word}
                className="literaILevel2-word-container"
                onDrop={(e) => handleDrop(e, word as keyof typeof completedWords)}
                onDragOver={allowDrop}
              >
                <span className="literaILevel2-word">
                  {completedWords[word as keyof typeof completedWords]
                    ? word
                    : word.replace('I', '_')}
                </span>
                <img
                  src={
                    {
                      INEL: inelImg,
                      CARTI: cartiImg,
                      MIERE: miereImg,
                      DIAMANT: diamantImg,
                      BAIAT: baiatImg,
                    }[word as keyof typeof completedWords]
                  }
                  alt={word}
                  className="literaILevel2-word-image"
                />
              </div>
            ))}
          </div>
        </div>
      </IonContent>



              <IonFab vertical="bottom" horizontal="start" slot="fixed" className="custom-home-fab">
        <IonFabButton className="custom-home-button" onClick={() => history.push('/map1')}>
          <span className="custom-home-emoji" title="Go to Map">🏠</span>
        </IonFabButton>
      </IonFab>





      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={completeLevelI2} disabled={isNextLevelDisabled}>
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
