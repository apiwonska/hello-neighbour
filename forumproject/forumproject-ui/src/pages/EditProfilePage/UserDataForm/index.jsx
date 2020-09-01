import React from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { emailValidator } from 'utils/validators';
import { FormError, FormGroup, TextArea, Input } from 'layout';
import { Button, Label, FormWrapper, FormButtonsWrapper } from './style';

const UserDataForm = ({
  authUserId,
  initialFormValues,
  handleUpdateUserData,
}) => {
  const history = useHistory();
  // a value to ensure form input id uniqueness
  const id = 'ep';
  return (
    <FinalForm
      onSubmit={handleUpdateUserData}
      initialValues={initialFormValues}
    >
      {({ handleSubmit, pristine, hasValidationErrors, initialValues }) => (
        <form onSubmit={handleSubmit}>
          <FormWrapper>
            <FormGroup>
              <Label htmlFor={`username-${id}`}>Username:</Label>
              <Input
                id={`username-${id}`}
                value={initialValues.username}
                disabled
                type="text"
              />
            </FormGroup>
            <Field name="email" validate={emailValidator}>
              {({ input, meta: { touched, error, submitError } }) => (
                <FormGroup>
                  <Label htmlFor={`email-${id}`}>Email:</Label>
                  <Input {...input} id={`email-${id}`} type="email" />
                  {touched && (error || submitError) && (
                    <FormError>{error || submitError}</FormError>
                  )}
                </FormGroup>
              )}
            </Field>
            <Field name="description">
              {({ input, meta: { touched, error, submitError } }) => (
                <FormGroup>
                  <Label htmlFor={`description-${id}`}>Description:</Label>
                  <TextArea
                    {...input}
                    id={`description-${id}`}
                    rows="1"
                    maxLength="500"
                    placeholder="Tell us about yourself"
                  />
                  {touched && (error || submitError) && (
                    <FormError>{error || submitError}</FormError>
                  )}
                </FormGroup>
              )}
            </Field>
            <FormButtonsWrapper>
              <Button
                type="submit"
                disabled={pristine || hasValidationErrors}
                color="blue"
              >
                Update Profile Information
              </Button>
              <Button onClick={() => history.push(`/profile/${authUserId}`)}>
                Go To Your Profile
              </Button>
            </FormButtonsWrapper>
          </FormWrapper>
        </form>
      )}
    </FinalForm>
  );
};

UserDataForm.propTypes = {
  authUserId: PropTypes.number.isRequired,
  initialFormValues: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  handleUpdateUserData: PropTypes.func.isRequired,
};

export default UserDataForm;
