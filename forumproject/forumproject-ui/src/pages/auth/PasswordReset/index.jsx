import React from 'react';
import { connect } from 'react-redux';
import { Field, Form as FinalForm } from 'react-final-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';

import {
  Input,
  FormGroup,
  Label,
  FormError,
  FormWrapper,
} from '../../../components/styledForms';
import { SubmitButtonSmall } from '../../../components/styledButtons';
import { resetPassword as resetPassword_ } from '../../../redux/actions';
import { emailValidator } from '../../../utils/validators';

class PasswordReset extends React.Component {
  onSubmit = async (formProps) => {
    const { resetPassword, history } = this.props;
    await resetPassword(formProps);

    const { passwordReset } = this.props;
    const errors = passwordReset.emailErrors;
    if (!_.isEmpty(errors)) return errors;
    if (passwordReset.emailSent) {
      history.push('/password-reset/confirm', {
        emailSent: true,
      });
    }
    return null;
  };

  render() {
    return (
      <div>
        <h2>Password Reset</h2>

        <div>We will send you an authentication token to your email.</div>

        <FinalForm onSubmit={this.onSubmit}>
          {({ handleSubmit, pristine, hasValidationErrors }) => (
            <form onSubmit={handleSubmit}>
              <FormWrapper>
                <FormGroup>
                  <Label htmlFor="email">Email:</Label>
                  <Field name="email" validate={emailValidator}>
                    {({ input, meta: { touched, error, submitError } }) => (
                      <>
                        <Input
                          {...input}
                          type="email"
                          placeholder="Enter your email"
                        />
                        <FormError>
                          {touched && (error || submitError)}
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
          If you already have a token click this{' '}
          <Link to="/password-reset/confirm">link</Link>.
        </div>
      </div>
    );
  }
}

PasswordReset.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  resetPassword: PropTypes.func.isRequired,
  passwordReset: PropTypes.shape({
    emailErrors: PropTypes.object.isRequired,
    emailSent: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  passwordReset: state.passwordReset,
});

export default connect(mapStateToProps, { resetPassword: resetPassword_ })(
  PasswordReset
);
