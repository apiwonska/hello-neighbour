import React from 'react';
import PropTypes from 'prop-types';

import { NoResults } from 'layout';
import withLoading from 'shared/hoc/withLoading';
import formatTime from 'utils/timeFormat';
import {
  ThreadWrapper,
  ThreadHeader,
  ThreadTitle,
  ThreadLink,
  ThreadLengthSpan,
  FooterWrapper,
  GroupFooter,
  FooterSpan,
  SpeachBubbleIcon,
  ThreadIcon,
  StartThreadPicture,
} from './style';

const ThreadList = ({ threads }) => {
  if (threads.results.length === 0) {
    return (
      <NoResults picture={<StartThreadPicture />}>
        There are no threads yet in this category. Create the first one!
      </NoResults>
    );
  }
  return (
    <>
      {threads.results.map((thread) => (
        <ThreadWrapper key={thread.id}>
          <ThreadHeader>
            <ThreadLink to={`/threads/${thread.id}`}>
              <ThreadIcon name="double_speach_bubble" />
              <ThreadTitle>{thread.title} </ThreadTitle>
            </ThreadLink>
          </ThreadHeader>
          <FooterWrapper>
            <GroupFooter>
              <FooterSpan>Added:</FooterSpan>
              <FooterSpan>{formatTime.main(thread.created)}</FooterSpan>
            </GroupFooter>
            <GroupFooter>
              <FooterSpan>Last post:</FooterSpan>
              <FooterSpan>{formatTime.main(thread.updated)}</FooterSpan>
            </GroupFooter>
            <ThreadLengthSpan>
              <SpeachBubbleIcon name="speach_bubble" />
              <FooterSpan>Posts in thread:</FooterSpan>
              {thread.posts}
            </ThreadLengthSpan>
          </FooterWrapper>
        </ThreadWrapper>
      ))}
    </>
  );
};

ThreadList.propTypes = {
  threads: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
};

export default withLoading(ThreadList);
