import React, { ReactNode } from 'react';
import { LayoutProps } from './Layout.types';
import { LayoutWrapper } from './Layout.styles';

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <LayoutWrapper>{children}</LayoutWrapper>;
};

export default Layout;
