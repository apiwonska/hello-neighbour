import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const GoToCreatePostFormButton = ({ onClick, children }) => {
  const [showButton, setShowButton] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const screenHeight = window.innerHeight;
    const documentHeight = document.body.clientHeight;
    if (documentHeight > 1.2 * screenHeight) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  });

  return (
    <>
      {showButton && (
        <button type="button" onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
};

GoToCreatePostFormButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GoToCreatePostFormButton;
