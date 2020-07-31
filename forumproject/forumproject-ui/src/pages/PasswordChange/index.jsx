import React from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  ContentWrapper,
  PageTitle,
  TopBeam,
  Input,
  FormGroup,
  Label,
  FormError,
  Anchor,
  Breadcrumb,
  BreadcrumbIcon,
} from 'layout';
import {
  required,
  passwordValidator,
  password2Validator,
} from 'utils/validators';
import { changePassword as changePassword_ } from 'redux/actions';
import {
  ButtonGroupWrapper,
  Button,
  FormWrapper,
  InnerContentWrapper,
} from './style';

class PasswordChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordChanged: false,
    };
  }

  onSubmit = async (values) => {
    const { changePassword } = this.props;
    await changePassword(values);

    const { auth } = this.props;
    const { errors } = auth;
    if (!_.isEmpty(errors)) return errors;

    this.setState({ passwordChanged: true });
    return null;
  };

  render() {
    // a value to ensure form input id uniqueness
    const id = 'pch';
    const { passwordChanged } = this.state;
    const { auth, history } = this.props;
    const ownerId = auth.user.id;

    if (passwordChanged) {
      return (
        <div>
          <p>Your password was changed!</p>
          <p>
            Go back to your
            <Link to={`/profile/${ownerId}`}>profile</Link>
          </p>
        </div>
      );
    }

    return (
      <>
        <TopBeam>
          <PageTitle>Password Change</PageTitle>
        </TopBeam>
        <ContentWrapper>
          <Breadcrumb>
            <Anchor href="/">
              <BreadcrumbIcon name="home" />
              Home Page
            </Anchor>
            <Anchor href={`/profile/${ownerId}`}>Your Profile</Anchor>
            <span>Change Password</span>
          </Breadcrumb>
          <InnerContentWrapper>
            <FinalForm onSubmit={this.onSubmit}>
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
                  Object.keys(values).forEach((field) =>
                    form.resetFieldState(field)
                  );
                }
                return (
                  <form onSubmit={handleSubmit}>
                    <FormWrapper>
                      <Field name="old_password" validate={required}>
                        {({ input, meta: { touched, error, submitError } }) => (
                          <FormGroup>
                            <Label htmlFor={`old_password-${id}`}>
                              Old Password:
                            </Label>
                            <Input
                              {...input}
                              id={`old_password-${id}`}
                              type="password"
                            />
                            <FormError>
                              {touched && (error || submitError)}
                            </FormError>
                          </FormGroup>
                        )}
                      </Field>
                      <Field name="password" validate={passwordValidator}>
                        {({ input, meta: { touched, error, submitError } }) => (
                          <FormGroup>
                            <Label htmlFor={`password-${id}`}>Password:</Label>
                            <Input
                              {...input}
                              id={`password-${id}`}
                              type="password"
                            />
                            <FormError>
                              {touched && (error || submitError)}
                            </FormError>
                          </FormGroup>
                        )}
                      </Field>
                      <Field
                        name="password2"
                        validate={password2Validator(values.password)}
                      >
                        {({ input, meta: { touched, error, submitError } }) => (
                          <FormGroup>
                            <Label htmlFor={`password2-${id}`}>
                              Confirm password:
                            </Label>
                            <Input
                              {...input}
                              id={`password2-${id}`}
                              type="password"
                            />
                            <FormError>
                              {touched && (error || submitError)}
                            </FormError>
                          </FormGroup>
                        )}
                      </Field>
                    </FormWrapper>
                    <ButtonGroupWrapper>
                      <Button
                        onClick={() => history.push(`/profile/${ownerId}`)}
                      >
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
          </InnerContentWrapper>
        </ContentWrapper>
      </>
    );
  }
}

PasswordChange.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    errors: PropTypes.shape({}).isRequired,
  }).isRequired,
  changePassword: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { changePassword: changePassword_ })(
  PasswordChange
);
