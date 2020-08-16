import React from 'react';
import { connect } from 'react-redux';
import { Field, Form as FinalForm } from 'react-final-form';
import _ from 'lodash';
import PropTypes from 'prop-types';

import {
  Modal,
  ModalButton as Button,
  ModalContentGroup as ContentGroup,
  ModalFormWrapper as FormWrapper,
  ModalInput as Input,
  ModalLabel as Label,
  ModalLink as Link,
  ModalParagraph as Paragraph,
  ModalInputGroup as InputGroup,
  FormGroup,
  FormError,
} from 'layout';
import { confirmPasswordReset as confirmPasswordReset_ } from 'redux/actions';
import {
  required,
  passwordValidator,
  password2Validator,
} from 'utils/validators';

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
      /**
       * we delete location state to prevent showing the email was sent
       * message again, when the user navigates to this page
       */
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
    const formId = 'prc';
    const { passwordChanged, emailSent } = this.state;
    const { history } = this.props;

    if (passwordChanged) {
      return (
        <ContentGroup>
          <Paragraph>
            Password was changed. You can <Link to="/auth">Log In</Link> now.
          </Paragraph>
        </ContentGroup>
      );
    }

    return (
      <Modal
        title="Password Reset Confirm"
        handleDismiss={() => history.push('/')}
      >
        <Paragraph>
          {emailSent && 'The confirmation token was sent to your email.'}
        </Paragraph>

        <FinalForm onSubmit={this.onSubmit}>
          {({ handleSubmit, submitErrors, form, submitSucceeded, values }) => {
            if (submitSucceeded) {
              form.reset();
              Object.keys(values).forEach((field) =>
                form.resetFieldState(field)
              );
            }
            return (
              <form onSubmit={handleSubmit} id={formId}>
                <FormWrapper>
                  {submitErrors && submitErrors.status && (
                    <FormGroup>
                      <FormError>The token is not valid</FormError>
                    </FormGroup>
                  )}
                  <Field name="token" validate={required}>
                    {({
                      input,
                      meta: { touched, error, submitError, dirty },
                    }) => (
                      <InputGroup>
                        <Label htmlFor={`token-${formId}`} dirty={dirty}>
                          Token:
                        </Label>
                        <Input {...input} id={`token-${formId}`} type="text" />
                        {touched && (error || submitError) && (
                          <FormError>{error || submitError}</FormError>
                        )}
                      </InputGroup>
                    )}
                  </Field>
                  <Field name="password" validate={passwordValidator}>
                    {({
                      input,
                      meta: { touched, error, submitError, dirty },
                    }) => (
                      <InputGroup>
                        <Label htmlFor={`password-${formId}`} dirty={dirty}>
                          New password:
                        </Label>
                        <Input
                          {...input}
                          id={`password-${formId}`}
                          type="password"
                        />
                        {touched && (error || submitError) && (
                          <FormError>{error || submitError}</FormError>
                        )}
                      </InputGroup>
                    )}
                  </Field>
                  <Field
                    name="password2"
                    validate={password2Validator(values.password)}
                  >
                    {({ input, meta: { touched, error, dirty } }) => (
                      <InputGroup>
                        <Label htmlFor={`password2-${formId}`} dirty={dirty}>
                          Confirm password:
                        </Label>
                        <Input
                          {...input}
                          id={`password2-${formId}`}
                          type="password"
                        />
                        {touched && error && <FormError>{error}</FormError>}
                      </InputGroup>
                    )}
                  </Field>
                  <Button type="submit">Change Password</Button>
                </FormWrapper>
              </form>
            );
          }}
        </FinalForm>
      </Modal>
    );
  }
}

PasswordResetConfirm.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({ emailSent: PropTypes.bool }),
  }).isRequired,
  confirmPasswordReset: PropTypes.func.isRequired,
  passwordReset: PropTypes.shape({
    resetErrors: PropTypes.shape({}).isRequired,
    resetPasswordConfirmed: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  passwordReset: state.passwordReset,
});

export default connect(mapStateToProps, {
  confirmPasswordReset: confirmPasswordReset_,
})(PasswordResetConfirm);
