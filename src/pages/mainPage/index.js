import React from 'react';

import { 
  ContainerDiv,
  CategoryContainer
} from './style';

const categories = [
  {id:1, name:'announcment'}, 
  {id:2, name:'general'}, 
  {id:3, name:'other topics'}
];

const categoryList = categories.map(category => {
  return (
    <CategoryContainer key={category.id}>
      {category.name}
    </CategoryContainer>
  )
})

const MainPage = () => {
  return (
    <ContainerDiv>
      {categoryList}
    </ContainerDiv>
  )
}

export default MainPage;