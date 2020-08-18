import React from 'react';
import PropTypes from 'prop-types';

import {
  CategoryCard,
  MainContent,
  CardTitle,
  CardText,
  SideInfo,
  StatsGroup,
  StatsTitle,
  StatsNum,
  CategoryLink,
  InnerContentWrapper,
} from './style';

const CategoryList = ({ categories }) => {
  return (
    <InnerContentWrapper>
      {categories.map((category) => (
        <CategoryCard key={category.id}>
          <MainContent>
            <CategoryLink to={`/categories/${category.id}`}>
              <CardTitle>{category.name}</CardTitle>
            </CategoryLink>
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
          </SideInfo>
        </CategoryCard>
      ))}
    </InnerContentWrapper>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default CategoryList;
