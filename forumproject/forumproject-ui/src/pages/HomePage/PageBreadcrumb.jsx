import React from 'react';

import { Breadcrumb, BreadcrumbIcon } from 'layout';

export default () => {
  return (
    <Breadcrumb>
      <span>
        <BreadcrumbIcon name="home" />
        Home Page
      </span>
    </Breadcrumb>
  );
};
