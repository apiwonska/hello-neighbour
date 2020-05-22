import React from 'react';
import { connect } from 'react-redux';
import { Field, Form as FinalForm } from 'react-final-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Input,
  FormGroup,
  Label,
  FormError,
  FormWrapper,
} from '../../../components/styledForms';
import { SubmitButtonSmall } from '../../../components/styledButtons';
import { logIn as logIn_ } from '../../../redux/actions';
import { required } from '../../../utils/validators';

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
    return (
      <div>
        <h2>Log In</h2>
        <FinalForm onSubmit={this.onSubmit}>
          {({ handleSubmit, pristine, hasValidationErrors, submitErrors }) => (
            <form onSubmit={handleSubmit}>
              <FormWrapper>
                <FormGroup>
                  <FormError>
                    {submitErrors ? submitErrors.non_field_errors : ''}
                  </FormError>
                </FormGroup>
                <Field name="username" validate={required}>
                  {({ input, meta: { touched, error, submitError } }) => (
                    <FormGroup>
                      <Label htmlFor="username">Username:</Label>
                      <Input {...input} type="text" />
                      <FormError>{touched && (error || submitError)}</FormError>
                    </FormGroup>
                  )}
                </Field>
                <Field name="password" validate={required}>
                  {({ input, meta: { touched, error, submitError } }) => (
                    <FormGroup>
                      <Label htmlFor="password">Password:</Label>
                      <Input {...input} type="password" />
                      <FormError>{touched && (error || submitError)}</FormError>
                    </FormGroup>
                  )}
                </Field>
                <SubmitButtonSmall
                  type="submit"
                  value="Log In"
                  disable={pristine || hasValidationErrors}
                />
              </FormWrapper>
            </form>
          )}
        </FinalForm>
        <div>
          <p>
            If you don&apos;t have an account&nbsp;
            <Link to="/register">register here</Link>
          </p>
          <p>
            Did you forget your login or password? Click&nbsp;
            <Link to="/password-reset">this</Link>&nbsp;to restore your
            credentials
          </p>
        </div>
      </div>
    );
  }
}

LogIn.propTypes = {
  logIn: PropTypes.func.isRequired,
  auth: PropTypes.shape({ errors: PropTypes.object.isRequired }).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logIn: logIn_ })(LogIn);
