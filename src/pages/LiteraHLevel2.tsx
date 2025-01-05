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
import "./LiteraHLevel2.css";
import "./Home.css";
import CustomToolbar from "../components/CustomToolbar";
import Bravo from '../assets/sounds/bravo-ai-castigat-toti-galbenii.mp3';
import Avanseaza from "../assets/sounds/nivelul-urmator!.mp3";
import harta from "../assets/images/harta.png";
import hartie from "../assets/images/hartie.png";
import haina from "../assets/images/haina.png";
import { RouteComponentProps } from "react-router";

const LiteraHLevel2: React.FC<RouteComponentProps> = ({ history }) => {
    const [cards, setCards] = useState([
        { id: 1, text: "HARTĂ", img: harta, revealed: false },
        { id: 2, text: "HÂRTIE", img: hartie, revealed: false },
        { id: 3, text: "HAINĂ", img: haina, revealed: false },
        { id: 4, text: "HARTĂ", img: harta, revealed: false },
        { id: 5, text: "HÂRTIE", img: hartie, revealed: false },
        { id: 6, text: "HAINĂ", img: haina, revealed: false },
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

                if (matchedCards.length + 2 === cards.length) {
                    setIsNextLevelDisabled(false);
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

    return (
        <IonPage>
            <IonHeader>
                <CustomToolbar
                    title="Litera H Level 2 - Memory Game"
                    onBackClick={() => history.goBack()}
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

                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton
                        onClick={() => history.push("/LiteraHLevel3")}
                        disabled={isNextLevelDisabled}
                    >
                        <IonIcon
                            icon={arrowForwardOutline}
                            className="black-icon big-arrow"
                            onMouseEnter={playHoverSoundAvanseaza}
                        />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default LiteraHLevel2;
