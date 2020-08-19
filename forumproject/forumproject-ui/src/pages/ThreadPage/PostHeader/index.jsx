import React from 'react';
import PropTypes from 'prop-types';

import { formatTime } from 'utils';
import {
  PostHeaderInnerWrapper,
  DateSpan,
  UserLink,
  AvatarThumbnail,
} from './style';

const PostHeader = ({ post }) => (
  <>
    <AvatarThumbnail src={post.user.avatar_thumbnail} alt="Avatar thumbnail" />
    <PostHeaderInnerWrapper>
      <UserLink to={`/profile/${post.user.id}`}>{post.user.username}</UserLink>
      <DateSpan>{formatTime.main(post.created)}</DateSpan>
    </PostHeaderInnerWrapper>
  </>
);

PostHeader.propTypes = {
  post: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      avatar_thumbnail: PropTypes.string.isRequired,
    }).isRequired,
    created: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostHeader;
