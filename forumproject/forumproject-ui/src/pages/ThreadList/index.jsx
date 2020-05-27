import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { NotFound, DefaultError } from 'components/errors';
import { Pagination, Spinner } from 'layout';
import { ContainerDiv } from 'components/styledDivs';
import {
  fetchCategories as fetchCategories_,
  fetchThreadsByCategory as fetchThreadsByCategory_,
} from 'redux/actions';
import formatTime from 'utils/timeFormat';
import {
  CategoryHeader,
  ThreadWrapper,
  TitleRowWrapper,
  ThreadLink,
  ThreadLengthSpan,
  DateWrapper,
  SecondaryText,
  LinkButton,
} from './style';

class ThreadList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageCount: 1,
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

    if (!categories.fetched) {
      await fetchCategories();
    }
    await fetchThreadsByCategory(categoryId, this.itemsPerPage);
    this.setState({ pageCount: this.getPageNumber() });
  };

  handleChangePage = async (event, page) => {
    const { match, fetchThreadsByCategory } = this.props;
    const { categoryId } = match.params;
    const offset = (page - 1) * this.itemsPerPage;
    await fetchThreadsByCategory(categoryId, this.itemsPerPage, offset);
    this.setState({ currentPage: page });
  };

  getPageNumber() {
    const { threads } = this.props;
    const { count: itemsTotal } = threads.data;
    return Math.ceil(itemsTotal / this.itemsPerPage) || 1;
  }

  renderThreadList() {
    const { threads, match } = this.props;
    const { categoryId } = match.params;

    if (threads.fetching) {
      return <Spinner />;
    }

    if (threads.fetched) {
      const threadsList = threads.data.results.map((thread) => (
        <ThreadWrapper key={thread.id}>
          <TitleRowWrapper>
            <ThreadLink to={`/categories/${categoryId}/threads/${thread.id}`}>
              {thread.title}
            </ThreadLink>
            <ThreadLengthSpan>
              <FontAwesomeIcon icon={faCommentAlt} />
              {thread.posts}
            </ThreadLengthSpan>
          </TitleRowWrapper>
          <DateWrapper>
            <SecondaryText>
              Added:
              {formatTime.main(thread.created)}
            </SecondaryText>
            <SecondaryText>
              Last post:
              {formatTime.main(thread.updated)}
            </SecondaryText>
          </DateWrapper>
        </ThreadWrapper>
      ));
      return threadsList;
    }
    return null;
  }

  render() {
    const { categories, match } = this.props;
    const { categoryId } = match.params;
    // looks in store for the category object for category id from params.
    const category = categories.data.find(
      (obj) => String(obj.id) === categoryId
    );

    if (categories.fetching) {
      return <Spinner />;
    }

    if (categories.fetched && !category) {
      return <NotFound />;
    }

    if (!_.isEmpty(categories.errors)) {
      return <DefaultError />;
    }

    if (categories.fetched && category) {
      const { currentPage, pageCount } = this.state;

      return (
        <ContainerDiv>
          <CategoryHeader>{category.name}</CategoryHeader>
          <div>
            <LinkButton
              to={`/categories/${categoryId}/threads/new/`}
              color="green"
            >
              Add Thread
            </LinkButton>
          </div>
          <div>{this.renderThreadList()}</div>
          <div>
            <Pagination
              count={pageCount}
              page={currentPage}
              onChange={this.handleChangePage}
            />
          </div>
        </ContainerDiv>
      );
    }
    return null;
  }
}

ThreadList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
  categories: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
  threads: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
  fetchCategories: PropTypes.func.isRequired,
  fetchThreadsByCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.categories,
  threads: state.threadsByCategory,
});

export default connect(mapStateToProps, {
  fetchCategories: fetchCategories_,
  fetchThreadsByCategory: fetchThreadsByCategory_,
})(ThreadList);
