import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './Litere.css';
import vaca from '../assets/images/vaca.png';
import val from '../assets/images/val.png';
import vapor from '../assets/images/vapor.png';
import vaza from '../assets/images/vaza.png';
import vesta from '../assets/images/vesta.png';
import veverita from '../assets/images/veverita.png';
import vioara from '../assets/images/vioara.png';
import vulcan from '../assets/images/vulcan.png';

import VacaAudio from '../assets/sounds/vaca.mp3';
import ValAudio from '../assets/sounds/val.mp3';
import VaporAudio from '../assets/sounds/vapor.mp3';
import VazaAudio from '../assets/sounds/Vaza.mp3';
import VestaAudio from '../assets/sounds/vesta.mp3';
import VeveritaAudio from '../assets/sounds/veverita.mp3';
import VioaraAudio from '../assets/sounds/vioara.mp3';
import VulcanAudio from '../assets/sounds/vulcan.mp3';


import V from '../assets/sounds/V.mp3';

import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';

const LiteraV: React.FC<RouteComponentProps> = ({ history }) => {
    const images1 = [vaca, veverita, vapor, vaza];  
    const images2 = [vesta, val, vioara, vulcan];  
    const audios = [VacaAudio, VeveritaAudio, VaporAudio, VazaAudio, VestaAudio, ValAudio, VioaraAudio, VulcanAudio]; 
    const words1 = ['VACA', 'VEVERITA', 'VAPOR', 'VAZA'];  
    const words2 = ['VESTA', 'VAL', 'VIOARA', 'VULCAN'];  

    const playAudio = (index: number) => {
        const audio = new Audio(audios[index]);
        audio.playbackRate = 0.8;
        audio.play();
    };

    const playHoverSound = () => {
        const audio = new Audio(V);
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

    const formatWordWithBoldV = (word: string) => {
        return (
            <>
                {word.split('').map((char, index) => (
                    <span key={index} className={char === 'V' ? 'highlight' : ''}>
                        {char}
                    </span>
                ))}
            </>
        );
    };

    return (
        <IonPage>
            <IonHeader>
                <CustomToolbar title="Litera V" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
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
                                    {formatWordWithBoldV(words1[index])}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Letter display */}
                    <div className="letter" onMouseEnter={playHoverSound}>
                        <div className="letter-content">V</div>
                    </div>

                    {/* Second row of images */}
                    <div className="round-buttons">
                        {[0, 1, 2, 3].map((index) => (
                            <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index + 4)}>
                                <div style={{ width: '120px', height: '120px', margin: 10, cursor: 'pointer' }}>
                                    <img src={images2[index]} style={{ width: '100%', height: '100%' }} />
                                </div>
                                <div className="audio-label" style={{ fontSize: '0.9em' }}>
                                    {formatWordWithBoldV(words2[index])}
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
                    <IonFabButton onClick={() => history.push('/LiteraVLevel1')}>
                        <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title="Litera V Level 1" aria-label="Next level" onMouseEnter={playHoverSoundAvanseaza} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};


export default LiteraV;
