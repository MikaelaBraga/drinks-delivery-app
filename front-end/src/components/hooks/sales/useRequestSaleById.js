import { useParams } from 'react-router-dom';

function useRequestSaleById() {
  const { id } = useParams();

}

export default useRequestSaleById;
