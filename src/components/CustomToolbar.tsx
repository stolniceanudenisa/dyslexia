import React from 'react';
import { IonToolbar, IonTitle, IonImg,IonIcon,IonButton } from '@ionic/react';
import { getScore } from '../pages/Home';
import coins from '../assets/images/coins.png';
import { useLocation, useHistory } from 'react-router-dom';
import { arrowBack, play, playCircle, playCircleOutline, mapOutline} from 'ionicons/icons';

interface CustomToolbarProps {
    title: string;
    titleStyle?: string;
    onPlayClick?: () => void; 
    onBackClick?: () => void;
 
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ title, titleStyle, onPlayClick, onBackClick }) => {
  const toolbarStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '65px',
    padding: '0 10px',
  };

  const leftSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
    left: '10px',
  };

  const centerSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const iconStyle: React.CSSProperties = {
    fontSize: '50px',
  };

  const coinsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '10px',
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
      </div>
    </IonToolbar>
  );
};
  
  export default CustomToolbar;
