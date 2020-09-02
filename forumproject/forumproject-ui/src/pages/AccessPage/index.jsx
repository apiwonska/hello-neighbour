import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';

import PageContent from './PageContent';

const AccessPage = ({ auth, passwordReset }) => {
  const errors = [
    auth.errors,
    passwordReset.emailErrors,
    passwordReset.resetErrors,
  ].find((el) => !_.isEmpty(el));

  return <PageContent errors={errors || {}} />;
};

AccessPage.propTypes = {
  auth: PropTypes.shape({ errors: PropTypes.shape({}).isRequired }).isRequired,
  passwordReset: PropTypes.shape({
    emailErrors: PropTypes.shape({}).isRequired,
    resetErrors: PropTypes.shape({}).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    passwordReset: state.passwordReset,
  };
};

export default connect(mapStateToProps)(AccessPage);
