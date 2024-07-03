// components/Pagination.js

import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  margin: 0 ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.secondary};
    cursor: not-allowed;
  }
`;

export const Select = styled.select`
  margin-left: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.white};

  @media (max-width: 680px) {
    display: none;
  }
`;

export const PaginationInfo = styled.div`
  margin-left: ${({ theme }) => theme.spacing.md};

  @media (max-width: 680px) {
    display: none;
  }
`;
