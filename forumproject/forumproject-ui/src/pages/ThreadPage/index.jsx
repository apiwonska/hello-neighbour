import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  fetchThread as fetchThread_,
  fetchPostsByThread as fetchPostsByThread_,
  fetchCategories as fetchCategories_,
  createPost as createPost_,
  updatePost as updatePost_,
  deletePost as deletePost_,
} from 'redux/actions';
import PageContent from './PageContent';

class ThreadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPages: 1,
      editingPost: null,
    };
    this.postsPerPage = 10;
    this.createPostInputRef = React.createRef();
  }

  componentDidMount = async () => {
    const {
      categories,
      thread,
      fetchCategories,
      fetchThread,
      fetchPostsByThread,
      match,
    } = this.props;
    const { threadId } = match.params;

    if (!thread.fetched || String(thread.data.id) !== threadId) {
      fetchThread(threadId);
    }
    await fetchPostsByThread(threadId, this.postsPerPage);
    this.setStateTotalPages();

    if (!categories.fetched && !categories.fetching) {
      await fetchCategories();
    }
  };

  handleCreatePost = async (values) => {
    const { auth, createPost, match } = this.props;
    const userId = auth.user.id;
    const threadId = Number(match.params.threadId);
    const data = { ...values, user: userId, thread: threadId };
    await createPost(data);

    // update total pages and move to next page if page was appended
    const totalPagesChange = this.setStateTotalPages();
    if (totalPagesChange.diff) {
      this.handleChangePage(totalPagesChange.count);
    }
  };

  handleUpdatePost = async (values) => {
    const { editingPost } = this.state;
    const { updatePost } = this.props;
    await updatePost(values, editingPost);
    this.setState({ editingPost: null });
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
    const totalPagesChange = this.setStateTotalPages();
    currentPage =
      currentPage > totalPagesChange.count
        ? totalPagesChange.count
        : currentPage;
    this.handleChangePage(currentPage);
  };

  handleShowUpdateForm = (postId) => {
    this.setState({ editingPost: postId });
  };

  handleHideUpdateForm = () => {
    this.setState({ editingPost: null });
  };

  handleChangePage = async (page) => {
    const { match, fetchPostsByThread } = this.props;
    const { threadId } = match.params;
    const offset = (page - 1) * this.postsPerPage;
    await fetchPostsByThread(threadId, this.postsPerPage, offset);
    this.setState({ currentPage: page });
  };

  handleMoveUserToEnd = async () => {
    const { currentPage, totalPages: lastPage } = this.state;
    if (currentPage !== lastPage) {
      await this.handleChangePage(lastPage);
    }
    this.createPostInputRef.current.focus();
    this.createPostInputRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  countPageNumber = () => {
    const { posts } = this.props;
    const { count: itemsTotal } = posts.data;
    return Math.ceil(itemsTotal / this.postsPerPage) || 1;
  };

  setStateTotalPages = () => {
    const totalPagesCurrent = this.countPageNumber();
    const { totalPages: totalPagesPrev } = this.state;
    this.setState({ totalPages: totalPagesCurrent });
    return {
      diff: totalPagesCurrent - totalPagesPrev,
      count: totalPagesCurrent,
    };
  };

  render() {
    const { thread, posts, categories } = this.props;
    const { currentPage, totalPages, editingPost } = this.state;
    const errors =
      (!_.isEmpty(categories.errors) && categories.errors) ||
      (!_.isEmpty(thread.errors) && thread.errors) ||
      (!_.isEmpty(posts.errors) && posts.errors) ||
      {};

    return (
      <PageContent
        fetching={categories.fetching || thread.fetching || posts.fetching}
        fetched={categories.fetched && thread.fetched && posts.fetched}
        errors={errors}
        thread={thread.data}
        posts={posts.data.results}
        handleMoveUserToEnd={this.handleMoveUserToEnd}
        currentPage={currentPage}
        totalPages={totalPages}
        handleChangePage={this.handleChangePage}
        renderPostHeader={this.renderPostHeader}
        editingPost={editingPost}
        handleUpdatePost={this.handleUpdatePost}
        handleDeletePost={this.handleDeletePost}
        handleShowUpdateForm={this.handleShowUpdateForm}
        handleHideUpdateForm={this.handleHideUpdateForm}
        createPostInputRef={this.createPostInputRef}
        handleCreatePost={this.handleCreatePost}
      />
    );
  }
}

ThreadPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      threadId: PropTypes.string.isRequired,
      categoryId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  auth: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
  thread: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }).isRequired,
    errors: PropTypes.shape({}).isRequired,
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
  categories: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    errors: PropTypes.shape({}).isRequired,
  }).isRequired,
  fetchThread: PropTypes.func.isRequired,
  fetchPostsByThread: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  thread: state.thread,
  posts: state.posts,
  categories: state.categories,
});

export default connect(mapStateToProps, {
  fetchThread: fetchThread_,
  fetchPostsByThread: fetchPostsByThread_,
  fetchCategories: fetchCategories_,
  createPost: createPost_,
  updatePost: updatePost_,
  deletePost: deletePost_,
})(ThreadPage);
