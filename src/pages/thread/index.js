import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUser } from '@fortawesome/free-solid-svg-icons';
import { Field, reduxForm } from 'redux-form';

import { fetchThread, createPost } from '../../redux/actions';
import { ContainerDiv } from '../../components/common/styledDivs';
import Spinner from '../../components/common/spinner';
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
  SubmitButton
} from './style'


class Thread extends React.Component {
  componentDidMount() {
    this.props.fetchThread(this.props.match.params.threadId);
  }

  renderPosts() {
    const postsList = this.props.thread.posts.map(post => {
      return (
        <PostWrapper key={ post.id }>
          <UserLink to={`/profile/${ post.userId }`}>
            <FontAwesomeIcon icon={ faUser}/>{ post.userName }
          </UserLink>
          <ThreadTitle>{ post.title }</ThreadTitle>
          <Content>{ post.content }</Content>
          <Footer>
            <DateSpan>{ post.updated || post.created}</DateSpan>
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
  
  onSubmit = (formValues) => {
    console.log(formValues);
    // USER ID HERE IS ALWAYS 1. TO BE CHANGED
    // createPost(formValues, this.props.match.params.threadId, 1);
  }

  render() {    
    const { thread } = this.props;

    if(!Object.keys(this.props.thread).length) {
      return <Spinner/>;
    }

    return (
      <ContainerDiv>
        <LinkWrapper>
          <FontAwesomeIcon icon={faArrowLeft}/>&nbsp;
          <NavLink to={`/categories/${this.props.match.params.categoryId}`}>Back to all threads</NavLink>
        </LinkWrapper>

        <FirstPostWrapper>
          <UserLink to={`/profile/${ thread.userId }`}>
            <FontAwesomeIcon icon={ faUser}/>{ thread.userName }
          </UserLink>
          <ThreadTitle>{ thread.title }</ThreadTitle>
          <Content>{ thread.content }</Content>
          <Footer>
            <DateSpan>
              { thread.created }
            </DateSpan>
          </Footer>
        </FirstPostWrapper>

        {this.renderPosts()}       

        <PostWrapper>
          <form action={`threads/${ thread.id }/posts`} method="post" onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field name="content" component={ this.renderTextArea }/>
            { this.renderSubmitButton()}            
          </form>
        </PostWrapper>
        
      </ContainerDiv>
    )
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
      thread: state.thread,
      postForm: state.form
    }
  )
}

const ThreadWithForm = reduxForm({
  form: 'postCreate',
  validate
})(Thread);
export default connect(mapStateToProps, {fetchThread})(ThreadWithForm);