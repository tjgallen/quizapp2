import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { begin } from '../utils/timer';

export default function FetchButton(props) {
	// These are the settings that will be used to construct the API query
  const questionCategory = useSelector((state) => state.options.question_category)
  const questionDifficulty = useSelector((state) => state.options.question_difficulty)
  const questionType = useSelector((state) => state.options.question_type)
  const questionAmount = useSelector((state) => state.options.amount_of_questions)
  const questionIndex = useSelector((state) => state.index)
	const dispatch = useDispatch()
  const setLoading = value => {
    dispatch({
      type: 'CHANGE_LOADING',
      loading: value
    })
  }

  const setQuestions = (value) => {
    dispatch({
      type: 'SET_QUESTIONS',
      questions: value
    })
  }

  const handleQuery = async () => {
    begin();
		// specify the number of questions to be returned
    let apiUrl = `https://opentdb.com/api.php?amount=${questionAmount}`;

		// only add the rest of the parameters if they aren't 'all'
    if (questionCategory.length) {
      apiUrl = apiUrl.concat(`&category=${questionCategory}`)
    }

    if (questionDifficulty.length) {
      apiUrl = apiUrl.concat(`&difficulty=${questionDifficulty}`)
    }

    if (questionType.length) {
      apiUrl = apiUrl.concat(`&type=${questionType}`)
    }

    setLoading(true);

    await fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        // set questions in the state using an action
        setQuestions(response.results)
        setLoading(false);
      });
      if (questionIndex > 0) {
        dispatch({
          type: 'SET_INDEX',
          index: 0,
        })
        dispatch({
          type: 'SET_SCORE',
          score: 0,
        })
      }
  }
  return <button onClick={handleQuery}>{props.text}</button>;
}
