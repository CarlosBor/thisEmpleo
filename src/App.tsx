import './App.css'
import style from './App.module.css'
import WorkLinks from './components/WorkLinks';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import AddLinkPrompt from './components/AddLinkPrompt';
import Signup from './components/SignUp';
import CardColumn from './components/CardColumn';
import { useState } from 'react';

function App() {
  const displayLinkPromptValue = useSelector((state: RootState) => state.displayLinkPrompt.value);

  return (
    <div className={style.main}>
      <CardColumn>
        <WorkLinks
          type="searchQueries"
        />
      </CardColumn>
      <CardColumn>
        <WorkLinks
            type="storedOffers"
          />
      </CardColumn>
      <CardColumn>
        <WorkLinks
            type="SentOffers"
          />
      </CardColumn>
      <div className={style.workLinkContainer}>
        <Signup/>
      </div>
    </div>
  )
}

export default App