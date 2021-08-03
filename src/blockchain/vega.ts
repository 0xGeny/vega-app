import { addresses, tokens } from './constants';
import * as utils from './utils';
import ERC20 from './contracts/ERC20';
import StablePool from './contracts/StablePool';
import Web3 from 'web3';

export class Vega {

  web3: Web3;
  networkId: number;
  disconnect: () => void;

  busd: ERC20;
  usdt: ERC20;
  lpShare: ERC20;
  pool: ERC20;

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
    this.lpShare = new ERC20(contract_options, addresses.lpShare[networkId])
    this.pool = new StablePool(contract_options);
  }

  async getBalances() {
    const account = window.ethereum?.selectedAddress;
    if (account == null)
      return {};
    const bnbBalance = await utils.getEthBalance(account);
    const busdBalance = await this.busd.call("balanceOf", account);
    const usdtBalance = await this.usdt.call("balanceOf", account);
    const lpBalance = await this.lpShare.call("balanceOf", account);
    return {
      bnb: bnbBalance,
      busd: utils.BNtoNum(busdBalance, tokens.busd.deicimals),
      usdt: utils.BNtoNum(usdtBalance, tokens.usdt.deicimals),
      lpShare: utils.BNtoNum(lpBalance, tokens.usdt.deicimals)
    }
  }

  async getPoolInfo() {
    const busdBalance = await this.busd.call("balanceOf", addresses.pool[this.networkId]);
    const usdtBalance = await this.usdt.call("balanceOf", addresses.pool[this.networkId]);
    return {
      busd: utils.BNtoNum(busdBalance, tokens.busd.deicimals),
      usdt: utils.BNtoNum(usdtBalance, tokens.usdt.deicimals)
    }
  }

  async swapBase(amount) {
    try {
      const _amount = utils.NumToBN(amount, tokens.busd.deicimals);
      const tx = await this.pool.send("swapBase", null, _amount);
      return tx;
    } catch (e) {
      console.log("swapBase() Error:", e);
      return false;
    }
  }

}
