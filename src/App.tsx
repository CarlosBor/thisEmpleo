import './App.css'
import style from './App.module.css'
import WorkLinks from './components/WorkLinks';
import Signup from './components/SignUp';
import CardColumn from './components/CardColumn';

import { useEffect, useState } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from './../firebaseConfig';

function App() {
  const [items, setItems] = useState([]);
  const [dataQueries, setDataQueries] = useState({})
  const [dataOffers, setDataOffers] = useState({})
  const [dataSent, setDataSent] = useState({})  
  const searchQueriesCollection = collection(db, "searchQueries");
  const storedOffersCollection = collection(db, "storedOffers");
  const sentOffersCollection = collection(db, "sentOffers");
  
  useEffect(() => {
    const unsubscribeQueries = onSnapshot(searchQueriesCollection, (snapshot) => {
      setDataQueries(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    const unsubscribeOffers = onSnapshot(storedOffersCollection, (snapshot) => {
      setDataOffers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    const unsubscribeSentOffers = onSnapshot(sentOffersCollection, (snapshot) => {
      setDataSent(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

    });
    
    return () => {
      unsubscribeQueries();
      unsubscribeOffers();
      unsubscribeSentOffers();
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
      <div className={style.workLinkContainer}>
        <Signup/>
      </div>
    </div>
  )
}

export default App