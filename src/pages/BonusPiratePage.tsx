import React, { FC, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import CustomToolbar from "../components/CustomToolbar";
import { RouteComponentProps } from "react-router";
import { arrowForwardOutline } from "ionicons/icons";

import "./BonusOceanPage.css";
import Pestisor from "../assets/sounds/felicitari-pirati.mp3";



const BonusOceanPage: FC<RouteComponentProps> = ({ history }) => {
  const playHoverSound = () => {
    const audio = new Audio("/assets/sounds/nivelul-urmator!.mp3");
    audio.play();
  };


    useEffect(() => {
      const audioTimeout = setTimeout(() => {
        const audioPlayer = new Audio(Pestisor);
        audioPlayer.play();
        return () => {
          audioPlayer.pause();
          audioPlayer.currentTime = 0;
        };
      }, 1000);
  
      return () => clearTimeout(audioTimeout);
    }, []);

  return (
    <IonPage>
      <IonHeader>
        <CustomToolbar
          title="PIRAȚII:"
          onBackClick={() => history.goBack()}
        />
      </IonHeader>



      <IonContent className="bonus-ocean-page-content">
        
        
{/*         
        <div className="video-container">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/watch?v=ROW0f1pJk94"    // de la 0:32
           
            title="Curiozitati despre pirati"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div> */}


<div className="video-container">
  {/* Embedded MP4 video with a poster image */}
  <video
    width="100%"
    height="100%"
    controls
    style={{ borderRadius: "8px" }}
    poster="src\assets\videos\pirati-poster.png" // Imaginea de previzualizare
  >
    <source src="src\assets\videos\pirati.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>
       


        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton
            onClick={() => history.push("/map3")}
            onMouseEnter={playHoverSound}
          >
            <IonIcon icon={arrowForwardOutline} className="big-arrow" />
          </IonFabButton>
        </IonFab>
      </IonContent>





    </IonPage>
  );
};

export default BonusOceanPage;
