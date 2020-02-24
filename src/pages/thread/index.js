import React from 'react';
import { connect } from 'react-redux';

import { fetchThread } from '../../redux/actions'
import { ContainerDiv } from '../../components/common/styledDivs';
import {
  LinkWrapper,
  NavLink,
  FirstPostWrapper,  
  PostWrapper,
  AddPostForm,
  UserLink,
  ThreadTitle,
  Content,
  Footer,
  DateSpan,
} from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUser } from '@fortawesome/free-solid-svg-icons'

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

  render() {
    const { thread } = this.props;

    if(!Object.keys(this.props.thread).length) {
      return <div>Loading...</div>
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
              { thread.updated || thread.created }
            </DateSpan>
          </Footer>
        </FirstPostWrapper>

        {this.renderPosts()}       

        <AddPostForm>
        </AddPostForm>
      </ContainerDiv>
    )
  }  
}

const mapStateToProps = state => {
  return (
    { 
      thread: state.thread,
    }
  )
}

export default connect(mapStateToProps, {fetchThread})(Thread);