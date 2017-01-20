import React from 'react';
import { connect } from 'react-redux';
// import * as actions from '../actions';

import Header from './header';
import QandA from './q-and-a';



export class Main extends React.Component {
  constructor(props) {
    super(props)
    }



  render() {
    return (
      <div className="main">
        <Header />
        <QandA />
      </div>
    )
  }
}

export default connect()(Main);
