import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';

import PostList from 'components/EditablePostList';
import { renderPageError } from 'components/errors';
import { Pagination, Spinner } from 'layout';
import { ContainerDiv } from 'components/styledDivs';
import formatTime from 'utils/timeFormat';
import {
  fetchPostsByUser as fetchPostsByUser_,
  updatePost as updatePost_,
  deletePost as deletePost_,
} from 'redux/actions';
import { PostHeader, PostHeaderInnerWrapper, DateSpan } from './style';

class UserPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageCount: 1,
      editingPost: null,
    };
    this.itemsPerPage = 10;
  }

  componentDidMount = async () => {
    const { auth, fetchPostsByUser } = this.props;
    const userId = auth.user.id;
    await fetchPostsByUser(userId, this.itemsPerPage);
    this.setState({ pageCount: this.countPageNumber() });
  };

  handleDeletePost = async (postId) => {
    const { deletePost } = this.props;
    let { currentPage } = this.state;
    await deletePost(postId);

    /** deleting post affect pagination
     * update page count
     * update current page if it's bigger then current page count value
     * fetch current page (handlePageChange updates state.currentPage)
     */
    const pageCountChange = this.setStatePageCount();
    currentPage =
      currentPage > pageCountChange.count ? pageCountChange.count : currentPage;
    this.handleChangePage(null, currentPage);
  };

  handleUpdatePost = async (values) => {
    const { editingPost } = this.state;
    const { updatePost } = this.props;
    await updatePost(values, editingPost);
    this.setState({ editingPost: null });
  };

  handleShowUpdateForm = (postId) => {
    this.setState({ editingPost: postId });
  };

  handleHideUpdateForm = () => {
    this.setState({ editingPost: null });
  };

  handleChangePage = async (event, page) => {
    const { auth, fetchPostsByUser } = this.props;
    const userId = auth.user.id;
    const offset = (page - 1) * this.itemsPerPage;
    await fetchPostsByUser(userId, this.itemsPerPage, offset);
    this.setState({ currentPage: page });
  };

  setStatePageCount = () => {
    const pageCountCurrent = this.countPageNumber();
    const { pageCount: pageCountPrev } = this.state;
    this.setState({ pageCount: pageCountCurrent });
    return {
      diff: pageCountCurrent - pageCountPrev,
      count: pageCountCurrent,
    };
  };

  countPageNumber() {
    const { posts } = this.props;
    const { count: itemsTotal } = posts.data;
    return Math.ceil(itemsTotal / this.itemsPerPage) || 1;
  }

  renderPostHeader = (post) => (
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

  render() {
    const { posts } = this.props;
    const { pageCount, currentPage, editingPost } = this.state;

    if (posts.fetching) {
      return <Spinner />;
    }

    if (!_.isEmpty(posts.errors)) {
      return renderPageError(posts.errors);
    }

    if (posts.fetched) {
      return (
        <ContainerDiv>
          <PostList
            renderPostHeader={this.renderPostHeader}
            editingPost={editingPost}
            handleUpdatePost={this.handleUpdatePost}
            handleDeletePost={this.handleDeletePost}
            handleShowUpdateForm={this.handleShowUpdateForm}
            handleHideUpdateForm={this.handleHideUpdateForm}
          />
          <div>
            <Pagination
              count={pageCount}
              page={currentPage}
              onChange={this.handleChangePage}
            />
          </div>
        </ContainerDiv>
      );
    }

    return null;
  }
}

UserPosts.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
  posts: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      count: PropTypes.number,
      results: PropTypes.array,
    }).isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
  fetchPostsByUser: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapsToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
});

export default connect(mapsToProps, {
  fetchPostsByUser: fetchPostsByUser_,
  updatePost: updatePost_,
  deletePost: deletePost_,
})(UserPosts);
