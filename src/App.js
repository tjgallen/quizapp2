import { useSelector } from 'react-redux';

import Selections from './components/Selections';
import Question from './components/Question';
import BeginAgain from './components/BeginAgain';
import './App.css'

export default function App() {
  const questions = useSelector((state) => state.questions)
  const questionIndex = useSelector((state) => state.index)

  let component

  if (questions.length && questionIndex + 1 <= questions.length) {
    component = <Question />
  } else if (!questions.length) {
    component = <Selections />
  } else {
    component = <BeginAgain />
  }

  return (
    <div className="App">
      <div className="app-container">{component}</div>
    </div>
  )
}
