import React from 'react';
import { IonToolbar, IonTitle, IonImg,IonIcon,IonButton } from '@ionic/react';
import { getScore } from '../pages/Home';
import coins from '../assets/images/coins.png';

import { arrowBack, play, playCircle, playCircleOutline } from 'ionicons/icons';

interface CustomToolbarProps {
    title: string;
    titleStyle?: string;
    onPlayClick?: () => void; 
    onBackClick?: () => void;
 
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ title, titleStyle, onPlayClick, onBackClick }) => {
    const toolbarStyle: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: '65px',
      padding: '0 10px',
    };
  
    const leftSectionStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flex: 1,
    };
  
    const centerSectionStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    };
  
    const iconStyle: React.CSSProperties = {
      fontSize: '50px',
    };
  
    const coinsStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '10px',
    };
  
    const rightSectionStyle: React.CSSProperties = {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      visibility: 'hidden', // Optional: Keeps spacing consistent for right-aligned items
    };
  
    return (
      <IonToolbar>
        <div style={toolbarStyle}>
          {/* Left Section: Back Arrow */}
          <div style={leftSectionStyle}>
            <IonButton fill="clear" onClick={onBackClick}>
              <IonIcon icon={arrowBack} style={{ fontSize: '30px' }} />
            </IonButton>
          </div>
  
          {/* Center Section: Play Button and Coins */}
          <div style={centerSectionStyle}>
            <IonButton fill="clear" onClick={onPlayClick}>
              <IonIcon icon={playCircleOutline} style={iconStyle} />
            </IonButton>
            <div style={coinsStyle}>
              <IonTitle className="score" style={{ marginRight: '5px' }}>
                {getScore()}
              </IonTitle>
              <IonImg src={coins} alt="Coins" style={{ width: '55px' }} />
            </div>
          </div>
  
          {/* Right Section (Empty, Placeholder for Consistent Layout) */}
          <div style={rightSectionStyle}></div>
        </div>
      </IonToolbar>
    );
  };
  
  export default CustomToolbar;
