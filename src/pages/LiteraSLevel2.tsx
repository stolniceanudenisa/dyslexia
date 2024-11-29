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
import "./LiteraSLevel2.css"; // Schimbă stilul pentru Litera S
import "./Home.css";
import CustomToolbar from "../components/CustomToolbar";
import Bravo from "../assets/sounds/BravoFinalJoc.mp3";
import Avanseaza from "../assets/sounds/nivelul-urmator!.mp3";
import stilou from "../assets/images/stilou.png"; // Imaginile trebuie actualizate corespunzător
import stea from "../assets/images/stea.png";
import salata from "../assets/images/salata.png"; // Păstrăm salata pentru "SALATA"
import sare from "../assets/images/sare.png"; // Imaginile pentru "SARE"
import { RouteComponentProps } from "react-router";

const LiteraSLevel2: React.FC<RouteComponentProps> = ({ history }) => {
  // Adăugăm perechi de carduri pentru a fi plasate pe laturi opuse
  const initialCards = [
    { id: 1, text: "STEA", img: stea, revealed: false },
    { id: 2, text: "SALATA", img: salata, revealed: false },
    { id: 3, text: "SARE", img: sare, revealed: false },
    { id: 4, text: "STEA", img: stea, revealed: false },
    { id: 5, text: "SALATA", img: salata, revealed: false },
    { id: 6, text: "SARE", img: sare, revealed: false },
  ];

  // Funcție pentru amestecarea cardurilor
  const shuffleCards = (cards: any[]) => {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap
    }
    return shuffled;
  };

  // Amestecăm cardurile pentru a le plasa aleatoriu pe laturi opuse
  const shuffledCards = shuffleCards(initialCards);

  const [cards, setCards] = useState(shuffledCards);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [isNextLevelDisabled, setIsNextLevelDisabled] = useState(true);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2 || matchedCards.includes(cardId)) {
      return;
    }

    const updatedFlippedCards = [...flippedCards, cardId];
    setFlippedCards(updatedFlippedCards);

    if (updatedFlippedCards.length === 2) {
      const [firstCard, secondCard] = updatedFlippedCards.map((id) =>
        cards.find((card) => card.id === id)
      );

      if (firstCard && secondCard && firstCard.text === secondCard.text) {
        const audio = new Audio(Bravo);
        audio.play();
        setMatchedCards((prev) => [...prev, firstCard.id, secondCard.id]);

        // Verifică dacă toate cardurile au fost potrivite
        if (matchedCards.length + 2 === cards.length) {
          setIsNextLevelDisabled(false); // Activează butonul pentru următorul nivel
        }
      }

      setTimeout(() => {
        setFlippedCards([]); // Resetează cardurile după o scurtă întârziere
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
    history.goBack(); // Asigură-te că funcția `goBack()` funcționează corect cu structura aplicației tale
  };

  return (
    <IonPage>
      <IonHeader>
        <CustomToolbar
          title="Litera S Level 2 - Memory Game"
          onBackClick={handleBackClick}
        />
      </IonHeader>
      <IonContent className="memory-game-content">
        <IonGrid>
          <IonRow>
            {/* Creăm 2 rânduri pentru a plasa cardurile pe laturi opuse */}
            {cards.map((card, index) => {
              // Încearcă să plasezi cardurile pe laturi opuse
              const isLeftColumn = index % 2 === 0; // Cardurile pare (0, 2, 4) vor fi pe coloana din stânga
              return (
                <IonCol
                  key={card.id}
                  size="6"
                  className={`card-container ${isLeftColumn ? "left-column" : "right-column"}`}
                >
                  <div
                    className={`memory-card ${isRevealed(card.id) ? "revealed" : ""}`}
                    onClick={() => handleCardClick(card.id)}
                  >
                    {isRevealed(card.id) ? (
                      <div className="card-content">
                        <strong className="highlight">S</strong>
                        {card.text.slice(1)} {/* Display the text after 'S' */}
                        <img src={card.img} alt={card.text} className="card-image" />
                      </div>
                    ) : (
                      <div className="card-back">?</div>
                    )}
                  </div>
                </IonCol>
              );
            })}
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
