import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

// import { renderPageError, DefaultError } from 'components/errors';
import { Pagination, Spinner } from 'layout';
import { ContainerDiv } from 'components/styledDivs';
import { AvatarThumbnail } from 'components/styledImages';
import {
  fetchThread as fetchThread_,
  fetchPostsByThread as fetchPostsByThread_,
  createPost as createPost_,
  deletePost as deletePost_,
} from 'redux/actions';
import { formatTime } from 'utils';
import CreatePostForm from './CreatePostForm';
import GoToCreatePostFormButton from './GoToCreatePostFormButton';
import {
  LinkWrapper,
  NavLink,
  ThreadWrapper,
  PostWrapper,
  PostHeader,
  PostHeaderInnerWrapper,
  DateSpan,
  UserLink,
  ThreadTitle,
  Content,
} from './style';

class Thread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageCount: 1,
    };
    this.itemsPerPage = 10;
  }

  componentDidMount = async () => {
    const { thread, fetchThread, fetchPostsByThread, match } = this.props;
    const { threadId } = match.params;

    if (!thread.fetched || String(thread.data.id) !== threadId) {
      fetchThread(threadId);
    }
    await fetchPostsByThread(threadId, this.itemsPerPage);
    this.setPages();
  };

  handleCreatePost = async (values) => {
    const { auth, createPost, match } = this.props;
    const userId = auth.user.id;
    const threadId = Number(match.params.threadId);
    const data = { ...values, user: userId, thread: threadId };
    await createPost(data);

    // update page count and move to next page if page was appended
    const pageCountChange = this.setStatePages();
    if (pageCountChange.diff) {
      this.handleChangePage(null, pageCountChange.count);
    }
  };

  handleChangePage = async (event, page) => {
    const { match, fetchPostsByThread } = this.props;
    const { threadId } = match.params;
    const offset = (page - 1) * this.itemsPerPage;
    await fetchPostsByThread(threadId, this.itemsPerPage, offset);
    this.setState({ currentPage: page });
  };

  handleMoveUserToEnd = async () => {
    const { currentPage, pageCount: lastPage } = this.state;
    if (currentPage !== lastPage) {
      await this.handleChangePage(null, lastPage);
    }
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  getPageNumber = () => {
    const { posts } = this.props;
    const { count: itemsTotal } = posts.data;
    return Math.ceil(itemsTotal / this.itemsPerPage) || 1;
  };

  setStatePageCount = () => {
    const pageCountCurrent = this.getPageNumber();
    const { pageCount: pageCountPrev } = this.state;
    this.setState({ pageCount: pageCountCurrent });
    return {
      diff: pageCountCurrent - pageCountPrev,
      count: pageCountCurrent,
    };
  };

  renderPosts() {
    const { posts } = this.props;
    const postsList = posts.data.results.map((post) => (
      <PostWrapper key={post.id}>
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
        </PostHeader>
        <Content>{post.content}</Content>
      </PostWrapper>
    ));
    return postsList;
  }

  render() {
    const { thread, posts, match } = this.props;
    const { categoryId } = match.params;
    const { currentPage, pageCount } = this.state;

    if (thread.fetching || posts.fetching) {
      return <Spinner />;
    }

    // if (!_.isEmpty(thread.errors) || !.isEmpty(posts.errors)) {
    // return renderPageError(thread.errors) || renderPageError(posts.errors);
    // }

    if (thread.fetched && posts.fetched) {
      return (
        <ContainerDiv>
          <LinkWrapper>
            <FontAwesomeIcon icon={faArrowLeft} />
            &nbsp;
            <NavLink to={`/categories/${categoryId}`}>
              Back to all threads
            </NavLink>
          </LinkWrapper>

          <div>
            <GoToCreatePostFormButton onClick={this.handleMoveUserToEnd}>
              Add post
            </GoToCreatePostFormButton>
          </div>

          {currentPage === 1 && (
            <ThreadWrapper>
              <PostHeader>
                <AvatarThumbnail
                  src={thread.data.user.avatar_thumbnail}
                  alt="Avatar thumbnail"
                />
                <PostHeaderInnerWrapper>
                  <UserLink to={`/profile/${thread.data.user.id}`}>
                    {thread.data.user.username}
                  </UserLink>
                  <DateSpan>{formatTime.main(thread.data.created)}</DateSpan>
                </PostHeaderInnerWrapper>
              </PostHeader>
              <ThreadTitle>{thread.data.title}</ThreadTitle>
              <Content>{thread.data.subject}</Content>
            </ThreadWrapper>
          )}

          {this.renderPosts()}

          {currentPage === pageCount && (
            <PostWrapper
              ref={(el) => {
                this.messagesEnd = el;
              }}
            >
              <CreatePostForm onSubmit={this.handleCreatePost} />
            </PostWrapper>
          )}

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

Thread.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
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
      user: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
        avatar_thumbnail: PropTypes.string,
      }),
      title: PropTypes.string,
      subject: PropTypes.string,
      created: PropTypes.string,
    }).isRequired,
    errors: PropTypes.object.isRequired,
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
  fetchThread: PropTypes.func.isRequired,
  fetchPostsByThread: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  // deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  thread: state.thread,
  posts: state.postsByThread,
});

export default connect(mapStateToProps, {
  fetchThread: fetchThread_,
  fetchPostsByThread: fetchPostsByThread_,
  createPost: createPost_,
  deletePost: deletePost_,
})(Thread);
