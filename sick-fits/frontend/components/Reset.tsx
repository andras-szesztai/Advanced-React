import { SyntheticEvent } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import useForm from '../hooks/useForm';

import ErrorMessage from './ErrorMessage';
import Form from './styles/Form';

const REQUEST_RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      message
      code
    }
  }
`;

export default function Reset({ token }: { token: string }) {
  const { inputs, handleInputChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [reset, { data, error }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: inputs,
  });
  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data.redeemUserPasswordResetToken
    : undefined;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await reset().catch(console.error);
    resetForm();
  };

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      <ErrorMessage error={error || successfulError} />
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now sign in!</p>
        )}
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
        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}
