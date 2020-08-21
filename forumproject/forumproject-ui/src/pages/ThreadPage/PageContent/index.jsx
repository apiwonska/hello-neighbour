import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PostList from 'shared/EditablePostList';
import { withHandleErrors, withLoading } from 'shared/hoc';
import {
  ContentWrapper,
  PageTitleWrapper,
  Pagination,
  PaginationWrapper,
} from 'layout';
import { Button, PageTitleText, ButtonWrapper } from './style';
import CreatePostForm from '../CreatePostForm';
import ThreadSubject from '../ThreadSubject';
import PostHeader from '../PostHeader';
import PageBreadcrumb from '../PageBreadcrumb';

const PageContent = ({
  thread,
  posts,
  handleMoveUserToEnd,
  currentPage,
  totalPages,
  handleChangePage,
  editingPost,
  handleUpdatePost,
  handleDeletePost,
  handleShowUpdateForm,
  handleHideUpdateForm,
  createPostInputRef,
  handleCreatePost,
}) => {
  const categories = useSelector((state) => state.categories.data);
  const { categoryId } = useParams();
  const category = categories.find((el) => String(el.id) === categoryId);

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
      <PageTitleWrapper>
        <PageTitleText>{thread.title}</PageTitleText>
      </PageTitleWrapper>

      <ContentWrapper>
        <PageBreadcrumb
          categoryId={category.id}
          categoryName={category.name}
          threadTitle={thread.title}
        />

        <ButtonWrapper>
          <Button type="button" onClick={handleMoveUserToEnd}>
            Add Post
          </Button>
        </ButtonWrapper>

        {renderPagination()}

        {currentPage === 1 && <ThreadSubject thread={thread} />}

        <PostList
          posts={posts}
          postHeader={PostHeader}
          editingPost={editingPost}
          handleUpdatePost={handleUpdatePost}
          handleDeletePost={handleDeletePost}
          handleShowUpdateForm={handleShowUpdateForm}
          handleHideUpdateForm={handleHideUpdateForm}
        />

        {currentPage === totalPages && (
          <CreatePostForm
            ref={createPostInputRef}
            onSubmit={handleCreatePost}
          />
        )}

        {renderPagination()}
      </ContentWrapper>
    </>
  );
};

PageContent.propTypes = {
  thread: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleMoveUserToEnd: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  editingPost: PropTypes.number,
  handleUpdatePost: PropTypes.func.isRequired,
  handleDeletePost: PropTypes.func.isRequired,
  handleShowUpdateForm: PropTypes.func.isRequired,
  handleHideUpdateForm: PropTypes.func.isRequired,
  createPostInputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  handleCreatePost: PropTypes.func.isRequired,
};

PageContent.defaultProps = {
  editingPost: null,
};

export default compose(withHandleErrors, withLoading)(PageContent);
