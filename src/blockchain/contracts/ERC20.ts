
import Contract from './Contract';
import abi from '../abis/erc20.json';

class ERC20 extends Contract {
  constructor(options, address) {
    super(options, "erc20-" + address, abi, address);
  }
}

export default ERC20;