import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';

import {
  Form,
  FormGroup,
  Label,
} from '../../components/common/styledForms';
import {
  SubmitButtonSmall
} from '../../components/common/styledButtons';
import Spinner from '../../components/common/spinner';
import { FormError } from '../../components/common/errors';
import { logIn } from '../../redux/actions';


class LogIn extends React.Component {

  onSubmit(formProps) {
    this.props.logIn(formProps);
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
        <h2>Log In</h2>
        <Form method="post" onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          { this.renderNonFieldErrors() }
          <FormGroup>
            <Label htmlFor="username">Username:</Label>
            <Field component="input" type="text" name="username" autoComplete="none"/>
            { this.renderFieldError('username') }
          </FormGroup>          
          <FormGroup>
            <Label htmlFor="password">Password:</Label>
            <Field  component="input" type="password" name="password" autoComplete="none"/>
            { this.renderFieldError('password') }
          </FormGroup>
          <SubmitButtonSmall type="submit" value="Log In"/>
        </Form>
        <div>
          <p>If you don't have an account yet, <Link to={'/register'}>register here</Link></p>
          <p>Did you forget your login or password? Click <Link to={'/password-reset'}>this</Link> to restore your credentials</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return (
    {
      auth: state.auth,
    }
  )
}

export default compose(
    connect(mapStateToProps, { logIn }),
    reduxForm({ form: 'logIn'})
  )(LogIn);