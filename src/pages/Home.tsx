import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonButton, IonText } from '@ionic/react';
import './Home.css';
import { RouteComponentProps } from 'react-router';
import HartaMagica from '../assets/sounds/HartaMagica.mp3';
import CustomToolbar from '../components/CustomToolbar';
import BineAiVenit from '../assets/sounds/BineAiVenit.mp3';

let score = 0;

export const getScore = () => score;

export const increaseScore = () => {
  score += 1;
}

let lettersInOrder = 'AEIOUMNPR#'

export interface LetterStates {
  isDisabled: boolean;
  className: string;
}

let A: LetterStates = { isDisabled: true, className: 'current_letter' };
let E: LetterStates = { isDisabled: true, className: 'blocked_letter' };
let I: LetterStates = { isDisabled: true, className: 'blocked_letter' };
let O: LetterStates = { isDisabled: true, className: 'blocked_letter' };
let U: LetterStates = { isDisabled: true, className: 'blocked_letter' };
let M: LetterStates = { isDisabled: true, className: 'blocked_letter' };
let N: LetterStates = { isDisabled: true, className: 'blocked_letter' };
let P: LetterStates = { isDisabled: true, className: 'blocked_letter' };
let R: LetterStates = { isDisabled: true, className: 'blocked_letter' };

export const useGameSettings = (letter: string) => {
  let nextLetter = lettersInOrder[lettersInOrder.indexOf(letter) + 1];

  if (nextLetter) {
    switch (nextLetter) {
      case 'E':
        E.isDisabled = false;
        E.className = 'current_letter';
        break;
      case 'I':
        I.isDisabled = false;
        I.className = 'current_letter';
        break;
      case 'O':
        O.isDisabled = false;
        O.className = 'current_letter';
        break;
      case 'U':
        U.isDisabled = false;
        U.className = 'current_letter';
        break;
      case 'M':
        M.isDisabled = false;
        M.className = 'current_letter';
        break;
      case 'N':
        N.isDisabled = false;
        N.className = 'current_letter';
        break;
      case 'P':
        P.isDisabled = false;
        P.className = 'current_letter';
        break;
      case 'R':
        R.isDisabled = false;
        R.className = 'current_letter';
        break;
      default:
        break;
    }
  }
}

