// import 'isomorphic-fetch';
import * as actions from '../actions/actions.js';

const initialState = {
  onLandingPage: true,
  loading: true,
  score: '-',
  question: null,
  userid: 'carloben',
};

const mainReducer = (state = initialState, action) => {
  if (action.type === actions.GET_QUESTION) {
    return ({
      ...state,
      loading: true,
    });
  }

  if (action.type === actions.GET_QUESTION_SUCCESS) {
    return ({
      ...state,
      loading: false,
      question: action.question,
    });
  }


  return state;
};

export default mainReducer;

// TODO use combineReducers... lookup syntax
