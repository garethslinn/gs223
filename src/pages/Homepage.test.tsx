
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomePage from './';
import { fetchRepositories } from '../services/fetchRepositories'; 
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme'; 

jest.mock('../services/fetchRepositories');
const mockedFetchRepositories = fetchRepositories as jest.MockedFunction<typeof fetchRepositories>;

describe('HomePage Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the title', () => {
        render(
            <ThemeProvider theme={theme}>
                <HomePage />
            </ThemeProvider>
        );
        expect(screen.getByText('Browse Github')).toBeInTheDocument();
    });

    it('displays loading indicator when fetching data', async () => {
        render(
            <ThemeProvider theme={theme}>
                <HomePage />
            </ThemeProvider>
        );
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('displays repositories after fetching data', async () => {
        const mockRepositories = [
            {
                id: 1,
                full_name: 'example/repo1',
                description: 'This is the first example repo',
                owner: { avatar_url: 'https://example.com/avatar1.png', html_url: 'https://github.com/example1' }
            },
            {
                id: 2,
                full_name: 'example/repo2',
                description: 'This is the second example repo',
                owner: { avatar_url: 'https://example.com/avatar2.png', html_url: 'https://github.com/example2' }
            }
        ];

        mockedFetchRepositories.mockResolvedValueOnce({
            items: mockRepositories,
            total_count: 2
        });

        render(
            <ThemeProvider theme={theme}>
                <HomePage />
            </ThemeProvider>
        );

        await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

        mockRepositories.forEach(repo => {
            expect(screen.getByText(repo.full_name)).toBeInTheDocument();
            expect(screen.getByText(repo.description)).toBeInTheDocument();
        });
    });

    it('displays an error message when fetching data fails', async () => {
        mockedFetchRepositories.mockRejectedValueOnce(new Error('Failed to fetch repositories'));

        render(
            <ThemeProvider theme={theme}>
                <HomePage />
            </ThemeProvider>
        );

        await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

        expect(screen.getByText('Failed to fetch repositories. Please try again later.')).toBeInTheDocument();
    });
});
