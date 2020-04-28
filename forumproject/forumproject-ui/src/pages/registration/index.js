import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
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
import { register } from '../../redux/actions';
import Spinner from '../../components/common/spinner';


class Registration extends React.Component {

  onSubmit(formProps) {
    this.props.register(formProps);
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
        <h2>Register</h2>
        <Form method="post" onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          <FormGroup>
            <Label htmlFor="username">Username:</Label>
            <Field component="input" type="text" name="username" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email:</Label>
            <Field component="input" type="text" name="email" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password:</Label>
            <Field  component="input" type="password" name="password"/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password2">Confirm Password:</Label>
            <Field  component="input" type="password" name="password2"/>
          </FormGroup>
          <SubmitButtonSmall type="submit"/>
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
    reduxForm({ form: 'registration'}),
    connect(mapStateToProps, { register })
  )(Registration);