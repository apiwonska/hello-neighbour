import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import {
  Form,
  FormGroup,
  Label
} from '../../../components/styledForms';
import {
  SubmitButtonSmall
} from '../../../components/styledButtons';
import { FormError } from '../../../components/errors';
import { confirmPasswordReset } from '../../../redux/actions';


class PasswordResetConfirm extends React.Component {

  onSubmit(formProps) {
    const values = queryString.parse(this.props.location.search)
    const token = values.token;
    const data = {...formProps, token};
    this.props.confirmPasswordReset(data);
  }

  renderTokenError() {
    // Token is outdated
    const statusError = this.props.passwordReset.passwordErrors['status'];
    // Token was not passed
    const tokenError = this.props.passwordReset.passwordErrors['token'];

    if (statusError || tokenError) {
      return <FormError>The reset password link is not valid</FormError>;
    }
  }

  renderFieldError(field) {
    const error = this.props.passwordReset.passwordErrors[field];

    if (error) {
      return <FormError>{ error }</FormError>;
    }
  }
  
  renderSuccessMesage() {
    const { resetPasswordConfirmed } = this.props.passwordReset;
    if (resetPasswordConfirmed) {
      return <p>Password was changed. You can <Link to={'/auth'}>log in</Link> now.</p>;
    }
  }

  render() {
    return(
      <>
        <h2>Password Reset Confirm</h2>
        { this.renderTokenError() }
        <Form method='post' onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          <FormGroup>
            <Label htmlFor="password">Password:</Label>
            <Field component="input" type="password" name="password" autoComplete="none"/>
            { this.renderFieldError('password') }
          </FormGroup>
          <SubmitButtonSmall type="submit" value="Change Password" />
        </Form>
        { this.renderSuccessMesage()}
      </>
    );
  }
}

const mapStateToProps = state => {
  return (
    {
      passwordReset: state.passwordReset
    }
  )
}

export default compose(
  connect(mapStateToProps, { confirmPasswordReset }),
  reduxForm({ form: 'passwordResetConfirm' })
)(PasswordResetConfirm);