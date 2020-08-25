import React from 'react';

import { PageTitleBlock } from 'layout';
import {
  ContentWrapper,
  ErrorMessage,
  ErrorExplanation,
  PictureWrapper,
} from './style';
import PageNotFoundPicture from './PageNotFoundPicture';

const NotFound = () => {
  return (
    <>
      <PageTitleBlock title="Error" />

      <ContentWrapper>
        <ErrorMessage>This page isn&apos;t available</ErrorMessage>
        <ErrorExplanation>
          The link you followed may be broken, or the page may have been
          removed.
        </ErrorExplanation>
        <PictureWrapper>
          <PageNotFoundPicture />
        </PictureWrapper>
      </ContentWrapper>
    </>
  );
};

export default NotFound;
