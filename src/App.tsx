import './App.css'
import style from './App.module.css'
import WorkLinks from './components/WorkLinks';
import Signup from './components/SignUp';
import CardColumn from './components/CardColumn';
import { LinkData } from './types/interfaces';
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from './../firebaseConfig';

function App() {
  const [dataQueries, setDataQueries] = useState<LinkData[]>([]);
  const [dataOffers, setDataOffers] = useState<LinkData[]>([]);
  const [dataSent, setDataSent] = useState<LinkData[]>([]);
  const [expiredOffers, setExpiredOffers] = useState<LinkData[]>([]);
  const searchQueriesCollection = collection(db, "searchQueries");
  const storedOffersCollection = collection(db, "storedOffers");
  const sentOffersCollection = collection(db, "sentOffers");
  const expiredOffersCollection = collection(db, "expiredOffers");
  useEffect(() => {
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
  }, []);

  //I have to make it so each collumn has a different collection, which in turn would make it so I can add more and more documents without so much hoohaa
  return (
    <div className={style.main}>
      <CardColumn>
        <WorkLinks
          type="searchQueries"
          data={dataQueries}
        />
      </CardColumn>
      <CardColumn>
        <WorkLinks
            type="storedOffers"
            data={dataOffers}
          />
      </CardColumn>
      <CardColumn>
        <WorkLinks
            type="sentOffers"
            data={dataSent}
          />
      </CardColumn>
      <CardColumn>
        <WorkLinks
            type="expiredOffers"
            data={expiredOffers}
          />
      </CardColumn>
      <div className={style.workLinkContainer}>
        <Signup/>
      </div>
    </div>
  )
}

export default App