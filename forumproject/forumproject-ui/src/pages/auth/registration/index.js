import React from 'react';
import { connect } from 'react-redux';
import { Field, Form as FinalForm } from 'react-final-form';
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
import { register } from '../../../redux/actions';
import {
  required,
  minLength,
  maxLength,
  isEmail,
  matchPassword,
  composeValidators
} from '../../../utils/validators';


class Registration extends React.Component {

  handleRegister = async(formProps) => {
    await this.props.register(formProps);

    const errors = this.props.auth.errors;
    if (errors) return errors;
  }

  render() {
    const usernameValidator = composeValidators(required, minLength(3), maxLength(150));
    const emailValidator = composeValidators(required, isEmail);
    const passwordValidator = composeValidators(required, minLength(8), maxLength(128));

    return (
      <div>
        <h2>Register</h2>

        <FinalForm onSubmit={this.handleRegister}>
          {({handleSubmit, pristine, hasValidationErrors, values}) => (
            <form onSubmit={handleSubmit}>
              <FormWrapper>
                <FormGroup>
                  <Label htmlFor="username">Username:</Label>
                  <Field name="username" validate={usernameValidator}>
                    {({ input, meta:{touched, error, submitError} }) => (
                      <>
                        <Input {...input} type="text"/>
                        <FormError>{ touched && (error || submitError)}</FormError>
                      </>
                    )}
                  </Field>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="email">Email:</Label>
                  <Field name="email" validate={emailValidator}>
                    {({ input, meta:{touched, error, submitError} }) => (
                      <>
                        <Input {...input} type="email"/>
                        <FormError>{ touched && (error || submitError)}</FormError>
                      </>
                    )}
                  </Field>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password">Password:</Label>
                  <Field name="password" validate={passwordValidator}>
                    {({ input, meta:{touched, error, submitError} }) => (
                      <>
                        <Input {...input} type="password"/>
                        <FormError>{ touched && (error || submitError)}</FormError>
                      </>
                    )}
                  </Field>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password2">Confirm Password:</Label>
                  <Field 
                    name="password2" 
                    validate={composeValidators(required, matchPassword(values['password']))}>
                    {({ input, meta:{touched, error, submitError} }) => (
                      <>
                        <Input {...input} type="password"/>
                        <FormError>{ touched && (error || submitError)}</FormError>
                      </>
                    )}
                  </Field>
                </FormGroup>
                <SubmitButtonSmall 
                  type="submit" 
                  value="Register"
                  disable={pristine || hasValidationErrors}
                />
              </FormWrapper>
            </form>
          )}
        </FinalForm>
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

export default connect(mapStateToProps, { register })(Registration);