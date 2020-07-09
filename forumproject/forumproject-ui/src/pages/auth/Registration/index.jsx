import React from 'react';
import { connect } from 'react-redux';
import { Field, Form as FinalForm } from 'react-final-form';
import PropTypes from 'prop-types';

import {
  Modal,
  ModalButton as Button,
  ModalFormWrapper as FormWrapper,
  ModalInput as Input,
  ModalLabel as Label,
  FormGroup,
  FormError,
} from 'layout';
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
    const { history } = this.props;
    const formId = 'reg';

    return (
      <Modal title="Register" handleDismiss={() => history.push('/')}>
        <FinalForm onSubmit={this.onSubmit}>
          {({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <FormWrapper>
                <Field name="username" validate={usernameValidator}>
                  {({ input, meta: { touched, error, submitError } }) => (
                    <FormGroup>
                      <Label htmlFor={`username-${formId}`}>Username:</Label>
                      <Input {...input} id={`username-${formId}`} type="text" />
                      <FormError>{touched && (error || submitError)}</FormError>
                    </FormGroup>
                  )}
                </Field>
                <Field name="email" validate={emailValidator}>
                  {({ input, meta: { touched, error, submitError } }) => (
                    <FormGroup>
                      <Label htmlFor={`email-${formId}`}>Email:</Label>
                      <Input {...input} id={`email-${formId}`} type="email" />
                      <FormError>{touched && (error || submitError)}</FormError>
                    </FormGroup>
                  )}
                </Field>
                <Field name="password" validate={passwordValidator}>
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
                <Field
                  name="password2"
                  validate={password2Validator(values.password)}
                >
                  {({ input, meta: { touched, error, submitError } }) => (
                    <FormGroup>
                      <Label htmlFor={`password2-${formId}`}>
                        Confirm Password:
                      </Label>
                      <Input
                        {...input}
                        id={`password2-${formId}`}
                        type="password"
                      />
                      <FormError>{touched && (error || submitError)}</FormError>
                    </FormGroup>
                  )}
                </Field>
                <Button type="submit" color="yellow" size="L">
                  Register
                </Button>
              </FormWrapper>
            </form>
          )}
        </FinalForm>
      </Modal>
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
