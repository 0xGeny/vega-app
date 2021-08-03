import Web3 from "web3";
import { AbiItem } from 'web3-utils';
import { Contract as Web3Contract } from "web3-eth-contract";

class Contract {
  web3: Web3;
  networkId: number;
  tag: string | null;
  events: object;
  contract: Web3Contract;

  constructor(options, tag: string, abi, address) {
    this.web3 = options.web3;
    this.contract = new this.web3.eth.Contract(abi as AbiItem[], address);
    this.networkId = options.networkId;
    if (tag) this.tag = tag;
    else this.tag = "" + Date.now();
    this.events = {};
  }
  
  call(method, ...params) {
    return new Promise((resolve, reject) => {
      const account = window.ethereum?.selectedAddress;
      this.contract.methods[method](...params).call({from: account})
        .then(resolve)
        .catch(reject)
    });
  }

  send(method, options, ...params) {
    return new Promise((resolve, reject) => {
      //const provider = this.web3.currentProvider || {};
      const account = window.ethereum?.selectedAddress;
      this.contract.methods[method](...params).send({...options, from: account})
        .then(resolve)
        .catch(reject)
    });
  }

  on(event, callback, onerr) {
    if (this.events[event])
      return;
    this.contract.events[event]((err, res) => {
      if (err === null) {
        callback(res.returnValues, this.tag);
      } else {
        if (onerr) onerr(err);
        else console.log(err);
      }
    });
    this.events[event] = true;
  }

  // getPastEvents(...params) {
  //   return new Promise((resolve, reject) => {
  //     this.contract.getPastEvents(...params)
  //       .then(resolve)
  //       .catch(reject)
  //   });
  // }
}

export default Contract;