import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, Form as FinalForm } from 'react-final-form';

import { required } from 'utils/validators';
import {
  PostWrapper,
  Content,
  Footer,
  StyledTextArea,
} from 'pages/Thread/style';

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

  const renderPosts = () => {
    const postsList = posts.data.results.map((post) => {
      // if the logged in user is not post author, no option to edit post
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
            {renderPostHeader(post)}
            <FinalForm
              onSubmit={handleUpdatePost}
              initialValues={{ content: post.content }}
            >
              {({ handleSubmit, hasValidationErrors }) => (
                <form onSubmit={handleSubmit}>
                  <>
                    <Field name="content" validate={required}>
                      {({ input }) => (
                        <StyledTextArea {...input} rows="3" maxLength="2000" />
                      )}
                    </Field>
                    <Footer>
                      <button type="button" onClick={handleHideUpdateForm}>
                        Cancel
                      </button>
                      <button type="submit" disabled={hasValidationErrors}>
                        Update
                      </button>
                    </Footer>
                  </>
                </form>
              )}
            </FinalForm>
          </PostWrapper>
        );
      }

      // renders post by default
      return (
        <PostWrapper key={post.id}>
          {renderPostHeader(post)}
          <Content>{post.content}</Content>
          <Footer>
            <button type="button" onClick={() => handleShowUpdateForm(post.id)}>
              Update
            </button>
            <button type="button" onClick={() => handleDeletePost(post.id)}>
              Delete
            </button>
          </Footer>
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
