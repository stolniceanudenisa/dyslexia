import React from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './Litere.css';
import bijuterie from '../assets/images/bijuterie.png';
import bej from '../assets/images/bej.png';
import joc from '../assets/images/joc.png';
import coaja from '../assets/images/coaja.png';
import garaj from '../assets/images/garaj.png';
import jacheta from '../assets/images/jacheta.png';
import jurnal from '../assets/images/jurnal.png';
import plaja from '../assets/images/plaja.png';

import BijuterieAudio from '../assets/sounds/bijuterie!.mp3';
import BejAudio from '../assets/sounds/bej!.mp3';
import JocAudio from '../assets/sounds/joc!.mp3';
import CoajaAudio from '../assets/sounds/coaja!.mp3';
import GarajAudio from '../assets/sounds/garaj!.mp3';
import JachetaAudio from '../assets/sounds/jacheta!.mp3';
import JurnalAudio from '../assets/sounds/jurnal!.mp3';
import PlajaAudio from '../assets/sounds/plaja!.mp3';

import J from '../assets/sounds/J!.mp3';
import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';

const LiteraJ: React.FC<RouteComponentProps> = ({ history }) => {
  const images1 = [bijuterie, bej, joc, coaja]; // First row images
  const images2 = [garaj, jacheta, jurnal, plaja]; // Second row images
  const audios = [BijuterieAudio, BejAudio, JocAudio, CoajaAudio, GarajAudio, JachetaAudio, JurnalAudio, PlajaAudio]; // Audio files
  const words1 = ['BIJUTERIE', 'BEJ', 'JOC', 'COAJA']; // First row words
  const words2 = ['GARAJ', 'JACHETA', 'JURNAL', 'PLAJA']; // Second row words

  const playAudio = (index: number) => {
    const audio = new Audio(audios[index]);
    audio.playbackRate = 0.8;
    audio.play();
  };

  const playHoverSound = () => {
    const audio = new Audio(J);
    audio.play();
  };

  const playClickAudio = () => {
    const audio = new Audio(Repeta);
    audio.play();
  };

  const playHoverSoundAvanseaza = () => {
    const audio = new Audio(Avanseaza);
    audio.play();
  };

  const formatWordWithBoldJ = (word: string) => {
    return (
        <>
          {word.split('').map((char, index) => (
              <span key={index} className={char === 'J' ? 'highlight' : ''}>
            {char}
          </span>
          ))}
        </>
    );
  };

  return (
      <IonPage>
        <IonHeader>
          <CustomToolbar title="Litera J" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
        </IonHeader>

        <IonContent className="letter-page" scrollY={false}>
          <div className="container">
            {/* First row of images */}
            <div className="round-buttons">
              {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index)}>
                    <div style={{ width: '120px', height: '120px', margin: 10, cursor: 'pointer' }}>
                      <img src={images1[index]} style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div className="audio-label" style={{ fontSize: '0.9em' }}>
                      {formatWordWithBoldJ(words1[index])}
                    </div>
                  </div>
              ))}
            </div>

            {/* Letter display */}
            <div className="letter" onMouseEnter={playHoverSound}>
              <div className="letter-content">J</div>
            </div>

            {/* Second row of images */}
            <div className="round-buttons">
              {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index + 4)}>
                    <div style={{ width: '120px', height: '120px', margin: 10, cursor: 'pointer' }}>
                      <img src={images2[index]} style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div className="audio-label" style={{ fontSize: '0.9em' }}>
                      {formatWordWithBoldJ(words2[index])}
                    </div>
                  </div>
              ))}
            </div>
          </div>


                    <IonFab vertical="bottom" horizontal="start" slot="fixed" className="custom-home-fab">
                  <IonFabButton className="custom-home-button" onClick={() => history.push('/map3')}>
                    <span className="custom-home-emoji" title="Go to Map">🏠</span>
                  </IonFabButton>
                </IonFab>
          

          {/* Next Level Button */}
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={() => history.push('/LiteraJLevel1')}>
              <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title="Litera J Level 1" aria-label="Next level" onMouseEnter={playHoverSoundAvanseaza} />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
  );
};

export default LiteraJ;