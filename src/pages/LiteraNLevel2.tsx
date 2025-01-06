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
import Bravo from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import Avanseaza from "../assets/sounds/nivelul-urmator!.mp3";
import nuca from "../assets/images/nuca.png";
import nas from "../assets/images/nas.png";
import nufar from "../assets/images/nufar.png";
import { RouteComponentProps } from "react-router";
import NucaSound from "../assets/sounds/nuca.mp3";
import NasSound from "../assets/sounds/nas.mp3";
import NufarSound from "../assets/sounds/nufar.mp3";

import { increaseScore } from "./Home";
import Repeta from '../assets/sounds/intoarce-cartonase-E.mp3';



const LiteraNLevel2: React.FC<RouteComponentProps> = ({ history }) => {
    const [cards, setCards] = useState([
      { id: 1, text: "NUCA", img: nuca, revealed: false },
      { id: 2, text: "NAS", img: nas, revealed: false },
      { id: 3, text: "NUFAR", img: nufar, revealed: false },
      { id: 4, text: "NUCA", img: nuca, revealed: false },
      { id: 5, text: "NAS", img: nas, revealed: false },
      { id: 6, text: "NUFAR", img: nufar, revealed: false },
    ]);
  
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
          case "NUCA":
            audio = new Audio(NucaSound);
            break;
          case "NAS":
            audio = new Audio(NasSound);
            break;
          case "NUFAR":
            audio = new Audio(NufarSound);
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
          increaseScore(); // Creștere scor după pereche corectă
  
          if (matchedCards.length + 2 === cards.length) {
            setTimeout(() => {
              const audio = new Audio(Bravo);
              audio.play();
            }, 500); // Sunet "Bravo" după o scurtă pauză
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
            title="Litera N Level 2 - Memory Game"
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
                        <strong className="highlight">N</strong>
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
              onClick={() => history.push("/LiteraNLevel3")}
              disabled={isNextLevelDisabled}
            >
              <IonIcon
                icon={arrowForwardOutline}
                className="black-icon big-arrow"
                title="Litera F"
                aria-label="Next level"
                onMouseEnter={playHoverSoundAvanseaza}
              />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    );
  };
  
export default LiteraNLevel2;
