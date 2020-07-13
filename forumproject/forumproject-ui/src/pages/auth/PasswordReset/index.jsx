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
  FormGroup,
  FormError,
} from 'layout';
import { resetPassword as resetPassword_ } from 'redux/actions';
import { emailValidator } from 'utils/validators';

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
    const { history } = this.props;
    const formId = 'pr';
    return (
      <Modal title="Password Reset" handleDismiss={() => history.push('/')}>
        <ContentGroup>
          <Paragraph>
            We will send you an authentication token to your email.
          </Paragraph>
        </ContentGroup>
        <FinalForm onSubmit={this.onSubmit}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FormWrapper>
                <Field name="email" validate={emailValidator}>
                  {({ input, meta: { touched, error, submitError } }) => (
                    <FormGroup>
                      <Label htmlFor={`email-${formId}`}>Email:</Label>
                      <Input {...input} id={`email-${formId}`} type="email" />
                      <FormError>{touched && (error || submitError)}</FormError>
                    </FormGroup>
                  )}
                </Field>
                <Button type="submit" color="yellow" size="L">
                  Reset Password
                </Button>
              </FormWrapper>
            </form>
          )}
        </FinalForm>
        <ContentGroup>
          <Paragraph>
            If you already have a token click this{' '}
            <Link to="/password-reset/confirm">link</Link>.
          </Paragraph>
        </ContentGroup>
      </Modal>
    );
  }
}

PasswordReset.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  resetPassword: PropTypes.func.isRequired,
  passwordReset: PropTypes.shape({
    emailErrors: PropTypes.shape({}).isRequired,
    emailSent: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  passwordReset: state.passwordReset,
});

export default connect(mapStateToProps, { resetPassword: resetPassword_ })(
  PasswordReset
);
