import React from 'react';
import { connect } from 'react-redux';
import { Field, Form as FinalForm } from 'react-final-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import {
  Input,
  FormGroup,
  Label,
  FormError,
  FormWrapper
} from '../../../components/styledForms';
import {
  SubmitButtonSmall
} from '../../../components/styledButtons';
import { resetPassword } from '../../../redux/actions';
import { 
  emailValidator 
} from '../../../utils/validators';


class PasswordReset extends React.Component {

  onSubmit = async(formProps) => {
    await this.props.resetPassword(formProps);

    const errors = this.props.passwordReset.emailErrors;
    if (!_.isEmpty(errors)) return errors;
    if (this.props.passwordReset.emailSent) {
      this.props.history.push('/password-reset/confirm', {
        emailSent: true
      });
    }
  }

  render() {
    return (
      <div>
        <h2>Password Reset</h2>

        <div>
          We will send you an authentication token to your email.
        </div>

        <FinalForm onSubmit={this.onSubmit}>
          {({handleSubmit, pristine, hasValidationErrors}) => (
            <form onSubmit={handleSubmit}>
              <FormWrapper>
                <FormGroup>
                  <Label htmlFor="email">Email:</Label>
                  <Field name="email" validate={emailValidator} >
                    {({input, meta: {touched, error, submitError} }) => (
                      <>
                        <Input {...input} type="email" placeholder="Enter your email" />
                        <FormError>
                          { touched && (error || submitError) }
                        </FormError>
                      </>
                    )}
                  </Field>
                </FormGroup>
                <SubmitButtonSmall 
                  type="submit" 
                  value="Reset Password"
                  disable={pristine || hasValidationErrors}
                />
              </FormWrapper>
            </form>
          )}
        </FinalForm>

        <div>
          If you already have a token click this <Link to='/password-reset/confirm'>link</Link>.
        </div>

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


export default connect(mapStateToProps, { resetPassword })(PasswordReset);