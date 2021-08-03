import { useCallback, useEffect, useState } from 'react';
import useVega from './useVega';
import * as config from '../config';

const useStablePool = () => {
  const vega = useVega();
  const [stablePool, setStablePool] = useState<any>(null);

  const fetchStablePool = useCallback(async () => {
    try {
      const _stablePool = await vega?.getPoolInfo();
      setStablePool(_stablePool);
      console.log("StablePool: ", _stablePool);
    } catch (e) {
      console.log("StablePool Fetching Error: ", e);
    }
  }, [vega])

  useEffect(() => {
    if (vega) {
      fetchStablePool();
      let refreshInterval = setInterval(fetchStablePool, config.refetchInterval);
      return () => clearInterval(refreshInterval);
    }
    return () => {}
  }, [vega, fetchStablePool]);

  return stablePool;
}

export default useStablePool;
