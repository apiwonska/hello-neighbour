import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import {
  Modal,
  ModalContentGroup as ContentGroup,
  ModalLink as Link,
  ModalParagraph as Paragraph,
} from 'layout';
import { confirmPasswordReset as confirmPasswordReset_ } from 'redux/actions';
import { CONSTANTS } from 'utils';
import ChangePasswordForm from './ChangePasswordForm';

class PasswordResetConfirmModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailSent: false,
      passwordChanged: true,
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
    if (errors.data) return errors.data;
    if (passwordReset.resetPasswordConfirmed) {
      this.setState({ passwordChanged: true });
    }
    return null;
  };

  render() {
    const { passwordChanged, emailSent } = this.state;
    const { history } = this.props;

    return (
      <>
        <Helmet>
          <title>Password Reset Confirm - {CONSTANTS.appName}</title>
        </Helmet>

        <Modal
          title="Password Reset Confirm"
          handleDismiss={() => history.push('/')}
        >
          {!passwordChanged && (
            <>
              <Paragraph>
                {emailSent && 'The confirmation token was sent to your email.'}
              </Paragraph>
              <ChangePasswordForm onSubmit={this.onSubmit} />
            </>
          )}

          {passwordChanged && (
            <ContentGroup>
              <Paragraph>
                Password was changed. You can <Link to="/auth">Log In</Link>{' '}
                now.
              </Paragraph>
            </ContentGroup>
          )}
        </Modal>
      </>
    );
  }
}

PasswordResetConfirmModal.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({ emailSent: PropTypes.bool }),
  }).isRequired,
  confirmPasswordReset: PropTypes.func.isRequired,
  passwordReset: PropTypes.shape({
    resetErrors: PropTypes.shape({ data: PropTypes.shape({}) }).isRequired,
    resetPasswordConfirmed: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  passwordReset: state.passwordReset,
});

export default connect(mapStateToProps, {
  confirmPasswordReset: confirmPasswordReset_,
})(PasswordResetConfirmModal);
