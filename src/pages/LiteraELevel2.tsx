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
import "./LiteraELevel2.css";
import "./Home.css";
import CustomToolbar from "../components/CustomToolbar";
import Bravo from "../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3";
import Avanseaza from "../assets/sounds/nivelul-urmator!.mp3";
import erou from "../assets/images/erou.png";
import elefant from "../assets/images/elefant.png";
import evantai from "../assets/images/evantai.png";
import { RouteComponentProps } from "react-router";
import { increaseScore } from "./Home";
import Repeta from '../assets/sounds/intoarce-cartonase-E.mp3';
import erouAudio from '../assets/sounds/Erou.mp3';
import elefantAudio from '../assets/sounds/Elefant.mp3';
import evantaiAudio from '../assets/sounds/Evantai.mp3';

import LitEL2 from "../assets/sounds/intoarce-cartonase-E.mp3";

const LiteraELevel2: React.FC<RouteComponentProps> = ({ history }) => {
  const [cards, setCards] = useState([
    { id: 1, text: "EROU", img: erou, revealed: false },
    { id: 2, text: "ELEFANT", img: elefant, revealed: false },
    { id: 3, text: "EVANTAI", img: evantai, revealed: false },
    { id: 4, text: "EROU", img: erou, revealed: false },
    { id: 5, text: "ELEFANT", img: elefant, revealed: false },
    { id: 6, text: "EVANTAI", img: evantai, revealed: false },
  ]);

  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);



  useEffect(() => {
    const audioTimeout = setTimeout(() => {
      const audioPlayer = new Audio(LitEL2);
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
            case "EROU":
                audio = new Audio(erouAudio);
                break;
            case "ELEFANT":
                audio = new Audio(elefantAudio);
                break;
            case "EVANTAI":
                audio = new Audio(evantaiAudio);
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
        // Pereche corectă
        setMatchedCards((prev) => [...prev, firstCard.id, secondCard.id]);
        increaseScore(); // Adăugare monede după fiecare pereche

        // Verificare completare joc
        if (matchedCards.length + 2 === cards.length) {
          const audio = new Audio(Bravo);
          audio.play();

          setIsNextLevelDisabled(false); // Activare buton pentru următorul nivel
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
          title="Litera E Level 2 - Memory Game"
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
                      <strong className="highlight">E</strong>
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
            onClick={() => history.push("/LiteraI")}
            disabled={isNextLevelDisabled}
          >
            <IonIcon
              icon={arrowForwardOutline}
              className="black-icon big-arrow"
              title="Litera I"
              aria-label="Next level"
              onMouseEnter={playHoverSoundAvanseaza}
            />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default LiteraELevel2;