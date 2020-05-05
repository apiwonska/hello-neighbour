import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Field, reduxForm, reset } from 'redux-form';

import {
  LinkWrapper,
  NavLink,
  FirstPostWrapper,
  PostWrapper,
  UserLink,
  ThreadTitle,
  Content,
  Footer,
  DateSpan,
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
  deletePost
} from '../../redux/actions';


class Thread extends React.Component {

  componentDidMount() {
    const { thread } = this.props;
    const threadId = this.props.match.params.threadId;

    if (!thread.fetched || String(thread.data.id) !== threadId) {
      this.props.fetchThread(threadId);
    }
    this.props.fetchPostsByThread(threadId);
  }

  handleCreatePost(formValues, dispatch) {
    const user = this.props.auth.user.id;
    const thread = Number(this.props.match.params.threadId)
    const data = {...formValues, user, thread };
    this.props.createPost(data);
    dispatch(reset('postCreate'));
  }

  // handleDeletePost(postId) {
  //   this.props.deletePost(postId);
  // }

  renderPosts() {
    const { posts } = this.props;
    const postsList = posts.data.results.map(post => {
      return (
        <PostWrapper key={ post.id }>
          <UserLink to={`/profile/${ post.user.id }`}>
            <AvatarThumbnail src={post.user.avatar_thumbnail} alt="Avatar thumbnail"/>{ post.user.username }
          </UserLink>
          <ThreadTitle>{ post.title }</ThreadTitle>
          <Content>{ post.content }</Content>
          <Footer>
            <DateSpan>{ post.created}</DateSpan>
            { this.renderDeletePostButton(post.id, post.user.id) }
          </Footer>
        </PostWrapper>
      )
    })
    return postsList;
  }

  renderTextArea = ({ input }) => {
    return (
      <StyledTextArea {...input} rows="3" placeholder="Add your comment.." maxLength="2000"></StyledTextArea> 
    )
  }

  // Submit button will is rendered only when the input is valid (when it's not empty)
  renderSubmitButton = () => {
    if (
      this.props.postForm.hasOwnProperty("postCreate") && 
      !this.props.postForm.postCreate.hasOwnProperty("syncErrors")
    ) {
      return <SubmitButton type="submit" value="Submit Post" color="greenOutline"/>
    }
  }

  renderDeletePostButton = (postId, userId) => {
    if (userId === this.props.auth.user.id) {
      return <button onClick={() => this.props.deletePost(postId)}>Delete</button>
    }
  }

  render() {    
    const { thread, posts } = this.props;
    const categoryId = this.props.match.params.categoryId;

    if (thread.fetching || posts.fetching) {
      return <Spinner/>;
    }

    if (thread.errors || posts.errors) {
      return renderPageError(thread.errors) || renderPageError(posts.errors);
    };
    
    if (thread.fetched && posts.fetched) {
      return (
        <ContainerDiv>
          <LinkWrapper>
            <FontAwesomeIcon icon={faArrowLeft}/>&nbsp;
            <NavLink to={`/categories/${categoryId}`}>Back to all threads</NavLink>
          </LinkWrapper>

          <FirstPostWrapper>
            <UserLink to={`/profile/${ thread.data.user.id }`}>
              <AvatarThumbnail src={thread.data.user.avatar_thumbnail} alt="Avatar thumbnail"/>
              { thread.data.user.username }
            </UserLink>
            <ThreadTitle>{ thread.data.title }</ThreadTitle>
            <Content>{ thread.data.subject }</Content>
            <Footer>
              <DateSpan>
                { thread.data.created }
              </DateSpan>
            </Footer>
          </FirstPostWrapper>

          {this.renderPosts()}

          <PostWrapper>
            <form method="post" onSubmit={this.props.handleSubmit(this.handleCreatePost.bind(this))}>
              <Field name="content" component={ this.renderTextArea }/>
              { this.renderSubmitButton()}
            </form>
          </PostWrapper>
        </ContainerDiv>
      );
    }
    return null;
  }
}

const validate = formValues => {
  const errors = {};
  if(!formValues.content) {
    errors.content = 'You must enter text';
  }
  return errors;
}

const mapStateToProps = state => {
  return (
    { 
      auth: state.auth,
      thread: state.thread,
      posts: state.postsByThread,
      postForm: state.form,
    }
  )
}

export default compose(
  connect(mapStateToProps, {fetchThread, fetchPostsByThread, createPost, deletePost}),
  reduxForm({ form: 'postCreate', validate } )
)(Thread);