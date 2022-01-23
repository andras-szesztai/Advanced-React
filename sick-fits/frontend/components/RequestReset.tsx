import { SyntheticEvent } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import useForm from '../hooks/useForm';

import ErrorMessage from './ErrorMessage';
import Form from './styles/Form';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      message
      code
    }
  }
`;

// Todo: FIx this shit
export default function RequestReset() {
  const { inputs, handleInputChange, resetForm } = useForm({
    email: '',
  });

  const [signup, { data, error }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: inputs,
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await signup().catch(console.error);
    resetForm();
  };

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>
      <ErrorMessage error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link!</p>
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
        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}
