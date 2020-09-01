import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  fetchPostsByUser as fetchPostsByUser_,
  updatePost as updatePost_,
  deletePost as deletePost_,
} from 'redux/actions';
import PageContent from './PageContent';

class UserPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPages: 1,
      editingPost: null,
    };
    this.postsPerPage = 10;
  }

  componentDidMount = async () => {
    const { auth, fetchPostsByUser } = this.props;
    const userId = auth.user.id;
    await fetchPostsByUser(userId, this.postsPerPage);
    this.setState({ totalPages: this.countPageNumber() });
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

  handleChangePage = async (page) => {
    const { auth, fetchPostsByUser } = this.props;
    const userId = auth.user.id;
    const offset = (page - 1) * this.postsPerPage;
    await fetchPostsByUser(userId, this.postsPerPage, offset);
    this.setState({ currentPage: page });
  };

  setStatePageCount = () => {
    const pageCountCurrent = this.countPageNumber();
    const { totalPages: pageCountPrev } = this.state;
    this.setState({ totalPages: pageCountCurrent });
    return {
      diff: pageCountCurrent - pageCountPrev,
      count: pageCountCurrent,
    };
  };

  countPageNumber() {
    const { posts } = this.props;
    const { count: itemsTotal } = posts.data;
    return Math.ceil(itemsTotal / this.postsPerPage) || 1;
  }

  render() {
    const { posts } = this.props;
    const { currentPage, totalPages, editingPost } = this.state;

    return (
      <PageContent
        fetching={posts.fetching}
        fetched={posts.fetched}
        errors={posts.errors}
        posts={posts.data.results}
        currentPage={currentPage}
        totalPages={totalPages}
        handleChangePage={this.handleChangePage}
        editingPost={editingPost}
        handleUpdatePost={this.handleUpdatePost}
        handleDeletePost={this.handleDeletePost}
        handleShowUpdateForm={this.handleShowUpdateForm}
        handleHideUpdateForm={this.handleHideUpdateForm}
      />
    );
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
      results: PropTypes.arrayOf(PropTypes.shape({})),
    }).isRequired,
    errors: PropTypes.shape({}).isRequired,
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
