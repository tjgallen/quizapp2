import React from 'react';
import '../index.css';
import { begin } from '../utils/timer';

export default function Button({props}) {

  function startQuiz() { 
    begin();
    return (
      props(true)
    );
  ;
  return (
    <div className="start">
      <button id = "startButton" onClick={startQuiz}>START</button>
    </div>
  )
}