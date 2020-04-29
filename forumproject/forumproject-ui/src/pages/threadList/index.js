import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons'

import {
  CategoryHeader,
  ThreadWrapper,
  TitleRowWrapper,
  ThreadLink,
  ThreadLengthSpan,
  DateWrapper,
  SecondaryText
} from './style.js';
import { PageNotFound, DefaultError } from '../../components/common/errors';
import Spinner from '../../components/common/spinner';
import { ContainerDiv } from '../../components/common/styledDivs';
import { LinkButtonBig } from '../../components/common/styledButtons';
import { fetchCategories, fetchThreadsByCategory } from '../../redux/actions';


class ThreadList extends React.Component {

  componentDidMount() {
    const { categories } = this.props;
    const categoryId = this.props.match.params.categoryId;

    if (!categories.fetched) {
      this.props.fetchCategories();
    }
    this.props.fetchThreadsByCategory(categoryId);
  }

  renderThreadList() {
    const { threads } = this.props;
    const categoryId = this.props.match.params.categoryId;

    if (threads.fetching) {
      return <Spinner/>;
    }

    if (threads.fetched) {
      const threadsList = threads.data.results.map(thread => {
        return (
          <ThreadWrapper key={thread.id}>
            <TitleRowWrapper>
              <ThreadLink to={`/categories/${categoryId}/threads/${thread.id}`}>{ thread.title }</ThreadLink>
              <ThreadLengthSpan>
                <FontAwesomeIcon icon={faCommentAlt}/> &nbsp;{ thread.posts }
              </ThreadLengthSpan>
            </TitleRowWrapper>
            <DateWrapper>
              <SecondaryText>Added: { thread.created }</SecondaryText>
              <SecondaryText>Last post: { thread.updated }</SecondaryText>
            </DateWrapper>
          </ThreadWrapper>
        )
      })
      return threadsList;
    }
  }

  render() {
    const { categories } = this.props
    const { categoryId } = this.props.match.params;
    // Looks in store for the category object for category id from params.
    const category = categories.data.find(obj => String(obj.id) === categoryId);

    if (categories.fetching) {
      return <Spinner/>;
    }

    if (categories.fetched && !category) {
      return <PageNotFound/>;
    };

    if (categories.errors) {
      return <DefaultError/>;
    };

    if (categories.fetched && category) {
      return (
        <ContainerDiv>
          <CategoryHeader>{ category.name }</CategoryHeader>
          <LinkButtonBig to="/" color="green">Add Thread</LinkButtonBig>
          <div>
            { this.renderThreadList() }
          </div>
        </ContainerDiv>
      );
    }
    return null;
  }
}

const mapStateToProps = state => {  
  return {
    categories: state.categories,
    threads: state.threadsByCategory,
  }
}

export default connect(mapStateToProps, { fetchCategories, fetchThreadsByCategory })(ThreadList);