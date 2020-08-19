import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import PostList from 'shared/EditablePostList';
import {
  ContentWrapper,
  TopBeam,
  PageTitle,
  Pagination,
  Anchor,
  Breadcrumb,
  BreadcrumbIcon,
  PaginationWrapper,
} from 'layout';
import { withHandleErrors, withLoading } from 'shared/hoc';
import PostHeader from '../PostHeader';

const PageContent = ({
  posts,
  currentPage,
  totalPages,
  handleChangePage,
  editingPost,
  handleUpdatePost,
  handleDeletePost,
  handleShowUpdateForm,
  handleHideUpdateForm,
}) => {
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

  return (
    <>
      <TopBeam>
        <PageTitle>Your Posts</PageTitle>
      </TopBeam>
      <ContentWrapper>
        <Breadcrumb>
          <Anchor href="/">
            <BreadcrumbIcon name="home" />
            Home Page
          </Anchor>
          <span>Your Posts</span>
        </Breadcrumb>

        {renderPagination()}

        <PostList
          posts={posts}
          postHeader={PostHeader}
          editingPost={editingPost}
          handleUpdatePost={handleUpdatePost}
          handleDeletePost={handleDeletePost}
          handleShowUpdateForm={handleShowUpdateForm}
          handleHideUpdateForm={handleHideUpdateForm}
        />

        {renderPagination()}
      </ContentWrapper>
    </>
  );
};

PageContent.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  editingPost: PropTypes.number.isRequired,
  handleUpdatePost: PropTypes.func.isRequired,
  handleDeletePost: PropTypes.func.isRequired,
  handleShowUpdateForm: PropTypes.func.isRequired,
  handleHideUpdateForm: PropTypes.func.isRequired,
};

export default compose(withHandleErrors, withLoading)(PageContent);
