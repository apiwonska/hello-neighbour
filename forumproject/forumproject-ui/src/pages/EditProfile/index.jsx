import React from 'react';
import { connect } from 'react-redux';
import { Form as FinalForm, Field } from 'react-final-form';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { ContainerDiv } from 'components/styledDivs';
import {
  Input,
  TextArea,
  FormGroup,
  Label,
  FormError,
  FormWrapper,
} from 'components/styledForms';
import { ImageWrapper, Avatar } from './style';
import { emailValidator } from 'utils/validators';
import { SubmitButtonSmall } from 'components/styledButtons';
import {
  fetchUser as fetchUser_,
  updateUser as updateUser_,
  uploadAvatar as uploadAvatar_,
} from 'redux/actions';
import { Spinner } from 'layout';

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
    const { user } = this.props;

    if (user.fetching) {
      return <Spinner />;
    }

    if (user.fetched) {
      const { username, email, description } = user.data;
      const userData = { username, email, description };
      return (
        <ContainerDiv>
          <div>
            <ImageWrapper>
              <Avatar src={user.data.avatar} alt="User avatar" />
            </ImageWrapper>
            <input type="file" onChange={this.handleFileSelect} />
            <button type="button" onClick={this.handleFileUpload}>
              Upload
            </button>
            {user.updateErrors && user.uploadErrors.avatar && (
              <FormError>{user.uploadErrors.avatar}</FormError>
            )}
          </div>

          <FinalForm onSubmit={this.handleUpdateInfo} initialValues={userData}>
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
                      disabled="disabled"
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
                          rows="6"
                          maxLength="1000"
                          placeholder="Tell us about yourself"
                        />
                        <FormError>
                          {touched && (error || submitError)}
                        </FormError>
                      </FormGroup>
                    )}
                  </Field>
                  <SubmitButtonSmall
                    type="submit"
                    value="Update Profile"
                    disabled={pristine || hasValidationErrors}
                  />
                </FormWrapper>
              </form>
            )}
          </FinalForm>
        </ContainerDiv>
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
