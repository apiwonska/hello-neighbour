import React from 'react';
import PropTypes from 'prop-types';

import { Anchor, Breadcrumb, BreadcrumbIcon } from 'layout';

const PageBreadcrumb = ({ categoryName }) => (
  <Breadcrumb>
    <Anchor href="/">
      <BreadcrumbIcon name="home" />
      Home Page
    </Anchor>
    <span>{categoryName}</span>
  </Breadcrumb>
);

PageBreadcrumb.propTypes = {
  categoryName: PropTypes.string.isRequired,
};

export default PageBreadcrumb;
