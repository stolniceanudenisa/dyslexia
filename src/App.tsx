import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
 

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { colorFill, home } from 'ionicons/icons';
import LiteraE from './pages/LiteraE';
import LiteraI from './pages/LiteraI';
import LiteraO from './pages/LiteraO';
import LiteraU from './pages/LiteraU';


import Introduction from './pages/Introduction';
import InapoiAudio from './assets/sounds/InapoiLaHarta.mp3';
import LiteraALevel1 from './pages/LiteraALevel1';
import LiteraA from './pages/LiteraA';
import LiteraALevel2 from './pages/LiteraALevel2';
import MapSelection from './pages/MapSelection';
import Map1 from './pages/Map1';
import Map2 from './pages/Map2';
import Map3 from './pages/Map3';
import LiteraELevel1 from './pages/LiteraELevel1';
import LiteraILevel1 from './pages/LiteraILevel1';
import LiteraOLevel1 from './pages/LiteraOLevel1';
import LiteraULevel1 from './pages/LiteraULevel1';
import LiteraELevel2 from './pages/LiteraELevel2';
// import LiteraELevel1 from './pages/LiteraELevel2';


const playHoverSound = () => {
  const audio = new Audio(InapoiAudio);
  audio.play();
};

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/intro" />
          <Route path="/intro" component={Introduction} exact={true} />
          <Route path="/home" component={Home} exact={true} /> 

          <Route path="/maps" component={MapSelection} exact={true} />
          <Route path="/map1" component={Map1} exact={true} />
          <Route path="/map2" component={Map2} exact={true} />
          <Route path="/map3" component={Map3} exact={true} />
          
          <Route path="/literaA" component={LiteraA} exact={true} />
          <Route path="/LiteraALevel1" component={LiteraALevel1} exact={true} />
          <Route path="/LiteraALevel2" component={LiteraALevel2} exact={true} />
         
          <Route path="/literaE" component={LiteraE} exact={true} />
          <Route path="/LiteraELevel1" component={LiteraELevel1} exact={true} />
          <Route path="/LiteraELevel2" component={LiteraELevel2} exact={true} />

          <Route path="/literaI" component={LiteraI} exact={true} />
          <Route path="/LiteraILevel1" component={LiteraILevel1} exact={true} />
          {/* <Route path="/LiteraILevel2" component={LiteraILevel2} exact={true} />   */}

          <Route path="/literaO" component={LiteraO} exact={true} />
          <Route path="/LiteraOLevel1" component={LiteraOLevel1} exact={true}  /> 
          {/* <Route path="/LiteraOLevel2" component={LiteraOLevel2} exact={true} />  */}


          <Route path="/literaU" component={LiteraU} exact={true} />
           <Route path="/LiteraULevel1" component={LiteraULevel1} exact={true} />
          {/* <Route path="/LiteraULevel2" component={LiteraULevel2} exact={true} />   */}


          {/* <Route path="/literaM" component={LiteraM} exact={true} />
          <Route path="/LiteraMLevel1" component={LiteraMLevel1} exact={true} />
          <Route path="/LiteraMLevel2" component={LiteraMLevel2} exact={true} />

          <Route path="/literaN" component={LiteraN} exact={true} />
          <Route path="/LiteraNLevel1" component={LiteraNLevel1} exact={true} />
          <Route path="/LiteraNLevel2" component={LiteraNLevel2} exact={true} />

          <Route path="/literaP" component={LiteraP} exact={true} />
          <Route path="/LiteraPLevel1" component={LiteraPLevel1} exact={true} />
          <Route path="/LiteraPLevel2" component={LiteraPLevel2} exact={true} />


          <Route path="/literaR" component={LiteraR} exact={true} />
          <Route path="/LiteraRLevel1" component={LiteraRLevel1} exact={true} />
          <Route path="/LiteraRLevel2" component={LiteraRLevel2} exact={true} /> */}


        </IonRouterOutlet>


        {/* <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel onMouseEnter={playHoverSound}>Home</IonLabel>
          </IonTabButton>
        </IonTabBar> */}



      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
