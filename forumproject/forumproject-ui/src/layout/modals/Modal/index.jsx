import React from 'react';
import ReactDOM from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import {
  ModalBackground,
  ModalBody,
  Header,
  Title,
  CloseButton,
  Content,
} from './style';

export default ({ title, children, handleDismiss }) => {
  return ReactDOM.createPortal(
    <ModalBackground onClick={handleDismiss}>
      <ModalBody onClick={(e) => e.stopPropagation()}>
        <Header>
          <CloseButton onClick={handleDismiss}>
            <FontAwesomeIcon size="lg" icon={faTimes} />
          </CloseButton>
          <Title>{title}</Title>
        </Header>
        <Content>{children}</Content>
      </ModalBody>
    </ModalBackground>,
    document.querySelector('#modal')
  );
};
