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
import "./LiteraHLevel2.css";
import "./Home.css";
import CustomToolbar from "../components/CustomToolbar";
import Bravo from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import Avanseaza from "../assets/sounds/nivelul-urmator!.mp3";
import harta from "../assets/images/harta.png";
import hartie from "../assets/images/hartie.png";
import haina from "../assets/images/haina.png";
import { RouteComponentProps } from "react-router";
import { increaseScore } from "./Home";
import Repeta from '../assets/sounds/intoarce-cartonase-litera-H.mp3';

import HartaSound from "../assets/sounds/harta!.mp3";
import HartieSound from "../assets/sounds/hartie!.mp3";
import HainaSound from "../assets/sounds/haina!.mp3";



const LiteraHLevel2: React.FC<RouteComponentProps> = ({ history }) => {
    const [cards, setCards] = useState([
      { id: 1, text: "HARTA", img: harta, revealed: false },
      { id: 2, text: "HARTIE", img: hartie, revealed: false },
      { id: 3, text: "HAINA", img: haina, revealed: false },
      { id: 4, text: "HARTA", img: harta, revealed: false },
      { id: 5, text: "HARTIE", img: hartie, revealed: false },
      { id: 6, text: "HAINA", img: haina, revealed: false },
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
          case "HARTA":
            audio = new Audio(HartaSound);
            break;
          case "HARTIE":
            audio = new Audio(HartieSound);
            break;
          case "HAINA":
            audio = new Audio(HainaSound);
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
            }, 500); // Sunet "Bravo" după o mică pauză
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
            title="Litera H Level 2 - Memory Game"
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
                        <strong className="highlight">H</strong>
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




                    <IonFab vertical="bottom" horizontal="start" slot="fixed" className="custom-home-fab">
                  <IonFabButton className="custom-home-button" onClick={() => history.push('/map3')}>
                    <span className="custom-home-emoji" title="Go to Map">🏠</span>
                  </IonFabButton>
                </IonFab>
          
  
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton
              onClick={() => history.push("/LiteraHLevel2")}
              disabled={isNextLevelDisabled}
            >
              <IonIcon
                icon={arrowForwardOutline}
                className="black-icon big-arrow"
                title="Litera S"
                aria-label="Next level"
                onMouseEnter={playHoverSoundAvanseaza}
              />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    );
  };

export default LiteraHLevel2;
