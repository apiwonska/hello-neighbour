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
  UserName,
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
          <UserName>
            <FontAwesomeIcon icon={ faUser}/>{ post.userName }
          </UserName>
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
          <UserName>
            <FontAwesomeIcon icon={ faUser}/>{ this.props.thread.userName }
          </UserName>
          <ThreadTitle>{ this.props.thread.title }</ThreadTitle>
          <Content>{ this.props.thread.content }</Content>
          <Footer>
            <DateSpan>
              { this.props.thread.updated || this.props.thread.created }
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