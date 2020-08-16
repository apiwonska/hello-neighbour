import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { NotFound, DefaultError } from 'shared/errors';
import {
  ContentWrapper,
  PageTitle,
  TopBeam,
  Pagination,
  Spinner,
  Anchor,
  Breadcrumb,
  BreadcrumbIcon,
  NoResults,
} from 'layout';
import {
  fetchCategories as fetchCategories_,
  fetchThreadsByCategory as fetchThreadsByCategory_,
} from 'redux/actions';
import formatTime from 'utils/timeFormat';
import {
  LinkButton,
  LinkWrapper,
  ThreadListWrapper,
  ThreadWrapper,
  ThreadHeader,
  ThreadTitle,
  ThreadLink,
  ThreadLengthSpan,
  FooterWrapper,
  GroupFooter,
  FooterSpan,
  PaginationWrapper,
  SpeachBubbleIcon,
  ThreadIcon,
  StartThreadPicture,
} from './style';

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

    if (!categories.fetched) {
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

  renderThreadList() {
    const { threads, match } = this.props;
    const { categoryId } = match.params;

    if (threads.fetching) {
      return <Spinner />;
    }

    if (threads.fetched) {
      if (threads.data.results.length === 0) {
        return (
          <NoResults picture={<StartThreadPicture />}>
            There are no threads yet in this category. Create the first one!
          </NoResults>
        );
      }
      const threadsList = threads.data.results.map((thread) => (
        <ThreadWrapper key={thread.id}>
          <ThreadHeader>
            <ThreadLink to={`/categories/${categoryId}/threads/${thread.id}`}>
              <ThreadIcon name="double_speach_bubble" />
              <ThreadTitle>{thread.title} </ThreadTitle>
            </ThreadLink>
          </ThreadHeader>
          <FooterWrapper>
            <GroupFooter>
              <FooterSpan>Added:</FooterSpan>
              <FooterSpan>{formatTime.main(thread.created)}</FooterSpan>
            </GroupFooter>
            <GroupFooter>
              <FooterSpan>Last post:</FooterSpan>
              <FooterSpan>{formatTime.main(thread.updated)}</FooterSpan>
            </GroupFooter>
            <ThreadLengthSpan>
              <SpeachBubbleIcon name="speach_bubble" />
              <FooterSpan>Posts in thread:</FooterSpan>
              {thread.posts}
            </ThreadLengthSpan>
          </FooterWrapper>
        </ThreadWrapper>
      ));
      return threadsList;
    }
    return null;
  }

  renderPagination = () => {
    const { currentPage, totalPages } = this.state;
    return (
      <PaginationWrapper>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChange={this.handleChangePage}
        />
      </PaginationWrapper>
    );
  };

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
      return (
        <>
          <TopBeam>
            <PageTitle>{category.name}</PageTitle>
          </TopBeam>
          <ContentWrapper>
            <Breadcrumb>
              <Anchor href="/">
                <BreadcrumbIcon name="home" />
                Home Page
              </Anchor>
              <span>{category.name}</span>
            </Breadcrumb>
            <LinkWrapper>
              <LinkButton to={`/categories/${categoryId}/threads/new/`}>
                Add Thread
              </LinkButton>
            </LinkWrapper>
            <ThreadListWrapper>
              {this.renderPagination()}
              {this.renderThreadList()}
              {this.renderPagination()}
            </ThreadListWrapper>
          </ContentWrapper>
        </>
      );
    }
    return null;
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
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      count: PropTypes.number,
      results: PropTypes.arrayOf(PropTypes.shape({})),
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
