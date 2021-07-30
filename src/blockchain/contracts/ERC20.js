
import Contract from './Contract';
import abi from '../abis/erc20.json';

class ERC20 extends Contract {
  constructor(options, address) {
    super(options, "erc20-" + address);
    this.contract = new this.web3.eth.Contract(abi, address);
  }
}

export default ERC20;