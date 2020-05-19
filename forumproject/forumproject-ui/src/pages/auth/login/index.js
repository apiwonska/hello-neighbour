import React from 'react';
import { connect } from 'react-redux';
import { Field, Form as FinalForm } from 'react-final-form';
import { Link } from 'react-router-dom';

import {
  Input,
  FormGroup,
  Label,
  FormError,
  FormWrapper,
} from '../../../components/styledForms';
import { SubmitButtonSmall } from '../../../components/styledButtons';
import { logIn } from '../../../redux/actions';
import { required } from '../../../utils/validators';

class LogIn extends React.Component {
  onSubmit = async (formProps) => {
    await this.props.logIn(formProps);

    const { errors } = this.props.auth;
    if (errors) {
      return errors;
    }
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
                <FormGroup>
                  <Label htmlFor="username">Username:</Label>
                  <Field name="username" validate={required}>
                    {({ input, meta: { touched, error, submitError } }) => (
                      <>
                        <Input {...input} type="text" />
                        <FormError>
                          {touched && (error || submitError)}
                        </FormError>
                      </>
                    )}
                  </Field>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password">Password:</Label>
                  <Field name="password" validate={required}>
                    {({ input, meta: { touched, error, submitError } }) => (
                      <>
                        <Input {...input} type="password" />
                        <FormError>
                          {touched && (error || submitError)}
                        </FormError>
                      </>
                    )}
                  </Field>
                </FormGroup>
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
            If you don't have an account yet,
            <Link to="/register">register here</Link>
          </p>
          <p>
            Did you forget your login or password? Click
            <Link to="/password-reset">this</Link>
{' '}
to restore your credentials
</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { logIn })(LogIn);
