export type PaginationProps = {
    page: number;
    setPage: (page: number) => void;
    quantity: number;
    setQuantity: (quantity: number) => void;
    totalCount: number;
};
