import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { SyntheticEvent } from 'react';

import useForm from '../hooks/useForm';

import ErrorMessage from './ErrorMessage';
import Form from './styles/Form';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

interface Props {
  id: string;
}

export default function UpdateProduct({ id }: Props) {
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  const { inputs, handleInputChange, handleTextAreaChange, clearForm } =
    useForm({
      name: data?.Product.name,
      price: data?.Product.price,
      description: data?.Product.description,
    });

  const [
    updateProduct,
    { data: updatedData, error: updatedError, loading: updatedLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION, {
    variables: {
      id,
      ...inputs,
    },
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await updateProduct();
  };

  if (loading || !inputs) return <p>Loading...</p>;

  return (
    <Form onSubmit={handleSubmit}>
      <ErrorMessage error={error || updatedError} />
      <fieldset disabled={updatedLoading} aria-busy={updatedLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleTextAreaChange}
          />
        </label>
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}
