import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Field, Form } from 'react-final-form';

import {
  LinkWrapper,
  NavLink,
  FirstPostWrapper,
  PostWrapper,
  PostHeader,
  PostHeaderInnerWrapper,
  DateSpan,
  UserLink,
  ThreadTitle,
  Content,
  StyledTextArea,
  SubmitButton,
} from './style';
import { renderPageError } from '../../components/errors';
import Spinner from '../../components/spinner';
import { ContainerDiv } from '../../components/styledDivs';
import { AvatarThumbnail } from '../../components/styledImages';
import {
  fetchThread,
  fetchPostsByThread,
  createPost,
  deletePost,
} from '../../redux/actions';
import { formatTime } from '../../utils';

class Thread extends React.Component {
  componentDidMount() {
    const { thread } = this.props;
    const { threadId } = this.props.match.params;

    if (!thread.fetched || String(thread.data.id) !== threadId) {
      this.props.fetchThread(threadId);
    }
    this.props.fetchPostsByThread(threadId);
  }

  handleCreatePost = (values) => {
    const user = this.props.auth.user.id;
    const thread = Number(this.props.match.params.threadId);
    const data = { ...values, user, thread };
    this.props.createPost(data);
  };

  renderPosts() {
    const { posts } = this.props;
    const postsList = posts.data.results.map((post) => {
      return (
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
      );
    });
    return postsList;
  }

  render() {
    const { thread, posts } = this.props;
    const { categoryId } = this.props.match.params;

    if (thread.fetching || posts.fetching) {
      return <Spinner />;
    }

    if (thread.errors || posts.errors) {
      return renderPageError(thread.errors) || renderPageError(posts.errors);
    }

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

          <FirstPostWrapper>
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
          </FirstPostWrapper>

          {this.renderPosts()}

          {/* Create post form */}
          <PostWrapper>
            <Form onSubmit={this.handleCreatePost}>
              {({ handleSubmit, values, form }) => {
                return (
                  <form
                    onSubmit={async (event) => {
                      await handleSubmit(event);
                      form.reset();
                    }}
                  >
                    <Field name="content">
                      {({ input }) => {
                        return (
                          <StyledTextArea
                            {...input}
                            rows="3"
                            placeholder="Add your comment.."
                            maxLength="2000"
                          />
                        );
                      }}
                    </Field>
                    {values.content && (
                      <SubmitButton
                        type="submit"
                        value="Submit Post"
                        color="greenOutline"
                      />
                    )}
                  </form>
                );
              }}
            </Form>
          </PostWrapper>
        </ContainerDiv>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    thread: state.thread,
    posts: state.postsByThread,
  };
};

export default connect(mapStateToProps, {
  fetchThread,
  fetchPostsByThread,
  createPost,
  deletePost,
})(Thread);
