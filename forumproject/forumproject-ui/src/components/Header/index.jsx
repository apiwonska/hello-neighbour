import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import {
  NavSection,
  NavContainerDiv,
  BrandDiv,
  LogoImg,
  Nav,
  NavUl,
  NavLi,
  NavLink,
  NavLiBtn,
  NavToggleButton,
} from './style';
import LogoImgSrc from '../../img/logo.png';
import { logOut as logOut_ } from '../../redux/actions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false,
    };
  }

  toggleMenu = () => {
    this.setState((prevState) => ({
      menuIsOpen: !prevState.menuIsOpen,
    }));
  };

  renderMenu() {
    const { authenticated, userId, logOut } = this.props;
    if (authenticated) {
      return (
        <>
          <NavLi>
            <NavLink to="/">Main</NavLink>
          </NavLi>
          <NavLi>
            <NavLink to={`/profile/${userId}`}>Profile</NavLink>
          </NavLi>
          <NavLi>
            <NavLiBtn onClick={() => logOut()}>Logout</NavLiBtn>
          </NavLi>
        </>
      );
    }
    return (
      <>
        <NavLi>
          <NavLink to="/auth">Log In</NavLink>
        </NavLi>
        <NavLi>
          <NavLink to="/register">Register</NavLink>
        </NavLi>
      </>
    );
  }

  render() {
    const { menuIsOpen } = this.state;
    return (
      <NavSection>
        <NavContainerDiv>
          <BrandDiv>
            <Link to="/">
              <LogoImg src={LogoImgSrc} />
            </Link>
          </BrandDiv>
          <NavToggleButton onClick={this.toggleMenu}>
            <FontAwesomeIcon icon={!menuIsOpen ? faBars : faTimes} />
          </NavToggleButton>
          <Nav>
            <NavUl showMenu={menuIsOpen}>{this.renderMenu()}</NavUl>
          </Nav>
        </NavContainerDiv>
      </NavSection>
    );
  }
}

Header.propTypes = {
  authenticated: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    userId: state.auth.user.id,
  };
};

export default connect(mapStateToProps, { logOut: logOut_ })(Header);
