import React from 'react';
import { useSelector } from 'react-redux';

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

const ThreadSubject = () => {
  const thread = useSelector((state) => state.thread);

  return (
    <ThreadWrapper>
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
    </ThreadWrapper>
  );
};

export default ThreadSubject;
