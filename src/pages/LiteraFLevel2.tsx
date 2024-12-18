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
import "./LiteraFLevel2.css";
import "./Home.css";
import CustomToolbar from "../components/CustomToolbar";
import Bravo from "../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3";
import Avanseaza from "../assets/sounds/nivelul-urmator!.mp3";

import floare from "../assets/images/floare.png";
import fluture from "../assets/images/fluture.png";
import foc from "../assets/images/foc.png";
import fulg from "../assets/images/fulg.png";
import frunza from "../assets/images/frunza.png";
import fundita from "../assets/images/funda.png";

import { RouteComponentProps } from "react-router";

const LiteraFLevel2: React.FC<RouteComponentProps> = ({ history }) => {
    const [cards, setCards] = useState([
        { id: 1, text: "FLOARE", img: floare, revealed: false },
        { id: 2, text: "FLUTURE", img: fluture, revealed: false },
        { id: 3, text: "FOC", img: foc, revealed: false },
        { id: 4, text: "FOC", img: foc, revealed: false },
        { id: 5, text: "FLUTURE", img: fluture, revealed: false },
        { id: 6, text: "FLOARE", img: floare, revealed: false },
    ]);

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
                setMatchedCards((prev) => [...prev, firstCard.id, secondCard.id]);

                // Check if all cards are matched
                if (matchedCards.length + 2 === cards.length) {
                    audio.play();
                    setIsNextLevelDisabled(false); // Enable the next level button
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

    const handleBackClick = () => {
        history.goBack(); 
    };

    return (
        <IonPage>
            <IonHeader>
                <CustomToolbar
                    title="Litera F Level 2 - Memory Game"
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
                                            <strong className="highlight">F</strong>
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
                        onClick={() => history.push("/LiteraG")} // Use the correct next level path
                        disabled={isNextLevelDisabled}
                    >
                        <IonIcon
                            icon={arrowForwardOutline}
                            className="black-icon big-arrow"
                            title="Litera G"
                            aria-label="Next level"
                            onMouseEnter={playHoverSoundAvanseaza}
                        />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default LiteraFLevel2;

