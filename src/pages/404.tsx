import React from 'react';
import Link from 'next/link';
import { CONSTANT } from '../constants';

const { TITLE, DESCRIPTION, LINK_MESSAGE, URL } = CONSTANT.NOT_FOUND;

const NotFoundPage: React.FC = () => {
  return (
    <div>
      <h1>{TITLE}</h1>
      <p>{DESCRIPTION}</p>
      <Link href={URL}>
        {LINK_MESSAGE}
      </Link>
    </div>
  );
};

export default NotFoundPage;
