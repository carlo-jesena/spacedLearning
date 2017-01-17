import React from 'react';
import { connect } from 'react-redux';
// import * as actions from '../actions';
import Title from './title';
import Login from './login';
import QandA from './q-and-a';
import Status from './status';
// import Question from './status';

function Main() {
  return (
    <div className="main">
      <Title />
      <Login />
      <QandA />
      <Status />
    </div>
  );
}

export default connect()(Main);
