/* global fetch */
// maybe need for mobile
// import 'isomorphic-fetch';

export const GET_QUESTION = 'GET_QUESTION';
export const getQuestion = () => ({
  type: GET_QUESTION,
});

export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS';
export const getQuestionSuccess = (question) => ({
  type: GET_QUESTION_SUCCESS,
  question
});

export const fetchQuestion = (userid) => (dispatch) => {
  dispatch(getQuestion());

  fetch(`http://localhost:8080/users/carloben`)
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
  .then(question =>
    dispatch(getQuestionSuccess({
      score: question.score,
      question: question.question
    })
  ))
  .catch(console.error);
};

export const postAnswer = (answer, userid) => (dispatch) => {
  dispatch(getQuestion());

  // fetch(`localhost:8080/answer/${userid}/${answer}`)
  fetch(
    `http://localhost:8080/users/carloben`,
    {
      method: 'post',
      headers: {
        "Content-type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ answer })
    }
  )
  .then((res) => {
    console.log('post answer', answer);
    if (!res.ok) {
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
    return res;
  })
  .then(res => res.json())
  .then(data => dispatch(getQuestionSuccess({
    score: data.score,
    question: data.question,
  })))
  .catch(console.error);
};
