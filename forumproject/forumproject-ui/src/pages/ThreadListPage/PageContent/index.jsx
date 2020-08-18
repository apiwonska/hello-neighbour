import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import {
  ContentWrapper,
  PageTitle,
  TopBeam,
  Pagination,
  Anchor,
  Breadcrumb,
  BreadcrumbIcon,
} from 'layout';
import { withHandleErrors, withLoading, withHandleNotFound } from 'shared/hoc';
import {
  LinkButton,
  LinkWrapper,
  ThreadListWrapper,
  PaginationWrapper,
} from './style';
import ThreadList from '../ThreadList';

const PageContent = ({
  categoryName,
  currentPage,
  totalPages,
  handleChangePage,
  threads,
}) => {
  const { categoryId } = useParams();
  const renderPagination = () => {
    return (
      <PaginationWrapper>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChange={handleChangePage}
        />
      </PaginationWrapper>
    );
  };

  const { fetching, fetched, data } = threads;

  return (
    <>
      <TopBeam>
        <PageTitle>{categoryName}</PageTitle>
      </TopBeam>

      <ContentWrapper>
        <Breadcrumb>
          <Anchor href="/">
            <BreadcrumbIcon name="home" />
            Home Page
          </Anchor>
          <span>{categoryName}</span>
        </Breadcrumb>

        <LinkWrapper>
          <LinkButton to={`/categories/${categoryId}/threads/new/`}>
            Add Thread
          </LinkButton>
        </LinkWrapper>

        <ThreadListWrapper>
          {renderPagination()}
          <ThreadList fetching={fetching} fetched={fetched} threads={data} />
          {renderPagination()}
        </ThreadListWrapper>
      </ContentWrapper>
    </>
  );
};

PageContent.propTypes = {
  categoryName: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  threads: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    data: PropTypes.shape({}).isRequired,
  }).isRequired,
};

export default compose(
  withHandleErrors,
  withHandleNotFound,
  withLoading
)(PageContent);
