import { Redirect, Route, Switch } from 'react-router-dom';
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
import LiteraA from './pages/LiteraA';
import LiteraE from './pages/LiteraE';
import LiteraI from './pages/LiteraI';
import LiteraO from './pages/LiteraO';
import LiteraU from './pages/LiteraU';
import LiteraP from './pages/LiteraP';
import LiteraR from './pages/LiteraR';
import LiteraS from './pages/LiteraS';
import LiteraZ from './pages/LiteraZ';
import LiteraB from "./pages/LiteraB";
import LiteraT from "./pages/LiteraT";
import LiteraC from './pages/LiteraC';
import LiteraD from './pages/LiteraD';
import LiteraH from "./pages/LiteraH";
import LiteraJ from "./pages/LiteraJ";
import LiteraM from './pages/LiteraM';
import LiteraN from './pages/LiteraN';
import LiteraF from "./pages/LiteraF";
import LiteraG from "./pages/LiteraG";
import LiteraL from "./pages/LiteraL";
import LiteraV from "./pages/LiteraV";

import Introduction from './pages/Introduction';
import InapoiAudio from './assets/sounds/InapoiLaHarta.mp3';
 
import MapSelection from './pages/MapSelection';
import Map1 from './pages/Map1';
import Map2 from './pages/Map2';
import Map3 from './pages/Map3';


import LiteraALevel1 from './pages/LiteraALevel1';
import LiteraALevel2 from './pages/LiteraALevel2';

import LiteraELevel1 from './pages/LiteraELevel1';
import LiteraELevel2 from './pages/LiteraELevel2';

import LiteraILevel1 from './pages/LiteraILevel1';
import LiteraILevel2 from './pages/LiteraILevel2';

import LiteraOLevel1 from './pages/LiteraOLevel1';
import LiteraOLevel2 from './pages/LiteraOLevel2';
 
import LiteraPLevel1 from './pages/LiteraPLevel1';
import LiteraPLevel2 from './pages/LiteraPLevel2';
import LiteraPLevel3 from './pages/LiteraPLevel3';

import LiteraRLevel1 from './pages/LiteraRLevel1';
import LiteraRLevel2 from './pages/LiteraRLevel2';
import LiteraRLevel3 from './pages/LiteraRLevel3';

import LiteraSLevel1 from './pages/LiteraSLevel1';
import LiteraSLevel2 from './pages/LiteraSLevel2';
import LiteraSLevel3 from './pages/LiteraSLevel3';

import LiteraZLevel1 from './pages/LiteraZLevel1';
import LiteraZLevel2 from './pages/LiteraZLevel2';
import LiteraZLevel3 from './pages/LiteraZLevel3';
  
import LiteraULevel1 from './pages/LiteraULevel1';
import LiteraULevel2 from './pages/LiteraULevel2';

import LiteraBLevel1 from "./pages/LiteraBLevel1";
import LiteraBLevel2 from "./pages/LiteraBLevel2";

import LiteraTLevel1 from "./pages/LiteraTLevel1";
import LiteraTLevel2 from "./pages/LiteraTLevel2";

import LiteraCLevel1 from './pages/LiteraCLevel1';
import LiteraCLevel2 from './pages/LiteraCLevel2';
import LiteraCLevel3 from './pages/LiteraCLevel3';

import LiteraDLevel1 from './pages/LiteraDLevel1';
import LiteraDLevel2 from './pages/LiteraDLevel2';
import LiteraDLevel3 from './pages/LiteraDLevel3';
 
import LiteraHLevel1 from './pages/LiteraHLevel1';
import LiteraHLevel2 from "./pages/LiteraHLevel2";

import LiteraJLevel1 from "./pages/LiteraJLevel1";
import LiteraJLevel2 from "./pages/LiteraJLevel2";

import LiteraMLevel1 from './pages/LiteraMLevel1';
import LiteraMLevel2 from './pages/LiteraMLevel2';

import LiteraNLevel1 from './pages/LiteraNLevel1';
import LiteraNLevel2 from './pages/LiteraNLevel2';

import LiteraFLevel1 from "./pages/LiteraFLevel1";
import LiteraFLevel2 from "./pages/LiteraFLevel2";

import LiteraGLevel1 from "./pages/LiteraGLevel1";
import LiteraGLevel2 from "./pages/LiteraGLevel2";
 
