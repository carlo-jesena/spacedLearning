// import 'isomorphic-fetch';
import * as actions from '../actions/actions.js';

const initialState = {
  onLandingPage: true,
  loading: true,
  score: '-',
  question: {
    m: null,
    idx: null,
    answer: "loading...",
    question: "loading..."
  },
  userid: 'carloben',
};

const mainReducer = (state = initialState, action) => {
  if (action.type === actions.GET_QUESTION) {
    return ({
      initialState,
    });
  }

  if (action.type === actions.GET_QUESTION_SUCCESS) {
    return ({
      ...state,
      score: action.score,
      question: action.question,
    });
  }


  return state;
};

export default mainReducer;
