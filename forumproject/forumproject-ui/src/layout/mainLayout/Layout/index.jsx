import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LayoutSetup from 'layout/LayoutSetup';
import { PageWrapper, MainContentWrapper } from './style';
import theme from 'layout/theme';
import Toolbar from '../Toolbar';
import SideDrawer from '../SideDrawer';
import SideNav from '../SideNav';
import SideNavContent from '../SideNavContent';
import Footer from '../Footer';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideNavIsRendered: false,
      sideDrawerIsOpen: false,
    };
  }

  componentDidMount() {
    this.updateSideNavIsRendered();
    window.addEventListener('resize', this.handleResetDrawerState);
    window.addEventListener('resize', this.updateSideNavIsRendered);
  }

  componentDidUpdate() {
    this.updateSideNavIsRendered();
    this.handleResetDrawerState();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResetDrawerState);
    window.removeEventListener('resize', this.updateSideNavIsRendered);
  }

  toggleSideDrawer = () => {
    this.setState((prevState) => ({
      sideDrawerIsOpen: !prevState.sideDrawerIsOpen,
    }));
  };

  closeSideDrawer = () => {
    this.setState({ sideDrawerIsOpen: false });
  };

  handleResetDrawerState = () => {
    const { auth } = this.props;
    const { sideNavIsRendered } = this.state;
    if (sideNavIsRendered) {
      this.setState(({ sideDrawerIsOpen }) => {
        if (sideDrawerIsOpen) {
          return {
            sideDrawerIsOpen: false,
          };
        }
      });
    }
    if (!auth && window.innerWidth > theme.breakpoints.toggleNavUnauth) {
      this.setState(({ sideDrawerIsOpen }) => {
        if (sideDrawerIsOpen) {
          return {
            sideDrawerIsOpen: false,
          };
        }
      });
    }
  };

  updateSideNavIsRendered = () => {
    const { auth } = this.props;
    if (auth && window.innerWidth > theme.breakpoints.toggleNavAuth) {
      this.setState(({ sideNavIsRendered }) => {
        if (!sideNavIsRendered) {
          return {
            sideNavIsRendered: true,
          };
        }
      });
    } else {
      this.setState(({ sideNavIsRendered }) => {
        if (sideNavIsRendered) {
          return {
            sideNavIsRendered: false,
          };
        }
      });
    }
  };

  renderSideNavigation() {
    const { sideDrawerIsOpen, sideNavIsRendered } = this.state;
    if (sideNavIsRendered) {
      return (
        <SideNav>
          <SideNavContent />
        </SideNav>
      );
    } else {
      return (
        <SideDrawer
          sideDrawerIsOpen={sideDrawerIsOpen}
          closeSideDrawer={this.closeSideDrawer}
        >
          <SideNavContent closeSideDrawer={this.closeSideDrawer} />
        </SideDrawer>
      );
    }
  }

  render() {
    const { sideDrawerIsOpen } = this.state;
    const { children } = this.props;
    return (
      <LayoutSetup>
        <Toolbar
          sideDrawerIsOpen={sideDrawerIsOpen}
          toggleSideDrawer={this.toggleSideDrawer}
        />
        <PageWrapper>
          {this.renderSideNavigation()}
          <MainContentWrapper>{children}</MainContentWrapper>
        </PageWrapper>
        <Footer />
      </LayoutSetup>
    );
  }
}

Layout.propTypes = {
  auth: PropTypes.bool,
};

Layout.defaultProps = {
  auth: false,
};

const mapStateToProps = (state) => {
  return {
    auth: !!state.auth.authenticated,
  };
};

export default connect(mapStateToProps)(Layout);
