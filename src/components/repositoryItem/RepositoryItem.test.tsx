
import { DefaultTheme, FastOmit, Interpolation, ThemeProvider } from 'styled-components';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RepositoryItem from './RepositoryItem';
import { RepositoryItemProps } from './RepositoryItem.type';

// Define the DefaultTheme extension
declare module 'styled-components' {
  export interface DefaultTheme {
    spacing: {
      sm: string;
      md: string;
    };
    colors: {
      background: string;
      border: string;
      primary: string;
      secondary: string;
      white: string;
      text: string;
    };
    borderRadius: {
      sm: string;
      md: string;
    };
    shadows: {
      base: string;
    };
    fontSizes: {
      vlarge: any;
      large: string;
    };
  }
}

// Define the mock theme
const mockTheme: DefaultTheme = {
  spacing: {
    sm: '0.5rem',
    md: '1rem',
  },
  colors: {
    background: '#fff',
    border: '#ccc',
    primary: '#007bff',
    secondary: '#6c757d',
    white: '#ffffff',
    text: '#000',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
  },
  shadows: {
    base: '0.25rem 0.25rem 0.30rem rgba(0, 0, 0, 0.1)',
  },
  fontSizes: {
    large: '1.25rem',
    vlarge: '2rem'
  },
};

const repo = {
  id: 1,
  full_name: 'example/repo',
  description: 'This is a description',
  owner: { avatar_url: 'https://example.com/avatar.png', html_url: 'https://github.com/example' },
};

const defaultProps: RepositoryItemProps = {
  repo,
};

describe('RepositoryItem Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('toggles visibility state on button click', () => {
    const { getByRole, queryByTestId } = render(
      <ThemeProvider theme={mockTheme}>
        <RepositoryItem {...defaultProps} />
      </ThemeProvider>
    );
    const button = getByRole('button');

    expect(queryByTestId('cross-icon')).toBeInTheDocument();

    fireEvent.click(button);

    expect(queryByTestId('check-icon')).toBeInTheDocument();

    fireEvent.click(button);

    expect(queryByTestId('cross-icon')).toBeInTheDocument();
  });

  it('sets localStorage correctly', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    const { getByRole } = render(
      <ThemeProvider theme={mockTheme}>
        <RepositoryItem {...defaultProps} />
      </ThemeProvider>
    );
    const button = getByRole('button');

    fireEvent.click(button);
    expect(setItemSpy).toHaveBeenCalledWith('repository-visibility-states', JSON.stringify({ 1: true }));

    fireEvent.click(button);
    expect(setItemSpy).toHaveBeenCalledWith('repository-visibility-states', JSON.stringify({ 1: false }));

    setItemSpy.mockRestore();
  });
});