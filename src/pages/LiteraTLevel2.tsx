import React, { useState } from "react";
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
import "./LiteraTLevel2.css";
import "./Home.css";
import CustomToolbar from "../components/CustomToolbar";
import Bravo from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import Avanseaza from "../assets/sounds/nivelul-urmator!.mp3";
import taur from "../assets/images/taur.png";
import timp from "../assets/images/timp.png";
import tort from "../assets/images/tort.png";
import taurAudio from "../assets/sounds/taur.mp3";
import timpAudio from "../assets/sounds/timp.mp3";
import tortAudio from "../assets/sounds/tort.mp3";
import { RouteComponentProps } from "react-router";
import { increaseScore } from "./Home";

const LiteraTLevel2: React.FC<RouteComponentProps> = ({ history }) => {
    const [cards, setCards] = useState([
      { id: 1, text: "TAUR", img: taur, revealed: false },
      { id: 2, text: "TIMP", img: timp, revealed: false },
      { id: 3, text: "TORT", img: tort, revealed: false },
      { id: 4, text: "TAUR", img: taur, revealed: false },
      { id: 5, text: "TIMP", img: timp, revealed: false },
      { id: 6, text: "TORT", img: tort, revealed: false },
    ]);
  
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [matchedCards, setMatchedCards] = useState<number[]>([]);
    const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);
    const [score, setScore] = useState(0);  // Adding a score state
  
    const handleCardClick = (cardId: number) => {
      if (flippedCards.length === 2 || matchedCards.includes(cardId)) {
        return;
      }
  
      const updatedFlippedCards = [...flippedCards, cardId];
      setFlippedCards(updatedFlippedCards);
  
      const card = cards.find((card) => card.id === cardId);
  
      // Play sound for the clicked card
      if (card) {
        let audio;
        switch (card.text) {
          case "TAUR":
            audio = new Audio(taurAudio);
            break;
          case "TIMP":
            audio = new Audio(timpAudio);
            break;
          case "TORT":
            audio = new Audio(tortAudio);
            break;
          default:
            break;
        }
        if (audio) {
          audio.play();
        }
      }
  
      if (updatedFlippedCards.length === 2) {
        const [firstCard, secondCard] = updatedFlippedCards.map((id) =>
          cards.find((card) => card.id === id)
        );
  
        if (firstCard && secondCard && firstCard.text === secondCard.text) {
          // Correct pair, increase score
          setMatchedCards((prev) => [...prev, firstCard.id, secondCard.id]);
           increaseScore();
  
          // Check if all pairs are matched
          if (matchedCards.length + 2 === cards.length) {
            const audio = new Audio(Bravo);
            audio.play();
  
            setIsNextLevelDisabled(false); // Enable next level button
          }
        }
  
        setTimeout(() => {
          setFlippedCards([]); // Reset flipped cards
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
      history.goBack(); // Go back to the previous page
    };
  
    return (
      <IonPage>
        <IonHeader>
          <CustomToolbar
            title="Litera T Level 2 - Memory Game"
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
                        {card.text.split("").map((char, index) =>
                          char.toUpperCase() === "T" ? (
                            <strong key={index} className="highlight">
                              {char}
                            </strong>
                          ) : (
                            char
                          )
                        )}
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
  
          <div className="score">Score: {score}</div> {/* Display score */}
  
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton
              onClick={() => history.push("/LiteraC")} // Next level route
              disabled={isNextLevelDisabled}
            >
              <IonIcon
                icon={arrowForwardOutline}
                className="black-icon big-arrow"
                title="Litera T Level 3"
                aria-label="Next level"
                onMouseEnter={playHoverSoundAvanseaza}
              />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    );
  };

export default LiteraTLevel2;
