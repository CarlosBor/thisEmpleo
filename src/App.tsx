import './App.css'
import style from './App.module.css'
import WorkLinks from './components/WorkLinks';
import Signup from './components/SignUp';
import CardColumn from './components/CardColumn';
import { LinkData } from './types/interfaces';
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from './../firebaseConfig';
import CVStorage from './components/CVStorage';
import SnippetStorage from './components/SnippetStorage';

//TODO
//delete redux stuff??
function App() {
  const [dataQueries, setDataQueries] = useState<LinkData[]>([]);
  const [dataOffers, setDataOffers] = useState<LinkData[]>([]);
  const [dataSent, setDataSent] = useState<LinkData[]>([]);
  const [expiredOffers, setExpiredOffers] = useState<LinkData[]>([]);

  const [displayLogin, setDisplayLogin] = useState(false);
  const [displayCv, setDisplayCv] = useState(false);
  const [displayLetter, setDisplayLetter] = useState(false);
  
  const toggleVisible = (state, setState) =>{
    setState(!state);
  }
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
      <CardColumn>
        <WorkLinks
            header="Stored Offers"
            type="storedOffers"
            data={dataOffers}
          />
      </CardColumn>
      <CardColumn>
        <WorkLinks
            header="Sent Offers"
            type="sentOffers"
            data={dataSent}
          />
      </CardColumn>
      <CardColumn>
        <WorkLinks
            header="Expired Offers"
            type="expiredOffers"
            data={expiredOffers}
          />
      </CardColumn>
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