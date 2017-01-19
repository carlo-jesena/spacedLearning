/* global fetch */
// maybe need for mobile
// import 'isomorphic-fetch';

export const SHOW_ANSWER = 'SHOW_ANSWER';
export const showAnswer = () => ({
  type: SHOW_ANSWER,
});

export const GET_QUESTION = 'GET_QUESTION';
export const getQuestion = () => ({
  type: GET_QUESTION,
});

export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS';
export const getQuestionSuccess = (item) => ({
  type: GET_QUESTION_SUCCESS,
  item
});

export const POST_RESULT = 'POST_RESULT';
export const postResult = () => ({
  type: POST_RESULT,
});

export const fetchQuestion = () => (dispatch) => {
  dispatch(getQuestion());

  fetch('localhost:8080/question')
  .then((res) => {
    console.log('fetchQuestion');
    if (!res.ok) {
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
    return res;
  })
  .then(res => res.json())
  .then(item => dispatch(fetchQuestionSuccess(item)))
  .catch(console.error);
};

// const postResult = (correct) => (dispatch) => {
//   // post answer to endpoint
//   // receive back next question as response
// };
