import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonButton, IonHeader, IonText } from '@ionic/react';
import { IonIcon } from '@ionic/react';
import { volumeHighOutline, arrowBack } from 'ionicons/icons';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import './Map1.css';   
import Harta1Intro from "../assets/sounds/harta1-intro.mp3";
import Inapoi from "../assets/sounds/inapoi-la-harti.mp3";
import CustomToolbar from '../components/CustomToolbar';



// let score = 0;

// export const getScore = () => score;

// export const increaseScore = () => {
//   score += 1;
// }

// let lettersInOrder = 'AEIOU#'

// export interface LetterStates {
//   isDisabled: boolean;
//   className: string;
// }

// let A: LetterStates = { isDisabled: true, className: 'current_letter' };
// let E: LetterStates = { isDisabled: true, className: 'blocked_letter' };
// let I: LetterStates = { isDisabled: true, className: 'blocked_letter' };
// let O: LetterStates = { isDisabled: true, className: 'blocked_letter' };
// let U: LetterStates = { isDisabled: true, className: 'blocked_letter' };


// export const useGameSettings = (letter: string) => {
//   let nextLetter = lettersInOrder[lettersInOrder.indexOf(letter) + 1];

//   if (nextLetter) {
//     switch (nextLetter) {
//       case 'E':
//         E.isDisabled = false;
//         E.className = 'current_letter';
//         break;
//       case 'I':
//         I.isDisabled = false;
//         I.className = 'current_letter';
//         break;
//       case 'O':
//         O.isDisabled = false;
//         O.className = 'current_letter';
//         break;
//       case 'U':
//         U.isDisabled = false;
//         U.className = 'current_letter';
//         break;

//       default:
//         break;
//     }
//   }
// }


// const Map1: React.FC<RouteComponentProps> = ({ history }) => {

//   return (
//     <IonPage>
 

//       <IonContent class='background'>

//         <IonButton
//           onClick={() => history.push('/literaA')}
//           style={{ top: '15%', left: '17%' }}
//         >
//           <IonText className={A.className}>A</IonText>
//         </IonButton>

//         <IonButton
//           onClick={() => history.push('/literaE')}
//           disabled={E.isDisabled}
//           style={{ top: '23%', left: '23%' }}
//         >
//           <IonText className={E.className}>E</IonText>
//         </IonButton>

//         <IonButton
//           onClick={() => history.push('/literaI')}
//           disabled={I.isDisabled}
//           style={{ top: '45%', left: '18%' }}
//         >
//           <IonText className={I.className}>I</IonText>
//         </IonButton>

//         <IonButton
//           onClick={() => history.push('/literaO')}
//           disabled={O.isDisabled}
//           style={{ top: '40%', left: '23%' }}
//         >
//           <IonText className={O.className}>O</IonText>
//         </IonButton>

//         <IonButton
//           onClick={() => history.push('/literaU')}
//           disabled={U.isDisabled}
//           style={{ top: '60%', left: '23%' }}
//         >
//           <IonText className={U.className}>U</IonText>
//         </IonButton>

      
//       </IonContent>
//     </IonPage>
//   );
// };



// export default Map1;










