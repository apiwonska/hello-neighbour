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
import {
  fetchPostsByUser as fetchPostsByUser_,
  updatePost as updatePost_,
  deletePost as deletePost_,
} from '../../redux/actions';
import { formatTime } from '../../utils';
import { required } from '../../utils/validators';

class UserPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingPost: null,
    };
  }

  componentDidMount = () => {
    const { auth, fetchPostsByUser } = this.props;
    const userId = String(auth.user.id);
    fetchPostsByUser(userId);
  };

  handleDeletePost = (postId) => {
    const { deletePost } = this.props;
    deletePost(postId);
  };

  handleUpdatePost = async (values) => {
    const { editingPost } = this.state;
    const { updatePost } = this.props;
    await updatePost(values, String(editingPost));
    this.setState({ editingPost: null });
  };

  handleShowUpdateForm = (postId) => {
    this.setState({ editingPost: postId });
  };

  handleHideUpdateForm = () => {
    this.setState({ editingPost: null });
  };

  renderPostList = () => {
    const { editingPost } = this.state;
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
      if (editingPost === post.id) {
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
                      <button type="button" onClick={this.handleHideUpdateForm}>
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
            <button
              type="button"
              onClick={() => this.handleShowUpdateForm(post.id)}
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => this.handleDeletePost(post.id)}
            >
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

const mapsToProps = (state) => ({
  auth: state.auth,
  posts: state.postsByUser,
});

export default connect(mapsToProps, {
  fetchPostsByUser: fetchPostsByUser_,
  updatePost: updatePost_,
  deletePost: deletePost_,
})(UserPosts);
