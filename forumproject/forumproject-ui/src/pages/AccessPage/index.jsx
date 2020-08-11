import React from 'react';
import PropTypes from 'prop-types';

import { Container, ContentWrapper, Button } from './style';
import GroupChatPicture from './GroupChatPicture';

const AccessPage = (props) => {
  const { history } = props;
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

AccessPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default AccessPage;
