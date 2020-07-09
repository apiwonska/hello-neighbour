import React from 'react';

const AuthLayout = ({
  sideDrawerIsOpen,
  sideNavIsRendered,
  closeSideDrawer,
}) => {
  const renderSideNavigation = () => {
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
          closeSideDrawer={closeSideDrawer}
        >
          <SideNavContent closeSideDrawer={closeSideDrawer} />
        </SideDrawer>
      );
    }
  };

  return (
    <>
      <Toolbar
        sideDrawerIsOpen={sideDrawerIsOpen}
        toggleSideDrawer={toggleSideDrawer}
      />
      <PageWrapper>
        {renderSideNavigation()}
        <MainContentWrapper>{children}</MainContentWrapper>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default AuthLayout;
