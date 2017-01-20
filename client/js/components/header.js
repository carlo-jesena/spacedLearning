import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      newUser: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleNewUserChange = this.handleNewUserChange.bind(this);
    this.handleNewUserSubmit = this.handleNewUserSubmit.bind(this);


    this.createUser = this.createUser.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchUsers());
  }

  createUser(e) {
    // TODO
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log('dropdown value', this.state.value);
    event.preventDefault();
    this.props.dispatch(actions.changeUser(this.state.value));
    this.props.dispatch(actions.fetchQuestion(this.state.value));
  }

  handleNewUserChange(event) {
    this.setState({newUser: event.target.value});
  }

  handleNewUserSubmit(event) {
    console.log('new user', this.state.newUser);
    event.preventDefault();

    this.props.dispatch(actions.createUser(this.state.newUser));
    this.setState({ newUser: '' });
    this.props.dispatch(actions.getUsers());
  }

  render() {
    console.log('header props:', this.props);

    const userOptions = this.props.userList.map(user =>
      <option value={user} key={user}>
        {user}
      </option>
    );

    return (
      <header className="page-header">
        <p className="titleheader">
          Tagalog With Me
        </p>
        <p className="username">
          Logged in as: {this.props.username}
        </p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Available users:
            <select value={this.state.value} onChange={this.handleChange}>
              {userOptions}
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <form onSubmit={this.handleNewUserSubmit} className="new-user">
          <label>
            Create User:
            <input
              type="text"
              className="new-user-input"
              value={this.state.newUser}
              onChange={this.handleNewUserChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
    	</header>
    );
  }
}


const mapStateToProps = (state, props) => ({
  userList: state.userList,
  username: state.username,
  usersLoading: state.usersLoading,
});

export default connect(mapStateToProps)(Header);
