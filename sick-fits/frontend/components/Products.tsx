import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { IProduct } from '../types/data';
import { perPage } from '../config';
import Product from './Product';

export const ALL_PRODUCT_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

interface Props {
  page: number;
}

const Products = ({ page }: Props) => {
  const { data, error, loading } = useQuery<{ allProducts: IProduct[] }>(
    ALL_PRODUCT_QUERY,
    { variables: { skip: page * perPage - perPage, first: perPage } }
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <ProductsList>
        {data.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsList>
    </div>
  );
};

export default Products;
