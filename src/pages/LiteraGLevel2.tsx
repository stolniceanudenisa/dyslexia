import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './LiteraGLevel2.css';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';

import gaina from '../assets/images/gaina.png';
import girafa from '../assets/images/Girafa.png';
import geanta from '../assets/images/geanta.png';

import Repeta from '../assets/sounds/trage-litera-G.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import { increaseScore, getScore } from './Home';
import BravoAudio from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import GainaSound from '../assets/sounds/gaina.mp3';
import GirafaSound from '../assets/sounds/GirafaAudio.mp3';
import GeantaSound from '../assets/sounds/GeantaAudio.mp3';



const LiteraGLevel2: React.FC<RouteComponentProps> = ({ history }) => {
    const [completedWords, setCompletedWords] = useState({
      GAINA: false,
      GIRAFA: false,
      GEANTA: false,
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
        case 'GAINA':
          sound = GainaSound;
          break;
        case 'GIRAFA':
          sound = GirafaSound;
          break;
        case 'GEANTA':
          sound = GeantaSound;
          break;
        default:
          return;
      }
      const audio = new Audio(sound);
      audio.play();
    };
  
    const handleDrop = (event: React.DragEvent, word: keyof typeof completedWords) => {
      const letter = event.dataTransfer.getData("letter");
  
      if (letter === "G" && !completedWords[word]) {
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
          <CustomToolbar title="Litera G Nivel 2" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
        </IonHeader>
        <IonContent className="literaGLevel2-container">
          <div className="literaGLevel2-letters-line">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className={`literaGLevel2-letter ${lettersUsed[index] ? 'used' : ''}`}
                draggable={!lettersUsed[index]} // Nu mai permite drag dacă litera a fost folosită
                onDragStart={(e) => {
                  e.dataTransfer.setData("letter", "G");
                  handleLetterUse(index);
                }}
              >
                G
              </div>
            ))}
          </div>
  
          <div className="literaGLevel2-words-line">
            <div
              className="literaGLevel2-word-container"
              onDrop={(e) => handleDrop(e, "GAINA")}
              onDragOver={allowDrop}
            >
              <span className="literaGLevel2-word">{completedWords.GAINA ? "GAINA" : "_AINA"}</span>
              <img src={gaina} alt="Gaina" className="literaGLevel2-word-image" />
            </div>
  
            <div
              className="literaGLevel2-word-container"
              onDrop={(e) => handleDrop(e, "GIRAFA")}
              onDragOver={allowDrop}
            >
              <span className="literaGLevel2-word">{completedWords.GIRAFA ? "GIRAFA" : "_IRAFA"}</span>
              <img src={girafa} alt="Girafa" className="literaGLevel2-word-image" />
            </div>
  
            <div
              className="literaGLevel2-word-container"
              onDrop={(e) => handleDrop(e, "GEANTA")}
              onDragOver={allowDrop}
            >
              <span className="literaGLevel2-word">{completedWords.GEANTA ? "GEANTA" : "_EANTA"}</span>
              <img src={geanta} alt="Geanta" className="literaGLevel2-word-image" />
            </div>
          </div>
        </IonContent>


                  <IonFab vertical="bottom" horizontal="start" slot="fixed" className="custom-home-fab">
                <IonFabButton className="custom-home-button" onClick={() => history.push('/map3')}>
                  <span className="custom-home-emoji" title="Go to Map">🏠</span>
                </IonFabButton>
              </IonFab>
        
  
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/LiteraGLevel3')} disabled={isNextLevelDisabled}>
            <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title='Next level' aria-label='Next level' onMouseEnter={playHoverSoundAvanseaza} />
          </IonFabButton>
        </IonFab>
      </IonPage>
    );
  };

export default LiteraGLevel2;
