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
  FormWrapper,
} from '../../../components/styledForms';
import { SubmitButtonSmall } from '../../../components/styledButtons';
import { confirmPasswordReset as confirmPasswordReset_ } from '../../../redux/actions';
import {
  required,
  passwordValidator,
  password2Validator,
} from '../../../utils/validators';

class PasswordResetConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailSent: false,
      passwordChanged: false,
    };
  }

  componentDidMount() {
    const { history, location } = this.props;
    const emailSent = location.state && location.state.emailSent;
    if (emailSent) {
      this.setState({ emailSent: true });
      // We delete history state to prevent showing the email was sent
      // message again, when the user navigates to this page
      history.replace('/password-reset/confirm', {});
    }
  }

  onSubmit = async (values) => {
    const { confirmPasswordReset } = this.props;
    await confirmPasswordReset(values);
    this.setState({ emailSent: false });

    const { passwordReset } = this.props;
    const errors = passwordReset.resetErrors;
    if (!_.isEmpty(errors)) return errors;
    if (passwordReset.resetPasswordConfirmed) {
      this.setState({ passwordChanged: true });
    }
    return null;
  };

  render() {
    const { passwordChanged, emailSent } = this.state;
    if (passwordChanged) {
      return (
        <div>
          Password was changed. You can <Link to="/auth">log in</Link> now.
        </div>
      );
    }

    return (
      <>
        <h2>Password Reset Confirm</h2>
        <div>
          {emailSent && 'The confirmation token was sent to your email.'}
        </div>

        <FinalForm onSubmit={this.onSubmit}>
          {({
            handleSubmit,
            pristine,
            hasValidationErrors,
            submitErrors,
            form,
            submitSucceeded,
            values,
          }) => {
            if (submitSucceeded) {
              form.reset();
              Object.keys(values).forEach((field) =>
                form.resetFieldState(field)
              );
            }
            return (
              <form onSubmit={handleSubmit}>
                <FormWrapper>
                  <FormGroup>
                    <FormError>
                      {submitErrors &&
                        submitErrors.status &&
                        'The token is not valid'}
                    </FormError>
                  </FormGroup>
                  <Field name="token" validate={required}>
                    {({ input, meta: { touched, error, submitError } }) => (
                      <FormGroup>
                        <Label htmlFor="token">Token:</Label>
                        <Input {...input} type="text" />
                        <FormError>
                          {touched && (error || submitError)}
                        </FormError>
                      </FormGroup>
                    )}
                  </Field>
                  <Field name="password" validate={passwordValidator}>
                    {({ input, meta: { touched, error, submitError } }) => (
                      <FormGroup>
                        <Label htmlFor="password">New password:</Label>
                        <Input {...input} type="password" />
                        <FormError>
                          {touched && (error || submitError)}
                        </FormError>
                      </FormGroup>
                    )}
                  </Field>
                  <Field
                    name="password2"
                    validate={password2Validator(values.password)}
                  >
                    {({ input, meta: { touched, error } }) => (
                      <FormGroup>
                        <Label htmlFor="password2">Confirm password:</Label>
                        <Input {...input} type="password" />
                        <FormError>{touched && error}</FormError>
                      </FormGroup>
                    )}
                  </Field>
                  <SubmitButtonSmall
                    type="submit"
                    value="Change Password"
                    disable={pristine || hasValidationErrors}
                  />
                </FormWrapper>
              </form>
            );
          }}
        </FinalForm>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  passwordReset: state.passwordReset,
});

export default connect(mapStateToProps, {
  confirmPasswordReset: confirmPasswordReset_,
})(PasswordResetConfirm);
