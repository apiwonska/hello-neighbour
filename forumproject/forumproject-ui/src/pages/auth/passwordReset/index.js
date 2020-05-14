import React from 'react';
import { connect } from 'react-redux';
import { Field, Form as FinalForm } from 'react-final-form';

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
  required,
  isEmail,
  composeValidators  
} from '../../../utils/validators';


class PasswordReset extends React.Component {

  onSubmit = async(formProps) => {
    await this.props.resetPassword(formProps);

    const errors = this.props.passwordReset.emailErrors;
    if (errors) return errors;
  }

  render() {
    const emailValidator = composeValidators(required, isEmail);

    return (
      <div>
        <h2>Password Reset</h2>

        <FinalForm onSubmit={this.onSubmit}>
          {({handleSubmit, pristine, hasValidationErrors}) => (
            <form onSubmit={handleSubmit}>
              <FormWrapper>
                <FormGroup>
                  <Label htmlFor="email">Email:</Label>
                  <Field name="email" validate={emailValidator} >
                    {({input, meta: {touched, error, submitError} }) => (
                      (
                        <>
                          <Input {...input} type="email" placeholder="Enter your email" />
                          <FormError>
                            { touched && (error || submitError) }
                          </FormError>
                        </>
                      )
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

        { this.props.passwordReset.emailSent && 
          <p>Email was sent. Please, check your inbox.</p>
        }
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