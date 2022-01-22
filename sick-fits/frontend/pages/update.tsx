import { NextPage } from 'next';
import UpdateProduct from '../components/UpdateProduct';

interface Props {
  query: { id: string };
}

const UpdatePage: NextPage<Props> = (props) => {
  const {
    query: { id },
  } = props;
  return (
    <div>
      <UpdateProduct id={id} />
    </div>
  );
};

export default UpdatePage;
