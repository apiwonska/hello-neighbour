import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';

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
import { NotFound, DefaultError } from '../../components/errors';
import Spinner from '../../components/spinner';
import { ContainerDiv } from '../../components/styledDivs';
import {
  fetchCategories as fetchCategories_,
  fetchThreadsByCategory as fetchThreadsByCategory_,
} from '../../redux/actions';
import { formatTime } from '../../utils';

class ThreadList extends React.Component {
  componentDidMount() {
    const {
      categories,
      fetchCategories,
      fetchThreadsByCategory,
      match,
    } = this.props;
    const { categoryId } = match.params;

    if (!categories.fetched) {
      fetchCategories();
    }
    fetchThreadsByCategory(categoryId);
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
    // Looks in store for the category object for category id from params.
    const category = categories.data.find(
      (obj) => String(obj.id) === categoryId
    );

    if (categories.fetching) {
      return <Spinner />;
    }

    if (categories.fetched && !category) {
      return <NotFound />;
    }

    if (categories.errors) {
      return <DefaultError />;
    }

    if (categories.fetched && category) {
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
        </ContainerDiv>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  threads: state.threadsByCategory,
});

export default connect(mapStateToProps, {
  fetchCategories: fetchCategories_,
  fetchThreadsByCategory: fetchThreadsByCategory_,
})(ThreadList);
