
import Contract from './Contract';
import abi from '../abis/pool.json';
import { addresses } from '../constants';

class StablePool extends Contract {
  constructor(options) {
    super(options, "stable-pool");
    this.contract = new this.web3.eth.Contract(abi, addresses.pool[this.networkId]);
  }
}

export default StablePool;