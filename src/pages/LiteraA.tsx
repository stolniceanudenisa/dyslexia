import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './Litere.css';
import apa from '../assets/images/apa.png';
import avion from '../assets/images/avion.png';
import albina from '../assets/images/albina.png';
import arici from '../assets/images/arici.png';
import ApaAudio from '../assets/sounds/apa!.mp3';
import AriciAudio from '../assets/sounds/Arici.mp3';
import AvionAudio from '../assets/sounds/Avion.mp3';
import AlbinaAudio from '../assets/sounds/albina!.mp3';
import A from '../assets/sounds/A!.mp3';
import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';

const LiteraA: React.FC<RouteComponentProps> = ({ history }) => {
  const images1 = [apa, avion];
  const images2 = [albina, arici];
  const audios = [ApaAudio, AvionAudio, AlbinaAudio, AriciAudio];
  const words1 = ['APA', 'AVION'];
  const words2 = ['ALBINA', 'ARICI'];


  const playAudio = (index: number) => {
    const audio = new Audio(audios[index]);
    audio.playbackRate = 0.8;
    audio.play();
  };

  const playHoverSound = () => {
    const audio = new Audio(A);
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

  return (
    <IonPage>
      <IonHeader>
        <CustomToolbar title="Litera A" titleStyle='title' onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
      </IonHeader>

      <IonContent className='letter-page' scrollY={false}>
        <div className="container">
          {/* First row of images */}
          <div className="round-buttons">
            {[0, 1].map((index) => (
              <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index)}>
                <div style={{ width: '150px', height: '150px', margin: 20, cursor: 'pointer' }}>
                  <img src={images1[index]} style={{ width: '100%', height: '100%' }} />
                </div>
                <div className="audio-label" style={{ fontSize: '0.9em' }}>
                  <strong className="first-letter">{words1[index].charAt(0)}</strong>
                  {words1[index].substring(1)}
                </div>
              </div>
            ))}
          </div>

          {/* Letter display */}
          <div className="letter" onMouseEnter={playHoverSound}>
            <div className="letter-content">A</div>
          </div>

          {/* Second row of images */}
          <div className="round-buttons">
            {[0, 1].map((index) => (
              <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index + 2)}>
                <div style={{ width: '150px', height: '150px', margin: 20, cursor: 'pointer' }}>
                  <img src={images2[index]} style={{ width: '100%', height: '100%' }} />
                </div>
                <div className="audio-label" style={{ fontSize: '0.9em' }}>
                  <strong className="first-letter">{words2[index].charAt(0)}</strong>
                  {words2[index].substring(1)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Level Button */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/LiteraALevel1')}>
            <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title='Litera A Level 1' aria-label='Next level' onMouseEnter={playHoverSoundAvanseaza} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default LiteraA;
