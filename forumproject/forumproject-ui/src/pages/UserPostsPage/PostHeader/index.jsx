import React from 'react';
import PropTypes from 'prop-types';

import { formatTime } from 'utils';
import { PostHeaderInnerWrapper, ThreadLink, DateSpan } from './style';

const PostHeader = ({ post }) => (
  <PostHeaderInnerWrapper>
    <ThreadLink
      to={`/categories/${post.thread.category}/threads/${post.thread.id}`}
    >
      {post.thread.title}
    </ThreadLink>
    <DateSpan>{formatTime.main(post.created)}</DateSpan>
  </PostHeaderInnerWrapper>
);

PostHeader.propTypes = {
  post: PropTypes.shape({
    thread: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.number.isRequired,
    }).isRequired,
    created: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostHeader;
