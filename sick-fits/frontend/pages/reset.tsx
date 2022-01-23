/* eslint-disable react/prop-types */
import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

// TODO type
export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <div>
        <p>Sorry you must provide a supply token!</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>Reset Your Password {query.token}</p>
      <Reset token={query.token} />
    </div>
  );
}
