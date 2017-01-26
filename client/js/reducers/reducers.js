import 'isomorphic-fetch';
import * as actions from '../actions/actions.js';

const initialState = {
  onLandingPage: true,
  loading: true,
  score: '-',
  question: null,
  username: 'carloben',
  usersLoading: true,
  userList: ['loading...'],
  showAnswer: false,
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
      showAnswer: false,
    });
  }

  if (action.type === actions.GET_USERS) {
    return ({
      ...state,
      usersLoading: true,
    });
  }

  if (action.type === actions.GET_USERS_SUCCESS) {
    return ({
      ...state,
      usersLoading: false,
      userList: action.users,
    })
  }

  if (action.type === actions.CHANGE_USER) {
    return ({
      ...state,
      username: action.user
    });
  }

  if (action.type === actions.HIDE_ANSWER) {
    return ({
      ...state,
      showAnswer: false
    });
  }

  if (action.type === actions.SHOW_ANSWER) {
    return ({
      ...state,
      showAnswer: true
    });
  }

  return state;
};

export default mainReducer;

// TODO use combineReducers... lookup syntax
