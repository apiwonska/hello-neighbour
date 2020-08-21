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
  PageTitleBlock,
  TextArea,
  Input,
  Anchor,
  Breadcrumb,
  BreadcrumbIcon,
} from 'layout';
import {
  Button,
  UploadButton,
  FileInput,
  FileInputLabel,
  ButtonGroupWrapper,
  Avatar,
  Label,
  FormWrapper,
  FormButtonsWrapper,
  InnerContentWrapper,
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
          <PageTitleBlock title="Edit Your Profile" />

          <ContentWrapper>
            <Breadcrumb>
              <Anchor href="/">
                <BreadcrumbIcon name="home" />
                Home Page
              </Anchor>
              <Anchor href={`/profile/${ownerId}`}>Your Profile</Anchor>
              <span>Edit Profile</span>
            </Breadcrumb>
            <InnerContentWrapper>
              <GroupWrapper>
                <Avatar src={user.data.avatar} alt="User avatar" />
              </GroupWrapper>
              <ButtonGroupWrapper>
                <FileInputLabel for="file-upload">
                  Choose Image...
                </FileInputLabel>
                <FileInput
                  type="file"
                  id="file-upload"
                  onChange={this.handleFileSelect}
                />
                <UploadButton
                  type="button"
                  onClick={this.handleFileUpload}
                  color="blue"
                >
                  Upload
                </UploadButton>
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
                          {({
                            input,
                            meta: { touched, error, submitError },
                          }) => (
                            <FormGroup>
                              <Label htmlFor={`email-${id}`}>Email:</Label>
                              <Input
                                {...input}
                                id={`email-${id}`}
                                type="email"
                              />
                              {touched && (error || submitError) && (
                                <FormError>{error || submitError}</FormError>
                              )}
                            </FormGroup>
                          )}
                        </Field>
                        <Field name="description">
                          {({
                            input,
                            meta: { touched, error, submitError },
                          }) => (
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
                          <Button
                            onClick={() => history.push(`/profile/${ownerId}`)}
                          >
                            Go To Your Profile
                          </Button>
                        </FormButtonsWrapper>
                      </FormWrapper>
                    </form>
                  )}
                </FinalForm>
              </GroupWrapper>
            </InnerContentWrapper>
          </ContentWrapper>
        </>
      );
    }
    return null;
  }
}

EditProfile.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
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
    updateErrors: PropTypes.shape({}),
    uploadErrors: PropTypes.shape({ avatar: PropTypes.string }),
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
