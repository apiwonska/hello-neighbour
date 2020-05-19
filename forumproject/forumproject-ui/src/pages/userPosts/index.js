import React from 'react';
import { connect } from 'react-redux';
import { Field, Form as FinalForm } from 'react-final-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import {
  PostWrapper,
  PostHeader,
  PostHeaderInnerWrapper,
  DateSpan,
  Content,
  Footer,
  StyledTextArea,
} from './style';
import { renderPageError } from '../../components/errors';
import Spinner from '../../components/spinner';
import { ContainerDiv } from '../../components/styledDivs';
import { fetchPostsByUser, updatePost, deletePost } from '../../redux/actions';
import { formatTime } from '../../utils';
import { required } from '../../utils/validators';

class UserPosts extends React.Component {
  state = {
    editingPost: null,
  };

  componentDidMount = async () => {
    const userId = this.props.auth.user.id;
    await this.props.fetchPostsByUser(userId);
  };

  handleDeletePost = (postId) => {
    this.props.deletePost(postId);
  };

  handleUpdatePost = async (values) => {
    await this.props.updatePost(values, String(this.state.editingPost));
    this.setState({ editingPost: null });
  };

  handleShowUpdateForm = (postId) => {
    this.setState({ editingPost: postId });
  };

  handleHideUpdateForm = () => {
    this.setState({ editingPost: null });
  };

  renderPostList = () => {
    const { posts } = this.props;

    const renderHeader = (post) => (
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

    const postsList = posts.data.results.map((post) => {
      // Renders the update post form
      if (this.state.editingPost === post.id) {
        return (
          <PostWrapper key={post.id}>
            {renderHeader(post)}
            <FinalForm
              onSubmit={this.handleUpdatePost}
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
                      <button onClick={this.handleHideUpdateForm}>
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

      // Renders regular post by default
      return (
        <PostWrapper key={post.id}>
          {renderHeader(post)}
          <Content>{post.content}</Content>
          <Footer>
            <button onClick={() => this.handleShowUpdateForm(post.id)}>
              Update
            </button>
            <button onClick={() => this.handleDeletePost(post.id)}>
              Delete
            </button>
          </Footer>
        </PostWrapper>
      );
    });
    return postsList;
  };

  render() {
    const { posts } = this.props;

    if (posts.fetching) {
      return <Spinner />;
    }

    if (!_.isEmpty(posts.errors)) {
      return renderPageError(posts.errors);
    }

    if (posts.fetched) {
      return <ContainerDiv>{this.renderPostList()}</ContainerDiv>;
    }

    return null;
  }
}

const mapsToProps = (state) => {
  return {
    auth: state.auth,
    posts: state.postsByUser,
  };
};

export default connect(mapsToProps, {
  fetchPostsByUser,
  updatePost,
  deletePost,
})(UserPosts);
