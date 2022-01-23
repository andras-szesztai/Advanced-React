import { SyntheticEvent } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import useForm from '../hooks/useForm';

import ErrorMessage from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';
import Form from './styles/Form';

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleInputChange, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [signup, { data, error }] = useMutation(SIGN_UP_MUTATION, {
    variables: inputs,
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await signup().catch(console.error);
    resetForm();
  };

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <h2>Sign Up For An Account</h2>
      <ErrorMessage error={error} />
      <fieldset>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - Please Go Ahead and Sign
            in!
          </p>
        )}
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Your Name"
            value={inputs.name}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={inputs.password}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Sign In</button>
      </fieldset>
    </Form>
  );
}
