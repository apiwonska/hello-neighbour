import React from 'react';

export const Error = (props) => {
  return (
  <h2>{props.message}</h2>
  )
};

export const DefaultError = () => {
  return (
    <Error message='Something went wrong. Please, try again later.'/>
  )
};

export const PageNotFound = () => {
  return (
    <Error message='Page not found'/>
  )
};

export const renderPageError = (err) => {
  if (err) {
    const errorMessage = err.hasOwnProperty('message') && err.message;
    const error404 = (typeof errorMessage === 'string') && errorMessage.includes('404');

    if (error404) {
      return <PageNotFound/>;
    }
    return <DefaultError/>;
  }
};