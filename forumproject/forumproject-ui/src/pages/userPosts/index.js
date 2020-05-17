import React from 'react';
import { connect } from 'react-redux';
import { Field, Form } from 'react-final-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import {
  PostWrapper,
  PostHeader,
  PostHeaderInnerWrapper,
  DateSpan,
  Content,
  Footer
} from './style';
import { renderPageError } from '../../components/errors';
import Spinner from '../../components/spinner';
import { ContainerDiv } from '../../components/styledDivs';
import {
  fetchPostsByUser,
  // updatePost,
  deletePost
} from '../../redux/actions';
import { formatTime } from '../../utils';


class UserPosts extends React.Component {

  componentDidMount = async() => {
    const userId = this.props.auth.user.id;
    await this.props.fetchPostsByUser(userId);
  }

  handleDeletePost = (postId) => {
    this.props.deletePost(postId);
  }

  renderPostList = () => {
    const { posts } = this.props;
    console.log('list',posts.data)
    const postsList = posts.data.results.map(post => {
      return (
        <PostWrapper key={ post.id }>
          <PostHeader>
            <PostHeaderInnerWrapper>
              <Link to={`/categories/${post.thread.category}/threads/${post.thread.id}`} >
                { post.thread.title }
              </Link>
              <DateSpan>
                { formatTime.main(post.created) }
              </DateSpan>
            </PostHeaderInnerWrapper>
          </PostHeader>
          <Content>{ post.content }</Content>
          <Footer>
            <button onClick={() => this.handleDeletePost(post.id)}>Delete</button>
          </Footer>
        </PostWrapper>
      )
    })
    return postsList;
  }

  render() {
    const { posts } = this.props;
    console.log(posts)

    if (posts.fetching) {
      return <Spinner/>;
    }

    if (!_.isEmpty(posts.errors)) {
      console.log(_.isEmpty(posts.errors), posts.errors)
      return renderPageError(posts.errors);
    };

    if (posts.fetched) {
      return (
        <ContainerDiv>
          { this.renderPostList() }
        </ContainerDiv>
      )
    }
    
    return null;
  }
}

const mapsToProps = state => {
  return (
    {
      auth: state.auth,
      posts: state.postsByUser
    }
  )
}

export default connect(mapsToProps, {
  fetchPostsByUser,
  // updatePost,
  deletePost
})(UserPosts);