import React, { useState, useEffect } from 'react';
import { Row, Column } from './Header.styles';
import { CONSTANT } from '../../constants';

const { MAIN_TITLE } = CONSTANT;

const Header: React.FC = () => {

  return (
    <Row>
      <Column>
        <h1>{MAIN_TITLE}</h1>
      </Column>
    </Row>
  );
};

export default Header;
