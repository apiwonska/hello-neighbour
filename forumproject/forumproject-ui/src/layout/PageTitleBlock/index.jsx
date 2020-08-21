import React from 'react';
import PropTypes from 'prop-types';

import PageTitleText from './PageTitleText';
import PageTitleWrapper from './PageTitleWrapper';

const PageTitleBlock = ({ title }) => {
  return (
    <PageTitleWrapper>
      <PageTitleText>{title}</PageTitleText>
    </PageTitleWrapper>
  );
};

PageTitleBlock.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitleBlock;
