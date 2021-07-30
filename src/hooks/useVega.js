import { useContext } from 'react';
import { Context } from '../contexts/VegaProvider';

const useVega = () => {
  const { vega } = useContext(Context);
  return vega;
}

export default useVega;