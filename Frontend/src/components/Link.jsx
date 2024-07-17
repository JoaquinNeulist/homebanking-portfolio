import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

const Link = (props) => {
  return (
    <ReactRouterLink to={props.to} className='md:px-4'>
      {props.children}
    </ReactRouterLink>
  );
};

export default Link;
