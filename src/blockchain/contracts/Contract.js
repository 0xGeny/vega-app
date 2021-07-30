
class Contract {

  constructor(options, tag = null) {
    this.web3 = options.web3;
    this.networkId = options.networkId;
    if (tag) this.tag = tag;
    else this.tag = "" + Date.now();
    this.events = {};
  }
  
  call(method, ...params) {
    return new Promise((resolve, reject) => {
      const account = this.web3.currentProvider.selectedAddress;
      this.contract.methods[method](...params).call({from: account})
        .then(resolve)
        .catch(reject)
    });
  }

  send(method, options, ...params) {
    return new Promise((resolve, reject) => {
      const account = this.web3.currentProvider.selectedAddress;
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

  getPastEvents(...params) {
    return new Promise((resolve, reject) => {
      this.contract.getPastEvents(...params)
        .then(resolve)
        .catch(reject)
    });
  }
}

export default Contract;