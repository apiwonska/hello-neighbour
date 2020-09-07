import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Helmet } from 'react-helmet';

import {
  fetchCategory as fetchCategory_,
  fetchThreadsByCategory as fetchThreadsByCategory_,
} from 'redux/actions';
import { CONSTANTS } from 'utils';
import PageContent from './PageContent';

class ThreadListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPages: 1,
    };
    this.itemsPerPage = 10;
  }

  componentDidMount = async () => {
    const {
      category,
      fetchCategory,
      fetchThreadsByCategory,
      match,
    } = this.props;
    const { categoryId } = match.params;

    if (!category.fetched || String(category.data.id) !== categoryId) {
      fetchCategory(categoryId);
    }

    await fetchThreadsByCategory(categoryId, this.itemsPerPage);
    this.setState({ totalPages: this.countPageNumber() });
  };

  componentDidUpdate = async (prevProps) => {
    const { fetchThreadsByCategory, fetchCategory, match } = this.props;
    const { categoryId: prevCategoryId } = prevProps.match.params;
    const { categoryId: currentCategoryId } = match.params;

    if (prevCategoryId !== currentCategoryId) {
      fetchCategory(currentCategoryId);
      await fetchThreadsByCategory(currentCategoryId, this.itemsPerPage);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ totalPages: this.countPageNumber() });
    }
  };

  handleChangePage = async (page) => {
    const { match, fetchThreadsByCategory } = this.props;
    const { categoryId } = match.params;
    const offset = (page - 1) * this.itemsPerPage;
    await fetchThreadsByCategory(categoryId, this.itemsPerPage, offset);
    this.setState({ currentPage: page });
  };

  countPageNumber() {
    const { threads } = this.props;
    const { count: itemsTotal } = threads.data;
    return Math.ceil(itemsTotal / this.itemsPerPage) || 1;
  }

  render() {
    const { category, threads } = this.props;
    const { currentPage, totalPages } = this.state;
    const errors =
      (!_.isEmpty(category.errors) && category.errors) ||
      (!_.isEmpty(threads.errors) && threads.errors) ||
      {};
    const categoryName =
      (category.data && category.data.name) || 'Unknown category';

    const limitCategoryNameLength = (str) => {
      const maxDocumentTitleLength = 64;
      const maxCategoryNameLength =
        maxDocumentTitleLength - CONSTANTS.appName.length - 6;
      if (str.length > maxCategoryNameLength) {
        return `${str.substring(0, maxCategoryNameLength)}...`;
      }
      return str;
    };

    return (
      <>
        <Helmet>
          <title>
            {limitCategoryNameLength(categoryName)} - {CONSTANTS.appName}
          </title>
        </Helmet>

        <PageContent
          fetching={category.fetching || threads.fetching}
          fetched={category.fetched || threads.fetched}
          errors={errors}
          categoryName={categoryName}
          currentPage={currentPage}
          totalPages={totalPages}
          handleChangePage={this.handleChangePage}
          threads={threads}
        />
      </>
    );
  }
}

ThreadListPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ categoryId: PropTypes.string.isRequired })
      .isRequired,
  }).isRequired,
  category: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    data: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })
      .isRequired,
    errors: PropTypes.shape({}).isRequired,
  }).isRequired,
  threads: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      count: PropTypes.number,
    }).isRequired,
    errors: PropTypes.shape({}).isRequired,
  }).isRequired,
  fetchCategory: PropTypes.func.isRequired,
  fetchThreadsByCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category,
  threads: state.threadList,
});

export default connect(mapStateToProps, {
  fetchCategory: fetchCategory_,
  fetchThreadsByCategory: fetchThreadsByCategory_,
})(ThreadListPage);
