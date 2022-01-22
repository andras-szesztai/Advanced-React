import { useRouter } from 'next/router';

import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

// Todo type
export default function ProductsPage() {
  const router: any = useRouter();
  const { query } = router;
  return (
    <>
      <Pagination page={+query.page || 1} />
      <Products page={+query.page || 1} />
      <Pagination page={+query.page || 1} />
    </>
  );
}
