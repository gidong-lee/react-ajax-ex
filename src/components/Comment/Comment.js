import React from 'react';
import './Comment.css';

const Comment = ({name, body, index}) => {
  return (
    <li className="Comment">
      <p>
        <b>{index + 1} - {name}</b> {body}
      </p>
    </li>
  );
};

export default Comment;
