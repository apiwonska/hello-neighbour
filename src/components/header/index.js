import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { 
  NavSection,
  NavContainerDiv,
  BrandDiv,
  LogoImg,
  Nav,
  NavUl,
  NavLi,
  NavLink,
  NavToggleButton,
} from './styled.js';
import LogoImgSrc from '../../img/logo.png'

class Header extends React.Component {
  state = {
    menuIsOpen: false,
  }

  toggleMenu = () => {
    this.setState({ 
      menuIsOpen: !this.state.menuIsOpen 
    })
  }

  render() {
    return(
      <NavSection>
        <NavContainerDiv>
          <BrandDiv>
            <Link to='/'><LogoImg src={LogoImgSrc} /></Link>
          </BrandDiv>
          <NavToggleButton onClick={this.toggleMenu}>
            <FontAwesomeIcon 
              icon={!this.state.menuIsOpen? "bars" : "times"}
            />
          </NavToggleButton>
          <Nav>            
            <NavUl showMenu={this.state.menuIsOpen}>
              <NavLi>
                <NavLink to='/'>Main</NavLink>
              </NavLi>
              <NavLi>
                <NavLink to='/profile'>Profile</NavLink>
              </NavLi>
              <NavLi>
                <NavLink to='/'>Logout</NavLink>
              </NavLi>
            </NavUl>
          </Nav>
        </NavContainerDiv>
      </NavSection>
    )
  }
}

export default Header;

