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
  const location = useLocation(); // Get the current route location
  const history = useHistory(); // To navigate to the maps
  
  
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
      flex: 0.5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
       
    };

    const handleMapNavigation = () => {
      history.push('/map1');
      
      // Verifică ruta curentă și navighează la ruta dorită
      // if (location.pathname === '/map1') {
      //   history.push('/map1'); // Navighează la map1
      // } else if (location.pathname === '/map2') {
      //   history.push('/map2'); // Navighează la map2
      // } else if (location.pathname === '/map3') {
      //   history.push('/map3'); // Navighează la map3
      // }


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
       
       {/* Right Section: Map Icon */}
       <div style={rightSectionStyle}>
          <IonButton fill="clear" onClick={handleMapNavigation}>
            <IonIcon icon={mapOutline} style={iconStyle} />
          </IonButton>
        </div>
       
       
        </div>
      </IonToolbar>
    );
  };
  
  export default CustomToolbar;
