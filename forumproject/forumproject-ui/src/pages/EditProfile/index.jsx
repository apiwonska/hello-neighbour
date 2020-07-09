import React from 'react';
import { connect } from 'react-redux';
import { Form as FinalForm, Field } from 'react-final-form';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { emailValidator } from 'utils/validators';
import {
  fetchUser as fetchUser_,
  updateUser as updateUser_,
  uploadAvatar as uploadAvatar_,
} from 'redux/actions';
import {
  ContentWrapper,
  FormError,
  FormGroup,
  GroupWrapper,
  Spinner,
  TopBeam,
} from 'layout';
import {
  Button,
  FileInput,
  FileInputLabel,
  ButtonGroupWrapper,
  Avatar,
  Input,
  Label,
  TextArea,
  FormWrapper,
} from './style';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };
  }

  componentDidMount = () => {
    const { ownerId, fetchUser } = this.props;
    fetchUser(ownerId);
  };

  handleUpdateInfo = async (values) => {
    const newValues = { ...values };
    const { ownerId, updateUser } = this.props;
    newValues.description = values.description || '';

    // username is read only
    delete newValues.username;
    await updateUser(newValues, ownerId);

    const { user } = this.props;
    const errors = user.updateErrors;
    if (!_.isEmpty(errors)) return errors;

    return null;
  };

  handleFileSelect = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  handleFileUpload = () => {
    const { ownerId: userId, uploadAvatar } = this.props;
    const { selectedFile } = this.state;
    const formData = new FormData();
    formData.append('avatar', selectedFile, selectedFile.name);
    uploadAvatar(formData, userId);
  };

  render() {
    // a value to ensure form input id uniqueness
    const id = 'ep';
    const { user, ownerId, history } = this.props;

    if (user.fetching) {
      return <Spinner />;
    }

    if (user.fetched) {
      const { username, email, description } = user.data;
      const userData = { username, email, description };
      return (
        <>
          <TopBeam />
          <ContentWrapper>
            <GroupWrapper>
              <Avatar src={user.data.avatar} alt="User avatar" />
            </GroupWrapper>
            <ButtonGroupWrapper>
              <FileInputLabel for="file-upload">Choose Image...</FileInputLabel>
              <FileInput
                type="file"
                id="file-upload"
                onChange={this.handleFileSelect}
              />
              <Button type="button" onClick={this.handleFileUpload}>
                Upload
              </Button>
            </ButtonGroupWrapper>

            {user.updateErrors && user.uploadErrors.avatar && (
              <FormError>{user.uploadErrors.avatar}</FormError>
            )}

            <GroupWrapper>
              <FinalForm
                onSubmit={this.handleUpdateInfo}
                initialValues={userData}
              >
                {({
                  handleSubmit,
                  pristine,
                  hasValidationErrors,
                  initialValues,
                }) => (
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
                            <FormError>
                              {touched && (error || submitError)}
                            </FormError>
                          </FormGroup>
                        )}
                      </Field>
                      <Field name="description">
                        {({ input, meta: { touched, error, submitError } }) => (
                          <FormGroup>
                            <Label htmlFor={`description-${id}`}>
                              Description:
                            </Label>
                            <TextArea
                              {...input}
                              id={`description-${id}`}
                              rows="1"
                              maxLength="500"
                              placeholder="Tell us about yourself"
                            />
                            <FormError>
                              {touched && (error || submitError)}
                            </FormError>
                          </FormGroup>
                        )}
                      </Field>
                      <ButtonGroupWrapper>
                        <Button
                          onClick={() => history.push(`/profile/${ownerId}`)}
                        >
                          Your Profile
                        </Button>
                        <Button
                          type="submit"
                          disabled={pristine || hasValidationErrors}
                        >
                          Update Profile Information
                        </Button>
                      </ButtonGroupWrapper>
                    </FormWrapper>
                  </form>
                )}
              </FinalForm>
            </GroupWrapper>
          </ContentWrapper>
        </>
      );
    }
    return null;
  }
}

EditProfile.propTypes = {
  ownerId: PropTypes.number.isRequired,
  user: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      email: PropTypes.string,
      avatar: PropTypes.string,
      description: PropTypes.string,
    }).isRequired,
    updateErrors: PropTypes.object,
    uploadErrors: PropTypes.object,
  }).isRequired,
  fetchUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ownerId: state.auth.user.id,
  user: state.user,
});

export default connect(mapStateToProps, {
  fetchUser: fetchUser_,
  updateUser: updateUser_,
  uploadAvatar: uploadAvatar_,
})(EditProfile);
