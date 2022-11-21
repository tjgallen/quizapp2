import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { end } from '../utils/timer';
import FetchButton from './FetchButton';

export default function BeginAgain() {
  const score = useSelector((state) => state.score)
  const index = useSelector((state) => state.index)
  const dispatch = useDispatch();

  const replay = () => {
    dispatch({
      type: 'SET_INDEX',
      index: 0,
    })
    dispatch({
      type: 'SET_SCORE',
      score: 0,
    })
  }

  const settings = () => {
    dispatch({
      type: 'SET_QUESTIONS',
      questions: [],
    })
    dispatch({
      type: 'SET_SCORE',
      score: 0,
    })
  }

  return (
    <>
      <h2>Final Score: {score}/{index}</h2>
      <h2>Seconds to take quiz:  {end()}</h2>
      <h2>{score/index >= .5 ? <p>Congrats! You passed!</p> : <p>Better luck next time!</p>}</h2>
      <button onClick={replay}>Take this quiz again</button>
      <FetchButton text="Get new questions" />
      <button onClick={settings}>Back to settings</button>
    </>
  )
}