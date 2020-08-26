import React from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Input, FormGroup, Label, FormError } from 'layout';
import {
  required,
  passwordValidator,
  password2Validator,
} from 'utils/validators';
import { ButtonGroupWrapper, Button, FormWrapper } from './style';

const PasswordChangeForm = ({ onSubmit, authUserId }) => {
  const history = useHistory();
  // a value to ensure form input id uniqueness
  const id = 'pch';

  return (
    <FinalForm onSubmit={onSubmit}>
      {({
        handleSubmit,
        pristine,
        hasValidationErrors,
        values,
        form,
        submitSucceeded,
      }) => {
        if (submitSucceeded) {
          form.reset();
          Object.keys(values).forEach((field) => form.resetFieldState(field));
        }
        return (
          <form onSubmit={handleSubmit}>
            <FormWrapper>
              <Field name="old_password" validate={required}>
                {({ input, meta: { touched, error, submitError } }) => (
                  <FormGroup>
                    <Label htmlFor={`old_password-${id}`}>Old Password:</Label>
                    <Input
                      {...input}
                      id={`old_password-${id}`}
                      type="password"
                    />
                    {touched && (error || submitError) && (
                      <FormError>{touched && (error || submitError)}</FormError>
                    )}
                  </FormGroup>
                )}
              </Field>
              <Field name="password" validate={passwordValidator}>
                {({ input, meta: { touched, error, submitError } }) => (
                  <FormGroup>
                    <Label htmlFor={`password-${id}`}>Password:</Label>
                    <Input {...input} id={`password-${id}`} type="password" />
                    {touched && (error || submitError) && (
                      <FormError>{touched && (error || submitError)}</FormError>
                    )}
                  </FormGroup>
                )}
              </Field>
              <Field
                name="password2"
                validate={password2Validator(values.password)}
              >
                {({ input, meta: { touched, error, submitError } }) => (
                  <FormGroup>
                    <Label htmlFor={`password2-${id}`}>Confirm password:</Label>
                    <Input {...input} id={`password2-${id}`} type="password" />
                    {touched && (error || submitError) && (
                      <FormError>{touched && (error || submitError)}</FormError>
                    )}
                  </FormGroup>
                )}
              </Field>
            </FormWrapper>
            <ButtonGroupWrapper>
              <Button onClick={() => history.push(`/profile/${authUserId}`)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disable={pristine || hasValidationErrors}
                color="blue"
              >
                Change Password
              </Button>
            </ButtonGroupWrapper>
          </form>
        );
      }}
    </FinalForm>
  );
};

PasswordChangeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  authUserId: PropTypes.number.isRequired,
};

export default PasswordChangeForm;
