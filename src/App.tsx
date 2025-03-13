import './App.css'
import style from './App.module.css'
import WorkLinks from './components/WorkLinks';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import AddLinkPrompt from './components/AddLinkPrompt';
import Signup from './components/SignUp';

function App() {
  const displayLinkPromptValue = useSelector((state: RootState) => state.displayLinkPrompt.value);

  return (
    <div className={style.main}>
          <h1>Display Link Prompt: {displayLinkPromptValue ? 'Yes' : 'No'}</h1>
          {displayLinkPromptValue ? <AddLinkPrompt/> : false}
      <div className={style.workLinkContainer}>
        <WorkLinks/>
        <Signup/>
      </div>
    </div>
  )
}

export default App