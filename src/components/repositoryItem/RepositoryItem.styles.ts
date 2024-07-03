// components/RepositoryItem.js

import styled from 'styled-components';

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.base};
`;

export const ImageSection = styled.div`
  flex: 0 0 100px;
  margin-right: ${({ theme }) => theme.spacing.md};

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
`;

export const ContentSection = styled.div`
  flex: 1;

  h3 {
    margin: 0;
    padding: 0 ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.large};
  }

  p {
    margin: ${({ theme }) => theme.spacing.sm} 0 0;
    padding: 0 ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ButtonSection = styled.div`
  flex: 0 0 auto;

  button {
    background: transparent;
    border: none;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    cursor: pointer;

    &:hover {
      border-color: ${({ theme }) => theme.colors.border};
    }

    svg {
      font-size: ${({ theme }) => theme.fontSizes.vlarge};
    }
  }
`;
