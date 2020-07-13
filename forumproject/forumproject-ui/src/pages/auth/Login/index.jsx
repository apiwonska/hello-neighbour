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
  FormGroup,
  FormError,
} from 'layout';
import { logIn as logIn_ } from 'redux/actions';
import { required } from 'utils/validators';

class LogIn extends React.Component {
  onSubmit = async (formProps) => {
    const { logIn } = this.props;
    await logIn(formProps);

    const { auth } = this.props;
    const { errors } = auth;
    if (errors) return errors;
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
                <FormGroup>
                  <FormError>
                    {submitErrors ? submitErrors.non_field_errors : ''}
                  </FormError>
                </FormGroup>
                <Field name="username" validate={required}>
                  {({ input, meta: { touched, error, submitError } }) => (
                    <FormGroup>
                      <Label htmlFor={`username-${formId}`}>Username:</Label>
                      <Input {...input} id={`username-${formId}`} type="text" />
                      <FormError>{touched && (error || submitError)}</FormError>
                    </FormGroup>
                  )}
                </Field>
                <Field name="password" validate={required}>
                  {({ input, meta: { touched, error, submitError } }) => (
                    <FormGroup>
                      <Label htmlFor={`password-${formId}`}>Password:</Label>
                      <Input
                        {...input}
                        id={`password-${formId}`}
                        type="password"
                      />
                      <FormError>{touched && (error || submitError)}</FormError>
                    </FormGroup>
                  )}
                </Field>
                <Button type="submit" color="yellow" size="L">
                  Log In{' '}
                </Button>
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

LogIn.propTypes = {
  logIn: PropTypes.func.isRequired,
  auth: PropTypes.shape({ errors: PropTypes.shape({}).isRequired }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logIn: logIn_ })(LogIn);
