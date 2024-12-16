import React, { FC, useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonButton, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';

import './LiteraULevel2.css';

import { increaseScore } from './Home';
import Bravo from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import UAudio from '../assets/sounds/U!.mp3';
import CustomToolbar from '../components/CustomToolbar';
import Repeta from '../assets/sounds/RepetaDupaMine.mp3';
import Avanseaza from '../assets/sounds/nivelul-urmator!.mp3';
import { arrowForwardOutline, umbrella } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';

import unt from "../assets/images/unt.png";
import unicorn from "../assets/images/unicorn.png";
import umbrela from "../assets/images/umbrela.png";
import LitUL2 from "../assets/sounds/intoarce-cartonase-U.mp3";
import untAudio from '../assets/sounds/unt.mp3';
import unicornAudio from '../assets/sounds/Unicorn.mp3';
import umbrelaAudio from '../assets/sounds/Umbrela.mp3';


const LiteraULevel2: React.FC<RouteComponentProps> = ({ history }) => {
  const [cards, setCards] = useState([
    { id: 1, text: "UNT", img: unt, revealed: false },
    { id: 2, text: "UNICORN", img: unicorn, revealed: false },
    { id: 3, text: "UMBRELA", img: umbrela, revealed: false },
    { id: 4, text: "UNT", img: unt, revealed: false },
    { id: 5, text: "UNICORN", img: unicorn, revealed: false },
    { id: 6, text: "UMBRELA", img: umbrela, revealed: false },
  ]);

  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);

  useEffect(() => {
    const audioTimeout = setTimeout(() => {
      const audioPlayer = new Audio(LitUL2);
      audioPlayer.play();
      return () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      };
    }, 1000);

    return () => clearTimeout(audioTimeout);
  }, []);



  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2 || matchedCards.includes(cardId)) {
      return;
    }

    const card = cards.find((card) => card.id === cardId);
    if (card) {
        let audio;
        switch (card.text) {
            case "UNT":
                audio = new Audio(untAudio);
                break;
            case "UNICORN":
                audio = new Audio(unicornAudio);
                break;
            case "UMBRELA":
                audio = new Audio(umbrelaAudio);
                break;
            default:
                break;
        }
        if (audio) {
            audio.play();
        }
    }


    const updatedFlippedCards = [...flippedCards, cardId];
    setFlippedCards(updatedFlippedCards);

    if (updatedFlippedCards.length === 2) {
      const [firstCard, secondCard] = updatedFlippedCards.map((id) =>
        cards.find((card) => card.id === id)
      );

      if (firstCard && secondCard && firstCard.text === secondCard.text) {
        setMatchedCards((prev) => [...prev, firstCard.id, secondCard.id]);
        increaseScore(); // Creștere scor după fiecare pereche corectă

        // Verificare dacă toate perechile sunt corect asociate
        if (matchedCards.length + 2 === cards.length) {
          // Redare sunet "Bravo" la completarea jocului

          const bravoAudio = new Audio(Bravo);
        setTimeout(() => {
        const bravoAudio = new Audio(Bravo);
        bravoAudio.play();
      }, 1000);

          setIsNextLevelDisabled(false); // Activare buton pentru următorul nivel
        }
      }

      setTimeout(() => {
        setFlippedCards([]); // Resetează cărțile răsucite după un mic delay
      }, 1000);
    }
  };

  const isRevealed = (cardId: number) =>
    flippedCards.includes(cardId) || matchedCards.includes(cardId);

  const playHoverSoundAvanseaza = () => {
    const audio = new Audio(Avanseaza);
    audio.play();
  };

  const handleBackClick = () => {
    history.goBack(); // Navighează înapoi la pagina anterioară
  };

  return (
    <IonPage>
      <IonHeader>
        <CustomToolbar
          title="Litera U Level 2 - Memory Game"
          onBackClick={handleBackClick}
        />
      </IonHeader>
      <IonContent className="memory-game-content">
        <IonGrid>
          <IonRow>
            {cards.map((card) => (
              <IonCol size="6" key={card.id} className="card-container">
                <div
                  className={`memory-card ${isRevealed(card.id) ? "revealed" : ""}`}
                  onClick={() => handleCardClick(card.id)}
                >
                  {isRevealed(card.id) ? (
                    <div className="card-content">
                      <strong className="highlight">U</strong>
                      {card.text.slice(1)}
                      <img src={card.img} alt={card.text} className="card-image" />
                    </div>
                  ) : (
                    <div className="card-back">?</div>
                  )}
                </div>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton
            onClick={() => history.push("/bonus-ocean")} // Navighează către următorul nivel (sau hartă)
            disabled={isNextLevelDisabled}
          >
            <IonIcon
              icon={arrowForwardOutline}
              className="black-icon big-arrow"
              title="maps"
              aria-label="Next level"
              onMouseEnter={playHoverSoundAvanseaza} // Sunet la hover
            />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};


export default LiteraULevel2;