// import 'isomorphic-fetch';
import * as actions from '../actions/actions.js';

const initialState = {
  currentQuestionId: null,
  currentAnswer: null,
  answerVisible: false,
  onLandingPage: true,
};

const mainReducer = (state = initialState, action) => {
  if (action.type === actions.SHOW_ANSWER) {
    return ({
      ...state,
      answerVisible: true,
    });
  }

  return state;
};

export default mainReducer;

// TODO use combineReducers... lookup syntax
