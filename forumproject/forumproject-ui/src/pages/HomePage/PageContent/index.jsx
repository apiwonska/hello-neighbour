import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import {
  ContentWrapper,
  PageTitle,
  TopBeam,
  Breadcrumb,
  BreadcrumbIcon,
} from 'layout';
import { withLoading, withHandleErrors } from 'shared/hoc';
import { ForumInfoWrapper, ForumInfoText, PictureWrapper } from './style';
import WelcomePicture from '../WelcomePicture';
import CategoryList from '../CategoryList';

const PageContent = ({ data }) => {
  return (
    <>
      <TopBeam>
        <PageTitle>Welcome to our Forum!</PageTitle>
      </TopBeam>

      <ContentWrapper>
        <Breadcrumb>
          <span>
            <BreadcrumbIcon name="home" />
            Home Page
          </span>
        </Breadcrumb>

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

        <CategoryList categories={data} />
      </ContentWrapper>
    </>
  );
};

PageContent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default compose(withHandleErrors, withLoading)(PageContent);
