import { useCallback, useEffect, useState } from 'react';
import useVega from './useVega';
import * as config from '../config';

const useBalances = () => {
  const vega = useVega();
  const [balances, setBalances] = useState<any>(null);

  const fetchBalances = useCallback(async () => {
    try {
      const _balances = await vega?.getBalances();
      setBalances(_balances);
      console.log("Balances: ", _balances);
    } catch (e) {
      console.log("Balances Fetching Error: ", e);
    }
  }, [vega])

  useEffect(() => {
    if (vega) {
      fetchBalances();
      let refreshInterval = setInterval(fetchBalances, config.refetchInterval);
      return () => clearInterval(refreshInterval);
    }
    return () => {};
  }, [vega, fetchBalances]);

  return balances;
}

export default useBalances;
