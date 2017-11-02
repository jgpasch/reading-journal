import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { login } from '../actions/index_actions';

class Login extends Component {
  render() {
    <div>
      <form>
        form will be here
      </form>
    </div>
  }
}

export default reduxForm({
  form: 'loginForm',
  validate
})(Login);