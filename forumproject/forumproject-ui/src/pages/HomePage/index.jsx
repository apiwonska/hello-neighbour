import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { fetchCategories as fetchCategories_ } from 'redux/actions';
import { CONSTANTS } from 'utils';
import PageContent from './PageContent';

class Home extends React.Component {
  componentDidMount() {
    const { categories, fetchCategories } = this.props;

    if (!categories.fetched) {
      fetchCategories();
    }
  }

  render() {
    const {
      categories: { fetching, fetched, errors, data },
    } = this.props;
    return (
      <>
        <Helmet>
          <title>Home - {CONSTANTS.appName}</title>
        </Helmet>

        <PageContent
          fetching={fetching}
          fetched={fetched}
          errors={errors}
          categories={data}
        />
      </>
    );
  }
}

Home.propTypes = {
  categories: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    errors: PropTypes.shape({}).isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
  fetchCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default compose(
  connect(mapStateToProps, { fetchCategories: fetchCategories_ })
)(Home);
