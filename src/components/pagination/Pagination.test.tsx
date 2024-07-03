
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Pagination from './Pagination';
import { PaginationProps } from './Pagination.type';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';

const defaultProps: PaginationProps = {
  page: 1,
  setPage: jest.fn(),
  quantity: 10,
  setQuantity: jest.fn(),
  totalCount: 100,
};

describe('Pagination Component', () => {
  it('disables "First" and "Previous" buttons on the first page', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Pagination {...defaultProps} />
      </ThemeProvider>
    );

    expect(getByText(/First/)).toBeDisabled();
    expect(getByText(/Previous/)).toBeDisabled();
  });

  it('enables "Next" and "Last" buttons on the first page', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Pagination {...defaultProps} />
      </ThemeProvider>
    );

    expect(getByText(/Next/)).toBeEnabled();
    expect(getByText(/Last/)).toBeEnabled();
  });

  it('calls setPage with correct arguments when buttons are clicked', () => {
    const setPage = jest.fn();
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Pagination {...defaultProps} page={2} setPage={setPage} />
      </ThemeProvider>
    );

    fireEvent.click(getByText(/First/));
    expect(setPage).toHaveBeenCalledWith(1);

    fireEvent.click(getByText(/Previous/));
    expect(setPage).toHaveBeenCalledWith(1);

    fireEvent.click(getByText(/Next/));
    expect(setPage).toHaveBeenCalledWith(3);

    fireEvent.click(getByText(/Last/));
    expect(setPage).toHaveBeenCalledWith(10);
  });

  it('calls setQuantity and resets page when quantity changes', () => {
    const setPage = jest.fn();
    const setQuantity = jest.fn();
    const { getByDisplayValue } = render(
      <ThemeProvider theme={theme}>
        <Pagination {...defaultProps} page={2} setPage={setPage} setQuantity={setQuantity} />
      </ThemeProvider>
    );

    fireEvent.change(getByDisplayValue('10'), { target: { value: '20' } });
    expect(setQuantity).toHaveBeenCalledWith(20);
    expect(setPage).toHaveBeenCalledWith(1);
  });
});
