import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  fetchUser as fetchUser_,
  updateUser as updateUser_,
  uploadAvatar as uploadAvatar_,
} from 'redux/actions';
import PageContent from './PageContent';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };
  }

  componentDidMount = () => {
    const { authUserId, fetchUser } = this.props;
    fetchUser(authUserId);
  };

  handleUpdateUserData = async (values) => {
    const newValues = { ...values };
    const { authUserId, updateUser } = this.props;
    newValues.description = values.description || '';

    // username is read only
    delete newValues.username;
    await updateUser(newValues, authUserId);

    const { user } = this.props;
    const errors = user.updateErrors;
    if (errors.data) return errors.data;

    return null;
  };

  handleFileSelect = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  handleFileUpload = () => {
    const { authUserId: userId, uploadAvatar } = this.props;
    const { selectedFile } = this.state;
    const formData = new FormData();
    formData.append('avatar', selectedFile, selectedFile.name);
    uploadAvatar(formData, userId);
  };

  render() {
    const {
      user,
      user: { fetching, fetched, fetchingErrors },
      authUserId,
    } = this.props;

    return (
      <PageContent
        fetching={fetching}
        fetched={fetched}
        errors={fetchingErrors}
        user={user}
        authUserId={authUserId}
        handleFileSelect={this.handleFileSelect}
        handleFileUpload={this.handleFileUpload}
        handleUpdateUserData={this.handleUpdateUserData}
      />
    );
  }
}

EditProfile.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  authUserId: PropTypes.number.isRequired,
  user: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    fetchingErrors: PropTypes.shape({}).isRequired,
    updateErrors: PropTypes.shape({ data: PropTypes.shape({}) }).isRequired,
  }).isRequired,
  fetchUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authUserId: state.auth.user.id,
  user: state.user,
});

export default connect(mapStateToProps, {
  fetchUser: fetchUser_,
  updateUser: updateUser_,
  uploadAvatar: uploadAvatar_,
})(EditProfile);