const Home: React.FC<RouteComponentProps> = ({ history }) => {

  useEffect(() => {
    const audioTimeout = setTimeout(() => {
      const audioPlayer = new Audio(HartaMagica);
      audioPlayer.play();
      return () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      };
    }, 1000);

    return () => clearTimeout(audioTimeout);
  }, []);

  const playClickAudio = () => {
    const audio = new Audio(BineAiVenit);
    audio.play();
};


  return (
    <IonPage>
 

    <IonContent>
        <IonButton onClick={() => history.push('/maps')}>Mergi la harti</IonButton>
      </IonContent>


      <IonContent class='background'>

      <div className="button-container">


        {/* <IonButton className="button-a"
          onClick={() => history.push('/literaA')} 
        >
          <IonText className={A.className}>A</IonText>
        </IonButton> */}



        {/* <IonButton className="button-e"
          onClick={() => history.push('/literaE')}
          //disabled={E.isDisabled}
        >
          <IonText className={E.className}>E</IonText>
        </IonButton> */}





        {/* <IonButton className="button-i"
          onClick={() => history.push('/literaI')}
          //disabled={I.isDisabled}
           
        >
          <IonText className={I.className}>I</IonText>
        </IonButton> */}


        {/* <IonButton className="button-u"
          onClick={() => history.push('/literaU')}
         // disabled={O.isDisabled}
           
        >
          <IonText className={O.className}>U</IonText>
        </IonButton> */}



        {/* <IonButton className="button-o"
          onClick={() => history.push('/literaO')}
          //disabled={U.isDisabled}
     
        >
          <IonText className={U.className}>O</IonText>
        </IonButton> */}
 
{/*         
        
        <IonButton
          onClick={() => history.push('/literaM')}
          //disabled={M.isDisabled}
          style={{ top: '9%', left: '28%' }}
        >
          <IonText className={M.className}>M</IonText>
        </IonButton>

        <IonButton
          onClick={() => history.push('/literaN')}
         // disabled={N.isDisabled}
          style={{ top: '27%', left: '33%' }}
        >
          <IonText className={N.className}>N</IonText>
        </IonButton>

        <IonButton
          onClick={() => history.push('/literaP')}
         // disabled={P.isDisabled}
          style={{ top: '-5%', left: '41.5%' }}
        >
          <IonText className={P.className}>P</IonText>
        </IonButton>

        <IonButton
          onClick={() => history.push('/literaR')}
          //disabled={R.isDisabled}
          style={{ top: '1%', left: '44%' }}
        >
          <IonText className={R.className}>R</IonText>
        </IonButton>



        <IonButton
          onClick={() => history.push('/literaB')}
          //disabled={R.isDisabled}
          style={{ top: '-3%', left: '51%' }}
        >
          <IonText className={R.className}>B</IonText>  
        </IonButton>


        <IonButton
          onClick={() => history.push('/literaC')}
          // disabled={R.isDisabled}
          style={{ top: '-31%', left: '59%' }}
        >
          <IonText className={R.className}>c</IonText>  
        </IonButton>



        <IonButton
          onClick={() => history.push('/literaD')}
          // disabled={R.isDisabled}
          style={{ top: '-51%', left: '54.5%' }}
        >
          <IonText className={R.className}>D</IonText>  
        </IonButton>


        <IonButton
          onClick={() => history.push('/literaF')}
          // disabled={R.isDisabled}
          style={{ top: '-64%', left: '47%' }}
        >
          <IonText className={R.className}>F</IonText>  
        </IonButton>


        <IonButton
          onClick={() => history.push('/literaG')}
          // disabled={R.isDisabled}
          style={{ top: '-64%', left: '70%' }}
        >
          <IonText className={R.className}>G</IonText>  
        </IonButton>

        <IonButton
          onClick={() => history.push('/literaH')}
          // disabled={R.isDisabled}
          style={{ top: '-50%', left: '76%' }}
        >
          <IonText className={R.className}>H</IonText>  
        </IonButton>

        <IonButton
          onClick={() => history.push('/literaJ')}
          // disabled={R.isDisabled}
          style={{ top: '-54%', left: '70%' }}
        >
          <IonText className={R.className}>J</IonText>  
        </IonButton>



        <IonButton
          onClick={() => history.push('/literaK')}
          // disabled={R.isDisabled}
          style={{ top: '-62%', left: '65%' }}
        >
          <IonText className={R.className}>K</IonText>  
        </IonButton>


        <IonButton
          onClick={() => history.push('/literaL')}
          // disabled={R.isDisabled}
          style={{ top: '-58%', left: '62%' }}
        >
          <IonText className={R.className}>L</IonText>  
        </IonButton>


        <IonButton
          onClick={() => history.push('/literaQ')}
          // disabled={R.isDisabled}
          style={{ top: '-56.5%', left: '64%' }}
        >
          <IonText className={R.className}>Q</IonText>  
        </IonButton>

        <IonButton
          onClick={() => history.push('/literaS')}
          // disabled={R.isDisabled}
          style={{ top: '-70%', left: '71%' }}
        >
          <IonText className={R.className}>S</IonText>  
        </IonButton>



        <IonButton
          onClick={() => history.push('/literaT')}
          // disabled={R.isDisabled}
          style={{ top: '-65%', left: '77%' }}
        >
          <IonText className={R.className}>T</IonText>  
        </IonButton>


        <IonButton
          onClick={() => history.push('/literaV')}
          // disabled={R.isDisabled}
          style={{ top: '-69%', left: '55%' }}
        >
          <IonText className={R.className}>V</IonText>  
        </IonButton>


        <IonButton
          onClick={() => history.push('/literaW')}
          // disabled={R.isDisabled}
          style={{ top: '-77%', left: '46%' }}
        >
          <IonText className={R.className}>W</IonText>  
        </IonButton>



        <IonButton
          onClick={() => history.push('/literaX')}
          // disabled={R.isDisabled}
          style={{ top: '-79%', left: '38%' }}
        >
          <IonText className={R.className}>X</IonText>  
        </IonButton>

        <IonButton
          onClick={() => history.push('/literaY')}
          // disabled={R.isDisabled}
          style={{ top: '-93%', left: '25%' }}
        >
          <IonText className={R.className}>Y</IonText>  
        </IonButton>


        <IonButton
          onClick={() => history.push('/literaZ')}
          // disabled={R.isDisabled}
          style={{ top: '-100%', left: '17%' }}
        >
          <IonText className={R.className}>Z</IonText>  
        </IonButton>   */
        
        
      }
 </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
