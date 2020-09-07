import React from 'react';
import { Field, Form as FinalForm } from 'react-final-form';
import PropTypes from 'prop-types';

import {
  ModalButton as Button,
  ModalFormWrapper as FormWrapper,
  ModalInput as Input,
  ModalLabel as Label,
  ModalInputGroup as InputGroup,
  FormGroup,
  FormError,
} from 'layout';
import {
  required,
  passwordValidator,
  password2Validator,
} from 'utils/validators';

const ChangePasswordForm = ({ onSubmit }) => {
  const formId = 'prc';

  return (
    <FinalForm onSubmit={onSubmit}>
      {({ handleSubmit, submitErrors, form, submitSucceeded, values }) => {
        if (submitSucceeded) {
          form.reset();
          Object.keys(values).forEach((field) => form.resetFieldState(field));
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
                {({ input, meta: { touched, error, submitError, dirty } }) => (
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
                {({ input, meta: { touched, error, submitError, dirty } }) => (
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
  );
};

ChangePasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ChangePasswordForm;
