
import Contract from './Contract';
import abi from '../abis/weth.json';
import { addresses } from '../constants';

class WEth extends Contract {
  constructor(options) {
    super(options, "weth");
    this.contract = new this.web3.eth.Contract(abi, addresses.weth[this.networkId]);
  }
}

export default WEth;