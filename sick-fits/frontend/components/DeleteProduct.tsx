import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';

interface Props {
  id: string;
}

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteProduct));
}

const DeleteProduct: React.FC<Props> = ({ id, children }) => {
  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });

  const handleClick = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete this item?')) {
      await deleteProduct();
    }
  };

  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
};

export default DeleteProduct;
