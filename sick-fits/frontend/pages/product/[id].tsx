/* eslint-disable react/prop-types */

import SingleProduct from '../../components/SingleProduct';

// TODO: typescript query from any
const SingleProductPage = ({ query }) => <SingleProduct id={query.id} />;

export default SingleProductPage;
