import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons'

import { fetchCategories, fetchCategoryThreads } from '../../redux/actions';
import Spinner from '../../components/common/spinner';
import { 
  CategoryHeader,
  ThreadWrapper,
  TitleRowWrapper,
  ThreadLink,
  ThreadLengthSpan,
  DateWrapper,
  SecondaryText
} from './style.js';
import { ContainerDiv } from '../../components/common/styledDivs';
import { LinkButtonBig } from '../../components/common/styledButtons';

class ThreadsList extends React.Component {
  componentDidMount() { 
    if (this.props.categories.length === 0) {
      this.props.fetchCategories();
    }
    this.props.fetchCategoryThreads(this.props.match.params.categoryId);
  }

  renderThreadsList() {
    if (Object.keys(this.props.categoryThreads).length) {
      const threadsList = this.props.categoryThreads.results.map(thread => {
      return (
        <ThreadWrapper key={thread.id}>
          <TitleRowWrapper>
            <ThreadLink to={`/categories/${this.props.match.params.categoryId}/threads/${thread.id}`}>{ thread.title }</ThreadLink>
            <ThreadLengthSpan><FontAwesomeIcon 
              icon={faCommentAlt}
            /> 10</ThreadLengthSpan>
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
    const categoryId = this.props.match.params.categoryId;
    const category = this.props.categories.find(obj => String(obj.id) === categoryId);

    if (Object.keys(this.props.categories).length === 0) {
      return <Spinner/>;
    } else if (category) {
      return (
        <ContainerDiv>
          <CategoryHeader>{ category.name }</CategoryHeader>
          <LinkButtonBig to="/" color="green">Add Thread</LinkButtonBig>
          <div>
            { this.renderThreadsList() }
          </div>
        </ContainerDiv>
      );
    } else {
      return (
        <h2>Page not found</h2>
      )
    }
  }
}

const mapStateToProps = state => {  
  return {
    categories: state.categories,
    categoryThreads: state.categoryThreads,
  }
}

export default connect(mapStateToProps, { fetchCategories, fetchCategoryThreads })(ThreadsList);