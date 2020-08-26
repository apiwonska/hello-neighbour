import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Dropdown from './Dropdown';
import UpdatePostForm from './UpdatePostForm';
import { PostHeaderWrapper, PostWrapper, Content } from './style';

const EditablePostList = ({
  posts,
  postHeader: PostHeader,
  editingPost,
  handleUpdatePost,
  handleDeletePost,
  handleShowUpdateForm,
  handleHideUpdateForm,
}) => {
  const authorId = useSelector((state) => state.auth.user.id);
  const textareaRef = useRef();

  useEffect(() => {
    if (editingPost) {
      textareaRef.current.focus();
      textareaRef.current.value += ' ';
    }
  }, [editingPost]);

  const renderPosts = () => {
    return posts.map((post) => {
      const userIsPostAuthor = post.user.id === authorId;
      const isBeingEdited = editingPost === post.id;

      return (
        <PostWrapper key={post.id}>
          <PostHeaderWrapper>
            <PostHeader post={post} />

            {userIsPostAuthor && (
              <Dropdown
                postId={post.id}
                onClickEdit={handleShowUpdateForm}
                onClickDelete={handleDeletePost}
              />
            )}
          </PostHeaderWrapper>

          {isBeingEdited && (
            <UpdatePostForm
              handleUpdatePost={handleUpdatePost}
              handleHideUpdateForm={handleHideUpdateForm}
              content={post.content}
              textareaRef={textareaRef}
            />
          )}

          {!isBeingEdited && <Content>{post.content}</Content>}
        </PostWrapper>
      );
    });
  };

  return <>{renderPosts()}</>;
};

EditablePostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
      }).isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
  editingPost: PropTypes.number,
  handleUpdatePost: PropTypes.func.isRequired,
  handleDeletePost: PropTypes.func.isRequired,
  handleShowUpdateForm: PropTypes.func.isRequired,
  handleHideUpdateForm: PropTypes.func.isRequired,
  postHeader: PropTypes.func.isRequired,
};

EditablePostList.defaultProps = {
  editingPost: null,
};

export default EditablePostList;
