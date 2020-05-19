import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

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
import { logOut } from '../../redux/actions';

class Header extends React.Component {
  state = {
    menuIsOpen: false,
  };

  toggleMenu() {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen,
    });
  }

  renderMenu() {
    if (this.props.authenticated) {
      return (
        <>
          <NavLi>
            <NavLink to="/">Main</NavLink>
          </NavLi>
          <NavLi>
            <NavLink to={`/profile/${this.props.userId}`}>Profile</NavLink>
          </NavLi>
          <NavLi>
            <NavLiBtn onClick={() => this.props.logOut()}>Logout</NavLiBtn>
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
    return (
      <NavSection>
        <NavContainerDiv>
          <BrandDiv>
            <Link to="/">
              <LogoImg src={LogoImgSrc} />
            </Link>
          </BrandDiv>
          <NavToggleButton onClick={this.toggleMenu.bind(this)}>
            <FontAwesomeIcon icon={!this.state.menuIsOpen ? faBars : faTimes} />
          </NavToggleButton>
          <Nav>
            <NavUl showMenu={this.state.menuIsOpen}>{this.renderMenu()}</NavUl>
          </Nav>
        </NavContainerDiv>
      </NavSection>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    userId: state.auth.user.id,
  };
};

export default connect(mapStateToProps, { logOut })(Header);
