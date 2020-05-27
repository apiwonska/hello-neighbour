import React from 'react';
import { useSelector } from 'react-redux';

import { formatTime } from 'utils';
import { AvatarThumbnail } from 'components/styledImages';
import {
  PostWrapper,
  PostHeader,
  PostHeaderInnerWrapper,
  DateSpan,
  UserLink,
  Content,
} from './style';

const PostList = () => {
  const posts = useSelector((state) => state.postsByThread);

  const renderPosts = () => {
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
  };

  return <>{renderPosts()}</>;
};

export default PostList;