import LiteraLLevel2 from "./pages/LiteraLLevel2";
import LiteraLLevel1 from "./pages/LiteraLLevel1";

import LiteraVLevel1 from "./pages/LiteraVLevel1";
import LiteraVLevel2 from "./pages/LiteraVLevel2";
import BonusOceanPage from './pages/BonusOceanPage';
import LiteraMLevel3 from './pages/LiteraMLevel3';
 
import LiteraNLevel3 from './pages/LiteraNLevel3';
import LiteraHLevel3 from './pages/LiteraHLevel3';
import LiteraJLevel3 from './pages/LiteraJLevel3';
import BonusPiratePage from './pages/BonusPiratePage';
import LiteraFLevel3 from './pages/LiteraFLevel3';
import LiteraGLevel3 from './pages/LiteraGLevel3';
import LiteraVLevel3 from './pages/LiteraVLevel3';
import LiteraLLevel3 from './pages/LiteraLLevel3';
import LiteraTLevel3 from './pages/LiteraTLevel3';
import LiteraBLevel3 from './pages/LiteraBLevel3';
import SilabeZiCuZi from './pages/SilabeZiCuZi';
import FinalPage from './pages/FinalPage';



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

        <Switch>
            <Route path="/intro" component={Introduction} exact={true} />
            <Route path="/home" component={Home} exact={true} />
            <Route path="/map1" component={Map1} exact={true} />
            <Route path="/map2" component={Map2} exact={true} />
            <Route path="/map3" component={Map3} exact={true} />
            <Route path="/maps" component={MapSelection} exact={true} />

            <Route path="/literaA" component={LiteraA} exact={true} />
            <Route path="/LiteraALevel1" component={LiteraALevel1} exact={true} />
            <Route path="/LiteraALevel2" component={LiteraALevel2} exact={true} />

          <Route path="/literaE" component={LiteraE} exact={true} />
          <Route path="/LiteraELevel1" component={LiteraELevel1} exact={true} />
          <Route path="/LiteraELevel2" component={LiteraELevel2} exact={true} />

          <Route path="/literaI" component={LiteraI} exact={true} />
          <Route path="/LiteraILevel1" component={LiteraILevel1} exact={true} />
          <Route path="/LiteraILevel2" component={LiteraILevel2} exact={true} />

          <Route path="/literaO" component={LiteraO} exact={true} />
          <Route path="/LiteraOLevel1" component={LiteraOLevel1} exact={true}  /> 
          <Route path="/LiteraOLevel2" component={LiteraOLevel2} exact={true} /> 

          
          <Route path="/literaU" component={LiteraU} exact={true} />
          <Route path="/LiteraULevel1" component={LiteraULevel1} exact={true} />
          <Route path="/LiteraULevel2" component={LiteraULevel2} exact={true} />   
          <Route path="/bonus-ocean" component={BonusOceanPage} exact={true} />
          <Route path="/bonus-pirati" component={BonusPiratePage} exact={true} />

          <Route path="/literaP" component={LiteraP} exact={true} />
          <Route path="/LiteraPLevel1" component={LiteraPLevel1} exact={true} />
          <Route path="/LiteraPLevel2" component={LiteraPLevel2} exact={true} /> 
          <Route path="/LiteraPLevel3" component={LiteraPLevel3} exact={true} />

          <Route path="/literaM" component={LiteraM} exact={true} />
          <Route path="/LiteraMLevel1" component={LiteraMLevel1} exact={true} />
          <Route path="/LiteraMLevel2" component={LiteraMLevel2} exact={true} />
          <Route path="/LiteraMLevel3" component={LiteraMLevel3} exact={true} />


          <Route path="/literaN" component={LiteraN} exact={true} />
          <Route path="/LiteraNLevel1" component={LiteraNLevel1} exact={true} />
          <Route path="/LiteraNLevel2" component={LiteraNLevel2} exact={true} />
          <Route path="/LiteraNLevel3" component={LiteraNLevel3} exact={true} />

          <Route path="/literaR" component={LiteraR} exact={true} />
          <Route path="/LiteraRLevel1" component={LiteraRLevel1} exact={true} />
          <Route path="/LiteraRLevel2" component={LiteraRLevel2} exact={true} /> 
          <Route path="/LiteraRLevel3" component={LiteraRLevel3} exact={true} /> 

          <Route path="/literaS" component={LiteraS} exact={true} />
          <Route path="/LiteraSLevel1" component={LiteraSLevel1} exact={true} />
          <Route path="/LiteraSLevel2" component={LiteraSLevel2} exact={true} /> 
          <Route path="/LiteraSLevel3" component={LiteraSLevel3} exact={true} />

          <Route path="/literaZ" component={LiteraZ} exact={true} />
          <Route path="/LiteraZLevel1" component={LiteraZLevel1} exact={true} />
          <Route path="/LiteraZLevel2" component={LiteraZLevel2} exact={true} /> 
          <Route path="/LiteraZLevel3" component={LiteraZLevel3} exact={true} />
          <Route path="/zi-cu-zi" component={  SilabeZiCuZi } exact={true} />
        

 
          <Route path="/literaB" component={LiteraB} exact={true} />
          <Route path="/LiteraBLevel1" component={LiteraBLevel1} exact={true} />
          <Route path="/LiteraBLevel2" component={LiteraBLevel2} exact={true} />
          <Route path="/LiteraBLevel3" component={LiteraBLevel3} exact={true} />

          <Route path="/literaH" component={LiteraH} exact={true} />
          <Route path="/LiteraHLevel1" component={LiteraHLevel1} exact={true} />
          <Route path="/LiteraHLevel2" component={LiteraHLevel2} exact={true} />
          <Route path="/LiteraHLevel3" component={LiteraHLevel3} exact={true} />

          <Route path="/literaJ" component={LiteraJ} exact={true} />
          <Route path="/LiteraJLevel1" component={LiteraJLevel1} exact={true} />
          <Route path="/LiteraJLevel2" component={LiteraJLevel2} exact={true} />
          <Route path="/LiteraJLevel3" component={LiteraJLevel3} exact={true} />


          <Route path="/literaT" component={LiteraT} exact={true} />
          <Route path="/LiteraTLevel1" component={LiteraTLevel1} exact={true} />
          <Route path="/LiteraTLevel2" component={LiteraTLevel2} exact={true} />
          <Route path="/LiteraTLevel3" component={LiteraTLevel3} exact={true} />
 
 
          <Route path="/literaC" component={LiteraC} exact={true} />
          <Route path="/LiteraCLevel1" component={LiteraCLevel1} exact={true} />
          <Route path="/LiteraCLevel2" component={LiteraCLevel2} exact={true} />
          <Route path="/LiteraCLevel3" component={LiteraCLevel3} exact={true} />
          

          <Route path="/literaD" component={LiteraD} exact={true} />
          <Route path="/LiteraDLevel1" component={LiteraDLevel1} exact={true} />
          <Route path="/LiteraDLevel2" component={LiteraDLevel2} exact={true} /> 
          <Route path="/LiteraDLevel3" component={LiteraDLevel3} exact={true} /> 


  	      <Route path="/literaF" component={LiteraF} exact={true}/>
          <Route path="/LiteraFLevel1" component={LiteraFLevel1} exact={true}/>
          <Route path="/LiteraFLevel2" component={LiteraFLevel2} exact={true}/>
          <Route path="/LiteraFLevel3" component={LiteraFLevel3} exact={true}/>

          <Route path="/literaG" component={LiteraG} exact={true} />
          <Route path="/LiteraGLevel1" component={LiteraGLevel1} exact={true}  />
          <Route path="/LiteraGLevel2" component={LiteraGLevel2} exact={true}  />
          <Route path="/LiteraGLevel3" component={LiteraGLevel3} exact={true}  />
 
          <Route path="/literaL" component={LiteraL} exact={true} />
          <Route path="/LiteraLLevel1" component={LiteraLLevel1} exact={true} />
          <Route path="/LiteraLLevel2" component={LiteraLLevel2} exact={true} />
          <Route path="/LiteraLLevel3" component={LiteraLLevel3} exact={true} />

          <Route path="/literaV" component={LiteraV} exact={true} />
          <Route path="/LiteraVLevel1" component={LiteraVLevel1} exact={true} />
          <Route path="/LiteraVLevel2" component={LiteraVLevel2} exact={true} />  
          <Route path="/LiteraVLevel3" component={LiteraVLevel3} exact={true} /> 

          <Route path="/final" component={FinalPage} exact={true} /> 
          


            
          <Redirect exact from="/" to="/intro" />

        </Switch>
 
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