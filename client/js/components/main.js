import React from 'react';
import { connect } from 'react-redux';
// import * as actions from '../actions';

import Header from './header';
import QandA from './q-and-a';
import Footer from './footer';

function Main() {
  return (
    <div>
      <div className="main">
        <Header />
        <QandA />
      </div>
      <Footer />
    </div>
  );
}

export default connect()(Main);
