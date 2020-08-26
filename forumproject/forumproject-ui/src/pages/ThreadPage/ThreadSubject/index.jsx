import React from 'react';
import PropTypes from 'prop-types';

import { formatTime } from 'utils';
import {
  ThreadWrapper,
  PostHeader,
  PostHeaderInnerWrapper,
  DateSpan,
  UserLink,
  ThreadTitle,
  Content,
  AvatarThumbnail,
} from './style';

const ThreadSubject = ({ thread }) => {
  return (
    <ThreadWrapper>
      <PostHeader>
        <AvatarThumbnail
          src={thread.user.avatar_thumbnail}
          alt="Avatar thumbnail"
        />
        <PostHeaderInnerWrapper>
          <UserLink to={`/profile/${thread.user.id}`}>
            {thread.user.username}
          </UserLink>
          <DateSpan>{formatTime.main(thread.created)}</DateSpan>
        </PostHeaderInnerWrapper>
      </PostHeader>
      <ThreadTitle>{thread.title}</ThreadTitle>
      <Content>{thread.subject}</Content>
    </ThreadWrapper>
  );
};

ThreadSubject.propTypes = {
  thread: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      avatar_thumbnail: PropTypes.string.isRequired,
    }).isRequired,
    created: PropTypes.string.isRequired,
  }).isRequired,
};

export default ThreadSubject;
