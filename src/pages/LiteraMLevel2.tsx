import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './LiteraMLevel2.css';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';
import magarImg from '../assets/images/magar.png';
import numarImg from '../assets/images/numar.png';
import melcImg from '../assets/images/melc.png';
import Repeta from '../assets/sounds/trage-litera-M.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import MagarAudio from '../assets/sounds/magar.mp3';
import NumarAudio from '../assets/sounds/numar.mp3';
import MelcAudio from '../assets/sounds/melc.mp3';
import BravoAudio from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import { increaseScore, getScore } from './Home';

const LiteraMLevel2: React.FC<RouteComponentProps> = ({ history }) => {
  const [score, setScore] = useState(getScore());
  const [completedWords, setCompletedWords] = useState({
    MAGAR: false,
    NUMAR: false,
    MELC: false,
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
      case 'MAGAR':
        audioSrc = MagarAudio;
        break;
      case 'NUMAR':
        audioSrc = NumarAudio;
        break;
      case 'MELC':
        audioSrc = MelcAudio;
        break;
      default:
        return;
    }
    const audio = new Audio(audioSrc);
    audio.play();
  };

  const handleDrop = (event: React.DragEvent, word: keyof typeof completedWords) => {
    const letter = event.dataTransfer.getData('letter');
    if (letter === 'M' && !completedWords[word]) {
      setCompletedWords((prev) => ({ ...prev, [word]: true }));
      playWordSound(word);
      increaseScore();
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
          title="Litera M Nivel 2"
          titleStyle="title"
          onPlayClick={playClickAudio}
          onBackClick={() => history.goBack()}
        />
      </IonHeader>
      <IonContent className="literaMLevel2-container">
        <div className="literaMLevel2-letters-line">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className={`literaMLevel2-letter ${lettersUsed[index] ? 'used' : ''}`}
              draggable={!lettersUsed[index]}
              onDragStart={(e) => {
                e.dataTransfer.setData('letter', 'M');
                handleLetterUse(index);
              }}
            >
              M
            </div>
          ))}
        </div>

        <div className="literaMLevel2-words-line">
          <div
            className="literaMLevel2-word-container"
            onDrop={(e) => handleDrop(e, 'MAGAR')}
            onDragOver={allowDrop}
          >
            <span className="literaMLevel2-word">{completedWords.MAGAR ? 'MAGAR' : '_AGAR'}</span>
            <img src={magarImg} alt="Magar" className="literaMLevel2-word-image" />
          </div>

          <div
            className="literaMLevel2-word-container"
            onDrop={(e) => handleDrop(e, 'NUMAR')}
            onDragOver={allowDrop}
          >
            <span className="literaMLevel2-word">{completedWords.NUMAR ? 'NUMAR' : 'NU_AR'}</span>
            <img src={numarImg} alt="Numar" className="literaMLevel2-word-image" />
          </div>

          <div
            className="literaMLevel2-word-container"
            onDrop={(e) => handleDrop(e, 'MELC')}
            onDragOver={allowDrop}
          >
            <span className="literaMLevel2-word">{completedWords.MELC ? 'MELC' : '_ELC'}</span>
            <img src={melcImg} alt="Melc" className="literaMLevel2-word-image" />
          </div>
        </div>
      </IonContent>


                <IonFab vertical="bottom" horizontal="start" slot="fixed" className="custom-home-fab">
              <IonFabButton className="custom-home-button" onClick={() => history.push('/map2')}>
                <span className="custom-home-emoji" title="Go to Map">🏠</span>
              </IonFabButton>
            </IonFab>

            

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => history.push('/LiteraMLevel3')} disabled={isNextLevelDisabled}>
          <IonIcon
            icon={arrowForwardOutline}
            className="black-icon big-arrow"
            title="Litera M Level 2"
            aria-label="Next level"
            onMouseEnter={playHoverSoundAvanseaza}
          />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default LiteraMLevel2;
