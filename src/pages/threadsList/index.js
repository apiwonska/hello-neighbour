import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons'

import { fetchCategory } from '../../redux/actions';
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
    this.props.fetchCategory(this.props.match.params.categoryId)
  }

  renderThreadsList() {
    const threadsList = this.props.category.threads.map(thread => {
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

  render() {
    if(!Object.keys(this.props.category).length) {
      return <div>Loading...</div>
    }

    return (
    <ContainerDiv>
      <CategoryHeader>{this.props.category.name}</CategoryHeader>
      <LinkButtonBig color="green">Add Thread</LinkButtonBig>
      <div>
        { this.renderThreadsList() }
      </div>      
    </ContainerDiv>
  )
  }  
}

const mapStateToProps = state => {  
  return {
    category: state.category
  }
}

export default connect(mapStateToProps, {fetchCategory})(ThreadsList);