const Map1: React.FC = () => {
  const history = useHistory();
  const [currentLevel, setCurrentLevel] = useState<number>(1);


  // useEffect(() => {
  //   const level2Completed = localStorage.getItem('level2Completed');
  //   console.log('Level 2 completed:', level2Completed);  // Debugging line to check the value
  //   if (level2Completed === 'true') {
  //     setCurrentLevel(2);  // Unlock "E" if level 2 is completed
  //   }
  //   // Check and load current level
  //   const level = parseInt(localStorage.getItem('currentLevel') || '1');
  //   setCurrentLevel(level);
  //   console.log('Current Level:', level);

  //   const audioTimeout = setTimeout(() => {
  //     const audioPlayer = new Audio(Harta1Intro);
  //     audioPlayer.play();
  //     return () => {
  //       audioPlayer.pause();
  //       audioPlayer.currentTime = 0;
  //     };
  //   }, 1000);

  //   return () => clearTimeout(audioTimeout);
  // }, []);








  const playNarrationSound = () => {
    const audio = new Audio(Harta1Intro);
    audio.play();
  };

 
   const playBackSound = () => {
    const audio = new Audio(Inapoi);
    audio.play();
  };

  // const handleLetterButtonClick = (letter: string) => {
  //   if (currentLevel >= (letter.charCodeAt(0) - 64)) {
  //     // Redirecționăm la pagina corespunzătoare pentru fiecare literă
  //     history.push(`/litera${letter}`);
  //   }
  // };
  const handleLetterButtonClick = (letter: string) => {
    const isUnlocked = localStorage.getItem(`litera${letter}Unlocked`) === 'true';
    if (isUnlocked || letter === 'A') {
      history.push(`/litera${letter}`);
    }
  };
  



  // Completarea nivelului curent și actualizarea progresului
  const completeLevel = () => {
    const nextLevel = currentLevel + 1;
    localStorage.setItem('currentLevel', nextLevel.toString()); // Actualizăm localStorage
    setCurrentLevel(nextLevel);  // Actualizăm starea nivelului
    history.push('/map1');  // Redirecționăm copilul înapoi la hartă
  };




  return (
    <IonPage> 
      <IonContent className='background1' scrollY={false}>
        
        {/* Back Button */}
        <button 
          className="back-button" 
          onClick={() => {
            playBackSound(); // Sunet înapoi
            history.push('/maps'); // Navigăm înapoi la hărți
          }}
        >
          <IonIcon icon={arrowBack} className="back-icon" />
        </button>

        <button className="sound-button" onClick={playNarrationSound}>
          <IonIcon icon={volumeHighOutline} className="sound-icon" />
        </button>

        <div className="button-container">
          {/* Litera A */}
          <IonButton 
            onClick={() => handleLetterButtonClick('A')}
            className={`letter-button a ${currentLevel >= 1 ? 'unlocked' : 'locked'}`}
            style={{ fontSize: currentLevel >= 1 ? '80px' : '60px' }}
          >
            A
          </IonButton>
  
            <IonButton
              onClick={() => handleLetterButtonClick('E')}
              className={`letter-button e ${localStorage.getItem('literaEUnlocked') === 'true' ? 'unlocked' : 'locked'}`}
              disabled={localStorage.getItem('literaEUnlocked') !== 'true'}
            >
              E
            </IonButton>


{/* 
    
          <IonButton 
            onClick={() => handleLetterButtonClick('I')}
            className={`letter-button i ${currentLevel >= 3 ? 'unlocked' : 'locked'}`}
            style={{
              fontSize: currentLevel >= 3 ? '60px' : '50px',
              opacity: currentLevel >= 3 ? 1 : 0.5,
            }}
            disabled={currentLevel < 3}  
          >
            I
          </IonButton>
          
           */}

      {/* Litera I */}
            <IonButton
        onClick={() => handleLetterButtonClick('I')}
        className={`letter-button i ${localStorage.getItem('literaIUnlocked') === 'true' ? 'unlocked' : 'locked'}`}
        disabled={localStorage.getItem('literaIUnlocked') !== 'true'}
      >
        I
      </IonButton>


 


          {/* Litera O */}
{/*           
          <IonButton 
            onClick={() => handleLetterButtonClick('O')}
            className={`letter-button o ${currentLevel >= 4 ? 'unlocked' : 'locked'}`}
            style={{
              fontSize: currentLevel >= 4 ? '60px' : '50px',
              opacity: currentLevel >= 4 ? 1 : 0.5,
            }}
            disabled={currentLevel < 4}  
          >
            O
          </IonButton> */}


          <IonButton
            onClick={() => handleLetterButtonClick('O')}
            className={`letter-button o ${localStorage.getItem('literaOUnlocked') === 'true' ? 'unlocked' : 'locked'}`}
            disabled={localStorage.getItem('literaOUnlocked') !== 'true'}
          >
            O
          </IonButton>





          {/* Litera U */}


          {/* <IonButton 
            onClick={() => handleLetterButtonClick('U')}
            className={`letter-button u ${currentLevel >= 5 ? 'unlocked' : 'locked'}`}
            style={{
              fontSize: currentLevel >= 5 ? '60px' : '50px',
              opacity: currentLevel >= 5 ? 1 : 0.5,
            }}
            disabled={currentLevel < 5}  
          >
            U
          </IonButton> */}

        <IonButton
            onClick={() => handleLetterButtonClick('U')}
            className={`letter-button u ${localStorage.getItem('literaUUnlocked') === 'true' ? 'unlocked' : 'locked'}`}
            disabled={localStorage.getItem('literaUUnlocked') !== 'true'}
          >
            U
          </IonButton>
   
        </div>




        

        {/* Buton de completare nivel */}
        {currentLevel <= 5 && (
          <div className="complete-level-button">
            <IonButton onClick={completeLevel}>Complete Level {String.fromCharCode(64 + currentLevel)}</IonButton>
          </div>
        )}





        
      </IonContent>
    </IonPage>
  );
};

export default Map1;