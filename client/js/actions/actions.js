/* global fetch */
// maybe need for mobile
// import 'isomorphic-fetch';

export const START_QUIZ = 'START_QUIZ';
export const startQuiz = () => ({
  type: START_QUIZ,
});

export const POST_ANSWER = 'POST_ANSWER';
export const postAnswer = (result) => ({
  type: POST_ANSWER,
  result
});

export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS';
export const getQuestionSuccess = (question) => ({
  type: GET_QUESTION_SUCCESS,
  question
});

export const getQuestion = (userid) => (dispatch) => {
  dispatch(getQuestion());

  fetch(`localhost:8080/users/${userid}`)
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
  .then(question => dispatch(fetchQuestionSuccess(question)))
  .catch(console.error);
};

// const postResult = (correct) => (dispatch) => {
//   // post answer to endpoint
//   // receive back next question as response
// };
