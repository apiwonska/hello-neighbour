import React from 'react';
import { connect } from 'react-redux';

import { fetchCategories } from '../../redux/actions';
import Spinner from '../../components/common/spinner';
import { 
  CategoryContainer,
  CategoryLink
} from './style';
import { ContainerDiv } from '../../components/common/styledDivs';

class MainPage extends React.Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  renderCategoryList() {
    const categoryList = this.props.categories.map(category => {
      return (
        <CategoryContainer key={category.id}>
          <CategoryLink to={`/categories/${category.id}`}>
            {category.name}
          </CategoryLink>          
        </CategoryContainer>
      )      
    })
    return categoryList;
  }

  render() {
    if ( !this.props.categories.length ) {
      return <Spinner/>;
    }

    return (
      <ContainerDiv>
        {this.renderCategoryList()}
      </ContainerDiv>
    )
  }  
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToProps, {fetchCategories})(MainPage);