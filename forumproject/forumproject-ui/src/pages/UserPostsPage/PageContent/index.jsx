import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import PostList from 'shared/EditablePostList';
import {
  ContentWrapper,
  PageTitleBlock,
  Pagination,
  PaginationWrapper,
  NoResults,
} from 'layout';
import { withHandleErrors, withLoading } from 'shared/hoc';
import { NoPostsPicture } from './style';
import PostHeader from '../PostHeader';
import PageBreadcrumb from '../PageBreadcrumb';

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
      <PageTitleBlock title="Your Posts" />

      <ContentWrapper>
        <PageBreadcrumb />

        {renderPagination()}

        {posts.length === 0 && (
          <NoResults picture={<NoPostsPicture />}>
            You haven&apos;t written any posts yet. Choose a topic and join the
            discussion!
          </NoResults>
        )}

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
  editingPost: PropTypes.number,
  handleUpdatePost: PropTypes.func.isRequired,
  handleDeletePost: PropTypes.func.isRequired,
  handleShowUpdateForm: PropTypes.func.isRequired,
  handleHideUpdateForm: PropTypes.func.isRequired,
};

PageContent.defaultProps = {
  editingPost: null,
};

export default compose(withHandleErrors, withLoading)(PageContent);
