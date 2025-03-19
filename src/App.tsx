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
  const collectionRef = collection(db, "thisEmpleo");
  
  useEffect(() => {
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // @ts-ignore
      setDataQueries(newData.find(item=>item.id=="searchQueries"));
      // @ts-ignore
      setDataOffers(newData.find(item=>item.id=="storedOffers"));
      // @ts-ignore
      setDataSent(newData.find(item=>item.id=="sentOffers"));

      setItems(newData as any); //Woopsie Daisy
      console.log("Los nuevos datos son: ", newData);
    });
    return () => unsubscribe();
  }, []);

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
            data={dataOffers}
          />
      </CardColumn>
      <div className={style.workLinkContainer}>
        <Signup/>
      </div>
    </div>
  )
}

export default App