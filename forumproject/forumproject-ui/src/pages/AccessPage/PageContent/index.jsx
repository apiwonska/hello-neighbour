import React from 'react';
import { useHistory } from 'react-router-dom';

import { withHandleServerErrors } from 'shared/hoc';
import { Container, ContentWrapper, Button } from './style';
import GroupChatPicture from '../GroupChatPicture';

const PageContent = () => {
  const history = useHistory();

  return (
    <Container>
      <ContentWrapper>
        <GroupChatPicture width="100%" height="100%" />
        <Button
          color="yellow"
          size="XL"
          onClick={() => history.push('/register')}
        >
          Join us!
        </Button>
      </ContentWrapper>
    </Container>
  );
};

export default withHandleServerErrors(PageContent);
