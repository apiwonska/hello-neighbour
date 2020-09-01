import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  fetchCategories as fetchCategories_,
  fetchThreadsByCategory as fetchThreadsByCategory_,
} from 'redux/actions';
import PageContent from './PageContent';

class ThreadList extends React.Component {
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
      categories,
      fetchCategories,
      fetchThreadsByCategory,
      match,
    } = this.props;
    const { categoryId } = match.params;

    if (!categories.fetched && !categories.fetching) {
      await fetchCategories();
    }
    await fetchThreadsByCategory(categoryId, this.itemsPerPage);
    this.setState({ totalPages: this.countPageNumber() });
  };

  componentDidUpdate = async (prevProps) => {
    const { fetchThreadsByCategory, match } = this.props;
    const { categoryId: prevCategoryId } = prevProps.match.params;
    const { categoryId: currentCategoryId } = match.params;

    if (prevCategoryId !== currentCategoryId) {
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
    const { categories, threads, match } = this.props;
    const { categoryId } = match.params;
    const category = categories.data.find(
      (obj) => String(obj.id) === categoryId
    );
    const { currentPage, totalPages } = this.state;
    const errors =
      (!_.isEmpty(categories.errors) && categories.errors) ||
      (!_.isEmpty(threads.errors) && threads.errors) ||
      {};

    return (
      <PageContent
        fetching={categories.fetching}
        fetched={categories.fetched && !!category}
        notFound={categories.fetched && !category}
        errors={errors}
        categoryName={category && category.name}
        currentPage={currentPage}
        totalPages={totalPages}
        handleChangePage={this.handleChangePage}
        threads={threads}
      />
    );
  }
}

ThreadList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ categoryId: PropTypes.string.isRequired })
      .isRequired,
  }).isRequired,
  categories: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    errors: PropTypes.shape({}).isRequired,
  }).isRequired,
  threads: PropTypes.shape({
    data: PropTypes.shape({
      count: PropTypes.number,
    }).isRequired,
    errors: PropTypes.shape({}).isRequired,
  }).isRequired,
  fetchCategories: PropTypes.func.isRequired,
  fetchThreadsByCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.categories,
  threads: state.threadList,
});

export default connect(mapStateToProps, {
  fetchCategories: fetchCategories_,
  fetchThreadsByCategory: fetchThreadsByCategory_,
})(ThreadList);
