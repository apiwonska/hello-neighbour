import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { NavUl, NavLi, NavUlInner, NavLiInner, NavLink } from './style';
import {
  logOut as logOut_,
  fetchCategories as fetchCategories_,
} from 'redux/actions';

const renderCategoryLinks = (categories, closeSideDrawer) => {
  const CategoryLinks = categories.data.map((category) => (
    <NavLiInner key={category.id}>
      <NavLink to={`/categories/${category.id}`} onClick={closeSideDrawer}>
        {category.name}
      </NavLink>
    </NavLiInner>
  ));
  return CategoryLinks;
};

const SideNavContent = ({
  auth,
  userId,
  logOut,
  categories,
  closeSideDrawer,
  fetchCategories,
}) => {
  useEffect(() => {
    if (auth && !categories.fetched) {
      fetchCategories();
    }
  }, [auth]);

  if (auth) {
    return (
      <nav>
        <NavUl>
          <NavLi>
            <NavLink to="/" onClick={closeSideDrawer}>
              All Categories
            </NavLink>
          </NavLi>
          <NavUlInner>
            {renderCategoryLinks(categories, closeSideDrawer)}
          </NavUlInner>
          <NavLi>
            <NavLink to={`/profile/${userId}`} onClick={closeSideDrawer}>
              Profile
            </NavLink>
          </NavLi>
          <NavLi>
            <NavLink to="/profile/posts" onClick={closeSideDrawer}>
              Your Posts
            </NavLink>
          </NavLi>
          <NavLi>
            <NavLink
              onClick={() => {
                logOut();
                closeSideDrawer();
              }}
            >
              Logout
            </NavLink>
          </NavLi>
        </NavUl>
      </nav>
    );
  }
  return (
    <nav>
      <NavUl>
        <NavLi>
          <NavLink to="/auth" onClick={closeSideDrawer}>
            Log In
          </NavLink>
        </NavLi>
        <NavLi>
          <NavLink to="/register" onClick={closeSideDrawer}>
            Register
          </NavLink>
        </NavLi>
      </NavUl>
    </nav>
  );
};

SideNavContent.propTypes = {
  auth: PropTypes.bool,
  userId: PropTypes.number,
  // categories: PropTypes.shape({
  //   data: PropTypes.shape({
  //     id: PropTypes.number,
  //     name: PropTypes.string,
  //   }),
  // }),
  logOut: PropTypes.func.isRequired,
  closeSideDrawer: PropTypes.func,
};

SideNavContent.defaultProps = {
  auth: false,
  userId: null,
  // categories: { data: [] },
  closeSideDrawer: () => {},
};

const mapStateToProps = (state) => {
  return {
    auth: !!state.auth.authenticated,
    userId: state.auth.user.id,
    categories: state.categories,
  };
};

export default connect(mapStateToProps, {
  logOut: logOut_,
  fetchCategories: fetchCategories_,
})(SideNavContent);
