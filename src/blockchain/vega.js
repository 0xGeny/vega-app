import { ethers } from 'ethers';
import WEth from './contracts/WEth';
import { addresses, pools } from './constants';
import * as utils from './utils';
import ERC20 from './contracts/ERC20';

export class Vega {
  constructor(provider, networkId, disconnect, options = {}) {

    this.web3 = utils.createWeb3(provider, options);
    this.networkId = networkId;
    this.disconnect = disconnect;
        
    const contract_options = {
      web3: this.web3,
      networkId: networkId,
      ...options
    }
    this.busd = new ERC20(contract_options, addresses.busd[networkId]);
    this.usdt = new ERC20(contract_options, addresses.usdt[networkId]);
  }

  async getBalances() {
    const account = this.web3.currentProvider.selectedAddress;
    const bnbBalance = await utils.getEthBalance(account);
    const busdBalance = await this.busd.call("balanceOf", account);
    const usdtBalance = await this.usdt.call("balanceOf", account);
    return {
      bnb: bnbBalance,
      busd: utils.BNtoNum(busdBalance, 18),
      usdt: utils.BNtoNum(usdtBalance, 6)
    }
  }

}
