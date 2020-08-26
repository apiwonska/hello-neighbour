import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { MODAL_IS_OPEN, MODAL_IS_CLOSED } from 'redux/actions/types';
import SVGIcon from '../../icons/SVGIcon';
import {
  ModalBackground,
  ModalBody,
  Header,
  Title,
  CloseButton,
  Content,
} from './style';

const Modal = ({ title, children, handleDismiss }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: MODAL_IS_OPEN });
    return () => dispatch({ type: MODAL_IS_CLOSED });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    <ModalBackground onClick={handleDismiss}>
      <ModalBody onClick={(e) => e.stopPropagation()}>
        <Header>
          <CloseButton onClick={handleDismiss}>
            <SVGIcon name="x_mark" />
          </CloseButton>
          <Title>{title}</Title>
        </Header>
        <Content>{children}</Content>
      </ModalBody>
    </ModalBackground>,
    document.querySelector('#modal')
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  handleDismiss: PropTypes.func.isRequired,
};

export default Modal;
