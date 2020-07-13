import React from 'react';
import { connect } from 'react-redux';
// import _ from 'lodash';
import PropTypes from 'prop-types';

import { fetchCategories as fetchCategories_ } from 'redux/actions';
import { Spinner, ContentWrapper, PageTitle, TopBeam } from 'layout';

import {
  CategoryCard,
  MainContent,
  CardTitle,
  CardText,
  SideInfo,
  StatsGroup,
  StatsTitle,
  StatsNum,
  // CategoryLink,
} from './style';
// import { DefaultError } from 'components/errors';

class CategoryList extends React.Component {
  componentDidMount() {
    const { categories, fetchCategories } = this.props;

    if (!categories.fetched) {
      fetchCategories();
    }
  }

  renderCategoryList() {
    const { categories } = this.props;

    const categoryList = categories.data.map((category) => (
      <CategoryCard key={category.id}>
        <MainContent>
          <CardTitle>{category.name}</CardTitle>
          <CardText>{category.description}</CardText>
        </MainContent>
        <SideInfo>
          <StatsGroup>
            <StatsTitle>Threads:</StatsTitle>
            <StatsNum>{category.threads}</StatsNum>
          </StatsGroup>
          <StatsGroup>
            <StatsTitle>Posts:</StatsTitle>
            <StatsNum>{category.posts}</StatsNum>
          </StatsGroup>
          {/* <CategoryLink to={`/categories/${category.id}`}>-></CategoryLink> */}
        </SideInfo>
      </CategoryCard>
    ));
    return categoryList;
  }

  render() {
    const { categories } = this.props;

    if (categories.fetching) {
      return <Spinner />;
    }

    // if (!_.isEmpty(categories.errors)) {
    //   return <DefaultError />;
    // }

    if (categories.fetched) {
      return (
        <>
          <TopBeam>
            <PageTitle>Welcome to our Forum!</PageTitle>
          </TopBeam>
          <ContentWrapper>{this.renderCategoryList()}</ContentWrapper>
        </>
      );
    }

    return null;
  }
}

CategoryList.propTypes = {
  categories: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    errors: PropTypes.shape({}).isRequired,
  }).isRequired,
  fetchCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps, { fetchCategories: fetchCategories_ })(
  CategoryList
);
