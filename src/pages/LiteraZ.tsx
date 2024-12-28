import React from 'react';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './Litere.css';
import { arrowForwardOutline } from 'ionicons/icons';

// Imagini asociate literei Z
import vaza from '../assets/images/vaza.png';
import zmeu from '../assets/images/zmeu.png';
import zahăr from '../assets/images/zahar.png';
import roz from '../assets/images/roz.png';

import zmeura from '../assets/images/zmeura.png'; // Imagine nouă pentru Zmeură
import mazare from '../assets/images/mazare.png';
import zână from '../assets/images/zana.png';
import zambila from '../assets/images/zambila.png';

// Fișiere audio asociate cu cuvintele literei Z
import VazaAudio from '../assets/sounds/vaza.mp3';
import ZmeuAudio from '../assets/sounds/zmeu.mp3';
import ZaharAudio from '../assets/sounds/zahar.mp3';
import RozAudio from '../assets/sounds/roz.mp3';

import ZmeuraAudio from '../assets/sounds/zmeura.mp3'; // Audio nou pentru Zmeură
import MazareAudio from '../assets/sounds/mazare.mp3';
import ZanaAudio from '../assets/sounds/zana.mp3';
import ZambilaAudio from '../assets/sounds/zambila.mp3';

// Alte fișiere audio
import Z from '../assets/sounds/Z.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import Repeta from '../assets/sounds/RepetaDupaMine.mp3';

import CustomToolbar from '../components/CustomToolbar';
import { RouteComponentProps } from 'react-router';

const LiteraZ: React.FC<RouteComponentProps> = ({ history }) => {
    const images1 = [vaza, zmeu, zahăr, roz];
    const images2 = [zmeura, mazare, zână, zambila]; // Zmeura în loc de Zar
    const audios = [
        VazaAudio, ZmeuAudio, ZaharAudio, RozAudio,
        ZmeuraAudio, MazareAudio, ZanaAudio, ZambilaAudio
    ];
    const words1 = ['VAZĂ', 'ZMEU', 'ZAHĂR', 'ROZ'];
    const words2 = ['ZMEURĂ', 'MAZĂRE', 'ZÂNĂ', 'ZAMBILĂ']; // Zmeură în loc de Zar

    const playAudio = (index: number) => {
        const audio = new Audio(audios[index]);
        audio.playbackRate = 0.8;
        audio.play();
    };

    const playHoverSound = () => {
        const audio = new Audio(Z);
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

    const formatWordWithBoldZ = (word: string) => {
        return (
            <>
                {word.split('').map((char, index) => (
                    <span key={index} className={char === 'Z' ? 'highlight' : ''}>
                        {char}
                    </span>
                ))}
            </>
        );
    };

    return (
        <IonPage>
            <IonHeader>
                <CustomToolbar
                    title="Litera Z"
                    titleStyle="title"
                    onPlayClick={playClickAudio}
                    onBackClick={() => history.goBack()}
                />
            </IonHeader>

            <IonContent className="letter-page" scrollY={false}>
                <div className="container">
                    {/* Primul rând de imagini */}
                    <div className="round-buttons">
                        {[0, 1, 2, 3].map((index) => (
                            <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index)}>
                                <div style={{ width: '98px', height: '98px', margin: 20, cursor: 'pointer' }}>
                                    <img
                                        src={images1[index]}
                                        style={{ width: '100%', height: '100%' }}
                                        alt={`Litera Z - ${words1[index]}`}
                                    />
                                </div>
                                <div className="audio-label" style={{ fontSize: '0.9em' }}>
                                    {formatWordWithBoldZ(words1[index])}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Afișarea literei */}
                    <div className="letter" onMouseEnter={playHoverSound}>
                        <div className="letter-content">Z</div>
                    </div>

                    {/* Al doilea rând de imagini */}
                    <div className="round-buttons">
                        {[0, 1, 2, 3].map((index) => (
                            <div key={index} className="audio-buttons-grid" onClick={() => playAudio(index + 4)}>
                                <div style={{ width: '98px', height: '98px', margin: 20, cursor: 'pointer' }}>
                                    <img
                                        src={images2[index]}
                                        style={{ width: '100%', height: '100%' }}
                                        alt={`Litera Z - ${words2[index]}`}
                                    />
                                </div>
                                <div className="audio-label" style={{ fontSize: '0.9em' }}>
                                    {formatWordWithBoldZ(words2[index])}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Butonul de avansare la următorul nivel */}
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => history.push('/LiteraZLevel1')}>
                        <IonIcon
                            icon={arrowForwardOutline}
                            className="black-icon big-arrow"
                            title="Litera Z Level 1"
                            aria-label="Next level"
                            onMouseEnter={playHoverSoundAvanseaza}
                        />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default LiteraZ;
