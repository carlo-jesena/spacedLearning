import React from 'react';
import { connect } from 'react-redux';
// import * as actions from '../actions';

import Header from './header';
import QandA from './q-and-a';

function Main() {
  return (
    <div className="main">
      <Header />
      <QandA />
    </div>
  );
}

export default connect()(Main);
