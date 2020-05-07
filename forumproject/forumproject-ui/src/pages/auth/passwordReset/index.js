import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import {
  Form,
  FormGroup
} from '../../../components/styledForms';
import {
  SubmitButtonSmall
} from '../../../components/styledButtons';
import { FormError } from '../../../components/errors';
import { resetPassword } from '../../../redux/actions';


class PasswordReset extends React.Component {

  onSubmit(formProps) {
    this.props.resetPassword(formProps);
  }

  renderFieldError(field) {
    const error = this.props.passwordReset.emailErrors[field];
    if (error) {
      return <FormError>{error}</FormError>
    }
  }

  renderSuccessMesage() {
    const { emailSent } = this.props.passwordReset;
    if (emailSent) {
      return <p>Email was sent. Please, check your inbox.</p>;
    }
  }

  render() {
    return (
      <div>
        <h2>Password Reset</h2>
        <Form method="post" onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          <FormGroup>
            <Field component="input" type="text" name="email" placeholder="Enter your email" autoComplete="none"/>
            { this.renderFieldError('email') }
          </FormGroup>
          <SubmitButtonSmall type="submit" value="Reset Password"/>
        </Form>
          { this.renderSuccessMesage()}
      </div>
    )
  }
};

const mapStateToProps = state => {
  return (
    {
      passwordReset: state.passwordReset
    }
  )
}


export default compose(
  connect(mapStateToProps, { resetPassword }),
  reduxForm({ form: 'passwordReset' })
)(PasswordReset);