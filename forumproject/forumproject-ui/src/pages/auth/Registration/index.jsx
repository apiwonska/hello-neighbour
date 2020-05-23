import React from 'react';
import { connect } from 'react-redux';
import { Field, Form as FinalForm } from 'react-final-form';
import PropTypes from 'prop-types';

import {
  Input,
  FormGroup,
  Label,
  FormError,
  FormWrapper,
} from 'components/styledForms';
import { SubmitButtonSmall } from 'components/styledButtons';
import { register as register_ } from 'redux/actions';
import {
  usernameValidator,
  emailValidator,
  passwordValidator,
  password2Validator,
} from 'utils/validators';

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
    // a value to ensure form input id uniqueness
    const id = 'reg';

    return (
      <div>
        <h2>Register</h2>

        <FinalForm onSubmit={this.onSubmit}>
          {({ handleSubmit, pristine, hasValidationErrors, values }) => (
            <form onSubmit={handleSubmit}>
              <FormWrapper>
                <Field name="username" validate={usernameValidator}>
                  {({ input, meta: { touched, error, submitError } }) => (
                    <FormGroup>
                      <Label htmlFor={`username-${id}`}>Username:</Label>
                      <Input {...input} id={`username-${id}`} type="text" />
                      <FormError>{touched && (error || submitError)}</FormError>
                    </FormGroup>
                  )}
                </Field>
                <Field name="email" validate={emailValidator}>
                  {({ input, meta: { touched, error, submitError } }) => (
                    <FormGroup>
                      <Label htmlFor={`email-${id}`}>Email:</Label>
                      <Input {...input} id={`email-${id}`} type="email" />
                      <FormError>{touched && (error || submitError)}</FormError>
                    </FormGroup>
                  )}
                </Field>
                <Field name="password" validate={passwordValidator}>
                  {({ input, meta: { touched, error, submitError } }) => (
                    <FormGroup>
                      <Label htmlFor={`password-${id}`}>Password:</Label>
                      <Input {...input} id={`password-${id}`} type="password" />
                      <FormError>{touched && (error || submitError)}</FormError>
                    </FormGroup>
                  )}
                </Field>
                <Field
                  name="password2"
                  validate={password2Validator(values.password)}
                >
                  {({ input, meta: { touched, error, submitError } }) => (
                    <FormGroup>
                      <Label htmlFor={`password2-${id}`}>
                        Confirm Password:
                      </Label>
                      <Input
                        {...input}
                        id={`password2-${id}`}
                        type="password"
                      />
                      <FormError>{touched && (error || submitError)}</FormError>
                    </FormGroup>
                  )}
                </Field>
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

Registration.propTypes = {
  register: PropTypes.func.isRequired,
  auth: PropTypes.shape({ errors: PropTypes.object.isRequired }).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { register: register_ })(Registration);
