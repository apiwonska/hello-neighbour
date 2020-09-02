import React from 'react';
import { connect } from 'react-redux';
import { Field, Form as FinalForm } from 'react-final-form';
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
import { logIn as logIn_ } from 'redux/actions';
import { required } from 'utils/validators';

class LogInModal extends React.Component {
  onSubmit = async (formProps) => {
    const { logIn } = this.props;
    await logIn(formProps);

    const { auth } = this.props;
    const { errors } = auth;
    if (errors.data) return errors.data;
    return null;
  };

  render() {
    const formId = 'login';
    const { history } = this.props;
    return (
      <Modal title="Log In" handleDismiss={() => history.push('/')}>
        <FinalForm onSubmit={this.onSubmit}>
          {({ handleSubmit, submitErrors }) => (
            <form onSubmit={handleSubmit} id={formId}>
              <FormWrapper>
                {submitErrors && submitErrors.non_field_errors && (
                  <FormGroup>
                    <FormError>{submitErrors.non_field_errors}</FormError>
                  </FormGroup>
                )}
                <Field name="username" validate={required}>
                  {({
                    input,
                    meta: { touched, error, submitError, dirty },
                  }) => (
                    <InputGroup>
                      <Label htmlFor={`username-${formId}`} dirty={dirty}>
                        Username:
                      </Label>
                      <Input {...input} id={`username-${formId}`} type="text" />
                      {touched && (error || submitError) && (
                        <FormError>{error || submitError}</FormError>
                      )}
                    </InputGroup>
                  )}
                </Field>
                <Field name="password" validate={required}>
                  {({
                    input,
                    meta: { touched, error, submitError, dirty },
                  }) => (
                    <InputGroup>
                      <Label htmlFor={`password-${formId}`} dirty={dirty}>
                        Password:
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
                <Button type="submit">Log In </Button>
              </FormWrapper>
            </form>
          )}
        </FinalForm>
        <ContentGroup>
          <Paragraph>
            If you don&apos;t have an account&nbsp;
            <Link to="/register">register here</Link>
          </Paragraph>
          <Paragraph>
            Did you forget your login or password? Click&nbsp;
            <Link to="/password-reset">this</Link>&nbsp;to restore your
            credentials
          </Paragraph>
        </ContentGroup>
      </Modal>
    );
  }
}

LogInModal.propTypes = {
  logIn: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    errors: PropTypes.shape({ data: PropTypes.shape({}) }).isRequired,
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logIn: logIn_ })(LogInModal);
