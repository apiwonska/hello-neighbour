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
import { confirmPasswordReset } from '../../../redux/actions';
import {
  required,
  minLength,
  maxLength,
  matchPassword,
  composeValidators
} from '../../../utils/validators';


class PasswordResetConfirm extends React.Component {

  state = {
    emailSent: false,
    passwordChanged: false
  }

  componentDidMount() {
    const emailSent = this.props.location.state && this.props.location.state.emailSent;
    if (emailSent) {
      this.setState({ emailSent: true });
      // We delete history state to prevent showing the email was sent 
      // message again, when the user navigates to this page
      this.props.history.replace('/password-reset/confirm', {})
    }
  }

  onSubmit = async(values) => {
    _.omit(values, ['password2'])
    await this.props.confirmPasswordReset(values);
    this.setState({emailSent: false});

    const errors = this.props.passwordReset.passwordErrors;
    if (!_.isEmpty(errors)) return errors;

    if (this.props.passwordReset.resetPasswordConfirmed) {
      this.setState({ passwordChanged: true});
    }
  }

  render() {
    
    const passwordValidator = composeValidators(required, minLength(8), maxLength(128));

    return(
      <>
        <h2>Password Reset Confirm</h2>
        <div>
          { this.state.emailSent &&
            'The confirmation token was sent to your email.'
          }
        </div>

        <FinalForm onSubmit={this.onSubmit}>
          {({handleSubmit, pristine, hasValidationErrors, submitErrors, form, submitSucceeded, values}) => {
            if (submitSucceeded) {
              form.reset();
              Object.keys(values).forEach(field => form.resetFieldState(field));
            }
            return (
            <form onSubmit={handleSubmit}>
              <FormWrapper>
                <FormGroup>
                  <FormError>
                    { submitErrors ? (submitErrors['status'] ? 'The token is not valid' : '') : '' }
                  </FormError>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="token">Token:</Label>
                  <Field name="token" validate={required}>
                    {({input, meta:{touched, error, submitError} }) => (
                      <>
                        <Input {...input} type="text"/>
                        <FormError>
                          { touched && (error || submitError)}
                        </FormError>
                      </>
                    )}
                  </Field>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password">New password:</Label>
                  <Field name="password" validate={passwordValidator}>
                    {({input, meta:{touched, error, submitError} }) => (
                      <>
                        <Input {...input} type="password"/>
                        <FormError>
                          { touched && (error || submitError)}
                        </FormError>
                      </>
                    )}
                  </Field>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password2">Confirm password:</Label>
                  <Field 
                    name="password2" 
                    validate={composeValidators(required, matchPassword(values['password']))}
                  >
                    {({input, meta:{touched, error} }) => (
                      <>
                        <Input {...input} type="password"/>
                        <FormError>
                          { touched && error}
                        </FormError>
                      </>
                    )}
                  </Field>
                </FormGroup>
                <SubmitButtonSmall 
                  type="submit" 
                  value="Change Password" 
                  disable = {pristine || hasValidationErrors}
                />
              </FormWrapper>
            </form>
          )}}
        </FinalForm>

        { this.state.passwordChanged &&
          <p>Password was changed. You can <Link to={'/auth'}>log in</Link> now.</p> 
        }
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

export default connect(mapStateToProps, {confirmPasswordReset})(PasswordResetConfirm);