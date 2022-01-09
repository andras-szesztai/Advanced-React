import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { SyntheticEvent } from 'react';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import useForm from '../hooks/useForm';
import { TCreatedProduct } from '../types/data';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

const CreateProduct = () => {
  const { inputs, handleInputChange, handleTextAreaChange, clearForm } =
    useForm({
      name: '',
      price: 0,
      description: '',
      image: '',
    });

  const [createProduct, { loading, error }] = useMutation<TCreatedProduct>(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
    }
  );

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await createProduct();
    clearForm();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleInputChange}
          />
        </label>
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
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
};

export default CreateProduct;
