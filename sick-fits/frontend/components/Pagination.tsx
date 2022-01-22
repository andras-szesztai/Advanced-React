import Head from 'next/Head';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import ErrorMessage from './ErrorMessage';
import PaginationStyles from './styles/PaginationStyles';

import { perPage } from '../config';

interface Props {
  page: number;
}

export const PAGINATION_QUERY = gql`
  query {
    _allProductsMeta {
      count
    }
  }
`;

const Pagination = ({ page }: Props) => {
  const { data, loading, error } = useQuery(PAGINATION_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const {
    _allProductsMeta: { count },
  } = data;
  const pageCount = Math.ceil(count / perPage);
  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits - Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page === 1}>Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page === pageCount}>Next</a>
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;
