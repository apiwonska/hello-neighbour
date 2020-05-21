import React from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import {
  Input,
  FormGroup,
  Label,
  FormError,
  FormWrapper,
} from '../../components/styledForms';
import { SubmitButtonSmall } from '../../components/styledButtons';
import {
  required,
  passwordValidator,
  password2Validator,
} from '../../utils/validators';
import { changePassword as changePassword_ } from '../../redux/actions';

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
    const { passwordChanged } = this.state;
    const { auth } = this.props;
    const userId = auth.user.id;

    if (passwordChanged) {
      return (
        <div>
          <p>Your password was changed!</p>
          <p>
            Go back to your
            <Link to={`/profile/${userId}`}>profile</Link>
          </p>
        </div>
      );
    }

    return (
      <div>
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
                  <FormGroup>
                    <Label htmlFor="old_password">Old Password:</Label>
                    <Field name="old_password" validate={required}>
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
                  <FormGroup>
                    <Label htmlFor="password">Password:</Label>
                    <Field name="password" validate={passwordValidator}>
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
                  <FormGroup>
                    <Label htmlFor="password2">Confirm password:</Label>
                    <Field
                      name="password2"
                      validate={password2Validator(values.password)}
                    >
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
                    value="Change Password"
                    disable={pristine || hasValidationErrors}
                  />
                </FormWrapper>
              </form>
            );
          }}
        </FinalForm>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { changePassword: changePassword_ })(
  PasswordChange
);
