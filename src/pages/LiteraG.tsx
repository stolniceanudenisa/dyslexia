import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './Litere.css';

import gaina from '../assets/images/gaina.png'
import geanta from '../assets/images/geanta.png'
import gura from '../assets/images/gura.png'
import gogoasa from '../assets/images/gogoasa.png'
import ghinda from '../assets/images/ghinda.png'
import minge from '../assets/images/minge.png'
import tigru from '../assets/images/tigru.png'
import girafa from '../assets/images/Girafa.png'


import GainaAudio from '../assets/sounds/GainaAudio.mp3'
import GeantaAudio from '../assets/sounds/GeantaAudio.mp3'
import GuraAudio from '../assets/sounds/GuraAudio.mp3'
import GogoasaAudio from '../assets/sounds/GogoasaAudio.mp3'
import GhindaAudio from '../assets/sounds/GhindaAudio.mp3'
import MingeAudio from '../assets/sounds/MingeAudio.mp3'
import TigruAudio from '../assets/sounds/TigruAudio.mp3'
import GirafaAudio from '../assets/sounds/GirafaAudio.mp3'

import G from '../assets/sounds/G!.mp3'

import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';
import { arrowForwardOutline } from 'ionicons/icons';

const LiteraG: React.FC<RouteComponentProps> = ({ history }) => {
    const images1 = [gaina, geanta, gura, gogoasa]; // Adăugăm masa la primul rând
    const images2 = [ghinda, minge, tigru, girafa]; // Adăugăm mac la al doilea rând
    const audios = [GainaAudio, GeantaAudio, GuraAudio, GogoasaAudio, GhindaAudio, MingeAudio, TigruAudio, GirafaAudio];
    const words1 = ['GAINA', 'GEANTA', 'GURA', 'GOGOASA']; // Text pentru primul rând
    const words2 = ['GHINDA', 'MINGE', 'TIGRU', 'GIRAFA']; // Text pentru al doilea rând

    const playAudio = (index: number) => {
        const audio = new Audio(audios[index]);
        audio.playbackRate = 0.8;
        audio.play();
    };

    const playHoverSound = () => {
        const audio = new Audio(G);
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

    const formatWordWithBoldG = (word: string) => {
        return (
            <>
                {word.split('').map((char, index) => (
                    <span key={index} className={char === 'G' ? 'highlight' : ''}>
            {char}
          </span>
                ))}
            </>
        );
    };

    return (
        <IonPage>
            <IonHeader>
                <CustomToolbar title="Litera G" titleStyle="title" onPlayClick={playClickAudio} onBackClick={() => history.goBack()} />
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
                                    {formatWordWithBoldG(words1[index])}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Letter display */}
                    <div className="letter" onMouseEnter={playHoverSound}>
                        <div className="letter-content">G</div>
                    </div>

                    {/* Second row of images */}
                    <div className="round-buttons">
                        {[0, 1, 2, 3].map((index) => (
                            <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index + 4)}>
                                <div style={{ width: '120px', height: '120px', margin: 10, cursor: 'pointer' }}>
                                    <img src={images2[index]} style={{ width: '100%', height: '100%' }} />
                                </div>
                                <div className="audio-label" style={{ fontSize: '0.9em' }}>
                                    {formatWordWithBoldG(words2[index])}
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
                    <IonFabButton onClick={() => history.push('/LiteraGLevel1')}>
                        <IonIcon icon={arrowForwardOutline} className="black-icon big-arrow" title="Litera G Level 1" aria-label="Next level" onMouseEnter={playHoverSoundAvanseaza} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default LiteraG;
