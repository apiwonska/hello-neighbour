import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, Form as FinalForm } from 'react-final-form';

import { required } from 'utils/validators';
import { MenuDropdown } from 'layout';
import { PostWrapper, Content, Footer, TextArea, Button } from './style';

const PostList = ({
  renderPostHeader,
  editingPost,
  handleUpdatePost,
  handleDeletePost,
  handleShowUpdateForm,
  handleHideUpdateForm,
}) => {
  const ownerId = useSelector((state) => state.auth.user.id);
  const posts = useSelector((state) => state.posts);
  const textareaRef = useRef();

  useEffect(() => {
    if (editingPost) {
      textareaRef.current.focus();
      textareaRef.current.value += ' ';
    }
  }, [editingPost]);

  const renderDropdown = (postId) => (
    <MenuDropdown
      dropdownOptions={[
        {
          label: 'Edit',
          onClick: () => {
            handleShowUpdateForm(postId);
          },
          icon: 'edit',
        },
        {
          label: 'Delete',
          onClick: () => handleDeletePost(postId),
          icon: 'trash',
        },
      ]}
    />
  );

  const renderPosts = () => {
    const postsList = posts.data.results.map((post) => {
      // if the logged in user is not post author, he can't edit post
      if (post.user.id !== ownerId) {
        return (
          <PostWrapper key={post.id}>
            {renderPostHeader(post)}
            <Content>{post.content}</Content>
          </PostWrapper>
        );
      }

      // renders the update post form
      if (editingPost === post.id) {
        return (
          <PostWrapper key={post.id}>
            {renderPostHeader(post, renderDropdown(post.id))}
            <FinalForm
              onSubmit={handleUpdatePost}
              initialValues={{ content: post.content }}
            >
              {({ handleSubmit, hasValidationErrors }) => (
                <form onSubmit={handleSubmit}>
                  <>
                    <Field name="content" validate={required}>
                      {({ input }) => (
                        <TextArea
                          {...input}
                          maxLength="2000"
                          ref={textareaRef}
                        />
                      )}
                    </Field>
                    <Footer>
                      <Button
                        type="button"
                        onClick={handleHideUpdateForm}
                        size="S"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={hasValidationErrors}
                        color="blue"
                        size="S"
                      >
                        Save
                      </Button>
                    </Footer>
                  </>
                </form>
              )}
            </FinalForm>
          </PostWrapper>
        );
      }

      return (
        <PostWrapper key={post.id}>
          {renderPostHeader(post, renderDropdown(post.id))}
          <Content>{post.content}</Content>
        </PostWrapper>
      );
    });
    return postsList;
  };

  return <>{renderPosts()}</>;
};

PostList.propTypes = {
  editingPost: PropTypes.number,
  handleUpdatePost: PropTypes.func.isRequired,
  handleDeletePost: PropTypes.func.isRequired,
  handleShowUpdateForm: PropTypes.func.isRequired,
  handleHideUpdateForm: PropTypes.func.isRequired,
  renderPostHeader: PropTypes.func.isRequired,
};

PostList.defaultProps = {
  editingPost: null,
};

export default PostList;
