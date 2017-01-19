import React from 'react';
import { connect } from 'react-redux';
// import * as actions from '../actions';
import Title from './title';
// import Login from './login';
// import QandA from './q-and-a';
// import Status from './status';
// import Question from './status';

function Main() {
  return (
    <div className="main">
      {/* <Navbar> */}
      <Title>
        Carloben's Learn-It Real Good(tm)
      </Title>
      {/* <Login />
        </Navbar>
        <QandA />
      <Status /> */}
    </div>
  );
}

export default connect()(Main);
