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
import "./LiteraELevel2.css";
import "./Home.css";
import CustomToolbar from "../components/CustomToolbar";
import Bravo from "../assets/sounds/BravoFinalJoc.mp3";
import Avanseaza from "../assets/sounds/nivelul-urmator!.mp3";
import nuca from "../assets/images/nuca.png";
import nas from "../assets/images/nas.png";
import nufar from "../assets/images/nufar.png";
import { RouteComponentProps } from "react-router";

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

                // Check if all cards are matched
                if (matchedCards.length + 2 === cards.length) {
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
        // Navigate back to the previous page or a valid route
        history.goBack(); // Ensure the goBack() works correctly with your app structure
    };

    return (
        <IonPage>
            <IonHeader>
                <CustomToolbar
                    title="Litera N Level 2 - Memory Game"
                    onBackClick={handleBackClick} // Use handleBackClick instead of history.goBack directly
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
                        onClick={() => history.push("/LiteraP")} // Use the correct next level path
                        disabled={isNextLevelDisabled}
                    >
                        <IonIcon
                            icon={arrowForwardOutline}
                            className="black-icon big-arrow"
                            title="Litera P"
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
