export const GET_QUESTION = 'GET_QUESTION';
export const getQuestion = () => ({
  type: GET_QUESTION,
});

export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS';
export const getQuestionSuccess = (question) => ({
  type: GET_QUESTION_SUCCESS,
  question
});

export const fetchQuestion = (username) => (dispatch) => {
  dispatch(getQuestion());
  dispatch(hideAnswer());

  fetch(`http://localhost:8080/users/${username}`)
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

export const postAnswer = (answer, username) => (dispatch) => {
  dispatch(getQuestion());

  fetch(
    `http://localhost:8080/answer/${username}`,
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

export const HIDE_ANSWER = 'HIDE_ANSWER';
export const hideAnswer = () => ({
  type: HIDE_ANSWER,
});

export const SHOW_ANSWER = 'SHOW_ANSWER';
export const showAnswer = () => ({
  type: SHOW_ANSWER,
});

export const createUser = (newUser) => (dispatch) => {
  fetch(
    `http://localhost:8080/users/${newUser}`,
    {
      method: 'post',
      headers: {
        "Content-type": "application/json; charset=utf-8"
      }
    }
  )
  .then((res) => {
    console.log('created user', newUser);
    if (!res.ok) {
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
    return res;
  })
  .then(() => {
    dispatch(fetchUsers());
    dispatch(changeUser(newUser));
    dispatch(fetchQuestion(newUser));
  })
  .catch(console.error);
}

export const addQuestion = (username, question) => (dispatch) => {
  fetch(
    `http://localhost:8080/question/${username}`,
    {
      method: 'post',
      headers: {
        "Content-type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ question })
    }
  )
  .then((res) => {
    console.log(username, 'add question', question);
    if (!res.ok) {
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
    return res;
  })
  .then(() => {
    dispatch(fetchQuestion(username))
  })
  .catch(console.error);

}
