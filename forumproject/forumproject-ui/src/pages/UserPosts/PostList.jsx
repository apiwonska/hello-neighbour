import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Field, Form as FinalForm } from 'react-final-form';
import { Link } from 'react-router-dom';
import formatTime from 'utils/timeFormat';
import { required } from 'utils/validators';
import {
  PostWrapper,
  PostHeader,
  PostHeaderInnerWrapper,
  DateSpan,
  Content,
  Footer,
  StyledTextArea,
} from './style';

const PostList = ({
  editingPost,
  handleUpdatePost,
  handleDeletePost,
  handleShowUpdateForm,
  handleHideUpdateForm,
}) => {
  const posts = useSelector((state) => state.postsByUser);

  const renderPostHeader = (post) => (
    <PostHeader>
      <PostHeaderInnerWrapper>
        <Link
          to={`/categories/${post.thread.category}/threads/${post.thread.id}`}
        >
          {post.thread.title}
        </Link>
        <DateSpan>{formatTime.main(post.created)}</DateSpan>
      </PostHeaderInnerWrapper>
    </PostHeader>
  );

  const renderPostList = () => {
    const postsList = posts.data.results.map((post) => {
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

      // renders regular post by default
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

  return <>{renderPostList()}</>;
};

PostList.propTypes = {
  editingPost: PropTypes.number.isRequired,
  handleUpdatePost: PropTypes.func.isRequired,
  handleDeletePost: PropTypes.func.isRequired,
  handleShowUpdateForm: PropTypes.func.isRequired,
  handleHideUpdateForm: PropTypes.func.isRequired,
};

export default PostList;
