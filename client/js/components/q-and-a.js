import React from 'react';
import { Component } from 'react';

class QandA extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.loading === null) {

    }

    return (
      <div>
        <button>Get Question</button>
        Answers...
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  score: state.score,
  question: state.question,
})
