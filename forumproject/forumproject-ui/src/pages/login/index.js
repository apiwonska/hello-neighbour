import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Redirect } from 'react-router-dom';

import {
  Form,
  FormGroup,
  Label,
} from '../../components/common/styledForms';
import {
  SubmitButtonSmall
} from '../../components/common/styledButtons';
import Spinner from '../../components/common/spinner';
import { logIn } from '../../redux/actions';


class LogIn extends React.Component {

  onSubmit(formProps) {
    this.props.logIn(formProps);
  }

  render() {
    const { processing, authenticated } = this.props.auth;

    if (authenticated) {
      return <Redirect to='/'/>;
    }

    if (processing) {
      return <Spinner/>;
    }

    return (
      <div>
        <h2>Log In</h2>
        <Form method="post" onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          <FormGroup>
            <Label htmlFor="username">Username:</Label>
            <Field component="input" type="text" name="username" autoComplete="none"/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password:</Label>
            <Field  component="input" type="password" name="password" autoComplete="none"/>
          </FormGroup>
          <SubmitButtonSmall type="submit" value="Log In"/>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return (
    {
      auth: state.auth
    }
  )
}

export default compose(
    connect(mapStateToProps, { logIn }),
    reduxForm({ form: 'logIn'})
  )(LogIn);