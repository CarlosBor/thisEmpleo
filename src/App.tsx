import './App.css'
import style from './App.module.css'

import { useEffect, useState } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import WorkLinks from './components/WorkLinks';
import Signup from './components/SignUp';
import CardColumn from './components/CardColumn';
import CVStorage from './components/CVStorage';
import SnippetStorage from './components/SnippetStorage';
import DroppableColumn from './components/DroppableColumn';

import { LinkData } from './types/interfaces';
import { db } from './../firebaseConfig';

function App() {
  const [dataQueries, setDataQueries] = useState<LinkData[]>([]);
  const [dataOffers, setDataOffers] = useState<LinkData[]>([]);
  const [dataSent, setDataSent] = useState<LinkData[]>([]);
  const [expiredOffers, setExpiredOffers] = useState<LinkData[]>([]);

  const [displayLogin, setDisplayLogin] = useState(false);
  const [displayCv, setDisplayCv] = useState(false);
  const [displayLetter, setDisplayLetter] = useState(false);
  
  const toggleVisible = (state: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>) => {
    setState(!state);
};

  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("No user logged in, skipping Firestore subscriptions.");
        return;
      }

      const userPath = `users/${user.uid}`;
      const searchQueriesCollection = collection(db, `${userPath}/searchQueries`);
      const storedOffersCollection = collection(db, `${userPath}/storedOffers`);
      const sentOffersCollection = collection(db, `${userPath}/sentOffers`);
      const expiredOffersCollection = collection(db, `${userPath}/expiredOffers`);

      const unsubscribeQueries = onSnapshot(searchQueriesCollection, (snapshot) => {
        // @ts-ignore
        setDataQueries(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });

      const unsubscribeOffers = onSnapshot(storedOffersCollection, (snapshot) => {
        // @ts-ignore
        setDataOffers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });

      const unsubscribeSentOffers = onSnapshot(sentOffersCollection, (snapshot) => {
        // @ts-ignore
        setDataSent(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });

      const unsubscribeExpiredOffers = onSnapshot(expiredOffersCollection, (snapshot) => {
        // @ts-ignore
        setExpiredOffers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });

      return () => {
        unsubscribeQueries();
        unsubscribeOffers();
        unsubscribeSentOffers();
        unsubscribeExpiredOffers();
      };
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <div className={style.main}>
      <CardColumn>
        <WorkLinks
          header="Search Links"
          type="searchQueries"
          data={dataQueries}
        />
      </CardColumn>
      
      <DndProvider backend={HTML5Backend}>
        <DroppableColumn type="storedOffers">
          <CardColumn>
            <WorkLinks header="Stored Offers" type="storedOffers" data={dataOffers} />
          </CardColumn>
        </DroppableColumn>

        <DroppableColumn type="sentOffers">
          <CardColumn>
            <WorkLinks header="Sent Offers" type="sentOffers" data={dataSent} />
          </CardColumn>
        </DroppableColumn>

        <DroppableColumn type="expiredOffers">
          <CardColumn>
            <WorkLinks header="Expired Offers" type="expiredOffers" data={expiredOffers} />
          </CardColumn>
        </DroppableColumn>
      </DndProvider>
      <div className={`${style.loginContainer} ${displayLogin ? style.active : ''}`}>
        <div onClick={()=>{toggleVisible(displayLogin, setDisplayLogin)}} className={style.avatarIcon}>👤</div>
        <Signup/>
      </div>
      <div className={`${style.cvStorage} ${displayCv ? style.active : ''}`}>
        <div onClick={()=>{toggleVisible(displayCv, setDisplayCv)}} className={style.cvIcon}>📄</div>
        <CVStorage/>
      </div>
      <div className={`${style.snippetStorage} ${displayLetter ? style.active : ''}`}>
        <div onClick={()=>{toggleVisible(displayLetter, setDisplayLetter)}} className={style.letterIcon}>✉️</div>
        {displayLetter ? <SnippetStorage toggleSnippetStorage={()=> toggleVisible(displayLetter, setDisplayLetter)}/> : ''}
      </div>  
    </div>
  )
}

export default App