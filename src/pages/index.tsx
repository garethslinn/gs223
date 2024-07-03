import React, { useState, useEffect } from 'react';
import RepositoryList from '../components/repositoryList/RepositoryList';
import { fetchRepositories } from '../services/fetchRepositories';
import { Layout } from "../components/layout";
import Header from '../components/header/Header';
import { CONSTANT } from '../constants';
import { Repository } from './Homepage.type';

const { LOAD_MESSAGE, ERROR } = CONSTANT;

const HomePage: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [page, setPage] = useState(1);
  const [quantity, setQuantity] = useState(10);
  const [totalCount] = useState(1000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRepoData = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchRepositories(page, quantity);
        setRepositories(data.items);
        // Note: According to the repo - only the first 1000 search results are available
        // Keep this at 1000 or the last record button on the pagination will break
        // setTotalCount(data.total_count);
      } catch (error: any) {
        setError(ERROR.FAILED_FETCH);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoData();
  }, [page, quantity]);

  return (
    <Layout>
      <Header />
      {loading ? (
        <div>{LOAD_MESSAGE}</div>
      ) : (
        <RepositoryList
          repositories={repositories}
          page={page}
          setPage={setPage}
          quantity={quantity}
          setQuantity={setQuantity}
          totalCount={totalCount}
          error={error}
        />
      )}
    </Layout>
  );
};

export default HomePage;
