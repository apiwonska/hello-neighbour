import React from 'react';
import { connect } from 'react-redux';
import { Field, Form as FinalForm } from 'react-final-form';

import {
  Input,
  FormGroup,
  Label,
  FormError,
  FormWrapper,
} from '../../../components/styledForms';
import { SubmitButtonSmall } from '../../../components/styledButtons';
import { register as register_ } from '../../../redux/actions';
import {
  usernameValidator,
  emailValidator,
  passwordValidator,
  password2Validator,
} from '../../../utils/validators';

class Registration extends React.Component {
  onSubmit = async (values) => {
    const { register } = this.props;
    await register(values);

    const { auth } = this.props;
    const { errors } = auth;
    if (errors) return errors;
    return null;
  };

  render() {
    return (
      <div>
        <h2>Register</h2>

        <FinalForm onSubmit={this.onSubmit}>
          {({ handleSubmit, pristine, hasValidationErrors, values }) => (
            <form onSubmit={handleSubmit}>
              <FormWrapper>
                <FormGroup>
                  <Label htmlFor="username">Username:</Label>
                  <Field name="username" validate={usernameValidator}>
                    {({ input, meta: { touched, error, submitError } }) => (
                      <>
                        <Input {...input} type="text" />
                        <FormError>
                          {touched && (error || submitError)}
                        </FormError>
                      </>
                    )}
                  </Field>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="email">Email:</Label>
                  <Field name="email" validate={emailValidator}>
                    {({ input, meta: { touched, error, submitError } }) => (
                      <>
                        <Input {...input} type="email" />
                        <FormError>
                          {touched && (error || submitError)}
                        </FormError>
                      </>
                    )}
                  </Field>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password">Password:</Label>
                  <Field name="password" validate={passwordValidator}>
                    {({ input, meta: { touched, error, submitError } }) => (
                      <>
                        <Input {...input} type="password" />
                        <FormError>
                          {touched && (error || submitError)}
                        </FormError>
                      </>
                    )}
                  </Field>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password2">Confirm Password:</Label>
                  <Field
                    name="password2"
                    validate={password2Validator(values.password)}
                  >
                    {({ input, meta: { touched, error, submitError } }) => (
                      <>
                        <Input {...input} type="password" />
                        <FormError>
                          {touched && (error || submitError)}
                        </FormError>
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
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { register: register_ })(Registration);
