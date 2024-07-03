// src/components/pagination/Pagination.tsx
import React from 'react';
import { PaginationWrapper, Button, Select, PaginationInfo } from './Pagination.styles';
import { PaginationProps } from './Pagination.type';

const Pagination: React.FC<PaginationProps> = ({ page, setPage, quantity, setQuantity, totalCount }) => {
  const totalPages = Math.ceil(totalCount / quantity);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(event.target.value));
    setPage(1);
  };

  return (
    <PaginationWrapper>
      <Button onClick={() => setPage(1)} disabled={page === 1}>
        &lt;&lt; First
      </Button>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt; Previous
      </Button>
      <PaginationInfo>
        Page {page} of {totalPages}
      </PaginationInfo>
      <Select value={quantity} onChange={handleQuantityChange}>
        {[10, 20, 30].map((q) => (
          <option key={q} value={q}>
            {q}
          </option>
        ))}
      </Select>
      <Button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
        Next &gt;
      </Button>
      <Button onClick={() => setPage(totalPages)} disabled={page === totalPages}>
        Last &gt;&gt;
      </Button>
    </PaginationWrapper>
  );
};

export default Pagination;
