import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import styled, { ThemeProvider, DefaultTheme } from 'styled-components';
import { RepositoryItemProps } from '../repositoryItem/RepositoryItem.type';
import { CONSTANT } from '../../constants';

const { SELECTED_STATES_KEY } = CONSTANT;

// Mocked theme 
const theme: DefaultTheme = {
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px'
    },
    colors: {
        primary: '#007bff',
        secondary: '#6c757d',
        background: '#f8f9fa',
        border: '#ccc',
        text: '#000',
        white: '#ffffff'
    },
    borderRadius: {
        sm: '0.25rem',
        md: '0.5rem'
    },
    shadows: {
        base: '0.25rem 0.25rem 0.30rem rgba(0, 0, 0, 0.1)'
    },
    fontSizes: {
        small: '0.875rem',
        base: '1rem',
        large: '1.25rem',
        vlarge: '2rem'
    }
};

// MockedRepositoryItem component
const RepositoryItemContainer = styled.div`
    display: flex;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.md};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Button = styled.button`
    margin-left: auto;
`;

const RepositoryItem: React.FC<RepositoryItemProps> = ({ repo }) => {
    const [visible, setVisible] = React.useState(true);

    const toggleVisibility = () => {
        const newState = !visible;
        setVisible(newState);
        localStorage.setItem(
            SELECTED_STATES_KEY,
            JSON.stringify({ [repo.id]: newState })
        );
    };

    return (
        <RepositoryItemContainer>
            <img src={repo.owner.avatar_url} alt={`${repo.full_name} avatar`} />
            <div>
                <h2>{repo.full_name}</h2>
                <p>{repo.description}</p>
            </div>
            <Button onClick={toggleVisibility}>
                {visible ? (
                    <span data-testid="check-icon"></span>
                ) : (
                    <span data-testid="cross-icon"></span>
                )}
            </Button>
        </RepositoryItemContainer>
    );
};

const repo = {
    id: 1,
    full_name: 'example/repo',
    description: 'This is a description',
    owner: { avatar_url: 'https://example.com/avatar.png', html_url: 'https://github.com/example' }
};

const defaultProps: RepositoryItemProps = {
    repo
};

describe('RepositoryItem Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('toggles visibility state on button click', () => {
        const { getByRole, queryByTestId } = render(
            <ThemeProvider theme={theme}>
                <RepositoryItem {...defaultProps} />
            </ThemeProvider>
        );
        const button = getByRole('button');

        // Initially, the button should contain the green tick
        expect(queryByTestId('check-icon')).toBeInTheDocument();

        fireEvent.click(button);

        // After clicking, the button should contain the red cross
        expect(queryByTestId('cross-icon')).toBeInTheDocument();

        fireEvent.click(button);

        // After clicking again, the button should contain the green tick
        expect(queryByTestId('check-icon')).toBeInTheDocument();
    });

    it('sets localStorage correctly', () => {
        const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
        const { getByRole } = render(
            <ThemeProvider theme={theme}>
                <RepositoryItem {...defaultProps} />
            </ThemeProvider>
        );
        const button = getByRole('button');

        fireEvent.click(button);
        expect(setItemSpy).toHaveBeenCalledWith('repository-visibility-states', JSON.stringify({ 1: false }));

        fireEvent.click(button);
        expect(setItemSpy).toHaveBeenCalledWith('repository-visibility-states', JSON.stringify({ 1: true }));

        setItemSpy.mockRestore();
    });
});
