import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import FetchButton from './FetchButton';
import Title from './Title';

export default function Selections() {
  const [options, setOptions] = useState(null);
	// replace state hooks with useSelector
  const loading = useSelector((state) => state.options.loading)

  const questionCategory = useSelector((state) => state.options.question_category)
  const questionDifficulty = useSelector((state) => state.options.question_difficulty)
  const questionType = useSelector((state) => state.options.question_type)
  const questionAmount = useSelector((state) => state.options.amount_of_questions)
	
	// defining to dispatch the actions
  const dispatch = useDispatch()

  useEffect(() => {
    const apiUrl = `https://opentdb.com/api_category.php`;
    const handleLoadingChange = (value) => {
      dispatch({
        type: 'CHANGE_LOADING',
        loading: value
      })
    }

    handleLoadingChange(true);

    fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        handleLoadingChange(false);
        setOptions(response.trivia_categories);
      });
  }, [setOptions, dispatch]);

	// replace setState with actions
  const handleCategoryChange = (event) => {
    dispatch({
      type: 'CHANGE_CATEGORY',
      question_category: event.target.value,
    })
  }

  const handleDifficultyChange = (event) => {
    dispatch({
      type: 'CHANGE_DIFFICULTY',
      question_difficulty: event.target.value,
    })
  }

  const handleTypeChange = (event) => {
    dispatch({
      type: 'CHANGE_TYPE',
      question_type: event.target.value,
    })
  }

  const handleAmountChange = (event) => {
    dispatch({
      type: 'CHANGE_AMOUNT',
      amount_of_questions: event.target.value,
    })
  }


  if (!loading) {
  return (
    <div>
      <div><Title /></div>
      <div>
        <h2>Select Category:</h2>
        <select value={questionCategory} onChange={handleCategoryChange}>
          <option>Choose a category</option>
          {options && options.length &&
          options.map((option) => (
            <option value={option.id} key={option.id}>
            {option.name}
            </option>
          ))}
        </select>
      </div>

    <div>
      <h2>Select Question Difficulty:</h2>
        <select value={questionDifficulty} onChange={handleDifficultyChange}>
          <option value="" key="difficulty-0">Choose difficulty level</option>
          <option value="easy" key="difficulty-1">Easy</option>
          <option value="medium" key="difficulty-2">Medium</option>
          <option value="hard" key="difficulty-3">Hard</option>
        </select>
      </div>

      <div>
        <h2>Select Question Type:</h2>
        <select value={questionType} onChange={handleTypeChange}>
          <option value="" key="type-0">Choose question type</option>
          <option value="multiple" key="type-1">
            Multiple Choice
          </option>
          <option value="boolean" key="type-2">
            True/False
          </option>
        </select>
      </div>

      <div>
        <h2>Number of Questions:</h2>
        <input value={questionAmount} onChange={handleAmountChange} />
      </div>
      <FetchButton text="Start" />
    </div>
  );
  } return (
    <p>
     Loading...
   </p> 
  );
  
}
