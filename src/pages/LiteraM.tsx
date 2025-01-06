import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './Litere.css';

import camila from '../assets/images/camila.png';
import moara from '../assets/images/moara.png';
import morcov from '../assets/images/morcov.png';
import minge from '../assets/images/minge.png';
import umbrela from '../assets/images/umbrela.png';
import mar from '../assets/images/mar.png';
import lampa from '../assets/images/lampa.png';
import munte from '../assets/images/munte.png';

import CamilaAudio from '../assets/sounds/Camila.mp3';
import MoaraAudio from '../assets/sounds/Moara.mp3';
import MorcovAudio from '../assets/sounds/Morcov.mp3';
import MingeAudio from '../assets/sounds/Minge.mp3';
import UmbrelaAudio from '../assets/sounds/Umbrela.mp3';
import MarAudio from '../assets/sounds/Mar.mp3';
import LampaAudio from '../assets/sounds/Lampa.mp3';
import MunteAudio from '../assets/sounds/Munte.mp3';


import M from '../assets/sounds/M.mp3';

import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';

const LiteraA: React.FC<RouteComponentProps> = ({ history }) => {
    const images1 = [camila, moara, lampa , morcov]; // Adăugăm masa la primul rând
    const images2 = [minge, umbrela, mar, munte]; // Adăugăm mac la al doilea rând
    const audios = [CamilaAudio, MoaraAudio, LampaAudio, MorcovAudio, MingeAudio, UmbrelaAudio, MarAudio, MunteAudio];
    const words1 = ['CAMILA', 'MOARA', 'LAMPA', 'MORCOV']; // Text pentru primul rând
    const words2 = ['MINGE', 'UMBRELA', 'MAR', 'MUNTE']; // Text pentru al doilea rând

    const playAudio = (index: number) => {
        const audio = new Audio(audios[index]);
        audio.playbackRate = 0.8;
        audio.play();
    };

    const playHoverSound = () => {
        const audio = new Audio(M);
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

    const formatWordWithBoldA = (word: string) => {
        return (
            <>
                {word.split('').map((char, index) => (
                    <span key={index} className={char === 'M' ? 'highlight' : ''}>
            {char}
          </span>
                ))}
            </>
        );
    };

    return (
        <IonPage>
            <IonHeader>
                <CustomToolbar title="Litera M" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
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
                                    {formatWordWithBoldA(words1[index])}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Letter display */}
                    <div className="letter" onMouseEnter={playHoverSound}>
                        <div className="letter-content">M</div>
                    </div>

                    {/* Second row of images */}
                    <div className="round-buttons">
                        {[0, 1, 2, 3].map((index) => (
                            <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index + 4)}>
                                <div style={{ width: '120px', height: '120px', margin: 10, cursor: 'pointer' }}>
                                    <img src={images2[index]} style={{ width: '100%', height: '100%' }} />
                                </div>
                                <div className="audio-label" style={{ fontSize: '0.9em' }}>
                                    {formatWordWithBoldA(words2[index])}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>



              <IonFab vertical="bottom" horizontal="start" slot="fixed" className="custom-home-fab">
        <IonFabButton className="custom-home-button" onClick={() => history.push('/map2')}>
          <span className="custom-home-emoji" title="Go to Map">🏠</span>
        </IonFabButton>
      </IonFab>








                {/* Next Level Button */}
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => history.push('/LiteraMLevel1')}>
                        <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title="Litera M Level 1" aria-label="Next level" onMouseEnter={playHoverSoundAvanseaza} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default LiteraA;
