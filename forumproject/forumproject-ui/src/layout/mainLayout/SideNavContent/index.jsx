import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { logOut, fetchCategories, closeSideDrawer } from 'redux/actions';
import { NavUl, NavLi, NavUlInner, NavLiInner, NavLink } from './style';

const SideNavContent = () => {
  const auth = useSelector((state) => !!state.auth.authenticated);
  const userId = useSelector((state) => state.auth.user.id);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const boundFetchCategories = () => dispatch(fetchCategories());
  const boundCloseSideDrawer = () => dispatch(closeSideDrawer());
  const location = useLocation();

  useEffect(() => {
    if (auth && !categories.fetched) {
      boundFetchCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const NavLinkWithProps = (navLinkProps) => (
    <NavLink
      onClick={boundCloseSideDrawer}
      path={location.pathname}
      {...navLinkProps}
    />
  );

  const renderCategoryLinks = () => {
    const CategoryLinks = categories.data.map((category) => (
      <NavLiInner key={category.id}>
        <NavLinkWithProps to={`/categories/${category.id}`}>
          {category.name}
        </NavLinkWithProps>
      </NavLiInner>
    ));
    return CategoryLinks;
  };

  if (auth) {
    return (
      <nav>
        <NavUl>
          <NavLi>
            <NavLinkWithProps to="/">All Categories</NavLinkWithProps>
          </NavLi>
          <NavUlInner>{renderCategoryLinks(categories)}</NavUlInner>
          <NavLi>
            <NavLinkWithProps to={`/profile/${userId}`}>
              Profile
            </NavLinkWithProps>
          </NavLi>
          <NavLi>
            <NavLinkWithProps to="/profile/posts">Your Posts</NavLinkWithProps>
          </NavLi>
          <NavLi>
            <NavLinkWithProps
              onClick={() => {
                dispatch(logOut());
                dispatch(closeSideDrawer());
              }}
            >
              Logout
            </NavLinkWithProps>
          </NavLi>
        </NavUl>
      </nav>
    );
  }
  return (
    <nav>
      <NavUl>
        <NavLi>
          <NavLinkWithProps to="/auth">Log In</NavLinkWithProps>
        </NavLi>
        <NavLi>
          <NavLinkWithProps to="/register">Register</NavLinkWithProps>
        </NavLi>
      </NavUl>
    </nav>
  );
};

export default SideNavContent;
