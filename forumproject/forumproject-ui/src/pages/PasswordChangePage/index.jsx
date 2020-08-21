import React, { useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { changePassword as changePassword_ } from 'redux/actions';
import { ContentWrapper, PageTitleBlock } from 'layout';
import { InnerContentWrapper } from './style';
import PasswordChangeForm from './PasswordChangeForm';
import PageBreadcrumb from './PageBreadcrumb';
import SuccessMessage from './SuccessMessage/SuccessMessage';

const PasswordChangePage = ({ auth, changePassword }) => {
  const authUserId = auth.user.id;
  const [passwordChanged, setPasswordChanged] = useState(false);

  const onSubmit = async (values) => {
    await changePassword(values);

    const { errors } = auth;
    if (!_.isEmpty(errors)) return errors;

    setPasswordChanged(true);
    return null;
  };

  return (
    <>
      <PageTitleBlock title="Password Change" />

      <ContentWrapper>
        <PageBreadcrumb authUserId={authUserId} />
        {passwordChanged && <SuccessMessage authUserId={authUserId} />}
        {!passwordChanged && (
          <InnerContentWrapper>
            <PasswordChangeForm onSubmit={onSubmit} authUserId={authUserId} />
          </InnerContentWrapper>
        )}
      </ContentWrapper>
    </>
  );
};

PasswordChangePage.propTypes = {
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
  PasswordChangePage
);
