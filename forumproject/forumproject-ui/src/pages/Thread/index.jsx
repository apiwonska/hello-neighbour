import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import { renderPageError, DefaultError } from 'components/errors';
import {
  Spinner,
  ContentWrapper,
  TopBeam,
  Pagination,
  PaginationWrapper,
  Anchor,
  Breadcrumb,
  BreadcrumbIcon,
} from 'layout';
import {
  fetchThread as fetchThread_,
  fetchPostsByThread as fetchPostsByThread_,
  createPost as createPost_,
  updatePost as updatePost_,
  deletePost as deletePost_,
} from 'redux/actions';
import PostList from 'shared/EditablePostList';
import { formatTime } from 'utils';
import CreatePostForm from './CreatePostForm';
import ThreadSubject from './ThreadSubject';
import {
  Button,
  PostHeader,
  PostHeaderInnerWrapper,
  DateSpan,
  UserLink,
  AvatarThumbnail,
  PageTitle,
  ButtonWrapper,
} from './style';

class Thread extends React.Component {
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
    const { thread, fetchThread, fetchPostsByThread, match } = this.props;
    const { threadId } = match.params;

    if (!thread.fetched || String(thread.data.id) !== threadId) {
      fetchThread(threadId);
    }
    await fetchPostsByThread(threadId, this.postsPerPage);
    this.setStateTotalPages();
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

  renderPostHeader = (post, dropdown) => (
    <PostHeader>
      <AvatarThumbnail
        src={post.user.avatar_thumbnail}
        alt="Avatar thumbnail"
      />
      <PostHeaderInnerWrapper>
        <UserLink to={`/profile/${post.user.id}`}>
          {post.user.username}
        </UserLink>
        <DateSpan>{formatTime.main(post.created)}</DateSpan>
      </PostHeaderInnerWrapper>
      {dropdown}
    </PostHeader>
  );

  renderPagination = () => {
    const { currentPage, totalPages } = this.state;
    return (
      <PaginationWrapper>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChange={this.handleChangePage}
        />
      </PaginationWrapper>
    );
  };

  render() {
    const { thread, posts, categories, match } = this.props;
    const { currentPage, totalPages, editingPost } = this.state;
    const { categoryId } = match.params;

    if (thread.fetching || posts.fetching) {
      return <Spinner />;
    }

    // if (!_.isEmpty(thread.errors) || !.isEmpty(posts.errors)) {
    // return renderPageError(thread.errors) || renderPageError(posts.errors);
    // }

    if (categories.fetched && thread.fetched && posts.fetched) {
      const category = categories.data.find(
        (el) => String(el.id) === categoryId
      );
      return (
        <>
          <TopBeam>
            <PageTitle>{thread.data.title}</PageTitle>
          </TopBeam>
          <ContentWrapper>
            <Breadcrumb>
              <Anchor href="/">
                <BreadcrumbIcon name="home" />
                Home Page
              </Anchor>
              <Anchor href={`/categories/${categoryId}`}>
                {category.name}
              </Anchor>
              <span>{thread.data.title}</span>
            </Breadcrumb>
            <ButtonWrapper>
              <Button type="button" onClick={this.handleMoveUserToEnd}>
                Add Post
              </Button>
            </ButtonWrapper>
            {this.renderPagination()}
            {currentPage === 1 && <ThreadSubject />}

            <PostList
              renderPostHeader={this.renderPostHeader}
              editingPost={editingPost}
              handleUpdatePost={this.handleUpdatePost}
              handleDeletePost={this.handleDeletePost}
              handleShowUpdateForm={this.handleShowUpdateForm}
              handleHideUpdateForm={this.handleHideUpdateForm}
            />

            {currentPage === totalPages && (
              <CreatePostForm
                ref={this.createPostInputRef}
                onSubmit={this.handleCreatePost}
              />
            )}

            {this.renderPagination()}
          </ContentWrapper>
        </>
      );
    }
    return null;
  }
}

Thread.propTypes = {
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
    }).isRequired,
  }).isRequired,
  categories: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
  fetchThread: PropTypes.func.isRequired,
  fetchPostsByThread: PropTypes.func.isRequired,
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
  createPost: createPost_,
  updatePost: updatePost_,
  deletePost: deletePost_,
})(Thread);
