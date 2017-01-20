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

  fetch(`http://localhost:8080/users/${userid}`)
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

export const GET_USERS = 'GET_USERS';
export const getUsers = () => ({
  type: GET_USERS,
});

export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const getUsersSuccess = (users) => ({
  type: GET_USERS_SUCCESS,
  users
});

export const fetchUsers = () => (dispatch) => {
  dispatch(getUsers());

  fetch(`http://localhost:8080/userlist`)
  .then((res) => {
    console.log('fetch user list');
    if (!res.ok) {
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
    return res;
  })
  .then(res => res.json())
  .then(users =>
    dispatch(getUsersSuccess(users)
  ))
  .catch(console.error);
};

export const CHANGE_USER = 'CHANGE_USER';
export const changeUser = (user) => ({
  type: CHANGE_USER,
  user
});
