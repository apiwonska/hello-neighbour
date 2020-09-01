import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchUser as fetchUser_ } from 'redux/actions';
import PageContent from './PageContent';

const correctUserFetched = (user, userId) => {
  const userFetched = user.fetched;
  const correctUserInStore = String(user.data.id) === userId;
  return userFetched && correctUserInStore;
};

const Profile = (props) => {
  const { userId } = useParams();
  const { user, authUser, fetchUser } = props;
  const [authUserIsProfileOwner, setAuthUserIsProfileOwner] = useState(false);

  useEffect(() => {
    if (authUser) setAuthUserIsProfileOwner(String(authUser.id) === userId);

    if (!correctUserFetched(user, userId)) fetchUser(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <PageContent
      fetching={user.fetching}
      fetched={correctUserFetched(user, userId)}
      errors={user.fetchingErrors}
      user={user.data}
      authUserIsProfileOwner={authUserIsProfileOwner}
    />
  );
};

Profile.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  user: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    data: PropTypes.shape({}).isRequired,
    fetchingErrors: PropTypes.shape({}).isRequired,
  }).isRequired,
  fetchUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authUser: state.auth.user,
  user: state.user,
});

export default connect(mapStateToProps, { fetchUser: fetchUser_ })(Profile);
