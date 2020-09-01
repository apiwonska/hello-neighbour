import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { ContentWrapper, PageTitleBlock } from 'layout';
import { withLoading, withHandleErrors } from 'shared/hoc';
import { ForumInfoWrapper, ForumInfoText, PictureWrapper } from './style';
import WelcomePicture from '../WelcomePicture';
import CategoryList from '../CategoryList';
import PageBreadcrumb from '../PageBreadcrumb';

const PageContent = ({ categories }) => {
  return (
    <>
      <PageTitleBlock title="Welcome to our Forum!" />

      <ContentWrapper>
        <PageBreadcrumb />

        <ForumInfoWrapper>
          <PictureWrapper>
            <WelcomePicture />
          </PictureWrapper>
          <ForumInfoText>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae
            adipisci at culpa soluta laborum quo laboriosam.
            <br />
            Minima iusto, dolor velit, dolorum iste illum facilis totam illo est
            repudiandae exercitationem enim. Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </ForumInfoText>
        </ForumInfoWrapper>

        <CategoryList categories={categories} />
      </ContentWrapper>
    </>
  );
};

PageContent.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default compose(withHandleErrors, withLoading)(PageContent);
