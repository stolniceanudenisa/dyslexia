import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { arrowForwardOutline } from "ionicons/icons";
import "./LiteraSLevel2.css";  
import "./Home.css";
import CustomToolbar from "../components/CustomToolbar";
import Bravo from "../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3";
import Avanseaza from "../assets/sounds/nivelul-urmator!.mp3";
import stilou from "../assets/images/stilou.png";  
import stea from "../assets/images/stea.png";
import salata from "../assets/images/salata.png";  
import sare from "../assets/images/sare.png";  
import { RouteComponentProps } from "react-router";

import { increaseScore } from "./Home";
import Repeta from '../assets/sounds/intoarce-cartonase-litera-S.mp3';
import SteaSound from "../assets/sounds/stea.mp3";
import SalataSound from "../assets/sounds/salata.mp3";
import SareSound from "../assets/sounds/sare.mp3";


const LiteraSLevel2: React.FC<RouteComponentProps> = ({ history }) => {
  const initialCards = [
    { id: 1, text: "STEA", img: stea, revealed: false },
    { id: 2, text: "SALATA", img: salata, revealed: false },
    { id: 3, text: "SARE", img: sare, revealed: false },
    { id: 4, text: "STEA", img: stea, revealed: false },
    { id: 5, text: "SALATA", img: salata, revealed: false },
    { id: 6, text: "SARE", img: sare, revealed: false },
  ];

  const shuffleCards = (cards: any[]) => {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const shuffledCards = shuffleCards(initialCards);

  const [cards, setCards] = useState(shuffledCards);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);

  useEffect(() => {
    const audioTimeout = setTimeout(() => {
      const audio = new Audio(Repeta);
      audio.play();
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
        case "STEA":
          audio = new Audio(SteaSound);
          break;
        case "SALATA":
          audio = new Audio(SalataSound);
          break;
        case "SARE":
          audio = new Audio(SareSound);
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

        if (matchedCards.length + 2 === cards.length) {
          setTimeout(() => {
            const audio = new Audio(Bravo);
            audio.play();
          }, 500); // Pauză scurtă înainte de sunetul "Bravo"
          setIsNextLevelDisabled(false); // Activează butonul pentru următorul nivel
        }
      }

      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  };

  const isRevealed = (cardId: number) =>
    flippedCards.includes(cardId) || matchedCards.includes(cardId);

  const playHoverSoundAvanseaza = () => {
    const audio = new Audio(Avanseaza);
    audio.play();
  };

  const playClickAudio = () => {
    const audio = new Audio(Repeta);
    audio.play();
  };

  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <CustomToolbar
          title="Litera S Level 2 - Memory Game"
          onPlayClick={playClickAudio}
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
                      <strong className="highlight">S</strong>
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
            onClick={() => history.push("/LiteraSLevel3")}
            disabled={isNextLevelDisabled}
          >
            <IonIcon
              icon={arrowForwardOutline}
              className="black-icon big-arrow"
              title="Litera S Level 3"
              aria-label="Next level"
              onMouseEnter={playHoverSoundAvanseaza}
            />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default LiteraSLevel2;
