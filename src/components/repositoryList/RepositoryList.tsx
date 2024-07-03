import React from 'react';
import { RepositoryItem } from '../repositoryItem/index';
import { Pagination } from '../pagination';

const RepositoryList: React.FC<{
    repositories: any[];
    page: number;
    setPage: (page: number) => void;
    quantity: number;
    setQuantity: (quantity: number) => void;
    totalCount: number;
    error: string;
}> = ({ repositories, page, setPage, quantity, setQuantity, totalCount, error }) => {
    return (
        <>
        {!error ? (
            <>
                <Pagination
                    page={page}
                    setPage={setPage}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    totalCount={totalCount}
                />
                {repositories.map(repo => (
                    <RepositoryItem key={repo.id} repo={repo} />
                ))}
            </>
        ) : (
            <div style={{ color: 'red' }}>{error}</div>
        )}
    </>
    );
};

export default RepositoryList;
