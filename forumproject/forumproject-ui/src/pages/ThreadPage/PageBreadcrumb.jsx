import React from 'react';
import PropTypes from 'prop-types';

import { Anchor, Breadcrumb, BreadcrumbIcon } from 'layout';

const PageBreadcrumb = ({ categoryId, categoryName, threadTitle }) => {
  return (
    <Breadcrumb>
      <Anchor href="/">
        <BreadcrumbIcon name="home" />
        Home Page
      </Anchor>
      <Anchor href={`/categories/${categoryId}`}>{categoryName}</Anchor>
      <span>{threadTitle}</span>
    </Breadcrumb>
  );
};

PageBreadcrumb.propTypes = {
  categoryId: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired,
  ]).isRequired,
  categoryName: PropTypes.string.isRequired,
  threadTitle: PropTypes.string.isRequired,
};

export default PageBreadcrumb;
