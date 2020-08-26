import React from 'react';
import PropTypes from 'prop-types';

import { Anchor, Breadcrumb, BreadcrumbIcon } from 'layout';

const PageBreadcrumb = ({ authUserId }) => {
  return (
    <Breadcrumb>
      <Anchor href="/">
        <BreadcrumbIcon name="home" />
        Home Page
      </Anchor>
      <Anchor href={`/profile/${authUserId}`}>Your Profile</Anchor>
      <span>Change Password</span>
    </Breadcrumb>
  );
};

PageBreadcrumb.propTypes = {
  authUserId: PropTypes.number.isRequired,
};

export default PageBreadcrumb;
