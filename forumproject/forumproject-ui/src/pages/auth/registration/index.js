import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { Redirect } from 'react-router-dom';

import {
  Form,
  FormGroup,
  Label,
} from '../../../components/styledForms';
import {
  SubmitButtonSmall
} from '../../../components/styledButtons';
import { FormError } from '../../../components/errors';
import Spinner from '../../../components/spinner';
import { register } from '../../../redux/actions';


class Registration extends React.Component {

  onSubmit(formProps) {
    this.props.register(formProps);
  }

  renderFieldError(field) {
    const error = this.props.auth.errors[field];

    if (error) {
      return <FormError>{ error }</FormError>;
    }    
  }

  renderNonFieldErrors() {
    const errors = this.props.auth.errors['non_field_errors'];
    if (errors) {
      const errorList = errors.map((el, ind) => {
        return (
          <FormError key={ ind }>{ el }</FormError>
        )
      })
      return errorList;
    }
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
          { this.renderNonFieldErrors() }
          <FormGroup>
            <Label htmlFor="username">Username:</Label>
            <Field component="input" type="text" name="username" />
            { this.renderFieldError('username') }
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email:</Label>
            <Field component="input" type="text" name="email" />
            { this.renderFieldError('email') }
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password:</Label>
            <Field  component="input" type="password" name="password"/>
            { this.renderFieldError('password') }
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password2">Confirm Password:</Label>
            <Field  component="input" type="password" name="password2"/>
            { this.renderFieldError('password2') }
          </FormGroup>
          <SubmitButtonSmall type="submit" value="Register"/>
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