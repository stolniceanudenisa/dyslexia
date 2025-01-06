import React from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './Litere.css';
import harta from '../assets/images/harta.png';
import pahar from '../assets/images/pahar.png';
import hotel from '../assets/images/hotel.png';
import hartie from '../assets/images/hartie.png';
import zahar from '../assets/images/zahar.png';
import hamster from '../assets/images/harpa.png';
import haina from '../assets/images/haina.png';
import helicopter from '../assets/images/homar.png';

import HartaAudio from '../assets/sounds/harta.mp3';
import PaharAudio from '../assets/sounds/pahar.mp3';
import HotelAudio from '../assets/sounds/hotel.mp3';
import HartieAudio from '../assets/sounds/hartie.mp3';
import ZaharAudio from '../assets/sounds/Zahar.mp3';
import HamsterAudio from '../assets/sounds/harpa.mp3';
import HainaAudio from '../assets/sounds/haina.mp3';
import HelicopterAudio from '../assets/sounds/homar.mp3';

import H from '../assets/sounds/H!.mp3';

import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';

const LiteraH: React.FC<RouteComponentProps> = ({ history }) => {
  const images1 = [harta, pahar, hotel, hartie]; // First row images
  const images2 = [zahar, hamster, haina, helicopter]; // Second row images
  const audios = [HartaAudio, PaharAudio, HotelAudio, HartieAudio, ZaharAudio, HamsterAudio, HainaAudio, HelicopterAudio]; // Audio files
  const words1 = ['HARTA', 'PAHAR', 'HOTEL', 'HARTIE']; // First row words
  const words2 = ['ZAHAR', 'HARPA', 'HAINA', 'HOMAR']; // Second row words

  const playAudio = (index: number) => {
    const audio = new Audio(audios[index]);
    audio.playbackRate = 0.8;
    audio.play();
  };

  const playHoverSound = () => {
    const audio = new Audio(H);
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

  const formatWordWithBoldH = (word: string) => {
    return (
        <>
          {word.split('').map((char, index) => (
              <span key={index} className={char === 'H' ? 'highlight' : ''}>
            {char}
          </span>
          ))}
        </>
    );
  };

  return (
      <IonPage>
        <IonHeader>
          <CustomToolbar title="Litera H" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
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
                      {formatWordWithBoldH(words1[index])}
                    </div>
                  </div>
              ))}
            </div>

            {/* Letter display */}
            <div className="letter" onMouseEnter={playHoverSound}>
              <div className="letter-content">H</div>
            </div>

            {/* Second row of images */}
            <div className="round-buttons">
              {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index + 4)}>
                    <div style={{ width: '120px', height: '120px', margin: 10, cursor: 'pointer' }}>
                      <img src={images2[index]} style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div className="audio-label" style={{ fontSize: '0.9em' }}>
                      {formatWordWithBoldH(words2[index])}
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
            <IonFabButton onClick={() => history.push('/LiteraHLevel1')}>
              <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title="Litera H Level 1" aria-label="Next level" onMouseEnter={playHoverSoundAvanseaza} />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
  );
};

export default LiteraH;
