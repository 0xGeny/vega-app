
import Contract from './Contract';
import abi from '../abis/pool.json';
import { addresses } from '../constants';

class StablePool extends Contract {
  constructor(options) {
    super(options, "stable-pool", abi, addresses.pool[options.networkId]);
  }
}

export default StablePool;